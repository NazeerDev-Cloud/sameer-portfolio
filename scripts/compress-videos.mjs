/**
 * Compress every .mp4 under public/videos in place.
 *
 *  - H.264 / CRF 24 (visually near-lossless for web), preset "faster"
 *  - long edge capped at 1920px, aspect ratio preserved, even dimensions
 *  - AAC 128 kbps stereo audio (kept optional if source has none)
 *  - +faststart so the moov atom sits at the front (instant web playback)
 *
 * The re-encoded file only replaces the original when it is meaningfully
 * smaller; otherwise the original is kept untouched.
 *
 * Run:  node scripts/compress-videos.mjs
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";

const FFMPEG = ffmpegInstaller.path;
const FFPROBE = ffprobeInstaller.path;

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const VIDEO_DIR = path.join(ROOT, "public", "videos");

const MAX_EDGE = 1920;
const CRF = "24";
const PRESET = "faster";
const AUDIO_BITRATE = "128k";
const MIN_SAVING = 0.03; // require at least 3% smaller to bother replacing

const mb = (bytes) => bytes / 1024 / 1024;
const fmt = (bytes) => `${mb(bytes).toFixed(1)} MB`;

function walk(dir) {
    const out = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...walk(full));
        else if (entry.isFile() && /\.mp4$/i.test(entry.name)) out.push(full);
    }
    return out;
}

function probe(file) {
    const json = execFileSync(
        FFPROBE,
        [
            "-v", "error",
            "-select_streams", "v:0",
            "-show_entries", "stream=width,height",
            "-of", "json",
            file,
        ],
        { encoding: "utf8" }
    );
    const s = JSON.parse(json).streams?.[0] || {};
    return { width: Number(s.width) || 0, height: Number(s.height) || 0 };
}

function targetSize(w, h) {
    if (!w || !h || Math.max(w, h) <= MAX_EDGE) {
        return { w: w || 1280, h: h || 720 };
    }
    let tw;
    let th;
    if (w >= h) {
        tw = MAX_EDGE;
        th = Math.round((h * MAX_EDGE) / w);
    } else {
        th = MAX_EDGE;
        tw = Math.round((w * MAX_EDGE) / h);
    }
    return { w: tw - (tw % 2), h: th - (th % 2) };
}

const files = walk(VIDEO_DIR).sort();
if (!files.length) {
    console.log("No .mp4 files found under public/videos");
    process.exit(0);
}

console.log(`ffmpeg: ${FFMPEG}`);
console.log(`Compressing ${files.length} videos …\n`);

const rows = [];
let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
    const rel = path.relative(VIDEO_DIR, file);
    const before = fs.statSync(file).size;
    totalBefore += before;

    let dims;
    try {
        dims = probe(file);
    } catch {
        dims = { width: 0, height: 0 };
    }
    const { w, h } = targetSize(dims.width, dims.height);

    const tmp = `${file}.tmp.mp4`;
    process.stdout.write(`• ${rel}  (${fmt(before)}, ${dims.width}x${dims.height} → ${w}x${h}) … `);

    try {
        execFileSync(
            FFMPEG,
            [
                "-hide_banner", "-loglevel", "error", "-y",
                "-i", file,
                "-map", "0:v:0", "-map", "0:a:0?",
                "-c:v", "libx264", "-crf", CRF, "-preset", PRESET, "-pix_fmt", "yuv420p",
                "-vf", `scale=${w}:${h}`,
                "-c:a", "aac", "-b:a", AUDIO_BITRATE, "-ac", "2",
                "-movflags", "+faststart",
                tmp,
            ],
            { stdio: ["ignore", "ignore", "inherit"] }
        );
    } catch (err) {
        if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
        console.log("FAILED");
        rows.push({ rel, before, after: before, saved: 0, action: "error" });
        totalAfter += before;
        continue;
    }

    const after = fs.statSync(tmp).size;
    const saving = 1 - after / before;

    if (saving >= MIN_SAVING) {
        fs.rmSync(file);
        fs.renameSync(tmp, file);
        totalAfter += after;
        rows.push({ rel, before, after, saved: saving, action: "compressed" });
        console.log(`${fmt(after)}  (-${(saving * 100).toFixed(0)}%)`);
    } else {
        fs.unlinkSync(tmp);
        totalAfter += before;
        rows.push({ rel, before, after: before, saved: 0, action: "kept original" });
        console.log(`kept original (${fmt(after)})`);
    }
}

// ── Report ───────────────────────────────────────────────
const pad = (s, n) => String(s).padEnd(n);
const padL = (s, n) => String(s).padStart(n);
const nameW = Math.min(52, Math.max(...rows.map((r) => r.rel.length), 4));

console.log(`\n${"─".repeat(nameW + 40)}`);
console.log(`${pad("FILE", nameW)}  ${padL("BEFORE", 10)}  ${padL("AFTER", 10)}  ${padL("SAVED", 7)}  ACTION`);
console.log("─".repeat(nameW + 40));
for (const r of rows) {
    console.log(
        `${pad(r.rel.length > nameW ? "…" + r.rel.slice(-(nameW - 1)) : r.rel, nameW)}  ` +
        `${padL(fmt(r.before), 10)}  ${padL(fmt(r.after), 10)}  ` +
        `${padL(r.saved ? `-${(r.saved * 100).toFixed(0)}%` : "—", 7)}  ${r.action}`
    );
}
console.log("─".repeat(nameW + 40));
console.log(
    `${pad("TOTAL", nameW)}  ${padL(fmt(totalBefore), 10)}  ${padL(fmt(totalAfter), 10)}  ` +
    `${padL(`-${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%`, 7)}`
);
console.log(
    `\nSaved ${fmt(totalBefore - totalAfter)} ` +
    `(${mb(totalBefore).toFixed(0)} MB → ${mb(totalAfter).toFixed(0)} MB)`
);

// machine-readable copy for the report
fs.writeFileSync(
    path.join(ROOT, "scripts", "compression-report.json"),
    JSON.stringify(
        {
            generatedAt: new Date().toISOString(),
            totalBefore,
            totalAfter,
            rows,
        },
        null,
        2
    )
);

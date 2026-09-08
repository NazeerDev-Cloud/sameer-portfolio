/**
 * Compress every .mp4 under public/videos in place.
 *
 *  - H.264 / CRF 23 (visually transparent for web), preset "slow"
 *    ("slow" buys ~15-20% smaller files than "faster" at the same quality,
 *     which matters because most clips here were already encoded once)
 *  - resolution is PRESERVED; the long edge is only capped if it exceeds
 *    1920px (none of the current clips do), aspect ratio kept, even dims
 *  - audio is stream-copied when it is already AAC <= 160 kbps, otherwise
 *    re-encoded to AAC 128 kbps stereo (avoids a second generation of
 *    audio loss on clips that are already fine)
 *  - +faststart so the moov atom sits at the front (instant web playback)
 *
 * The re-encoded file only replaces the original when it is meaningfully
 * smaller; otherwise the original is kept untouched.
 *
 * Run:  npm run compress:videos   (or: node scripts/compress-videos.mjs)
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";

const FFMPEG = ffmpegInstaller.path;
const FFPROBE = ffprobeInstaller.path;

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const VIDEO_DIR = path.join(ROOT, "public", "videos");

const MAX_EDGE = 1920;
const CRF = "23";
const PRESET = "slow";
const AUDIO_BITRATE = "128k";
const AUDIO_COPY_MAX_BPS = 160_000; // copy AAC audio at or below this instead of re-encoding
const MIN_SAVING = 0.02; // require at least 2% smaller to bother replacing
const THREADS = String(Math.max(1, os.cpus().length));

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
            "-show_entries", "stream=index,codec_type,codec_name,width,height,bit_rate",
            "-of", "json",
            file,
        ],
        { encoding: "utf8" }
    );
    const streams = JSON.parse(json).streams || [];
    const v = streams.find((s) => s.codec_type === "video") || {};
    const a = streams.find((s) => s.codec_type === "audio");
    return {
        width: Number(v.width) || 0,
        height: Number(v.height) || 0,
        hasAudio: Boolean(a),
        audioCodec: a?.codec_name || null,
        audioBps: Number(a?.bit_rate) || 0,
    };
}

function targetSize(w, h) {
    if (!w || !h || Math.max(w, h) <= MAX_EDGE) {
        return { w: w || 0, h: h || 0, scaled: false };
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
    return { w: tw - (tw % 2), h: th - (th % 2), scaled: true };
}

const files = walk(VIDEO_DIR).sort();
if (!files.length) {
    console.log("No .mp4 files found under public/videos");
    process.exit(0);
}

console.log(`ffmpeg:  ${FFMPEG}`);
console.log(`ffprobe: ${FFPROBE}`);
console.log(`Compressing ${files.length} videos (CRF ${CRF}, preset ${PRESET}) …\n`);

const rows = [];
let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
    const rel = path.relative(VIDEO_DIR, file);
    const before = fs.statSync(file).size;
    totalBefore += before;

    let info;
    try {
        info = probe(file);
    } catch {
        info = { width: 0, height: 0, hasAudio: false, audioCodec: null, audioBps: 0 };
    }
    const { w, h, scaled } = targetSize(info.width, info.height);

    const audioArgs =
        !info.hasAudio
            ? ["-an"]
            : info.audioCodec === "aac" && info.audioBps > 0 && info.audioBps <= AUDIO_COPY_MAX_BPS
                ? ["-map", "0:a:0", "-c:a", "copy"]
                : ["-map", "0:a:0?", "-c:a", "aac", "-b:a", AUDIO_BITRATE, "-ac", "2"];

    const videoFilter = scaled ? ["-vf", `scale=${w}:${h}:flags=lanczos`] : [];

    const tmp = `${file}.tmp.mp4`;
    const dimNote = scaled ? `${info.width}x${info.height} → ${w}x${h}` : `${info.width}x${info.height} kept`;
    process.stdout.write(`• ${rel}  (${fmt(before)}, ${dimNote}) … `);

    try {
        execFileSync(
            FFMPEG,
            [
                "-hide_banner", "-loglevel", "error", "-y",
                "-i", file,
                "-map", "0:v:0",
                "-c:v", "libx264", "-crf", CRF, "-preset", PRESET,
                "-profile:v", "high", "-pix_fmt", "yuv420p",
                "-threads", THREADS,
                ...videoFilter,
                ...audioArgs,
                "-movflags", "+faststart",
                tmp,
            ],
            { stdio: ["ignore", "ignore", "inherit"] }
        );
    } catch {
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
        console.log(`kept original (re-encode was ${fmt(after)})`);
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
            settings: { crf: CRF, preset: PRESET, maxEdge: MAX_EDGE },
            totalBefore,
            totalAfter,
            rows,
        },
        null,
        2
    )
);

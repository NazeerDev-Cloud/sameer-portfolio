import React, { useEffect, useRef, useState } from "react";
import { HashLink } from "react-router-hash-link";

// ── Brand Palette (light / Hostinger-style) ──
const COLORS = {
    bg: "#ffffff",
    surface: "#f6f7f9",
    border: "#e6e7ec",
    text: "#1b1f3b",
    textBody: "#4b5563",
    textMuted: "#8a8fa3",
    left: "#8168F0",
    mid: "#7C5CFF",
    right: "#8b5cf6",
};

const GRADIENT = `linear-gradient(135deg, ${COLORS.left} 0%, #7C5CFF 55%, #9D6BFF 100%)`;

// ── Count-up hook ──
const useCountUp = (target, duration, start) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;
        let raf;
        let startTime = null;

        const step = (t) => {
            if (startTime === null) startTime = t;
            const p = Math.min((t - startTime) / duration, 1);
            // ease-out
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(eased * target));
            if (p < 1) raf = requestAnimationFrame(step);
        };

        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [target, duration, start]);

    return count;
};

const STATS = [
    {
        value: 200,
        suffix: "+",
        label: "Projects Delivered",
        sublabel: "YouTube, ads, films & AI edits",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        value: 60,
        suffix: "+",
        label: "Happy Clients",
        sublabel: "Global brands & creators",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6-4a3 3 0 10-3-3" />
            </svg>
        ),
    },
    {
        value: 3,
        suffix: " yrs",
        label: "Years in the Craft",
        sublabel: "Sharpening every frame",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        value: 600,
        suffix: "+",
        label: "Videos Edited",
        sublabel: "Raw footage → cinematic",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9a3 3 0 100-6 3 3 0 000 6zm0 12a3 3 0 100-6 3 3 0 000 6zM8.7 8.7L20 20M8.7 15.3L20 4" />
            </svg>
        ),
    },
];

const SKILLS = ["Color Grading", "Motion Graphics", "Sound Design", "VFX Compositing", "Storytelling"];
const TOOLS = ["Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut", "Runway"];

const StatCard = ({ stat, index, animate }) => {
    const count = useCountUp(stat.value, 1600, animate);

    return (
        <div
            className="impact-stat group relative overflow-hidden rounded-3xl border border-[#e6e7ec] bg-white p-7"
            style={{
                animation: animate ? `impactRise 0.7s cubic-bezier(0.22,1,0.36,1) forwards ${0.15 + index * 0.1}s` : "none",
                opacity: 0,
            }}
        >
            {/* top accent */}
            <span
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: GRADIENT }}
            />

            {/* icon tile */}
            <div
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_10px_24px_rgba(129,104,240,0.28)]"
                style={{ background: GRADIENT }}
            >
                <span className="h-6 w-6">{stat.icon}</span>
            </div>

            {/* number */}
            <p className="text-[44px] font-black leading-none tracking-tight text-[#1b1f3b]">
                {animate ? count : 0}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: GRADIENT }}>
                    {stat.suffix}
                </span>
            </p>

            <p className="mt-3 text-[21px] font-bold tracking-tight text-[#1b1f3b]">
                {stat.label}
            </p>
            <p className="mt-1 text-[17px] leading-relaxed text-[#8a8fa3]">
                {stat.sublabel}
            </p>
        </div>
    );
};

const Impact = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setVisible(true),
            { threshold: 0.12 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    const anim = (delay) => ({
        animation: visible ? `impactRise 0.7s cubic-bezier(0.22,1,0.36,1) forwards ${delay}s` : "none",
        opacity: 0,
    });

    return (
        <>
            <style>{`
                @keyframes impactRise {
                    from { opacity: 0; transform: translateY(26px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes impactFloat {
                    0%, 100% { transform: translate(0, 0); }
                    50%      { transform: translate(24px, -18px); }
                }
                .impact-stat {
                    transition: transform 0.45s cubic-bezier(0.22,1,0.36,1),
                                border-color 0.45s ease,
                                box-shadow 0.45s ease;
                }
                .impact-stat:hover {
                    transform: translateY(-6px);
                    border-color: ${COLORS.left}45;
                    box-shadow: 0 24px 50px -18px rgba(27,31,59,0.18);
                }
                .impact-chip { transition: all 0.3s ease; }
                .impact-chip:hover {
                    border-color: ${COLORS.left}55;
                    background: ${COLORS.left}0f;
                    color: ${COLORS.left};
                }
                @media (prefers-reduced-motion: reduce) {
                    .impact-stat, [data-impact-anim] { animation: none !important; opacity: 1 !important; transform: none !important; }
                }
            `}</style>

            <section
                ref={sectionRef}
                className="relative w-full overflow-hidden bg-white px-6 py-28 font-sans text-[#1b1f3b] sm:px-12 md:py-36 lg:px-24"
            >
                {/* soft ambient wash */}
                <div
                    className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.5] blur-[130px]"
                    style={{ background: `radial-gradient(ellipse at center, ${COLORS.left}12, transparent 70%)`, animation: "impactFloat 16s ease-in-out infinite" }}
                />

                <div className="relative z-10 mx-auto max-w-6xl">
                    {/* ── Header ── */}
                    <div className="mx-auto max-w-2xl text-center">
                        <span
                            data-impact-anim
                            className="inline-flex items-center gap-2 rounded-full border border-[#8168F0]/25 bg-[#8168F0]/8 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#8168F0]"
                            style={anim(0)}
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#8168F0]" />
                            Verified Impact
                        </span>

                        <h2
                            data-impact-anim
                            className="mt-7 text-[38px] font-black leading-[1.05] tracking-tight text-[#1b1f3b] sm:text-[52px]"
                            style={anim(0.08)}
                        >
                            Real numbers behind{" "}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: GRADIENT }}>
                                every frame
                            </span>
                        </h2>

                        <p
                            data-impact-anim
                            className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.8] text-[#4b5563]"
                            style={anim(0.16)}
                        >
                            Every cut, colour grade and audio mix is engineered for maximum
                            viewer retention — and the results speak louder than any pitch.
                        </p>
                    </div>

                    {/* ── Stats grid ── */}
                    <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {STATS.map((stat, i) => (
                            <StatCard key={stat.label} stat={stat} index={i} animate={visible} />
                        ))}
                    </div>

                    {/* ── Bottom band ── */}
                    <div
                        data-impact-anim
                        className="mt-16 overflow-hidden rounded-3xl border border-[#e6e7ec] bg-[#f6f7f9]"
                        style={anim(0.6)}
                    >
                        <div className="grid grid-cols-1 gap-10 p-8 sm:p-10 lg:grid-cols-2 lg:gap-12">
                            {/* Skills */}
                            <div>
                                <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#8a8fa3]">
                                    What goes into every project
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2.5">
                                    {SKILLS.map((skill) => (
                                        <span
                                            key={skill}
                                            className="impact-chip cursor-default rounded-full border border-[#e6e7ec] bg-white px-4 py-2 text-[14px] font-semibold text-[#4b5563]"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <p className="mt-8 text-[12px] font-bold uppercase tracking-[0.22em] text-[#8a8fa3]">
                                    Powered by
                                </p>
                                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-black uppercase tracking-widest text-[#8a8fa3]">
                                    {TOOLS.map((tool) => (
                                        <span key={tool}>{tool}</span>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col items-start justify-center gap-5 lg:items-end lg:text-right">
                                <p className="text-[21px] font-bold tracking-tight text-[#1b1f3b]">
                                    Want these numbers working for your channel?
                                </p>
                                <p className="max-w-sm text-[17px] leading-relaxed text-[#4b5563]">
                                    From viral YouTube edits to brand commercials — let's build
                                    something that performs.
                                </p>
                                <HashLink
                                    smooth
                                    to="/#contact"
                                    aria-label="Go to contact section"
                                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-[#141414] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 hover:bg-black hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
                                >
                                    <span className="relative z-10">Get In Touch</span>
                                    <svg
                                        className="relative z-10 h-5 w-5 transition-transform duration-500 group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </HashLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Impact;

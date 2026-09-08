import React, { useState, useEffect, useRef } from "react";

export default function ProfessionalServices({ onBookService }) {
    const [activeService, setActiveService] = useState(0);
    const sectionRef = useRef(null);

    const services = [
        {
            id: "01",
            key: "youtube",
            title: "YouTube Editing",
            tagline: "Retention-Engineered Narratives",
            desc: "High-retention video editing designed to maximize watch time. We map out precise pacing, integrate custom visual hooks, eliminate dead space, and build dynamic storylines that keep viewers glued to the screen from the first second to the final frame.",
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            ),
            metrics: { retention: "+42% Watch Time", delivery: "4K UHD Master", audio: "Stereo Mastered" },
            software: ["Premiere Pro", "After Effects", "Audition"],
            pipeline: ["A-Roll Tight Cut", "B-Roll Flow Mapping", "Sound Design Suite", "Color Match Grading"],
        },
        {
            id: "02",
            key: "shortform",
            title: "Short Form Content",
            tagline: "Algorithm-Snapping Micro-Edits",
            desc: "Turn passive scrolling into active engagement. Engineered specifically for TikTok, YouTube Shorts, and Instagram Reels, this service delivers high-impact kinetic typography, native sound trends, split-second pacing, and flawless loop structures.",
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            metrics: { retention: "98% Hook Rate", delivery: "9:16 Vertical HD", audio: "Loudness Optimized" },
            software: ["After Effects", "Premiere Pro", "CapCut Pro"],
            pipeline: ["3-Second Hook Tuning", "Kinetic Typography", "Sound FX Layering", "Smart Framing"],
        },
        {
            id: "03",
            key: "saas",
            title: "SaaS Explainer Videos",
            tagline: "High-Conversion Product Spotlights",
            desc: "Translate complex tech into elegant, understandable value propositions. We design premium platform product walkthroughs utilizing sleek UI zooming, custom cursor tracking, minimalist framing, and professional voiceover syncing to drive software sign-ups.",
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            metrics: { retention: "Product-Led Driven", delivery: "60 FPS Desktop HD", audio: "Professional VO" },
            software: ["After Effects", "ScreenStudio", "Figma"],
            pipeline: ["Script & Storyboard", "UI Clean-up Animation", "Cursor Motion Smooth", "Brand Accent Coloring"],
        },
        {
            id: "04",
            key: "documentary",
            title: "Documentary Editing",
            tagline: "Cinematic Long-Form Storytelling",
            desc: "Premium pacing engineered for investigative and documentary-style video content. We balance structural soundscapes, multi-cam archival footage synchronization, deep color grading matching, and cinematic pauses to evoke powerful user emotion.",
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
            ),
            metrics: { retention: "Cinematic Pacing", delivery: "4K DCI Cinematic", audio: "5.1 Surround" },
            software: ["DaVinci Resolve", "Premiere Pro", "After Effects"],
            pipeline: ["Archival Syncing", "Multi-Layer Soundscapes", "Film Grain & Grading", "Pacing & Tone Checks"],
        },
        {
            id: "05",
            key: "tutorial",
            title: "Tutorials & Walkthroughs",
            tagline: "Structured Educational Architecture",
            desc: "Clear, authoritative guide blueprints designed for technical execution. We emphasize crystal-clear screen recordings, automated spotlight focus tracking, structural chapter markers, and contextual graphic overlays to make learning completely friction-free.",
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            metrics: { retention: "Step-by-Step Focus", delivery: "1080p Crystal Clear", audio: "De-Noised Vocal" },
            software: ["Premiere Pro", "Camtasia Studio", "Photoshop"],
            pipeline: ["Audio Noise Cleanup", "Key-Command Popups", "On-Screen Zoom", "Interactive End Cards"],
        },
        {
            id: "06",
            key: "aivideo",
            title: "AI Generated Videos",
            tagline: "Prompt-to-Screen Visual Production",
            desc: "Fully AI-generated video content — from concept prompts to a finished, broadcast-ready cut. We build consistent characters, product scenes, and cinematic b-roll with generative models, then polish everything with color grading, sound design, and motion graphics.",
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
            ),
            metrics: { retention: "10x Faster Turnaround", delivery: "4K AI Upscaled", audio: "AI Voice + Foley" },
            software: ["Runway", "Kling / Veo", "Premiere Pro", "After Effects"],
            pipeline: ["Prompt & Style Board", "Generative Shot Creation", "Consistency & Cleanup", "Grade, Sound & Export"],
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const items = entry.target.querySelectorAll(".scroll-reveal");
                        items.forEach((item, i) => {
                            setTimeout(() => {
                                item.classList.add("revealed");
                            }, i * 120);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const currentService = services[activeService];

    // Handle Book Service Click — pre-fills the contact form with this service
    const handleBookService = () => {
        if (typeof onBookService === "function") {
            onBookService({ value: currentService.key, name: currentService.title });
        }

        requestAnimationFrame(() => {
            document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    };

    return (
        <>
            <section
                ref={sectionRef}
                id="services"
                className="relative w-full overflow-hidden bg-[#f6f7f9] px-5 pt-32 pb-24 text-[#1b1f3b] sm:px-10 md:pt-40 md:pb-32 lg:px-16 xl:px-24"
            >
                {/* Top Blend */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-40 z-[2]"
                    style={{
                        background: "linear-gradient(to bottom, #f6f7f9 0%, rgba(250,248,255,0.7) 50%, transparent 100%)",
                    }}
                />
                {/* Bottom Blend */}
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-[2]"
                    style={{
                        background: "linear-gradient(to top, #f6f7f9 0%, rgba(250,248,255,0.7) 50%, transparent 100%)",
                    }}
                />

                {/* Ambient Glows */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="orb-glow orb-1 absolute -top-40 left-[-15%] h-[600px] w-[600px] rounded-full bg-[#8168F0]/5 blur-[150px]" />
                    <div className="orb-glow orb-2 absolute bottom-0 right-[-15%] h-[600px] w-[600px] rounded-full bg-[#B296FE]/5 blur-[150px]" />
                    <div className="orb-glow orb-3 absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#8b5cf6]/4 blur-[120px]" />
                </div>

                {/* Floating Particles */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="particle absolute rounded-full bg-[#8b5cf6]"
                            style={{
                                width: `${2 + Math.random() * 4}px`,
                                height: `${2 + Math.random() * 4}px`,
                                left: `${5 + Math.random() * 90}%`,
                                top: `${5 + Math.random() * 90}%`,
                                animationDelay: `${i * 1.5}s`,
                                animationDuration: `${8 + Math.random() * 6}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 mx-auto max-w-7xl">
                    {/* ===== HEADER ===== */}
                    <div className="mb-14 flex flex-col items-center space-y-7 text-center">
                        <div className="scroll-reveal group inline-flex items-center gap-2.5 rounded-full border border-[#8168F0]/25 bg-[#8168F0]/8 px-6 py-3 backdrop-blur-md transition-all duration-500 hover:border-[#8168F0]/40 hover:bg-[#8168F0]/12">
                            <span className="pulse-dot h-2 w-2 rounded-full bg-[#8168F0] shadow-[0_0_10px_rgba(98,59,253,0.5)]" />
                            <span className="text-[15px] font-semibold uppercase tracking-[0.15em] text-[#8168F0]">
                                My Expertise
                            </span>
                        </div>

                        <h2 className="scroll-reveal text-[36px] font-extrabold leading-[1.1] tracking-tight text-[#1b1f3b] sm:text-[48px] md:text-[58px] lg:text-[68px]">
                            Professional{" "}
                            <span className="heading-gradient inline-block bg-gradient-to-r from-[#8168F0] via-[#8b5cf6] to-[#9D6BFF] bg-clip-text text-transparent">
                                Services
                            </span>
                        </h2>

                        <p className="scroll-reveal max-w-2xl text-[17px] leading-[1.8] text-[#4b5563]">
                            End-to-end video production solutions tailored to elevate your brand
                            and captivate audiences across every platform and format.
                        </p>
                    </div>

                    {/* ===== STATS STRIP ===== */}
                    <div className="scroll-reveal mx-auto mb-16 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
                        {[
                            { value: `${services.length}`, label: "Services" },
                            { value: "200+", label: "Projects" },
                            { value: "24h", label: "Response" },
                            { value: "98%", label: "Satisfaction" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-[#e6e7ec] bg-white px-4 py-4 text-center transition-all duration-500 hover:border-[#8168F0]/30 hover:shadow-[0_12px_30px_rgba(27,31,59,0.06)]"
                            >
                                <p className="text-[24px] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#8168F0] to-[#8b5cf6]">
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8a8fa3]">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* ===== SERVICES MATRIX ===== */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                        {/* LEFT: Service Selector */}
                        <div className="scroll-reveal flex flex-col gap-3 lg:col-span-5">
                            <p className="mb-1 px-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8a8fa3]">
                                {services.length} Services
                            </p>
                            {services.map((service, index) => {
                                const isSelected = activeService === index;
                                return (
                                    <button
                                        key={service.id}
                                        onClick={() => setActiveService(index)}
                                        className={`service-item group relative w-full overflow-hidden rounded-2xl border px-4 py-4 text-left outline-none sm:px-5 ${isSelected
                                            ? "border-[#8168F0]/40 bg-white shadow-[0_16px_44px_rgba(27,31,59,0.08)]"
                                            : "border-[#e6e7ec] bg-white/60 hover:border-[#8168F0]/25 hover:bg-white"
                                            }`}
                                    >
                                        {/* Active accent bar */}
                                        <div
                                            className={`absolute left-0 top-1/2 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-[#8168F0] to-[#8b5cf6] transition-all duration-500 ease-out ${isSelected ? "h-12 opacity-100" : "h-0 opacity-0"
                                                }`}
                                        />

                                        <div className="relative flex items-center gap-4">
                                            {/* Icon Container */}
                                            <div
                                                className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 ease-out ${isSelected
                                                    ? "border-transparent bg-gradient-to-br from-[#8168F0] to-[#8b5cf6] text-white shadow-[0_8px_20px_rgba(98,59,253,0.28)]"
                                                    : "border-[#e6e7ec] bg-[#f6f7f9] text-[#8a8fa3] group-hover:border-[#8168F0]/30 group-hover:text-[#8168F0]"
                                                    }`}
                                            >
                                                <div className="h-5 w-5">{service.icon}</div>
                                            </div>

                                            {/* Text */}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`font-mono text-[12px] font-bold transition-colors duration-500 ${isSelected ? "text-[#8168F0]" : "text-[#b6b9c6]"
                                                            }`}
                                                    >
                                                        {service.id}
                                                    </span>
                                                    <h3
                                                        className={`truncate text-[17px] font-bold tracking-tight transition-colors duration-500 sm:text-[18px] ${isSelected ? "text-[#1b1f3b]" : "text-[#4b5563] group-hover:text-[#1b1f3b]"
                                                            }`}
                                                    >
                                                        {service.title}
                                                    </h3>
                                                </div>
                                                <p className="mt-0.5 truncate text-[13px] text-[#8a8fa3]">
                                                    {service.tagline}
                                                </p>
                                            </div>

                                            {/* Chevron */}
                                            <svg
                                                className={`h-4 w-4 shrink-0 transition-all duration-500 ${isSelected
                                                    ? "text-[#8168F0] opacity-100"
                                                    : "-translate-x-1 text-[#c8cad4] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                                    }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* RIGHT: Execution Panel */}
                        <div className="scroll-reveal lg:col-span-7">
                            <div
                                key={activeService}
                                className="panel-fade-in relative flex min-h-[680px] flex-col overflow-hidden rounded-3xl border border-[#e6e7ec] bg-white p-6 shadow-[0_25px_60px_rgba(27,31,59,0.1)] backdrop-blur-2xl sm:p-8 md:p-10"
                            >
                                {/* Decorative gradient top line */}
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8168F0] to-transparent" />

                                {/* Decorative corner glows */}
                                <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#8168F0]/4 blur-[100px] panel-glow-1" />
                                <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#B296FE]/4 blur-[100px] panel-glow-2" />

                                {/* Ghost numeral watermark */}
                                <span className="pointer-events-none absolute -top-4 right-4 select-none text-[120px] font-black leading-none text-[#8168F0]/[0.06] sm:text-[150px]">
                                    {currentService.id}
                                </span>

                                {/* ===== TOP: Header ===== */}
                                <div className="relative">
                                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e6e7ec] pb-8">
                                        <div className="flex items-start gap-5">
                                            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8168F0] to-[#8b5cf6] text-white shadow-[0_12px_28px_rgba(98,59,253,0.28)]">
                                                <div className="h-8 w-8">{currentService.icon}</div>
                                                <div className="absolute inset-0 rounded-2xl icon-shimmer" />
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8168F0]">
                                                    {currentService.tagline}
                                                </p>
                                                <h4 className="mt-1.5 text-[26px] font-extrabold tracking-tight text-[#1b1f3b] sm:text-[32px]">
                                                    {currentService.title}
                                                </h4>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-4 py-2">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.7)] pulse-dot" />
                                            <span className="text-[12px] font-semibold uppercase tracking-wider text-emerald-600">
                                                Available Now
                                            </span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="fade-in-up mt-7 text-[17px] leading-[1.8] text-[#4b5563]">
                                        {currentService.desc}
                                    </p>
                                </div>

                                {/* ===== PRODUCTION TARGETS (stat strip) ===== */}
                                <div className="my-9 grid grid-cols-1 gap-3 border-t border-[#e6e7ec] pt-9 sm:grid-cols-3">
                                    {[
                                        { label: "Performance", value: currentService.metrics.retention, highlight: true },
                                        { label: "Export Spec", value: currentService.metrics.delivery, highlight: false },
                                        { label: "Audio Master", value: currentService.metrics.audio, highlight: false },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="metric-card rounded-xl border border-[#e6e7ec] bg-[#f6f7f9] p-4"
                                            style={{ animationDelay: `${150 + i * 90}ms` }}
                                        >
                                            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8a8fa3]">
                                                {item.label}
                                            </p>
                                            <p
                                                className={`mt-1.5 text-[16px] font-bold leading-snug ${item.highlight ? "text-[#8168F0]" : "text-[#1b1f3b]"
                                                    }`}
                                            >
                                                {item.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* ===== WORKFLOW PIPELINE ===== */}
                                <div className="fade-in-up" style={{ animationDelay: "250ms" }}>
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#8168F0]/25 bg-gradient-to-br from-[#8168F0]/12 to-transparent text-[#8168F0]">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8a8fa3]">
                                                Process
                                            </p>
                                            <p className="text-[16px] font-bold text-[#1b1f3b]">
                                                Workflow Pipeline
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        {currentService.pipeline.map((step, i) => (
                                            <li
                                                key={i}
                                                className="pipeline-item group flex items-center gap-3.5 rounded-xl border border-[#e6e7ec] bg-[#f6f7f9] p-3.5 text-[15px] text-[#4b5563] transition-all duration-500 hover:border-[#8168F0]/30 hover:bg-white"
                                                style={{ animationDelay: `${350 + i * 90}ms` }}
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#8168F0] to-[#8b5cf6] text-[13px] font-bold text-white">
                                                    {i + 1}
                                                </div>
                                                <span className="flex-1 transition-colors duration-500 group-hover:text-[#1b1f3b]">
                                                    {step}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* ===== BOTTOM: Tech Stack + CTA ===== */}
                                <div className="mt-auto border-t border-[#e6e7ec] pt-9">
                                    <div className="mb-6 fade-in-up" style={{ animationDelay: "500ms" }}>
                                        <p className="mb-4 text-[14px] font-bold uppercase tracking-widest text-[#1b1f3b]">
                                            Tech Stack
                                        </p>
                                        <div className="flex flex-wrap gap-2.5">
                                            {currentService.software.map((tool, i) => (
                                                <span
                                                    key={i}
                                                    className="tech-pill inline-flex items-center gap-2 rounded-xl border border-[#e6e7ec] bg-[#f6f7f9] px-4 py-2 text-[14px] font-semibold text-[#4b5563] backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-[#8168F0]/40 hover:bg-[#8168F0]/8 hover:text-[#8168F0] hover:shadow-[0_5px_18px_rgba(98,59,253,0.14)]"
                                                    style={{ animationDelay: `${600 + i * 80}ms` }}
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#8168F0] shadow-[0_0_6px_rgba(98,59,253,0.8)]" />
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <div className="flex flex-wrap items-center justify-between gap-4 fade-in-up" style={{ animationDelay: "700ms" }}>
                                        <p className="text-[17px] text-[#4b5563]">
                                            Ready to start your project?
                                        </p>
                                        <button
                                            onClick={handleBookService}
                                            className="cta-premium group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-[#141414] px-8 py-4 text-[16px] font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 hover:bg-black hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
                                        >
                                            <span className="relative z-10">Book This Service</span>
                                            <svg
                                                className="relative z-10 h-5 w-5 transition-transform duration-500 group-hover:translate-x-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
        /* ===== SCROLL REVEAL ===== */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 1s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== HEADING GRADIENT ===== */
        .heading-gradient {
          background-size: 300% 300%;
          animation: headingShift 6s ease-in-out infinite;
        }

        @keyframes headingShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* ===== PULSE DOT ===== */
        .pulse-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        /* ===== ORBS ===== */
        .orb-glow {
          animation: orbFloat 15s ease-in-out infinite;
        }
        .orb-1 { animation-delay: 0s; }
        .orb-2 { animation-delay: -5s; }
        .orb-3 { animation-delay: -10s; }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.08); }
          66% { transform: translate(-30px, 20px) scale(0.92); }
        }

        /* ===== PARTICLES ===== */
        .particle {
          opacity: 0.25;
          animation: particleDrift linear infinite;
        }

        @keyframes particleDrift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-140px) translateX(50px); opacity: 0; }
        }

        /* ===== SERVICE ITEMS ===== */
        .service-item {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                      background 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .service-item:hover {
          transform: translateX(4px);
        }

        /* ===== ICON SHIMMER ===== */
        .icon-shimmer {
          background: linear-gradient(
            135deg,
            transparent 30%,
            rgba(255, 255, 255, 0.15) 50%,
            transparent 70%
          );
          animation: iconShimmer 3s ease-in-out infinite;
        }

        @keyframes iconShimmer {
          0%, 100% { opacity: 0; transform: translateX(-100%); }
          50% { opacity: 1; transform: translateX(100%); }
        }

        /* ===== PANEL FADE-IN ===== */
        .panel-fade-in {
          animation: panelFadeIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes panelFadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        /* ===== PANEL GLOWS ===== */
        .panel-glow-1 {
          animation: panelGlow1 10s ease-in-out infinite;
        }

        .panel-glow-2 {
          animation: panelGlow2 12s ease-in-out infinite;
        }

        @keyframes panelGlow1 {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }

        @keyframes panelGlow2 {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.12); }
        }

        /* ===== FADE-IN-UP ===== */
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ===== PIPELINE ITEMS ===== */
        .pipeline-item {
          opacity: 0;
          transform: translateX(-15px);
          animation: pipelineSlide 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes pipelineSlide {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* ===== METRIC CARDS ===== */
        .metric-card {
          opacity: 0;
          transform: translateY(15px);
          animation: metricReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes metricReveal {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ===== TECH PILLS ===== */
        .tech-pill {
          opacity: 0;
          transform: scale(0.9);
          animation: pillPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes pillPop {
          from {
            opacity: 0;
            transform: scale(0.85) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* ===== CTA PREMIUM ===== */
        .cta-premium::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.25),
            transparent
          );
          animation: shimmerCta 3.5s ease-in-out infinite;
        }

        .cta-premium::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.4), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .cta-premium:hover::after {
          opacity: 1;
        }

        @keyframes shimmerCta {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }

        /* ===== REDUCED MOTION ===== */
        @media (prefers-reduced-motion: reduce) {
          .scroll-reveal,
          .heading-gradient,
          .pulse-dot,
          .orb-glow,
          .particle,
          .panel-fade-in,
          .panel-glow-1,
          .panel-glow-2,
          .fade-in-up,
          .pipeline-item,
          .metric-card,
          .tech-pill,
          .icon-shimmer,
          .cta-premium::before,
          .service-item {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
        </>
    );
}
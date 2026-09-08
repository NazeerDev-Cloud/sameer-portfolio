import React, { useEffect, useRef, useState } from 'react';

// ── Brand Palette (light / Hostinger-style) ──
const COLORS = {
    bg: '#ffffff',
    surface: '#f6f7f9',
    left: '#8168F0',
    mid: '#7C5CFF',
    right: '#8b5cf6',
    text: '#1b1f3b',
    muted: '#6b7280',
};

const GRADIENT = `linear-gradient(135deg, ${COLORS.left} 0%, ${COLORS.right} 60%, ${COLORS.mid} 100%)`;

const steps = [
    {
        phase: '01',
        title: 'Send Footage',
        desc: 'Upload your raw files securely through cloud storage for review.',
        icon: (
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L8 8m4-4l4 4M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
            </svg>
        ),
    },
    {
        phase: '02',
        title: 'Editing & Storytelling',
        desc: 'We cut, structure, enhance pacing, sound design, and visual flow.',
        icon: (
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9a3 3 0 100-6 3 3 0 000 6zm0 12a3 3 0 100-6 3 3 0 000 6zM8.7 8.7L20 20M8.7 15.3L20 4" />
            </svg>
        ),
    },
    {
        phase: '03',
        title: 'Revisions',
        desc: 'Receive draft delivery with revision rounds for refinement.',
        icon: (
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5v5h5M20 19v-5h-5M19 9A8 8 0 006 5.3L4 7m1 8a8 8 0 0013 3.7l2-1.7" />
            </svg>
        ),
    },
    {
        phase: '04',
        title: 'Final Delivery',
        desc: 'Final polished exports delivered in all required formats.',
        icon: (
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

export default function WorkflowPipeline() {
    const containerRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.15 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{`
                @keyframes wfFadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes wfNodePulse {
                    0%, 100% { box-shadow: 0 0 0 0 ${COLORS.left}26, 0 14px 34px -14px ${COLORS.left}55; }
                    50%      { box-shadow: 0 0 0 6px ${COLORS.left}12, 0 14px 34px -14px ${COLORS.left}55; }
                }
                @keyframes wfFloat {
                    0%, 100% { transform: translate(0, 0); }
                    50%      { transform: translate(20px, -16px); }
                }
                .wf-node { animation: wfNodePulse 3.4s ease-in-out infinite; }
                .wf-step:hover .wf-node {
                    transform: translateY(-4px) scale(1.05);
                    border-color: ${COLORS.mid};
                }
                .wf-text-gradient {
                    background: linear-gradient(135deg, ${COLORS.left} 0%, ${COLORS.right} 50%, ${COLORS.mid} 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                @media (prefers-reduced-motion: reduce) {
                    .wf-node, [data-wf-anim] { animation: none !important; }
                }
            `}</style>

            <section
                ref={containerRef}
                className="relative w-full overflow-hidden py-24 px-6 font-sans sm:px-12 lg:px-24"
                style={{ background: COLORS.bg, color: COLORS.text }}
            >
                {/* Ambient glows */}
                <div
                    className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full opacity-[0.09] blur-3xl"
                    style={{ background: COLORS.left, animation: 'wfFloat 12s ease-in-out infinite' }}
                />
                <div
                    className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full opacity-[0.09] blur-3xl"
                    style={{ background: COLORS.right, animation: 'wfFloat 14s ease-in-out infinite reverse' }}
                />

                <div className="relative z-10 mx-auto max-w-6xl">
                    {/* Header */}
                    <div
                        className="mb-20 text-center"
                        data-wf-anim
                        style={{
                            animation: visible ? 'wfFadeUp 0.7s ease forwards' : 'none',
                            opacity: 0,
                        }}
                    >
                        <span
                            className="mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em]"
                            style={{
                                background: `${COLORS.left}15`,
                                color: COLORS.mid,
                                border: `1px solid ${COLORS.left}30`,
                            }}
                        >
                            Workflow
                        </span>

                        <h2 className="text-4xl font-black tracking-tight sm:text-6xl" style={{ color: COLORS.text }}>
                            <span>Production </span>
                            <span className="wf-text-gradient">Cycle</span>
                        </h2>
                    </div>

                    {/* Timeline */}
                    <div className="relative flex flex-col gap-12 md:flex-row md:items-start md:gap-0">
                        {steps.map((step, i) => (
                            <div
                                key={step.phase}
                                className="wf-step group relative flex flex-1 flex-col items-center text-center md:px-3"
                                data-wf-anim
                                style={{
                                    animation: visible
                                        ? `wfFadeUp 0.6s ease forwards ${i * 0.14 + 0.15}s`
                                        : 'none',
                                    opacity: 0,
                                }}
                            >
                                {/* Connector line + arrow (desktop) */}
                                {i < steps.length - 1 && (
                                    <div
                                        className="pointer-events-none absolute top-10 left-1/2 hidden h-px w-full md:block"
                                        style={{
                                            background: `linear-gradient(90deg, ${COLORS.left}66, ${COLORS.left}1f)`,
                                        }}
                                    >
                                        <svg
                                            className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke={COLORS.left}
                                            strokeWidth="2.5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                )}

                                {/* Node */}
                                <div className="relative">
                                    <div
                                        className="wf-node relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-500"
                                        style={{
                                            background: COLORS.surface,
                                            border: `1.5px solid ${COLORS.left}55`,
                                        }}
                                    >
                                        <div className="h-8 w-8" style={{ color: COLORS.mid }}>
                                            {step.icon}
                                        </div>
                                    </div>

                                    {/* Number badge */}
                                    <span
                                        className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-black"
                                        style={{
                                            background: GRADIENT,
                                            color: COLORS.bg,
                                            boxShadow: `0 4px 14px ${COLORS.left}66`,
                                        }}
                                    >
                                        {i + 1}
                                    </span>
                                </div>

                                {/* Text */}
                                <h3 className="mt-7 text-[21px] font-bold" style={{ color: COLORS.text }}>
                                    {step.title}
                                </h3>
                                <p
                                    className="mt-2 max-w-[16rem] text-[17px] leading-relaxed"
                                    style={{ color: COLORS.muted }}
                                >
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

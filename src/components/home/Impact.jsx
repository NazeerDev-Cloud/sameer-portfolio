import React, { useEffect, useRef, useState } from 'react';
import { HashLink } from 'react-router-hash-link';

// ── Brand Palette ──
const COLORS = {
    bg: '#080B29',
    left: '#623BFD',
    mid: '#D4C8FE',
    right: '#B296FE',
};

const GRADIENT = `linear-gradient(135deg, ${COLORS.left} 0%, ${COLORS.right} 60%, ${COLORS.mid} 100%)`;

// ── Count-up Hook ──
const useCountUp = (target, duration = 2000, start = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;

            const progress = Math.min(
                (timestamp - startTime) / duration,
                1
            );

            setCount(Math.floor(progress * target));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [target, duration, start]);

    return count;
};

// ── Stat Card ──
const StatCard = ({
    value,
    suffix,
    label,
    sublabel,
    icon,
    index,
    animate,
}) => {
    const count = useCountUp(value, 1800, animate);
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative cursor-default overflow-hidden rounded-2xl border p-6 transition-all duration-500"
            style={{
                background: hovered
                    ? `${COLORS.left}12`
                    : 'rgba(255,255,255,0.02)',
                borderColor: hovered
                    ? `${COLORS.left}55`
                    : 'rgba(255,255,255,0.07)',
                boxShadow: hovered
                    ? `0 0 30px ${COLORS.left}18`
                    : 'none',
                animation: animate
                    ? `fadeSlideUp 0.7s ease forwards ${index * 0.12 + 0.5}s`
                    : 'none',
                opacity: 0,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Top accent line */}
            <div
                className="absolute top-0 left-0 h-[2px] transition-all duration-700"
                style={{
                    width: hovered ? '100%' : '0%',
                    background: GRADIENT,
                }}
            />

            {/* Glow blob */}
            <div
                className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full blur-2xl transition-opacity duration-500"
                style={{
                    background: COLORS.left,
                    opacity: hovered ? 0.12 : 0,
                }}
            />

            {/* Icon */}
            <div
                className="mb-4 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-base"
                style={{
                    background: `${COLORS.left}18`,
                    border: `1px solid ${COLORS.left}35`,
                }}
            >
                {icon}
            </div>

            {/* Number */}
            <p className="text-4xl font-black leading-none tracking-tight text-white xl:text-5xl">
                {animate ? count : 0}
                <span style={{ color: COLORS.right }}>{suffix}</span>
            </p>

            {/* Label */}
            <p
                className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em]"
                style={{ color: COLORS.right }}
            >
                {label}
            </p>

            {sublabel && (
                <p className="mt-1 font-sans text-[10px] normal-case tracking-normal text-gray-600">
                    {sublabel}
                </p>
            )}
        </div>
    );
};

// ── Timeline Mockup ──
const TimelineMockup = () => {
    const tracks = [
        {
            color: COLORS.left,
            width: '80%',
            delay: '0s',
            label: 'V1',
            name: 'Hero_Sequence',
        },
        {
            color: COLORS.right,
            width: '60%',
            delay: '0.15s',
            label: 'V2',
            name: 'BRoll_Cuts',
        },
        {
            color: COLORS.mid,
            width: '75%',
            delay: '0.08s',
            label: 'V3',
            name: 'Overlay_FX',
        },
        {
            color: COLORS.left,
            width: '50%',
            delay: '0.25s',
            label: 'A1',
            name: 'Score_Main',
        },
        {
            color: COLORS.right,
            width: '65%',
            delay: '0.18s',
            label: 'A2',
            name: 'SFX_Layer',
        },
        {
            color: COLORS.mid,
            width: '45%',
            delay: '0.3s',
            label: 'A3',
            name: 'VO_Clean',
        },
    ];

    return (
        <div
            className="relative h-full w-full overflow-hidden border"
            style={{
                borderRadius: '28px',
                borderColor: `${COLORS.left}35`,
                background: '#0A0C2E',
                boxShadow: `0 20px 80px ${COLORS.left}25`,
            }}
        >
            {/* Header bar */}
            <div
                className="flex items-center gap-2 border-b px-4 py-3"
                style={{
                    background: '#0D0F35',
                    borderColor: `${COLORS.left}20`,
                }}
            >
                <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <div className="h-3 w-3 rounded-full bg-[#27c93f]" />

                <div className="ml-4">
                    <div
                        className="rounded-md px-3 py-1"
                        style={{
                            background: `${COLORS.left}18`,
                            border: `1px solid ${COLORS.left}35`,
                        }}
                    >
                        <span
                            className="text-[9px] font-bold uppercase tracking-widest"
                            style={{ color: COLORS.mid }}
                        >
                            Client_Final_v3.prproj
                        </span>
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-3">
                    <div
                        className="h-1.5 w-20 overflow-hidden rounded-full"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                    >
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: '72%',
                                background: GRADIENT,
                                animation:
                                    'progressPulse 2s ease-in-out infinite',
                            }}
                        />
                    </div>

                    <span
                        className="font-mono text-[9px]"
                        style={{ color: COLORS.right }}
                    >
                        72%
                    </span>
                </div>
            </div>

            {/* Timecode row */}
            <div
                className="flex items-center gap-4 border-b px-4 pt-2 pb-2"
                style={{
                    background: '#090B28',
                    borderColor: 'rgba(255,255,255,0.04)',
                }}
            >
                <span
                    className="rounded border px-2 py-0.5 font-mono text-[11px] tracking-widest"
                    style={{
                        color: COLORS.mid,
                        background: `${COLORS.left}12`,
                        borderColor: `${COLORS.left}30`,
                    }}
                >
                    00:01:42:08
                </span>

                <div className="flex flex-1 items-end gap-4 overflow-hidden">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-shrink-0 flex-col items-center gap-0.5"
                        >
                            <span className="font-mono text-[7px] text-gray-700">
                                {String(i * 10).padStart(2, '0')}s
                            </span>

                            <div
                                className="w-px"
                                style={{
                                    height: i % 2 === 0 ? '12px' : '6px',
                                    background:
                                        i % 2 === 0 ? '#374151' : '#1f2937',
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Tracks */}
            <div className="relative">
                {tracks.map((track, i) => (
                    <div
                        key={i}
                        className="relative flex h-9 border-b"
                        style={{
                            background: i % 2 === 0 ? '#090B28' : '#0A0C2E',
                            borderColor: 'rgba(255,255,255,0.03)',
                        }}
                    >
                        {/* Label */}
                        <div
                            className="flex w-16 flex-shrink-0 items-center gap-1.5 border-r px-2"
                            style={{
                                background: '#0B0D30',
                                borderColor: 'rgba(255,255,255,0.04)',
                            }}
                        >
                            <span
                                className="font-mono text-[8px] font-bold"
                                style={{ color: track.color }}
                            >
                                {track.label}
                            </span>

                            <span className="hidden truncate text-[7px] text-gray-700 lg:block">
                                {track.name}
                            </span>
                        </div>

                        {/* Clip */}
                        <div className="relative flex flex-1 items-center overflow-hidden px-1">
                            <div
                                className="relative h-7 overflow-hidden rounded"
                                style={{
                                    width: track.width,
                                    background: `linear-gradient(90deg, ${track.color}20, ${track.color}38)`,
                                    borderLeft: `2px solid ${track.color}`,
                                    borderTop: `1px solid ${track.color}50`,
                                    animation: `expandWidth 1.4s ease forwards ${track.delay}`,
                                    maxWidth: '100%',
                                }}
                            >
                                {/* Waveform */}
                                <div className="flex h-full items-center gap-[1.5px] px-1.5">
                                    {Array.from({ length: 35 }).map((_, j) => (
                                        <div
                                            key={j}
                                            className="w-[1.5px] flex-shrink-0 rounded-full"
                                            style={{
                                                height: `${Math.abs(
                                                    Math.sin(j * 0.7 + i)
                                                ) *
                                                    50 +
                                                    20
                                                    }%`,
                                                background: track.color,
                                                opacity: 0.5,
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Playhead */}
                <div
                    className="pointer-events-none absolute top-0 bottom-0 z-20"
                    style={{
                        left: '40%',
                        animation:
                            'playheadMove 6s ease-in-out infinite alternate',
                    }}
                >
                    <div
                        className="relative h-full w-[2px]"
                        style={{
                            background: COLORS.mid,
                            boxShadow: `0 0 10px ${COLORS.mid}60`,
                        }}
                    >
                        <div
                            className="absolute top-0 left-1/2 h-0 w-0 -translate-x-1/2 border-t-[8px] border-r-[5px] border-l-[5px] border-r-transparent border-l-transparent"
                            style={{ borderTopColor: COLORS.mid }}
                        />

                        <div
                            className="absolute top-0 left-3 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[8px] font-black"
                            style={{
                                background: COLORS.mid,
                                color: COLORS.bg,
                            }}
                        >
                            01:42:08
                        </div>
                    </div>
                </div>
            </div>

            {/* Available Badge */}
            <div
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border px-4 py-2.5 backdrop-blur-sm"
                style={{
                    background: `${COLORS.bg}ee`,
                    borderColor: `${COLORS.left}35`,
                }}
            >
                <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#27c93f] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </span>

                <div>
                    <p className="text-[11px] font-bold tracking-wide text-white">
                        Available for Work
                    </p>

                    <p
                        className="text-[9px] tracking-wide"
                        style={{ color: COLORS.right }}
                    >
                        Slots open — Q1 2025
                    </p>
                </div>
            </div>

            {/* Render Badge */}
            <div
                className="absolute right-4 bottom-4 flex items-center gap-2 rounded-xl border px-3 py-2 backdrop-blur-sm"
                style={{
                    background: `${COLORS.left}12`,
                    borderColor: `${COLORS.left}35`,
                }}
            >
                <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                        background: COLORS.mid,
                        animation:
                            'progressPulse 1.5s ease-in-out infinite',
                    }}
                />

                <span
                    className="text-[9px] font-bold uppercase tracking-widest"
                    style={{ color: COLORS.mid }}
                >
                    Rendering
                </span>
            </div>

            {/* Corner glow */}
            <div
                className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full blur-3xl"
                style={{
                    background: COLORS.left,
                    opacity: 0.1,
                }}
            />
        </div>
    );
};

// ══════════════════════════════════════════
//  IMPACT — Main Component
// ══════════════════════════════════════════
const Impact = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    const stats = [
        {
            value: 200,
            suffix: '+',
            icon: '🎬',
            label: 'Projects Delivered',
            sublabel: 'YouTube, Ads & Films',
        },
        {
            value: 60,
            suffix: '+',
            icon: '🤝',
            label: 'Happy Clients',
            sublabel: 'Global brands & creators',
        },
        {
            value: 3,
            suffix: 'YR',
            icon: '⚡',
            label: 'Years in the Craft',
            sublabel: 'Sharpening every frame',
        },
        {
            value: 600,
            suffix: '+',
            icon: '✂️',
            label: 'Videos Edited',
            sublabel: 'Raw footage → cinematic',
        },
    ];

    const skills = [
        'Color Grading',
        'Motion Graphics',
        'Sound Design',
        'VFX Compositing',
        'Storytelling',
    ];

    const tools = [
        'Premiere Pro',
        'After Effects',
        'DaVinci Resolve',
        'Blender',
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{`
                @keyframes fadeSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeSlideLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-40px);
                    }

                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeSlideRight {
                    from {
                        opacity: 0;
                        transform: translateX(40px);
                    }

                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes expandWidth {
                    from {
                        width: 0;
                    }
                }

                @keyframes playheadMove {
                    from {
                        left: 10%;
                    }

                    to {
                        left: 88%;
                    }
                }

                @keyframes shimmer {
                    0% {
                        background-position: -300% center;
                    }

                    100% {
                        background-position: 300% center;
                    }
                }

                @keyframes floatY {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }

                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes progressPulse {
                    0%,
                    100% {
                        opacity: 1;
                    }

                    50% {
                        opacity: 0.4;
                    }
                }

                @keyframes rotateSlow {
                    from {
                        transform: rotate(0deg);
                    }

                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes borderGlow {
                    0%,
                    100% {
                        box-shadow: 0 0 25px rgba(98, 59, 253, 0.25);
                    }

                    50% {
                        box-shadow: 0 0 50px rgba(178, 150, 254, 0.2);
                    }
                }
            `}</style>

            <section
                ref={sectionRef}
                className="relative w-full select-none overflow-hidden px-6 py-28 font-sans text-white md:py-44 sm:px-12 lg:px-24"
                style={{ background: COLORS.bg }}
            >
                {/* Corner Gradient Glows */}
                <div
                    className="pointer-events-none absolute top-0 left-0 h-[600px] w-[600px]"
                    style={{
                        background: `radial-gradient(ellipse at top left, ${COLORS.left}28 0%, transparent 65%)`,
                    }}
                />

                <div
                    className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px]"
                    style={{
                        background: `radial-gradient(ellipse at top right, ${COLORS.right}18 0%, transparent 65%)`,
                    }}
                />

                <div
                    className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px]"
                    style={{
                        background: `radial-gradient(ellipse at bottom left, ${COLORS.right}12 0%, transparent 65%)`,
                    }}
                />

                <div
                    className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px]"
                    style={{
                        background: `radial-gradient(ellipse at bottom right, ${COLORS.left}20 0%, transparent 65%)`,
                    }}
                />

                <div
                    className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2"
                    style={{
                        background: `radial-gradient(ellipse at center, ${COLORS.left}0e 0%, transparent 70%)`,
                        animation: 'floatY 10s ease-in-out infinite',
                    }}
                />

                {/* Background Grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(${COLORS.left} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.left} 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Rotating Rings */}
                <div
                    className="pointer-events-none absolute top-20 right-20 hidden h-44 w-44 rounded-full border xl:block"
                    style={{
                        borderColor: `${COLORS.left}15`,
                        animation: 'rotateSlow 25s linear infinite',
                    }}
                >
                    <div
                        className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
                        style={{ background: COLORS.left }}
                    />
                </div>

                <div
                    className="pointer-events-none absolute bottom-20 left-20 hidden h-28 w-28 rounded-full border xl:block"
                    style={{
                        borderColor: `${COLORS.right}15`,
                        animation: 'rotateSlow 18s linear infinite reverse',
                    }}
                >
                    <div
                        className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                        style={{ background: COLORS.right }}
                    />
                </div>

                {/* Top Left Tool Node */}
                <div
                    className="absolute top-24 left-6 hidden h-14 w-14 animate-bounce items-center justify-center rounded-2xl border backdrop-blur-xl md:flex lg:left-12"
                    style={{
                        background: `${COLORS.left}10`,
                        borderColor: `${COLORS.left}25`,
                        boxShadow: `0 8px 32px ${COLORS.left}15`,
                        animationDuration: '4s',
                    }}
                >
                    <svg
                        className="h-7 w-7"
                        fill="none"
                        stroke={COLORS.right}
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        style={{
                            filter: `drop-shadow(0 0 6px ${COLORS.right}60)`,
                        }}
                    >
                        <circle cx="6" cy="6" r="3" />
                        <circle cx="6" cy="18" r="3" />
                        <line x1="9.8" y1="8.5" x2="20" y2="17" />
                        <line x1="9.8" y1="15.5" x2="20" y2="7" />
                    </svg>
                </div>

                {/* Top Right Tool Node */}
                <div
                    className="absolute top-24 right-6 hidden h-14 w-14 animate-bounce items-center justify-center rounded-2xl border backdrop-blur-xl md:flex lg:right-12"
                    style={{
                        background: `${COLORS.left}10`,
                        borderColor: `${COLORS.left}25`,
                        boxShadow: `0 8px 32px ${COLORS.left}15`,
                        animationDuration: '5s',
                        animationDelay: '0.5s',
                    }}
                >
                    <svg
                        className="h-7 w-7"
                        fill="none"
                        stroke={COLORS.mid}
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        style={{
                            filter: `drop-shadow(0 0 6px ${COLORS.mid}60)`,
                        }}
                    >
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M2 7l4-4h3l-4 4M9 7l4-4h3l-4 4M16 7l4-4h2v2l-2 2" />
                    </svg>
                </div>

                {/* Bottom Left Tool Node */}
                <div
                    className="absolute bottom-16 left-6 hidden h-14 w-14 animate-bounce items-center justify-center rounded-2xl border backdrop-blur-xl md:flex lg:left-12"
                    style={{
                        background: `${COLORS.left}10`,
                        borderColor: `${COLORS.left}25`,
                        boxShadow: `0 8px 32px ${COLORS.left}15`,
                        animationDuration: '4.5s',
                        animationDelay: '1s',
                    }}
                >
                    <svg
                        className="h-7 w-7"
                        fill="none"
                        stroke={COLORS.right}
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        style={{
                            filter: `drop-shadow(0 0 6px ${COLORS.right}60)`,
                        }}
                    >
                        <path d="M23 7h-3l-2-3H6L4 7H1v13h22V7z" />
                        <circle cx="12" cy="13" r="4" />
                    </svg>
                </div>

                {/* Bottom Right Tool Node */}
                <div
                    className="absolute right-6 bottom-16 hidden h-14 w-14 animate-bounce items-center justify-center rounded-2xl border backdrop-blur-xl md:flex lg:right-12"
                    style={{
                        background: `${COLORS.left}10`,
                        borderColor: `${COLORS.left}25`,
                        boxShadow: `0 8px 32px ${COLORS.left}15`,
                        animationDuration: '5.5s',
                        animationDelay: '1.5s',
                    }}
                >
                    <svg
                        className="h-7 w-7"
                        fill="none"
                        stroke={COLORS.mid}
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        style={{
                            filter: `drop-shadow(0 0 6px ${COLORS.mid}60)`,
                        }}
                    >
                        <path d="M3 10v4M6 6v12M9 3v18M12 7v10M15 5v14M18 8v8M21 11v2" />
                    </svg>
                </div>

                {/* Main Grid */}
                <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
                    {/* LEFT — Timeline Mockup */}
                    <div
                        className="relative h-[420px] lg:col-span-6 md:h-[500px]"
                        style={{
                            animation: visible
                                ? 'fadeSlideLeft 0.9s ease forwards'
                                : 'none',
                            opacity: 0,
                        }}
                    >
                        {/* Glow ring */}
                        <div
                            className="pointer-events-none absolute -inset-3 rounded-[36px]"
                            style={{
                                animation: visible
                                    ? 'borderGlow 5s ease-in-out infinite'
                                    : 'none',
                            }}
                        />

                        <div
                            style={{
                                animation:
                                    'floatY 8s ease-in-out infinite',
                                height: '100%',
                            }}
                        >
                            <TimelineMockup />
                        </div>

                        {/* Dot grid bottom-left */}
                        <div className="pointer-events-none absolute -bottom-8 -left-8 grid grid-cols-5 gap-2 opacity-15">
                            {Array.from({ length: 25 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-1 w-1 rounded-full"
                                    style={{ background: COLORS.left }}
                                />
                            ))}
                        </div>

                        {/* Dot grid top-right */}
                        <div className="pointer-events-none absolute -top-6 -right-6 grid grid-cols-4 gap-1.5 opacity-10">
                            {Array.from({ length: 16 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-1 w-1 rounded-full"
                                    style={{ background: COLORS.right }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Text Content */}
                    <div className="flex flex-col items-start space-y-6 text-left lg:col-span-6">
                        {/* Label pill */}
                        <div
                            style={{
                                animation: visible
                                    ? 'fadeSlideRight 0.6s ease forwards 0.1s'
                                    : 'none',
                                opacity: 0,
                            }}
                        >
                            <span
                                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-sm"
                                style={{
                                    borderColor: `${COLORS.left}50`,
                                    background: `${COLORS.left}12`,
                                    color: COLORS.mid,
                                }}
                            >
                                <span
                                    className="h-1.5 w-1.5 rounded-full"
                                    style={{
                                        background: COLORS.mid,
                                        animation:
                                            'progressPulse 2s ease-in-out infinite',
                                    }}
                                />

                                Client Success
                            </span>
                        </div>

                        {/* Heading */}
                        <div
                            style={{
                                animation: visible
                                    ? 'fadeSlideRight 0.7s ease forwards 0.2s'
                                    : 'none',
                                opacity: 0,
                            }}
                        >
                            <h2 className="text-5xl font-black uppercase leading-none tracking-widest sm:text-6xl md:text-7xl">
                                <span className="text-white">Verified </span>

                                <span
                                    style={{
                                        background: GRADIENT,
                                        backgroundSize: '200% auto',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        animation: 'shimmer 5s linear infinite',
                                    }}
                                >
                                    Impact
                                </span>

                                <br />

                                <span
                                    className="text-3xl font-bold normal-case tracking-wide sm:text-4xl"
                                    style={{ color: COLORS.right }}
                                >
                                    — In Every Frame.
                                </span>
                            </h2>
                        </div>

                        {/* Description */}
                        <div
                            className="space-y-3"
                            style={{
                                animation: visible
                                    ? 'fadeSlideRight 0.6s ease forwards 0.35s'
                                    : 'none',
                                opacity: 0,
                            }}
                        >
                            <p className="max-w-lg font-sans text-sm leading-relaxed tracking-normal text-gray-400 normal-case">
                                Numbers don't lie — every cut, color grade, and
                                audio mix is engineered for{' '}
                                <span
                                    className="font-semibold"
                                    style={{ color: COLORS.mid }}
                                >
                                    maximum viewer retention
                                </span>{' '}
                                and emotional impact.
                            </p>

                            <p className="max-w-lg font-sans text-xs leading-relaxed tracking-normal text-gray-500 normal-case">
                                From viral YouTube edits to brand commercials —{' '}
                                <span
                                    className="font-semibold"
                                    style={{ color: COLORS.right }}
                                >
                                    the results speak louder
                                </span>
                                .
                            </p>
                        </div>

                        {/* Skill Tags */}
                        <div
                            className="flex flex-wrap gap-2"
                            style={{
                                animation: visible
                                    ? 'fadeSlideRight 0.6s ease forwards 0.45s'
                                    : 'none',
                                opacity: 0,
                            }}
                        >
                            {skills.map((tag) => (
                                <span
                                    key={tag}
                                    className="cursor-default rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
                                    style={{
                                        borderColor: `${COLORS.left}35`,
                                        color: COLORS.right,
                                        background: `${COLORS.left}10`,
                                    }}
                                    onMouseEnter={(event) => {
                                        event.currentTarget.style.background =
                                            `${COLORS.left}22`;

                                        event.currentTarget.style.borderColor =
                                            `${COLORS.left}70`;

                                        event.currentTarget.style.boxShadow =
                                            `0 0 12px ${COLORS.left}30`;

                                        event.currentTarget.style.color =
                                            COLORS.mid;
                                    }}
                                    onMouseLeave={(event) => {
                                        event.currentTarget.style.background =
                                            `${COLORS.left}10`;

                                        event.currentTarget.style.borderColor =
                                            `${COLORS.left}35`;

                                        event.currentTarget.style.boxShadow =
                                            'none';

                                        event.currentTarget.style.color =
                                            COLORS.right;
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Gradient Divider */}
                        <div
                            className="h-px w-full"
                            style={{
                                background: `linear-gradient(90deg, ${COLORS.left}, ${COLORS.right}, transparent)`,
                                animation: visible
                                    ? 'fadeSlideRight 0.6s ease forwards 0.5s'
                                    : 'none',
                                opacity: 0,
                            }}
                        />

                        {/* Stats Grid */}
                        <div className="grid w-full grid-cols-2 gap-4">
                            {stats.map((stat, i) => (
                                <StatCard
                                    key={i}
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    label={stat.label}
                                    sublabel={stat.sublabel}
                                    icon={stat.icon}
                                    index={i}
                                    animate={visible}
                                />
                            ))}
                        </div>

                        {/* Get In Touch Button */}
                        <div
                            className="flex flex-wrap items-center gap-4 pt-2"
                            style={{
                                animation: visible
                                    ? 'fadeSlideUp 0.6s ease forwards 1s'
                                    : 'none',
                                opacity: 0,
                            }}
                        >
                            <HashLink
                                smooth
                                to="/#contact"
                                aria-label="Go to contact section"
                                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 active:scale-95 md:text-sm"
                                style={{
                                    borderColor: `${COLORS.left}50`,
                                    background: '#0d0b2a',
                                    boxShadow: `0 4px 25px ${COLORS.left}30`,
                                }}
                            >
                                <span
                                    className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                                    style={{ background: GRADIENT }}
                                />

                                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#080B29]">
                                    Get In Touch

                                    <svg
                                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </span>
                            </HashLink>
                        </div>

                        {/* Tools Row */}
                        <div
                            className="w-full pt-2"
                            style={{
                                animation: visible
                                    ? 'fadeSlideUp 0.6s ease forwards 1.1s'
                                    : 'none',
                                opacity: 0,
                            }}
                        >
                            <p
                                className="mb-3 text-[10px] font-bold uppercase tracking-widest"
                                style={{ color: `${COLORS.right}60` }}
                            >
                                Powered By
                            </p>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-black uppercase tracking-widest">
                                {tools.map((tool) => (
                                    <span
                                        key={tool}
                                        className="cursor-default transition-all duration-300"
                                        style={{ color: '#4b5563' }}
                                        onMouseEnter={(event) => {
                                            event.currentTarget.style.color =
                                                COLORS.mid;
                                        }}
                                        onMouseLeave={(event) => {
                                            event.currentTarget.style.color =
                                                '#4b5563';
                                        }}
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Impact;
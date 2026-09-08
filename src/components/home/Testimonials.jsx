import React, { useCallback, useEffect, useRef, useState } from 'react';

// ── Brand Palette (light / Hostinger-style) ──
const COLORS = {
    bg: '#ffffff',
    surface: '#f6f7f9',
    border: '#e6e7ec',
    text: '#1b1f3b',
    textBody: '#4b5563',
    textMuted: '#8a8fa3',
    left: '#8168F0',
    mid: '#7C5CFF',
    right: '#8b5cf6',
};

const GRADIENT = `linear-gradient(135deg, ${COLORS.left} 0%, #7C5CFF 55%, #9D6BFF 100%)`;

const testimonials = [
    {
        id: 1,
        name: "Ahmed Hassan",
        role: "YouTube Creator",
        handle: "@ahmedhassan",
        subscribers: "1.2M Subs",
        metric: "+240%",
        metricLabel: "Retention Rate",
        text: "The pacing and narrative structure is absolutely unmatched. Since switching to their workflow, our AVD has skyrocketed past every benchmark. This isn't just editing, it's pure algorithmic engineering disguised as art.",
        tags: ["YouTube", "Long-Form"],
    },
    {
        id: 2,
        name: "Fatima Khan",
        role: "Founder, TechFlow",
        handle: "@techflowhq",
        subscribers: "SaaS Brand",
        metric: "$450K",
        metricLabel: "Launch Revenue",
        text: "We needed a premium explainer that didn't feel like a boring corporate deck. They delivered something cinematic and we converted at 3x our average rate on the very first launch.",
        tags: ["Brand", "Explainer"],
    },
    {
        id: 3,
        name: "Ali Raza",
        role: "Indie Filmmaker",
        handle: "@aliraza.films",
        subscribers: "Festival Circuit",
        metric: "🏆",
        metricLabel: "Award-Winning Edit",
        text: "Handing off raw A-roll and seeing it return with this level of cinematic color grading is mind-blowing. Every single frame is treated like fine art, not just footage.",
        tags: ["Film", "Color Grade"],
    },
    {
        id: 4,
        name: "Ayesha Malik",
        role: "Brand Coach",
        handle: "@ayeshacoaches",
        subscribers: "Personal Brand",
        metric: "15M+",
        metricLabel: "Combined Views",
        text: "Short-form is brutal but their Algorithm Snap Hook strategy works every single time. Raw dumps in, viral-ready assets out. The entire process is seamless from start to finish.",
        tags: ["Short-Form", "Reels"],
    },
    {
        id: 5,
        name: "Usman Sheikh",
        role: "E-Commerce Owner",
        handle: "@usmansheikh",
        subscribers: "DTC Brand",
        metric: "Sub $5",
        metricLabel: "Cost Per Acquisition",
        text: "The direct-response video ads they cut dropped our acquisition costs in half. The collaborative review process made dialing in the final tweaks completely frictionless.",
        tags: ["Ads", "Direct Response"],
    },
    {
        id: 6,
        name: "Zainab Ahmed",
        role: "Content Strategist",
        handle: "@zainabstrategy",
        subscribers: "Digital Agency",
        metric: "500%",
        metricLabel: "ROI Increase",
        text: "Working with them transformed how we deliver content to clients. The quality is consistently top-tier and turnaround times are incredibly fast. Our clients are absolutely thrilled with the results.",
        tags: ["Strategy", "B2B"],
    },
    {
        id: 7,
        name: "Hassan Mahmood",
        role: "Tech Reviewer",
        handle: "@hassantech",
        subscribers: "850K Subs",
        metric: "+180%",
        metricLabel: "Engagement Rate",
        text: "The technical precision combined with creative storytelling is what sets them apart. My review videos now have cinematic quality that rivals major tech channels. Subscriber growth has been phenomenal.",
        tags: ["Tech", "Reviews"],
    },
    {
        id: 8,
        name: "Sara Javed",
        role: "Fashion Influencer",
        handle: "@sarajaved",
        subscribers: "2.1M Followers",
        metric: "8M+",
        metricLabel: "Monthly Impressions",
        text: "They understand aesthetics at a level that's rare to find. Every edit captures the exact mood and vibe I'm going for. My engagement has tripled since we started collaborating.",
        tags: ["Fashion", "Lifestyle"],
    },
    {
        id: 9,
        name: "Bilal Khan",
        role: "Business Coach",
        handle: "@bilalkhanco",
        subscribers: "Professional",
        metric: "$1.2M",
        metricLabel: "Course Sales",
        text: "The promotional videos they created for my course launch were absolutely phenomenal. Clean, professional, and conversion-focused. Best investment I've made in my business this year.",
        tags: ["Education", "Sales"],
    },
    {
        id: 10,
        name: "Hina Tariq",
        role: "Food Content Creator",
        handle: "@hinacooks",
        subscribers: "600K Subs",
        metric: "95%",
        metricLabel: "Watch Through Rate",
        text: "The way they edit recipe videos makes every dish look absolutely irresistible. My audience retention has never been higher and sponsors are lining up. They truly understand food content.",
        tags: ["Food", "Tutorial"],
    },
    {
        id: 11,
        name: "Imran Siddiqui",
        role: "Real Estate Agent",
        handle: "@imranproperties",
        subscribers: "Local Market",
        metric: "300%",
        metricLabel: "Lead Generation",
        text: "Property showcase videos that actually sell. The drone footage integration and smooth transitions make every listing look premium. My closing rate has skyrocketed since using their services.",
        tags: ["Real Estate", "Commercial"],
    },
    {
        id: 12,
        name: "Maryam Ali",
        role: "Fitness Coach",
        handle: "@maryamfitness",
        subscribers: "1.5M Followers",
        metric: "22K",
        metricLabel: "New Clients",
        text: "High-energy workout videos that motivate and inspire. The editing pace matches the intensity of my training perfectly. Client sign-ups have gone through the roof thanks to their incredible work.",
        tags: ["Fitness", "Motivation"],
    },
];

// ── Star SVG ──
const Star = ({ color }) => (
    <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill={color}
        stroke={color}
        strokeWidth="1"
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

// ── Featured Testimonial Card ──
const FeaturedCard = ({ t }) => (
    <div
        className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[32px] border p-8 transition-all duration-500 sm:p-10"
        style={{
            background: '#ffffff',
            borderColor: `${COLORS.left}33`,
            boxShadow: `0 30px 70px -24px rgba(27,31,59,0.16)`,
        }}
    >
        {/* Glow blob */}
        <div
            className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full blur-3xl"
            style={{
                background: COLORS.left,
                opacity: 0.15,
            }}
        />

        <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full blur-3xl"
            style={{
                background: COLORS.right,
                opacity: 0.1,
            }}
        />

        {/* Giant quote mark */}
        <div
            className="pointer-events-none absolute top-2 right-8 select-none text-[120px] font-black leading-none"
            style={{
                color: COLORS.left,
                opacity: 0.08,
                fontFamily: 'Georgia, serif',
            }}
        >
            "
        </div>

        <div className="relative z-10 flex flex-col gap-6">
            {/* Top row — Client initials box removed */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-black uppercase tracking-widest text-[#1b1f3b]">
                        {t.name}
                    </p>

                    <p
                        className="text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: COLORS.mid }}
                    >
                        {t.role} · {t.subscribers}
                    </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {t.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-widest"
                            style={{
                                color: COLORS.mid,
                                borderColor: `${COLORS.left}40`,
                                background: `${COLORS.left}12`,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} color={COLORS.right} />
                ))}

                <span className="ml-2 text-[9px] font-bold uppercase tracking-widest text-[#8a8fa3]">
                    Verified Client
                </span>
            </div>

            {/* Quote */}
            <p className="text-[17px] font-light italic leading-relaxed text-[#4b5563]">
                "{t.text}"
            </p>

            {/* Bottom row */}
            <div
                className="flex items-center justify-between gap-4 border-t pt-4"
                style={{ borderColor: '#1e1b4b' }}
            >
                <span className="font-mono text-[11px] tracking-widest text-[#8a8fa3]">
                    {t.handle}
                </span>

                <div
                    className="flex items-center gap-2 rounded-xl border px-4 py-2"
                    style={{
                        borderColor: `${COLORS.left}40`,
                        background: `${COLORS.left}12`,
                    }}
                >
                    <span
                        className="text-lg font-black"
                        style={{ color: COLORS.mid }}
                    >
                        {t.metric}
                    </span>

                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#8a8fa3]">
                        {t.metricLabel}
                    </span>
                </div>
            </div>
        </div>
    </div>
);

export default function Testimonials() {
    const sectionRef = useRef(null);

    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

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

    const goNext = useCallback(() => {
        setActiveIndex((previous) => (previous + 1) % testimonials.length);
    }, []);

    const goPrev = useCallback(() => {
        setActiveIndex((previous) =>
            previous === 0 ? testimonials.length - 1 : previous - 1
        );
    }, []);

    const goTo = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    // Keyboard controls remain available
    useEffect(() => {
        const handleKey = (event) => {
            if (event.key === 'ArrowRight') {
                goNext();
            }

            if (event.key === 'ArrowLeft') {
                goPrev();
            }
        };

        window.addEventListener('keydown', handleKey);

        return () => {
            window.removeEventListener('keydown', handleKey);
        };
    }, [goNext, goPrev]);

    const activeTestimonial = testimonials[activeIndex];

    return (
        <>
            <style>{`
                @keyframes fadeSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(35px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeSlideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-25px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(30px) scale(0.97);
                    }

                    to {
                        opacity: 1;
                        transform: translateX(0) scale(1);
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

                @keyframes glowPulse {
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
            `}</style>

            <section
                ref={sectionRef}
                className="relative w-full select-none overflow-hidden px-6 py-32 font-sans sm:px-12 lg:px-24"
                style={{ background: COLORS.bg, color: COLORS.text }}
            >
                {/* Ambient Glows */}
                <div
                    className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full blur-[160px]"
                    style={{ background: `${COLORS.left}12` }}
                />

                <div
                    className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[500px] rounded-full blur-[140px]"
                    style={{ background: `${COLORS.right}0f` }}
                />

                <div
                    className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[400px] rounded-full blur-[120px]"
                    style={{ background: `${COLORS.mid}08` }}
                />

                {/* Background Grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: `linear-gradient(${COLORS.left} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.left} 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Rotating Rings */}
                <div
                    className="pointer-events-none absolute top-16 right-16 hidden h-40 w-40 rounded-full border xl:block"
                    style={{
                        borderColor: `${COLORS.left}15`,
                        animation: 'rotateSlow 20s linear infinite',
                    }}
                >
                    <div
                        className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                        style={{ background: COLORS.left }}
                    />
                </div>

                <div
                    className="pointer-events-none absolute bottom-32 left-16 hidden h-24 w-24 rounded-full border xl:block"
                    style={{
                        borderColor: `${COLORS.right}15`,
                        animation: 'rotateSlow 14s linear infinite reverse',
                    }}
                >
                    <div
                        className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                        style={{ background: COLORS.right }}
                    />
                </div>

                <div className="relative z-10 mx-auto max-w-6xl">
                    {/* Section Header */}
                    <div
                        className="mb-16 space-y-6 text-center"
                        style={{
                            animation: visible
                                ? 'fadeSlideDown 0.7s ease forwards'
                                : 'none',
                            opacity: 0,
                        }}
                    >
                        <div
                            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 backdrop-blur-sm"
                            style={{
                                borderColor: `${COLORS.left}50`,
                                background: `${COLORS.left}12`,
                            }}
                        >
                            <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{
                                    background: COLORS.mid,
                                    animation: 'glowPulse 2s ease-in-out infinite',
                                }}
                            />

                            <span
                                className="text-[10px] font-black uppercase tracking-[0.35em]"
                                style={{ color: COLORS.mid }}
                            >
                                Client Success
                            </span>
                        </div>

                        <h2 className="text-5xl font-black uppercase leading-none tracking-widest sm:text-7xl" style={{ color: COLORS.text }}>
                            <span>Client's </span>

                            <span
                                style={{
                                    background: `linear-gradient(135deg, ${COLORS.left} 0%, ${COLORS.right} 50%, ${COLORS.mid} 100%)`,
                                    backgroundSize: '200% auto',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    animation: 'shimmer 5s linear infinite',
                                }}
                            >
                                Testimonials
                            </span>
                        </h2>

                        <p className="mx-auto max-w-lg text-[17px] leading-relaxed text-[#4b5563]">
                            Real results from real clients, every metric, every review,{' '}
                            <span
                                className="font-semibold"
                                style={{ color: COLORS.mid }}
                            >
                                every frame backed by proof
                            </span>
                            .
                        </p>

                        <div className="flex items-center justify-center gap-4">
                            <div
                                className="h-px w-24"
                                style={{
                                    background: `linear-gradient(to right, transparent, ${COLORS.left})`,
                                }}
                            />

                            <div
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: COLORS.left }}
                            />

                            <div
                                className="h-px w-24"
                                style={{
                                    background: `linear-gradient(to left, transparent, ${COLORS.left})`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Manual Testimonials Navigation */}
                    <div className="relative">
                        <div
                            key={activeTestimonial.id}
                            style={{
                                animation: 'slideIn 0.5s ease forwards',
                            }}
                        >
                            <FeaturedCard t={activeTestimonial} />
                        </div>

                        {/* Previous Button */}
                        <button
                            onClick={goPrev}
                            aria-label="Previous testimonial"
                            className="absolute top-1/2 -left-2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border font-black text-[#8a8fa3] shadow-lg outline-none backdrop-blur-sm transition-all duration-300 sm:-left-6"
                            style={{
                                borderColor: 'rgba(0,0,0,0.12)',
                                background: '#ffffff',
                            }}
                            onMouseEnter={(event) => {
                                event.currentTarget.style.background = '#141414';
                                event.currentTarget.style.color = '#ffffff';
                            }}
                            onMouseLeave={(event) => {
                                event.currentTarget.style.background =
                                    '#ffffff';
                                event.currentTarget.style.color = '#8a8fa3';
                            }}
                        >
                            ←
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={goNext}
                            aria-label="Next testimonial"
                            className="absolute top-1/2 -right-2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border font-black text-[#8a8fa3] shadow-lg outline-none backdrop-blur-sm transition-all duration-300 sm:-right-6"
                            style={{
                                borderColor: 'rgba(0,0,0,0.12)',
                                background: '#ffffff',
                            }}
                            onMouseEnter={(event) => {
                                event.currentTarget.style.background = '#141414';
                                event.currentTarget.style.color = '#ffffff';
                            }}
                            onMouseLeave={(event) => {
                                event.currentTarget.style.background =
                                    '#ffffff';
                                event.currentTarget.style.color = '#8a8fa3';
                            }}
                        >
                            →
                        </button>
                    </div>

                    {/* Dot Indicators */}
                    <div className="mt-8 flex justify-center gap-2">
                        {testimonials.map((testimonial, index) => (
                            <button
                                key={testimonial.id}
                                onClick={() => goTo(index)}
                                aria-label={`Show testimonial ${index + 1}`}
                                className="h-1.5 rounded-full outline-none transition-all duration-500 ease-out"
                                style={{
                                    width:
                                        activeIndex === index ? '28px' : '8px',
                                    background:
                                        activeIndex === index
                                            ? GRADIENT
                                            : 'rgba(255,255,255,0.1)',
                                }}
                            />
                        ))}
                    </div>

                    {/* Overall Rating Bar */}
                    <div
                        className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
                        style={{
                            animation: visible
                                ? 'fadeSlideUp 0.7s ease forwards 0.4s'
                                : 'none',
                            opacity: 0,
                        }}
                    >
                        {[
                            {
                                label: 'Overall Satisfaction',
                                value: '98%',
                            },
                            {
                                label: 'On-Time Delivery',
                                value: '100%',
                            },
                            {
                                label: 'Would Recommend',
                                value: '96%',
                            },
                        ].map((item, index) => (
                            <div
                                key={item.label}
                                className="flex flex-col gap-3 rounded-2xl border p-5 transition-all duration-300"
                                style={{
                                    borderColor: '#e6e7ec',
                                    background: '#ffffff',
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#8a8fa3]">
                                        {item.label}
                                    </span>

                                    <span
                                        className="text-sm font-black"
                                        style={{ color: COLORS.mid }}
                                    >
                                        {item.value}
                                    </span>
                                </div>

                                <div
                                    className="h-1.5 w-full overflow-hidden rounded-full"
                                    style={{ background: '#ece7fb' }}
                                >
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: visible ? item.value : '0%',
                                            background: GRADIENT,
                                            transition: `width 1.5s ease ${index * 0.15 + 0.6
                                                }s`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
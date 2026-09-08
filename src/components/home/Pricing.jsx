import React, { useEffect, useRef, useState } from "react";

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

// ── Pricing Plans ──
const plans = [
    {
        value: "starter",
        name: "Starter",
        desc: "Perfect for short-form content and simple YouTube videos.",
        price: 149,
        period: "/video",
        popular: false,
        features: [
            "Basic color correction",
            "Standard audio mixing",
            "Simple text animation",
            "2 rounds of revision",
            "Short clips support",
        ],
        cta: "Start Starter",
    },
    {
        value: "professional",
        name: "Professional",
        desc: "Ideal for professional YouTube channels and brand promos.",
        price: 299,
        period: "/video",
        popular: false,
        features: [
            "Up to 15 minutes final length",
            "Advanced color grading",
            "Premium sound design",
            "Custom motion graphics",
            "2 rounds of revision",
            "Priority delivery",
        ],
        cta: "Start Professional",
    },
    {
        value: "signature",
        name: "Signature",
        desc: "For cinematic commercials and premium storytelling projects.",
        price: 499,
        period: "/video",
        popular: true,
        features: [
            "Unlimited final length",
            "Cinematic grading",
            "Full audio mastering",
            "Advanced motion graphics",
            "Unlimited revisions",
            "Priority 7-day delivery",
            "Source files included",
        ],
        cta: "Start Signature",
    },
];

// ── Checkmark Icon ──
const Check = ({ color }) => (
    <svg
        className="w-4 h-4 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

// ── Pricing Card ──
const PricingCard = ({ plan, index, visible, onSelectPlan }) => {
    const [hovered, setHovered] = useState(false);
    const isPopular = plan.popular;

    const handleSelectPlan = () => {
        onSelectPlan({
            value: plan.value,
            name: plan.name,
            price: plan.price,
            period: plan.period,
            label: `${plan.name} - $${plan.price}${plan.period}`,
        });
    };

    return (
        <div
            className="relative rounded-[28px] p-[1.5px] transition-all duration-500"
            style={{
                background: isPopular
                    ? GRADIENT
                    : hovered
                        ? `linear-gradient(135deg, ${COLORS.left}55, transparent)`
                        : "#e6e7ec",
                animation: visible
                    ? `fadeSlideUp 0.7s ease forwards ${index * 0.15 + 0.2}s`
                    : "none",
                opacity: 0,
                transform: isPopular ? "scale(1.03)" : "scale(1)",
                boxShadow: isPopular
                    ? `0 20px 60px -15px ${COLORS.left}50`
                    : "none",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className="relative h-full rounded-[27px] p-8 flex flex-col overflow-hidden transition-transform duration-500"
                style={{
                    background: "#ffffff",
                    transform: hovered
                        ? "translateY(-6px)"
                        : "translateY(0)",
                }}
            >
                {/* Glow Blob */}
                <div
                    className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
                    style={{
                        background: COLORS.left,
                        opacity: isPopular ? 0.18 : hovered ? 0.1 : 0,
                    }}
                />

                {/* Popular Badge */}
                {isPopular && (
                    <div
                        className="absolute top-6 right-6 px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase text-white flex items-center gap-1.5"
                        style={{
                            background: GRADIENT,
                            boxShadow: `0 4px 15px ${COLORS.left}50`,
                        }}
                    >
                        ⭐ Most Popular
                    </div>
                )}

                <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <h3 className="text-[21px] font-black text-[#1b1f3b] tracking-tight">
                        {plan.name}
                    </h3>

                    <p className="text-[#8a8fa3] text-xs mt-2 leading-relaxed max-w-[220px]">
                        {plan.desc}
                    </p>

                    {/* Price */}
                    <div className="flex items-end gap-2 mt-8 mb-8">
                        <span
                            className="text-5xl font-black tracking-tight"
                            style={
                                isPopular
                                    ? {
                                        background: GRADIENT,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        color: "transparent",
                                    }
                                    : {
                                        color: "#1b1f3b",
                                    }
                            }
                        >
                            ${plan.price}
                        </span>

                        <span className="text-[#8a8fa3] text-sm font-medium mb-1.5">
                            {plan.period}
                        </span>
                    </div>

                    {/* Divider */}
                    <div
                        className="h-px w-full mb-6"
                        style={{
                            background: "#e6e7ec",
                        }}
                    />

                    {/* Features */}
                    <ul className="space-y-3.5 flex-1">
                        {plan.features.map((feature, featureIndex) => (
                            <li
                                key={featureIndex}
                                className="flex items-center gap-3 text-sm text-[#4b5563]"
                            >
                                <Check
                                    color={
                                        isPopular
                                            ? COLORS.mid
                                            : COLORS.right
                                    }
                                />

                                {feature}
                            </li>
                        ))}
                    </ul>

                    {/* Plan Button */}
                    <button
                        type="button"
                        onClick={handleSelectPlan}
                        className="group relative w-full mt-8 py-4 rounded-xl font-bold text-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        style={
                            isPopular
                                ? {
                                    background: "#141414",
                                    color: "#ffffff",
                                    boxShadow: "0 8px 26px rgba(0,0,0,0.2)",
                                }
                                : {
                                    background: "#f6f7f9",
                                    color: "#1b1f3b",
                                    border: "1px solid #e6e7ec",
                                }
                        }
                    >
                        {!isPopular && (
                            <span
                                className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                                style={{
                                    background: "#141414",
                                }}
                            />
                        )}

                        <span
                            className={`relative z-10 transition-colors duration-300 ${!isPopular
                                    ? "group-hover:text-white"
                                    : ""
                                }`}
                        >
                            {plan.cta}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// ══════════════════════════════════════════
//  PRICING — Main Component
// ══════════════════════════════════════════
export default function Pricing({ onSelectPlan }) {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            {
                threshold: 0.1,
            },
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleSelectPlan = (plan) => {
        // Selected plan Home.jsx ko send karega
        if (typeof onSelectPlan === "function") {
            onSelectPlan(plan);
        }

        // Contact section par scroll karega
        requestAnimationFrame(() => {
            const contactSection = document.getElementById("contact");

            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    };

    const handleCustomQuote = () => {
        handleSelectPlan({
            value: "custom",
            name: "Custom",
            price: null,
            period: "",
            label: "Custom Package",
        });
    };

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

                @keyframes floatSlow {
                    0%,
                    100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `}</style>

            <section
                ref={sectionRef}
                className="relative w-full py-32 px-6 sm:px-12 lg:px-24 overflow-hidden font-sans"
                style={{
                    background: COLORS.bg,
                    color: COLORS.text,
                }}
            >
                {/* Ambient Glows */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[180px] pointer-events-none"
                    style={{
                        background: `${COLORS.left}10`,
                    }}
                />

                <div
                    className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full blur-[150px] pointer-events-none"
                    style={{
                        background: `${COLORS.right}0d`,
                    }}
                />

                {/* Background Grid */}
                <div
                    className="absolute inset-0 opacity-[0.025] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(${COLORS.left} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.left} 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Rotating Rings */}
                <div
                    className="absolute top-20 left-16 w-32 h-32 rounded-full border hidden xl:block pointer-events-none"
                    style={{
                        borderColor: `${COLORS.left}15`,
                        animation: "rotateSlow 22s linear infinite",
                    }}
                >
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                        style={{
                            background: COLORS.left,
                        }}
                    />
                </div>

                <div
                    className="absolute bottom-20 right-24 w-24 h-24 rounded-full border hidden xl:block pointer-events-none"
                    style={{
                        borderColor: `${COLORS.right}15`,
                        animation: "rotateSlow 16s linear infinite reverse",
                        animationDelay: "1s",
                    }}
                >
                    <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{
                            background: COLORS.right,
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div
                        className="text-center mb-16 space-y-5"
                        style={{
                            animation: visible
                                ? "fadeSlideDown 0.7s ease forwards"
                                : "none",
                            opacity: 0,
                        }}
                    >
                        <div
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border backdrop-blur-sm"
                            style={{
                                borderColor: `${COLORS.left}50`,
                                background: `${COLORS.left}12`,
                            }}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                    background: COLORS.mid,
                                    animation:
                                        "glowPulse 2s ease-in-out infinite",
                                }}
                            />

                            <span
                                className="text-[10px] font-black tracking-[0.35em] uppercase"
                                style={{
                                    color: COLORS.mid,
                                }}
                            >
                                Investment
                            </span>
                        </div>

                        <h2 className="text-5xl sm:text-7xl font-black tracking-tight leading-none" style={{ color: COLORS.text }}>
                            <span>
                                Transparent{" "}
                            </span>

                            <span
                                style={{
                                    background: `linear-gradient(135deg, ${COLORS.left} 0%, ${COLORS.right} 50%, ${COLORS.mid} 100%)`,
                                    backgroundSize: "200% auto",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    animation:
                                        "shimmer 5s linear infinite",
                                }}
                            >
                                Pricing
                            </span>
                        </h2>

                        <p className="text-[#4b5563] text-[17px] max-w-lg mx-auto leading-relaxed">
                            No hidden fees, no surprises — just clear
                            pricing for{" "}
                            <span
                                style={{
                                    color: COLORS.mid,
                                }}
                                className="font-semibold"
                            >
                                cinematic-grade video editing
                            </span>
                            .
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                        {plans.map((plan, index) => (
                            <PricingCard
                                key={plan.value}
                                plan={plan}
                                index={index}
                                visible={visible}
                                onSelectPlan={handleSelectPlan}
                            />
                        ))}
                    </div>

                    {/* Trust Row */}
                    <div
                        className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
                        style={{
                            animation: visible
                                ? "fadeSlideUp 0.7s ease forwards 0.8s"
                                : "none",
                            opacity: 0,
                        }}
                    >
                        {[
                            {
                                icon: "🔒",
                                label: "Secure Payments",
                            },
                            {
                                icon: "↩️",
                                label: "Money-Back Guarantee",
                            },
                            {
                                icon: "⚡",
                                label: "Fast Turnaround",
                            },
                            {
                                icon: "✅",
                                label: "Unlimited Support Chat",
                            },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-2"
                            >
                                <span className="text-base">
                                    {item.icon}
                                </span>

                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8a8fa3]">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Custom Quote */}
                    <div
                        className="mt-16 max-w-2xl mx-auto text-center p-8 rounded-3xl border relative overflow-hidden"
                        style={{
                            borderColor: `${COLORS.left}30`,
                            background: `${COLORS.left}08`,
                            animation: visible
                                ? "fadeSlideUp 0.7s ease forwards 0.95s"
                                : "none",
                            opacity: 0,
                        }}
                    >
                        <div
                            className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                            style={{
                                background: COLORS.right,
                                opacity: 0.1,
                                animation:
                                    "floatSlow 6s ease-in-out infinite",
                            }}
                        />

                        <p className="text-[#1b1f3b] text-[21px] font-bold relative z-10">
                            Need something custom?
                        </p>

                        <p className="text-[#8a8fa3] text-xs mt-2 mb-6 relative z-10">
                            Long-term retainers, bulk packages, or unique
                            project scopes — let's build a plan around your
                            needs.
                        </p>

                        <button
                            type="button"
                            onClick={handleCustomQuote}
                            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-black text-xs tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border"
                            style={{
                                borderColor: "rgba(0,0,0,0.12)",
                                background: "#ffffff",
                                color: "#1b1f3b",
                            }}
                        >
                            <span
                                className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                                style={{
                                    background: "#141414",
                                }}
                            />

                            <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                                Request Custom Quote

                                <svg
                                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
import React, { useState, useEffect, useRef, useCallback } from 'react';

const steps = [
    {
        phase: "01",
        title: "Strategic Ingestion",
        tagline: "Asset Mapping & Goal Blueprinting",
        desc: "Secure cloud upload of your raw assets combined with an onboarding brief. We analyze your brand tone, reference benchmarks, and target audience to outline an optimization road map.",
        icon: "📥",
        duration: "1-2 Days",
        color: "#623BFD",
    },
    {
        phase: "02",
        title: "Narrative Architecture",
        tagline: "Pacing, Structural Cuts & Framing",
        desc: "We slice out dead space, build core narrative structural frameworks, map out precise clip pacing, and optimize the psychological hook lines to secure immediate engagement.",
        icon: "🎞️",
        duration: "2-3 Days",
        color: "#8B5CF6",
    },
    {
        phase: "03",
        title: "Premium Polish Suite",
        tagline: "Kinetic Graphics & Immersive Sound FX",
        desc: "Our design layer takes over: styling custom kinetic typography graphics, adding multi-layered Foley soundscapes, text pops, and blending smooth professional grading templates.",
        icon: "✨",
        duration: "2-4 Days",
        color: "#A78BFA",
    },
    {
        phase: "04",
        title: "Collaborative Tuning",
        tagline: "Frame-Accurate Interactive Review",
        desc: "Receive a cloud review link to preview the cut. Our frame-accurate feedback loop makes implementing notes clean and seamless, locking in exactly the adjustments your brand needs.",
        icon: "🔄",
        duration: "1-2 Days",
        color: "#C4B5FD",
    },
    {
        phase: "05",
        title: "Master Deployment",
        tagline: "Ultra-High Retention Export",
        desc: "Final master rendering processed in clean 4K UHD. We deliver perfectly formatted file specs across your distribution networks alongside custom performance tracking markers.",
        icon: "🚀",
        duration: "Same Day",
        color: "#D4C8FE",
    },
];

const COLORS = {
    bg: '#080B29',
    surface: '#0F1235',
    left: '#623BFD',
    mid: '#D4C8FE',
    right: '#B296FE',
    text: '#E2E8F0',
    muted: '#94A3B8',
};

const GRADIENT = `linear-gradient(135deg, ${COLORS.left} 0%, ${COLORS.right} 60%, ${COLORS.mid} 100%)`;

export default function WorkflowPipeline() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [visible, setVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const goNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % steps.length);
    }, []);

    const goPrev = useCallback(() => {
        setActiveIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
    }, []);

    const goTo = useCallback((i) => {
        setActiveIndex(i);
    }, []);

    useEffect(() => {
        if (isPaused || !visible) return;
        const timer = setInterval(goNext, 5000);
        return () => clearInterval(timer);
    }, [isPaused, visible, goNext]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [goNext, goPrev]);

    const activeStep = steps[activeIndex];

    return (
        <>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.6; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .text-gradient {
                    background: linear-gradient(135deg, ${COLORS.left} 0%, ${COLORS.right} 50%, ${COLORS.mid} 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>

            <section
                ref={containerRef}
                className="relative w-full text-white py-24 px-6 sm:px-12 lg:px-24 overflow-hidden font-sans"
                style={{ background: COLORS.bg }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
                        style={{ background: COLORS.left, animation: 'float 6s ease-in-out infinite' }}
                    />
                    <div
                        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
                        style={{ background: COLORS.right, animation: 'float 6s ease-in-out infinite reverse' }}
                    />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">

                    {/* Header Section */}
                    <div
                        className="text-center mb-16"
                        style={{
                            animation: visible ? 'fadeIn 0.8s ease forwards' : 'none',
                            opacity: 0
                        }}
                    >
                        <span
                            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
                            style={{
                                background: `${COLORS.left}15`,
                                color: COLORS.mid,
                                border: `1px solid ${COLORS.left}30`
                            }}
                        >
                            Our Process
                        </span>

                        <h1
                            className="font-bold tracking-tight mb-4"
                            style={{
                                fontSize: '32px',
                                lineHeight: '1.2',
                                animation: visible ? 'fadeIn 0.8s ease forwards 0.1s' : 'none',
                                opacity: 0
                            }}
                        >
                            The Content Engine
                            <span className="block text-gradient mt-2">Pipeline</span>
                        </h1>

                        <p
                            className="max-w-2xl mx-auto font-normal"
                            style={{
                                fontSize: '18px',
                                lineHeight: '1.6',
                                color: COLORS.muted,
                                animation: visible ? 'fadeIn 0.8s ease forwards 0.2s' : 'none',
                                opacity: 0
                            }}
                        >
                            Five precision-engineered phases turn raw footage into
                            <span style={{ color: COLORS.mid, fontWeight: 600 }}> retention-optimized content</span> that captivates audiences and drives measurable results.
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-12 gap-8 items-start">

                        {/* Left Side - Step List */}
                        <div className="lg:col-span-4 space-y-3">
                            {steps.map((step, index) => (
                                <button
                                    key={step.phase}
                                    onClick={() => goTo(index)}
                                    className="w-full text-left p-4 rounded-xl transition-all duration-300 group relative overflow-hidden"
                                    style={{
                                        background: activeIndex === index ? `${COLORS.left}15` : 'transparent',
                                        border: activeIndex === index ? `1px solid ${COLORS.left}30` : '1px solid transparent',
                                        animation: visible ? `slideIn 0.5s ease forwards ${index * 0.1}s` : 'none',
                                        opacity: 0
                                    }}
                                >
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-300"
                                            style={{
                                                background: activeIndex === index ? GRADIENT : `${COLORS.left}20`,
                                                color: activeIndex === index ? '#080B29' : COLORS.mid,
                                                transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)'
                                            }}
                                        >
                                            {step.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span
                                                    className="text-xs font-bold tracking-widest uppercase"
                                                    style={{ color: activeIndex === index ? COLORS.mid : COLORS.muted }}
                                                >
                                                    Phase {step.phase}
                                                </span>
                                                {activeIndex === index && (
                                                    <span
                                                        className="w-1.5 h-1.5 rounded-full"
                                                        style={{
                                                            background: COLORS.mid,
                                                            animation: 'pulse 2s infinite'
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            <h3
                                                className="font-bold transition-colors duration-300"
                                                style={{
                                                    fontSize: '18px',
                                                    color: activeIndex === index ? '#fff' : COLORS.muted
                                                }}
                                            >
                                                {step.title}
                                            </h3>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Right Side - Active Step Detail */}
                        <div
                            className="lg:col-span-8 relative"
                            style={{
                                animation: visible ? 'fadeIn 0.8s ease forwards 0.3s' : 'none',
                                opacity: 0
                            }}
                        >
                            <div
                                className="relative rounded-2xl p-8 sm:p-10 h-full"
                                style={{
                                    background: COLORS.surface,
                                    border: `1px solid ${COLORS.left}20`,
                                    boxShadow: `0 20px 60px -20px ${COLORS.left}30`
                                }}
                            >
                                {/* Decorative gradient corner */}
                                <div
                                    className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20"
                                    style={{ background: GRADIENT }}
                                />

                                {/* Progress Indicator */}
                                <div className="flex items-center justify-between mb-8 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold"
                                            style={{
                                                background: GRADIENT,
                                                color: '#080B29',
                                                boxShadow: `0 10px 30px ${COLORS.left}40`
                                            }}
                                        >
                                            {activeStep.icon}
                                        </div>
                                        <div>
                                            <span
                                                className="text-xs font-bold tracking-widest uppercase block mb-1"
                                                style={{ color: COLORS.left }}
                                            >
                                                Phase {activeStep.phase} of 05
                                            </span>
                                            <h2
                                                className="font-bold"
                                                style={{ fontSize: '28px', lineHeight: '1.2' }}
                                            >
                                                {activeStep.title}
                                            </h2>
                                        </div>
                                    </div>

                                    <div
                                        className="px-4 py-2 rounded-lg text-sm font-bold"
                                        style={{
                                            background: `${COLORS.left}15`,
                                            color: COLORS.mid,
                                            border: `1px solid ${COLORS.left}30`
                                        }}
                                    >
                                        {activeStep.duration}
                                    </div>
                                </div>

                                {/* Tagline */}
                                <div className="mb-8 pl-4 border-l-2" style={{ borderColor: COLORS.left }}>
                                    <p
                                        className="font-medium italic"
                                        style={{
                                            fontSize: '18px',
                                            lineHeight: '1.5',
                                            color: COLORS.right
                                        }}
                                    >
                                        {activeStep.tagline}
                                    </p>
                                </div>

                                {/* Description */}
                                <p
                                    className="mb-8 font-normal leading-relaxed"
                                    style={{
                                        fontSize: '18px',
                                        lineHeight: '1.7',
                                        color: COLORS.text
                                    }}
                                >
                                    {activeStep.desc}
                                </p>

                                {/* Progress Bar */}
                                <div className="relative pt-4">
                                    <div className="flex justify-between text-xs font-bold tracking-widest uppercase mb-2" style={{ color: COLORS.muted }}>
                                        <span>Progress</span>
                                        <span>{Math.round(((activeIndex + 1) / steps.length) * 100)}%</span>
                                    </div>
                                    <div
                                        className="h-2 rounded-full overflow-hidden"
                                        style={{ background: `${COLORS.left}20` }}
                                    >
                                        <div
                                            className="h-full rounded-full transition-all duration-700 ease-out"
                                            style={{
                                                width: `${((activeIndex + 1) / steps.length) * 100}%`,
                                                background: GRADIENT
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Navigation Dots */}
                                <div className="flex justify-center gap-2 mt-8">
                                    {steps.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => goTo(idx)}
                                            className="transition-all duration-300 rounded-full"
                                            style={{
                                                width: activeIndex === idx ? '24px' : '8px',
                                                height: '8px',
                                                background: activeIndex === idx ? GRADIENT : `${COLORS.left}20`,
                                                border: activeIndex === idx ? 'none' : `1px solid ${COLORS.left}30`
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA Section */}
                    <div
                        className="mt-16 text-center"
                        style={{
                            animation: visible ? 'fadeIn 0.8s ease forwards 0.5s' : 'none',
                            opacity: 0
                        }}
                    >

                    </div>

                </div>
            </section>
        </>
    );
}
import React, { useState, useRef, useEffect } from "react";

export default function WorkHero() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const videoRef = useRef(null);
    const sectionRef = useRef(null);

    // Replace with your actual showreel video URL
    const showreelUrl = "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720_1mb.mp4";

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

            setMousePosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            <style>{`
                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
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
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                
                @keyframes orbFloat {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -20px) scale(1.05);
                    }
                    66% {
                        transform: translate(-20px, 15px) scale(0.95);
                    }
                }
                
                .hero-gradient-text {
                    background: linear-gradient(
                        135deg,
                        #623BFD 0%,
                        #B296FE 50%,
                        #D4C8FE 100%
                    );
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 5s linear infinite;
                }
            `}</style>

            <section
                ref={sectionRef}
                className="relative h-[85vh] md:h-[95vh] w-full overflow-hidden text-white"
            >
                {/* Background Video */}
                <div className="absolute inset-0">
                    <video
                        ref={videoRef}
                        className="h-full w-full object-cover"
                        src={showreelUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onLoadedData={() => setIsVideoLoaded(true)}
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-[#080B29]/70" />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080B29]/40 to-[#080B29]" />
                </div>

                {/* Animated Background Orbs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                        className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-[150px] opacity-30"
                        style={{
                            background: "#623BFD",
                            animation: "orbFloat 15s ease-in-out infinite",
                        }}
                    />

                    <div
                        className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full blur-[150px] opacity-25"
                        style={{
                            background: "#B296FE",
                            animation: "orbFloat 18s ease-in-out infinite reverse",
                            animationDelay: "-5s",
                        }}
                    />

                    <div
                        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full blur-[120px] opacity-20"
                        style={{
                            background: "#D4C8FE",
                            animation: "orbFloat 20s ease-in-out infinite",
                            animationDelay: "-10s",
                        }}
                    />
                </div>

                {/* Floating Particles */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-[#D4C8FE]"
                            style={{
                                width: `${2 + Math.random() * 3}px`,
                                height: `${2 + Math.random() * 3}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                opacity: 0.3,
                                animation: `float ${4 + Math.random() * 4
                                    }s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 lg:px-24">
                    <div
                        className="max-w-6xl"
                        style={{
                            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                            transition: "transform 0.3s ease-out",
                        }}
                    >
                        {/* Badge */}
                        <div
                            style={{
                                animation: "fadeUp 0.8s ease forwards",
                                opacity: 0,
                            }}
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#623BFD]/30 bg-[#623BFD]/10 px-5 py-2.5 backdrop-blur-md">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-[#B296FE] shadow-[0_0_8px_rgba(178,150,254,0.8)]" />

                                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#D4C8FE]">
                                    Featured Work
                                </span>
                            </div>
                        </div>

                        {/* Heading */}
                        <div
                            className="mt-6"
                            style={{
                                animation: "fadeUp 0.8s ease forwards 0.2s",
                                opacity: 0,
                            }}
                        >
                            <h1 className="text-5xl font-black leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                                <span className="block text-white">
                                    A Showcase Of
                                </span>

                                <span className="hero-gradient-text mt-2 block">
                                    Precision Editing
                                </span>
                            </h1>
                        </div>

                        {/* Description */}
                        <div
                            className="mt-8"
                            style={{
                                animation: "fadeUp 0.8s ease forwards 0.3s",
                                opacity: 0,
                            }}
                        >
                            <p className="max-w-2xl text-lg text-[#B8BDD9] md:text-xl lg:text-[22px] leading-relaxed">
                                From cinematic masterpieces to viral social content.
                                Explore the projects that define my craft in{" "}
                                <span className="font-semibold text-[#D4C8FE]">
                                    post-production, motion graphics
                                </span>{" "}
                                and{" "}
                                <span className="font-semibold text-[#D4C8FE]">
                                    creative storytelling
                                </span>
                                .
                            </p>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
                    style={{
                        animation: "fadeIn 1s ease forwards 1s",
                        opacity: 0,
                    }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs font-medium uppercase tracking-wider text-[#B8BDD9]">
                            Scroll Down
                        </span>

                        <div className="h-10 w-6 rounded-full border-2 border-white/20">
                            <div
                                className="mx-auto mt-2 h-2 w-1 rounded-full bg-[#D4C8FE]"
                                style={{
                                    animation: "float 2s ease-in-out infinite",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
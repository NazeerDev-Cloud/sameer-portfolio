import React, { useState } from 'react';

export default function FeaturedShowcase() {
    const [activeIndex, setActiveIndex] = useState(2); // Middle card active by default

    const collections = [
        {
            id: "COL_01",
            title: "Retention Engine V1",
            category: "YouTube Masterpiece",
            metric: "4.2M+ Views",
            client: "Alex Hormozi Style",
            bgGradient: "from-[#1a0b36] to-[#0d061f]"
        },
        {
            id: "COL_02",
            title: "SaaS Blueprint Cut",
            category: "Explainer Motion",
            metric: "+180% Conversions",
            client: "Linear Tech Corp",
            bgGradient: "from-[#250c4d] to-[#0b0417]"
        },
        {
            id: "COL_03",
            title: "Cinematic Documentary",
            category: "Long-Form Narrative",
            metric: "92% Retention",
            client: "Vezqor Originals",
            bgGradient: "from-[#311066] to-[#070314]"
        },
        {
            id: "COL_04",
            title: "Algorithm Snap Hook",
            category: "Short-Form Vertical",
            metric: "12M+ Impressions",
            client: "Iman Gadzhi Style",
            bgGradient: "from-[#1f0940] to-[#0a051c]"
        },
        {
            id: "COL_05",
            title: "Interactive Playbook",
            category: "Technical Walkthrough",
            metric: "Perfect 5.0 Rating",
            client: "DevStream Global",
            bgGradient: "from-[#160630] to-[#05020f]"
        }
    ];

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="relative w-full bg-[#060417] text-white py-32 px-6 sm:px-12 lg:px-24 overflow-hidden font-sans tracking-widest uppercase">

            {/* Background Matrix & Subtle Ambiance */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#6425ff]/5 rounded-full blur-[160px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">

                {/* ==================== CORE HEADER BLOCK ==================== */}
                <div className="text-center mb-6 space-y-3">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-[#6425ff]/30 bg-[#6425ff]/10 text-[#985eff] text-[10px] font-black tracking-[0.3em]">
                        Curated Masterpieces
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tight normal-case leading-none text-white">
                        Most Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6425ff] to-[#985eff]">Collections</span>
                    </h2>
                </div>

                {/* Short scannable description text with absolute readability */}
                <p className="max-w-md text-center text-[11px] text-gray-400 tracking-wide normal-case leading-relaxed font-sans font-light mb-10">
                    Engineered video assets built specifically to command audience retention, accelerate metrics, and solidify your professional digital presence.
                </p>

                {/* ==================== CATCHY INTERACTIVE BUTTON ==================== */}
                <div className="mb-20">
                    <button
                        className="relative px-8 py-4 overflow-hidden rounded-xl bg-gradient-to-r from-[#6425ff] to-[#985eff] text-white text-[10px] font-black tracking-widest uppercase font-sans select-none outline-none flex items-center gap-2 transition-all duration-300 ease-out shadow-[0_4px_25px_rgba(100,37,255,0.3)] hover:shadow-[0_0_35px_rgba(152,94,255,0.5)] hover:scale-[1.03] active:scale-[0.98] group/btn"
                    >
                        <span className="relative z-10 flex items-center transition-transform duration-300 ease-out group-hover/btn:translate-x-[-3px]">
                            Explore Complete Deck
                        </span>
                        <span className="inline-block transform translate-x-[-6px] opacity-0 transition-all duration-300 ease-out group-hover/btn:translate-x-0 group-hover/btn:opacity-100 text-xs font-bold relative z-10">
                            ➔
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#985eff] to-[#6425ff] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 ease-out z-0" />
                    </button>
                </div>

                {/* ==================== 3D MATRICIAL CARACTION SLIDER ==================== */}
                <div className="relative w-full h-[460px] flex items-center justify-center max-w-5xl">

                    {/* LEFT CONTROLLER ARROW */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 sm:left-4 z-40 w-12 h-12 rounded-full border border-white/10 bg-[#0c0926]/80 flex items-center justify-center text-gray-400 text-sm font-black hover:text-white hover:border-[#6425ff] hover:bg-[#6425ff]/20 active:scale-95 transition-all duration-300 outline-none shadow-xl"
                    >
                        ←
                    </button>

                    {/* CARDS HUB CONTAINER */}
                    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                        {collections.map((item, index) => {

                            // Define 3D math offsets relative to the active selection
                            let offset = index - activeIndex;

                            // Handle loop wrapping spacing logic
                            if (offset < -2) offset += collections.length;
                            if (offset > 2) offset -= collections.length;

                            const isActive = offset === 0;
                            const isVisible = Math.abs(offset) <= 2;

                            if (!isVisible) return null;

                            // Generate layout positions perfectly mirroring the NFT 3D layered image design
                            let translateX = offset * 260; // Desktop horizontal step spacing
                            let scale = 1 - Math.abs(offset) * 0.12; // Gradual downscale for depth layering
                            let rotateY = offset * -18; // Cinematic structural angles
                            let zIndex = 30 - Math.abs(offset) * 10;
                            let opacity = isActive ? 1 : 0.45;

                            // Adjust layout tighter on smaller screen viewports
                            if (typeof window !== 'undefined' && window.innerWidth < 640) {
                                translateX = offset * 140;
                                scale = 1 - Math.abs(offset) * 0.18;
                            }

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => !isActive && setActiveIndex(index)}
                                    className={`absolute w-[290px] h-[390px] rounded-[32px] border border-white/10 bg-gradient-to-b ${item.bgGradient} p-6 flex flex-col justify-between pointer-events-auto cursor-pointer transition-all duration-700 cubic-bezier-deck shadow-[0_20px_50px_rgba(0,0,0,0.6)]`}
                                    style={{
                                        transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                                        zIndex: zIndex,
                                        opacity: opacity,
                                        boxShadow: isActive ? '0 30px 60px -10px rgba(100, 37, 255, 0.25), inset 0 1px 1px rgba(255,255,255,0.1)' : '0 15px 35px rgba(0,0,0,0.5)',
                                        borderColor: isActive ? 'rgba(152, 94, 255, 0.4)' : 'rgba(255, 255, 255, 0.05)'
                                    }}
                                >
                                    {/* Top Segment: Technical Spec Tags */}
                                    <div className="flex justify-between items-start border-b border-white/5 pb-4">
                                        <div>
                                            <p className="text-[9px] text-[#985eff] font-black tracking-widest leading-none">{item.id}</p>
                                            <h4 className="text-[11px] font-bold text-gray-400 mt-1 lowercase first-letter:uppercase tracking-normal font-sans">
                                                {item.client}
                                            </h4>
                                        </div>
                                        <span className="text-[8px] px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300 font-mono tracking-normal normal-case">
                                            {item.metric}
                                        </span>
                                    </div>

                                    {/* Middle Segment: Video Display Visual Frame Simulation */}
                                    <div className="w-full h-[150px] my-4 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden group flex items-center justify-center">
                                        {/* Abstract tech grid mesh backdrop layout inside the simulated frame */}
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:15px_15px]" />
                                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs text-white opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                                            ▶
                                        </div>
                                    </div>

                                    {/* Bottom Segment: Typography Details Deck (Guaranteed Absolute Contrast Visibility) */}
                                    <div className="space-y-1.5 pt-2">
                                        <span className="text-[8px] font-black text-[#6425ff] tracking-widest block">
                                            {item.category}
                                        </span>
                                        <h3 className="text-sm font-black tracking-wide text-white normal-case leading-snug">
                                            {item.title}
                                        </h3>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                    {/* RIGHT CONTROLLER ARROW */}
                    <button
                        onClick={handleNext}
                        className="absolute right-0 sm:right-4 z-40 w-12 h-12 rounded-full border border-white/10 bg-[#0c0926]/80 flex items-center justify-center text-gray-400 text-sm font-black hover:text-white hover:border-[#6425ff] hover:bg-[#6425ff]/20 active:scale-95 transition-all duration-300 outline-none shadow-xl"
                    >
                        ➔
                    </button>

                </div>

                {/* Bottom Interactive Selection Wheel Bullets Indicators */}
                <div className="flex gap-2.5 mt-8">
                    {collections.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`h-1.5 rounded-full transition-all duration-500 ease-out outline-none ${activeIndex === i ? 'w-8 bg-[#985eff]' : 'w-2 bg-white/10 hover:bg-white/30'
                                }`}
                        />
                    ))}
                </div>

            </div>

            {/* Global Transition Decay Optimization */}
            <style jsx global>{`
        .cubic-bezier-deck {
          transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
        }
      `}</style>
        </section>
    );
}
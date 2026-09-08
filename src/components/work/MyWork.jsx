import React, { useState, useRef, useEffect } from "react";

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

// ── Categories ──
const CATEGORIES = [
    { id: "all", label: "All", icon: "🎬" },
    { id: "youtube", label: "YouTube", icon: "▶️" },
    { id: "long-form", label: "Long Form", icon: "📹" },
    { id: "short-form", label: "Short Form", icon: "⚡" },
    { id: "ai", label: "AI", icon: "🤖" },
    { id: "map-animation", label: "Map Animation", icon: "🗺️" },
];

// ── Local videos (public/videos/<folder>/<file>) ──
const RAW_VIDEOS = [
    // Long Form
    { category: "long-form", folder: "Long Form", file: "Astrum Earth Sample .mp4", title: "Astrum Earth" },
    { category: "long-form", folder: "Long Form", file: "Emily Sample Video .mp4", title: "Emily — Sample Edit" },
    { category: "long-form", folder: "Long Form", file: "Motion Graphics.mp4", title: "Motion Graphics Reel" },
    { category: "long-form", folder: "Long Form", file: "Camera animation.mp4", title: "Camera Animation" },
    { category: "long-form", folder: "Long Form", file: "C0301_5.mp4", title: "Cinematic Sequence 05" },
    { category: "long-form", folder: "Long Form", file: "C0301_5 copy.mp4", title: "Cinematic Sequence 05B" },
    { category: "long-form", folder: "Long Form", file: "C0301_7.mp4", title: "Cinematic Sequence 07" },
    { category: "long-form", folder: "Long Form", file: "C0301_7 (1).mp4", title: "Cinematic Sequence 07B" },
    { category: "long-form", folder: "Long Form", file: "sample-1.mp4", title: "Long Form Sample" },

    // Short Form
    { category: "short-form", folder: "Short Form", file: "Meet Ronaq Series by Login Perfect for Mehfils, Milad, Deeni Majalis.mp4", title: "Meet Ronaq — Login Series" },
    { category: "short-form", folder: "Short Form", file: "One of the Best Budget Phone Under Rs.20K _ Gfive NOTE 25.mp4", title: "Gfive NOTE 25 — Phone Review" },
    { category: "short-form", folder: "Short Form", file: "Net sol  Ai .mp4", title: "NetSol AI Promo" },
    { category: "short-form", folder: "Short Form", file: "reel.mp4", title: "Social Reel" },
    { category: "short-form", folder: "Short Form", file: "1 (1).mp4", title: "Short Form Cut 01" },

    // AI
    { category: "ai", folder: "AI Videos", file: "Asad reel.mp4", title: "Asad — AI Reel" },
    { category: "ai", folder: "AI Videos", file: "Lilly Herbal Soap.mp4", title: "Lilly Herbal Soap" },
    { category: "ai", folder: "AI Videos", file: "Lillys Shampoo.mp4", title: "Lilly's Shampoo" },
    { category: "ai", folder: "AI Videos", file: "Time lapse Ai Video .mp4", title: "AI Time-Lapse" },
    { category: "ai", folder: "AI Videos", file: "WhatsApp Video 2026-08-02 at 00.04.20.mp4", title: "AI Concept Clip" },

    // Map Animation
    { category: "map-animation", folder: "Map Animation", file: "C0301_8.mp4", title: "Route Map Animation" },
];

// ── YouTube videos (same set featured on the home page) ──
const YT_VIDEOS = [
    { videoId: "P8H7y-8p-Qs", title: "Professional Video Editing Showcase" },
    { videoId: "W-7UAeBpyOg", title: "Creative Motion Graphics" },
    { videoId: "njuHIfe-KaU", title: "Advanced Color Grading" },
    { videoId: "XGGzUASrCNM", title: "Dynamic Visual Effects" },
    { videoId: "JAMdB9Z8S48", title: "Storytelling Through Edits" },
    { videoId: "s_yI11DtuSI", title: "Premium Sound Design" },
    { videoId: "DtDV_SuNG_E", title: "Cinematic Masterpiece" },
    { videoId: "QDGC1HNkrk4", title: "Visual Storytelling" },
    { videoId: "08yvCGFNI1Q", title: "Professional Grade Edit" },
    { videoId: "aMePsvLnw-0", title: "Advanced Techniques Showcase" },
];

const LOCAL_DATA = RAW_VIDEOS.map((v, i) => ({
    id: `local-${i + 1}`,
    type: "local",
    title: v.title,
    category: v.category,
    src: encodeURI(`/videos/${v.folder}/${v.file}`),
}));

const YT_DATA = YT_VIDEOS.map((v, i) => ({
    id: `yt-${i + 1}`,
    type: "youtube",
    title: v.title,
    category: "youtube",
    videoId: v.videoId,
    thumbnail: `https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`,
}));

const VIDEO_DATA = [...YT_DATA, ...LOCAL_DATA];

const formatTime = (seconds) => {
    if (!seconds || !isFinite(seconds)) return "";
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
};

// ── Video Card Component ──
const VideoCard = ({ video, onClick, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [duration, setDuration] = useState("");
    const videoRef = useRef(null);
    const isYouTube = video.type === "youtube";

    const handleEnter = () => {
        setIsHovered(true);
        if (isYouTube) return;
        const el = videoRef.current;
        if (el) {
            el.currentTime = 0;
            el.play().catch(() => { });
        }
    };

    const handleLeave = () => {
        setIsHovered(false);
        if (isYouTube) return;
        const el = videoRef.current;
        if (el) {
            el.pause();
            try {
                el.currentTime = 0;
            } catch {
                /* ignore */
            }
        }
    };

    return (
        <div
            className="video-card group relative cursor-pointer"
            onClick={() => onClick(video)}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{
                animation: `fadeSlideUp 0.6s ease forwards ${index * 0.06}s`,
                opacity: 0,
            }}
        >
            {/* Preview Container */}
            <div className="relative overflow-hidden rounded-2xl aspect-video bg-[#0f1115]">
                {isYouTube ? (
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <video
                        ref={videoRef}
                        src={`${video.src}#t=0.5`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onLoadedMetadata={(e) => setDuration(formatTime(e.currentTarget.duration))}
                    />
                )}

                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                        background: `linear-gradient(to top, ${COLORS.bg} 0%, transparent 55%, rgba(15,17,21,0.35) 100%)`,
                        opacity: isHovered && !isYouTube ? 0.35 : 0.85,
                    }}
                />

                {/* Animated Border */}
                <div
                    className="absolute inset-0 rounded-2xl transition-opacity duration-500"
                    style={{
                        border: `2px solid ${COLORS.left}`,
                        opacity: isHovered ? 1 : 0,
                        boxShadow: isHovered ? `0 0 30px ${COLORS.left}40` : "none",
                    }}
                />

                {/* Play Button */}
                <div
                    className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                    style={{
                        transform: isHovered ? "scale(1.1)" : "scale(1)",
                        opacity: isHovered && !isYouTube ? 0 : 0.95,
                    }}
                >
                    <div
                        className="flex items-center justify-center rounded-full"
                        style={{
                            width: isYouTube ? 66 : 64,
                            height: isYouTube ? 46 : 64,
                            borderRadius: isYouTube ? 14 : 999,
                            background: isYouTube ? "#FF0000" : "#141414",
                            boxShadow: "0 12px 34px rgba(0,0,0,0.35)",
                        }}
                    >
                        <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>

                {/* Duration Badge */}
                {duration && !isYouTube && (
                    <div
                        className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-md"
                        style={{ background: "rgba(0,0,0,0.72)", color: "#fff" }}
                    >
                        {duration}
                    </div>
                )}

                {/* Category Badge */}
                <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider backdrop-blur-md"
                    style={{ background: "rgba(0,0,0,0.72)", color: "#fff" }}
                >
                    {CATEGORIES.find((c) => c.id === video.category)?.label || video.category}
                </div>
            </div>

            {/* Title */}
            <div className="mt-4 px-1">
                <h3
                    className="text-lg font-bold transition-colors duration-300 line-clamp-2"
                    style={{ color: isHovered ? COLORS.left : "#1b1f3b" }}
                >
                    {video.title}
                </h3>
            </div>
        </div>
    );
};

// ── Video Player Modal ──
const VideoPlayerModal = ({ video, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    if (!video) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
            style={{
                background: "rgba(27, 31, 59, 0.55)",
                backdropFilter: "blur(20px)",
                animation: "fadeIn 0.3s ease",
            }}
            onClick={handleBackdropClick}
        >
            {/* Modal Container (shrinks to the video) */}
            <div
                ref={modalRef}
                className="relative inline-block max-w-[95vw]"
                style={{ animation: "modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute -top-14 right-0 sm:-top-16 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 z-50"
                    style={{
                        background: "#141414",
                        border: "1px solid rgba(255,255,255,0.12)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    }}
                >
                    <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Video Player Container */}
                <div
                    className="relative rounded-3xl overflow-hidden"
                    style={{
                        border: "3px solid transparent",
                        backgroundImage: `linear-gradient(#000, #000), ${GRADIENT}`,
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                        boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
                    }}
                >
                    <div
                        className="absolute top-0 left-0 right-0 h-1 z-10"
                        style={{ background: GRADIENT }}
                    />

                    {video.type === "youtube" ? (
                        <div className="aspect-video w-[92vw] max-w-5xl bg-black">
                            <iframe
                                key={video.videoId}
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <video
                            key={video.src}
                            src={video.src}
                            className="block max-h-[80vh] max-w-[92vw] w-auto h-auto bg-black"
                            controls
                            autoPlay
                            playsInline
                        />
                    )}

                    <div
                        className="absolute bottom-0 left-0 right-0 h-1"
                        style={{ background: `linear-gradient(90deg, ${COLORS.right}, ${COLORS.left})` }}
                    />
                </div>

                {/* Title */}
                <p className="mt-4 text-center text-sm font-semibold text-white/90">
                    {video.title}
                </p>
            </div>

            {/* ESC hint */}
            <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md hidden sm:block"
                style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "#fff",
                }}
            >
                Press <span className="font-bold">ESC</span> or click outside to close
            </div>
        </div>
    );
};

// ══════════════════════════════════════════
//  MY WORK — Main Component
// ══════════════════════════════════════════
export default function MyWork() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    const filteredVideos =
        activeCategory === "all"
            ? VIDEO_DATA
            : VIDEO_DATA.filter((video) => video.category === activeCategory);

    return (
        <>
            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeSlideDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes shimmer {
                    0% { background-position: -300% center; }
                    100% { background-position: 300% center; }
                }

                @keyframes glowPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }

                @keyframes orbFloat {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -20px) scale(1.05); }
                    66% { transform: translate(-20px, 15px) scale(0.95); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes modalSlideUp {
                    from { opacity: 0; transform: translateY(60px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .video-card {
                    transition: transform 0.3s ease;
                }

                .video-card:hover {
                    transform: translateY(-8px);
                }
            `}</style>

            <section
                ref={sectionRef}
                id="work"
                className="relative w-full text-[#1b1f3b] py-28 md:py-36 px-6 sm:px-12 lg:px-20 xl:px-28 overflow-hidden"
                style={{ background: COLORS.bg }}
            >
                {/* Background Elements */}
                <div
                    className="orb-1 absolute top-0 left-0 w-[700px] h-[700px] pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at top left, ${COLORS.left}10 0%, transparent 65%)`,
                        animation: "orbFloat 20s ease-in-out infinite",
                    }}
                />
                <div
                    className="orb-2 absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at bottom right, ${COLORS.right}0c 0%, transparent 65%)`,
                        animation: "orbFloat 25s ease-in-out infinite reverse",
                    }}
                />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(${COLORS.left} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.left} 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Main Content */}
                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Section Header */}
                    <div
                        className="text-center mb-16 space-y-6"
                        style={{
                            animation: visible ? "fadeSlideDown 0.8s ease forwards" : "none",
                            opacity: 0,
                        }}
                    >
                        <div
                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border backdrop-blur-sm"
                            style={{
                                borderColor: `${COLORS.left}50`,
                                background: `${COLORS.left}12`,
                            }}
                        >
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{
                                    background: COLORS.mid,
                                    animation: "glowPulse 2s ease-in-out infinite",
                                    boxShadow: `0 0 10px ${COLORS.mid}`,
                                }}
                            />
                            <span
                                className="text-[15px] font-semibold uppercase tracking-[0.2em]"
                                style={{ color: COLORS.mid }}
                            >
                                Portfolio
                            </span>
                        </div>

                        <h2 className="text-[42px] sm:text-[54px] md:text-[64px] lg:text-[72px] font-extrabold tracking-tight leading-[1.05]">
                            <span className="text-[#1b1f3b]">My Latest </span>
                            <span
                                style={{
                                    background: GRADIENT,
                                    backgroundSize: "300% auto",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    animation: "shimmer 5s linear infinite",
                                }}
                            >
                                Projects
                            </span>
                        </h2>

                        <p className="text-[#4b5563] text-[17px] leading-[1.7] max-w-2xl mx-auto">
                            A curated collection of my finest work — YouTube edits, long form,
                            short form, AI-generated videos, and map animation.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div
                        className="flex flex-wrap items-center justify-center gap-3 mb-16"
                        style={{
                            animation: visible ? "fadeSlideUp 0.8s ease forwards 0.2s" : "none",
                            opacity: 0,
                        }}
                    >
                        {CATEGORIES.map((category) => {
                            const count =
                                category.id === "all"
                                    ? VIDEO_DATA.length
                                    : VIDEO_DATA.filter((v) => v.category === category.id).length;

                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className="px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-1"
                                    style={{
                                        background:
                                            activeCategory === category.id
                                                ? "#141414"
                                                : `${COLORS.left}12`,
                                        border: `2px solid ${activeCategory === category.id
                                            ? "transparent"
                                            : `${COLORS.left}30`
                                            }`,
                                        color: activeCategory === category.id ? "#fff" : COLORS.mid,
                                        boxShadow:
                                            activeCategory === category.id
                                                ? "0 10px 26px rgba(0,0,0,0.2)"
                                                : "none",
                                    }}
                                >
                                    <span className="mr-2">{category.icon}</span>
                                    {category.label}
                                    <span className="ml-2 opacity-60">{count}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Videos Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredVideos.map((video, index) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                                index={index}
                                onClick={setSelectedVideo}
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredVideos.length === 0 && (
                        <div className="text-center py-20">
                            <div
                                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                                style={{
                                    background: `${COLORS.left}20`,
                                    border: `2px solid ${COLORS.left}40`,
                                }}
                            >
                                <svg
                                    className="w-12 h-12"
                                    style={{ color: COLORS.mid }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-[#1b1f3b] mb-2">
                                No videos found
                            </h3>
                            <p style={{ color: COLORS.right }}>
                                Try selecting a different category
                            </p>
                        </div>
                    )}
                </div>

                {/* Video Player Modal */}
                {selectedVideo && (
                    <VideoPlayerModal
                        video={selectedVideo}
                        onClose={() => setSelectedVideo(null)}
                    />
                )}
            </section>
        </>
    );
}

import React, { useState, useRef, useEffect } from "react";

// ── Brand Palette ──
const COLORS = {
    bg: "#080B29",
    left: "#623BFD",
    mid: "#D4C8FE",
    right: "#B296FE",
};

const GRADIENT = `linear-gradient(135deg, ${COLORS.left} 0%, ${COLORS.right} 60%, ${COLORS.mid} 100%)`;

// ── Video Data ──
const VIDEO_DATA = [
    {
        id: 1,
        title: "Where You Start",
        category: "long-form",
        thumbnail: "https://img.youtube.com/vi/P8H7y-8p-Qs/maxresdefault.jpg",
        videoId: "P8H7y-8p-Qs",
        duration: "Auto",
        views: "1.2M",
    },
    {
        id: 2,
        title: "Kodee Ai",
        category: "long-form",
        thumbnail: "https://img.youtube.com/vi/W-7UAeBpyOg/maxresdefault.jpg",
        videoId: "W-7UAeBpyOg",
        duration: "Auto",
        views: "856K",
    },
    {
        id: 3,
        title: "Why Everything Free",
        category: "long-form",
        thumbnail: "https://img.youtube.com/vi/njuHIfe-KaU/maxresdefault.jpg",
        videoId: "njuHIfe-KaU",
        duration: "Auto",
        views: "2.1M",
    },
    {
        id: 4,
        title: "Hidden Pinterest Method",
        category: "long-form",
        thumbnail: "https://img.youtube.com/vi/XGGzUASrCNM/maxresdefault.jpg",
        videoId: "XGGzUASrCNM",
        duration: "Auto",
        views: "945K",
    },
    {
        id: 5,
        title: "Best Ai Platforms",
        category: "long-form",
        thumbnail: "https://img.youtube.com/vi/JAMdB9Z8S48/maxresdefault.jpg",
        videoId: "JAMdB9Z8S48",
        duration: "Auto",
        views: "3.4M",
    },
    {
        id: 6,
        title: "Proxy Provider",
        category: "long-form",
        thumbnail: "https://img.youtube.com/vi/s_yI11DtuSI/maxresdefault.jpg",
        videoId: "s_yI11DtuSI",
        duration: "Auto",
        views: "2.8M",
    },
    {
        id: 7,
        title: "Shop Visit",
        category: "long-form",
        thumbnail: "https://img.youtube.com/vi/DtDV_SuNG_E/maxresdefault.jpg",
        videoId: "DtDV_SuNG_E",
        duration: "Auto",
        views: "678K",
    },
    {
        id: 8,
        title: "Behind The Seens",
        category: "long-form",
        thumbnail: "https://img.youtube.com/vi/QDGC1HNkrk4/maxresdefault.jpg",
        videoId: "QDGC1HNkrk4",
        duration: "Auto",
        views: "1.5M",
    },
    {
        id: 9,
        title: "Beat The Fear",
        category: "long-form",
        thumbnail: "https://img.youtube.com/vi/NX99TrvX9nY/maxresdefault.jpg",
        videoId: "NX99TrvX9nY",
        duration: "Auto",
        views: "4.2M",
    },
    {
        id: 10,
        title: "Education",
        category: "long-form",
        thumbnail: "https://img.youtube.com/vi/939doRHnAHM/maxresdefault.jpg",
        videoId: "939doRHnAHM",
        duration: "Auto",
        views: "5.1M",
    },
    {
        id: 11,
        title: "Tricks & Hacks",
        category: "long-form",
        thumbnail: "https://img.youtube.com/vi/orywj-XQs3I/maxresdefault.jpg",
        videoId: "orywj-XQs3I",
        duration: "Auto",
        views: "890K",
    },
    {
        id: 12,
        title: "Youtube + LM",
        category: "long-form",
        thumbnail: "https://img.youtube.com/vi/uX0NC510G_Y/maxresdefault.jpg",
        videoId: "uX0NC510G_Y",
        duration: "Auto",
        views: "1.8M",
    },
];

const CATEGORIES = [
    { id: "all", label: "All Projects", icon: "🎬" },
    { id: "long-form", label: "Long Form", icon: "📹" },
    { id: "short-form", label: "Short Form", icon: "⚡" },
    { id: "reels", label: "Reels", icon: "📱" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "documentary", label: "Documentary", icon: "🎥" },
    { id: "cinematic", label: "Cinematic", icon: "🎞️" },
];

// ── Video Card Component ──
const VideoCard = ({ video, onClick, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="video-card group relative cursor-pointer"
            onClick={() => onClick(video)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                animation: `fadeSlideUp 0.6s ease forwards ${index * 0.1}s`,
                opacity: 0,
            }}
        >
            {/* Thumbnail Container */}
            <div className="relative overflow-hidden rounded-2xl aspect-video">
                {/* Thumbnail Image */}
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                        background: `linear-gradient(to top, ${COLORS.bg} 0%, transparent 50%, ${COLORS.left}20 100%)`,
                        opacity: isHovered ? 1 : 0.7,
                    }}
                />

                {/* Animated Border */}
                <div
                    className="absolute inset-0 rounded-2xl transition-opacity duration-500"
                    style={{
                        border: `2px solid ${COLORS.left}`,
                        opacity: isHovered ? 1 : 0,
                        boxShadow: isHovered ? `0 0 30px ${COLORS.left}50` : "none",
                    }}
                />

                {/* Play Button */}
                <div
                    className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                    style={{
                        transform: isHovered ? "scale(1)" : "scale(0.8)",
                        opacity: isHovered ? 1 : 0.7,
                    }}
                >
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500"
                        style={{
                            background: isHovered ? GRADIENT : `${COLORS.left}80`,
                            boxShadow: `0 10px 40px ${COLORS.left}60`,
                        }}
                    >
                        <svg
                            className="w-8 h-8 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>

                {/* Duration Badge */}
                <div
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md"
                    style={{
                        background: "rgba(0,0,0,0.7)",
                        color: COLORS.mid,
                    }}
                >
                    {video.duration}
                </div>

                {/* Views Badge */}
                <div
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md flex items-center gap-1.5"
                    style={{
                        background: "rgba(0,0,0,0.7)",
                        color: "#fff",
                    }}
                >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    {video.views}
                </div>
            </div>

            {/* Title */}
            <div className="mt-4 px-1">
                <h3
                    className="text-lg font-bold text-white transition-colors duration-300 line-clamp-2"
                    style={{ color: isHovered ? COLORS.mid : "#fff" }}
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
        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
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
                background: "rgba(8, 11, 41, 0.97)",
                backdropFilter: "blur(20px)",
                animation: "fadeIn 0.3s ease",
            }}
            onClick={handleBackdropClick}
        >
            {/* Animated Background Orbs in Modal */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-[120px] opacity-20"
                    style={{
                        background: COLORS.left,
                        animation: "orbFloat 15s ease-in-out infinite",
                    }}
                />
                <div
                    className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full blur-[120px] opacity-15"
                    style={{
                        background: COLORS.right,
                        animation: "orbFloat 20s ease-in-out infinite reverse",
                    }}
                />
            </div>

            {/* Modal Container */}
            <div
                ref={modalRef}
                className="relative w-full max-w-7xl"
                style={{
                    animation: "modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
            >
                {/* Close Button - Enhanced Design */}
                <button
                    onClick={onClose}
                    className="absolute -top-14 right-0 sm:-top-16 md:-top-20 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 group z-50"
                    style={{
                        background: `linear-gradient(135deg, ${COLORS.left}40, ${COLORS.right}30)`,
                        border: `2px solid ${COLORS.left}60`,
                        boxShadow: `0 8px 32px ${COLORS.left}30`,
                    }}
                >
                    <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={COLORS.mid}
                        strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    {/* Hover Glow Effect */}
                    <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                        style={{
                            background: GRADIENT,
                        }}
                    />
                </button>

                {/* Video Player Container - Enhanced */}
                <div
                    className="relative rounded-3xl overflow-hidden"
                    style={{
                        border: `3px solid transparent`,
                        backgroundImage: `linear-gradient(${COLORS.bg}, ${COLORS.bg}), ${GRADIENT}`,
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                        boxShadow: `
                            0 0 80px ${COLORS.left}40,
                            0 0 40px ${COLORS.right}30,
                            inset 0 0 40px ${COLORS.left}10
                        `,
                    }}
                >
                    {/* Top Gradient Bar */}
                    <div
                        className="absolute top-0 left-0 right-0 h-1 z-10"
                        style={{
                            background: GRADIENT,
                            boxShadow: `0 0 20px ${COLORS.left}60`,
                        }}
                    />

                    {/* Video Iframe */}
                    <div className="aspect-video relative">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>

                    {/* Bottom Gradient Bar */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-1"
                        style={{
                            background: `linear-gradient(90deg, ${COLORS.right}, ${COLORS.left})`,
                            boxShadow: `0 0 20px ${COLORS.right}60`,
                        }}
                    />
                </div>

                {/* Corner Accents */}
                <div
                    className="absolute -top-2 -left-2 w-12 h-12 rounded-tl-3xl pointer-events-none"
                    style={{
                        borderTop: `3px solid ${COLORS.left}`,
                        borderLeft: `3px solid ${COLORS.left}`,
                        boxShadow: `0 0 20px ${COLORS.left}50`,
                    }}
                />
                <div
                    className="absolute -top-2 -right-2 w-12 h-12 rounded-tr-3xl pointer-events-none"
                    style={{
                        borderTop: `3px solid ${COLORS.right}`,
                        borderRight: `3px solid ${COLORS.right}`,
                        boxShadow: `0 0 20px ${COLORS.right}50`,
                    }}
                />
                <div
                    className="absolute -bottom-2 -left-2 w-12 h-12 rounded-bl-3xl pointer-events-none"
                    style={{
                        borderBottom: `3px solid ${COLORS.right}`,
                        borderLeft: `3px solid ${COLORS.right}`,
                        boxShadow: `0 0 20px ${COLORS.right}50`,
                    }}
                />
                <div
                    className="absolute -bottom-2 -right-2 w-12 h-12 rounded-br-3xl pointer-events-none"
                    style={{
                        borderBottom: `3px solid ${COLORS.left}`,
                        borderRight: `3px solid ${COLORS.left}`,
                        boxShadow: `0 0 20px ${COLORS.left}50`,
                    }}
                />
            </div>

            {/* ESC hint - Small text at bottom */}
            <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md hidden sm:block"
                style={{
                    background: `${COLORS.left}20`,
                    border: `1px solid ${COLORS.left}40`,
                    color: COLORS.mid,
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
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeSlideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
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
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.4;
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
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes modalSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(60px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
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
                className="relative w-full text-white py-28 md:py-36 px-6 sm:px-12 lg:px-20 xl:px-28 overflow-hidden"
                style={{ background: COLORS.bg }}
            >
                {/* Background Elements */}
                <div
                    className="orb-1 absolute top-0 left-0 w-[700px] h-[700px] pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at top left, ${COLORS.left}25 0%, transparent 65%)`,
                        animation: "orbFloat 20s ease-in-out infinite",
                    }}
                />
                <div
                    className="orb-2 absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at bottom right, ${COLORS.right}20 0%, transparent 65%)`,
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
                            <span className="text-white">My Latest </span>
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

                        <p
                            className="text-[#B8BDD9] text-[20px] leading-[1.7] max-w-2xl mx-auto"
                        >
                            A curated collection of my finest work across multiple formats and styles
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
                        {CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className="px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background:
                                        activeCategory === category.id
                                            ? GRADIENT
                                            : `${COLORS.left}15`,
                                    border: `2px solid ${activeCategory === category.id
                                        ? "transparent"
                                        : `${COLORS.left}30`
                                        }`,
                                    color: activeCategory === category.id ? "#fff" : COLORS.mid,
                                    boxShadow:
                                        activeCategory === category.id
                                            ? `0 10px 30px ${COLORS.left}40`
                                            : "none",
                                }}
                            >
                                <span className="mr-2">{category.icon}</span>
                                {category.label}
                            </button>
                        ))}
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
                            <h3 className="text-2xl font-bold text-white mb-2">
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
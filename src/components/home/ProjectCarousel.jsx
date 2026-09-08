import React, { useEffect, useRef, useState } from "react";

export default function ProjectCarousel() {
    const [projects] = useState([
        {
            id: 1,
            title: "Professional Video Editing Showcase",
            category: "Cinematic Editing",
            client: "Faisal Shabbir",
            duration: "Auto",
            views: "Auto",
            thumbnail: "https://img.youtube.com/vi/P8H7y-8p-Qs/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/embed/P8H7y-8p-Qs",
            videoId: "P8H7y-8p-Qs",
        },
        {
            id: 2,
            title: "Creative Motion Graphics",
            category: "Motion Design",
            client: "Faisal Shabbir",
            duration: "Auto",
            views: "Auto",
            thumbnail: "https://img.youtube.com/vi/W-7UAeBpyOg/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/embed/W-7UAeBpyOg",
            videoId: "W-7UAeBpyOg",
        },
        {
            id: 3,
            title: "Advanced Color Grading",
            category: "Color Science",
            client: "Faisal Shabbir",
            duration: "Auto",
            views: "Auto",
            thumbnail: "https://img.youtube.com/vi/njuHIfe-KaU/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/embed/njuHIfe-KaU",
            videoId: "njuHIfe-KaU",
        },
        {
            id: 4,
            title: "Dynamic Visual Effects",
            category: "VFX Production",
            client: "Faisal Shabbir",
            duration: "Auto",
            views: "Auto",
            thumbnail: "https://img.youtube.com/vi/XGGzUASrCNM/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/embed/XGGzUASrCNM",
            videoId: "XGGzUASrCNM",
        },
        {
            id: 5,
            title: "Storytelling Through Edits",
            category: "Narrative Editing",
            client: "Faisal Shabbir",
            duration: "Auto",
            views: "Auto",
            thumbnail: "https://img.youtube.com/vi/JAMdB9Z8S48/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/embed/JAMdB9Z8S48",
            videoId: "JAMdB9Z8S48",
        },
        {
            id: 6,
            title: "Premium Sound Design",
            category: "Audio Engineering",
            client: "Faisal Shabbir",
            duration: "Auto",
            views: "Auto",
            thumbnail: "https://img.youtube.com/vi/s_yI11DtuSI/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/embed/s_yI11DtuSI",
            videoId: "s_yI11DtuSI",
        },
        {
            id: 7,
            title: "Cinematic Masterpiece",
            category: "Film Production",
            client: "Faisal Shabbir",
            duration: "Auto",
            views: "Auto",
            thumbnail: "https://img.youtube.com/vi/DtDV_SuNG_E/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/embed/DtDV_SuNG_E",
            videoId: "DtDV_SuNG_E",
        },
        {
            id: 8,
            title: "Visual Storytelling",
            category: "Creative Editing",
            client: "Faisal Shabbir",
            duration: "Auto",
            views: "Auto",
            thumbnail: "https://img.youtube.com/vi/QDGC1HNkrk4/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/embed/QDGC1HNkrk4",
            videoId: "QDGC1HNkrk4",
        },
        {
            id: 9,
            title: "Professional Grade Edit",
            category: "High-End Production",
            client: "Faisal Shabbir",
            duration: "Auto",
            views: "Auto",
            thumbnail: "https://img.youtube.com/vi/08yvCGFNI1Q/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/embed/08yvCGFNI1Q",
            videoId: "08yvCGFNI1Q",
        },
        {
            id: 10,
            title: "Advanced Techniques Showcase",
            category: "Expert Level",
            client: "Faisal Shabbir",
            duration: "Auto",
            views: "Auto",
            thumbnail: "https://img.youtube.com/vi/aMePsvLnw-0/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/embed/aMePsvLnw-0",
            videoId: "aMePsvLnw-0",
        },
    ]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isMaximized, setIsMaximized] = useState(false);
    const [videoData, setVideoData] = useState({});

    // Popup Audio States
    const [volume, setVolume] = useState(70);
    const [isMuted, setIsMuted] = useState(false);

    const sectionRef = useRef(null);
    const youtubePlayerRef = useRef(null);
    const nativeVideoRef = useRef(null);

    // YouTube API key - optional
    const YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY_HERE";

    const isYoutubeVideo = (project) => {
        if (!project?.videoUrl) return false;

        return (
            project.videoUrl.includes("youtube.com") ||
            project.videoUrl.includes("youtu.be")
        );
    };

    // YouTube iframe ko commands bhejne ke liye
    const sendYoutubeCommand = (func, args = []) => {
        const iframe = youtubePlayerRef.current;

        if (!iframe?.contentWindow) return;

        iframe.contentWindow.postMessage(
            JSON.stringify({
                event: "command",
                func,
                args,
            }),
            "*"
        );
    };

    // YouTube aur normal mp4 video dono ka volume handle karega
    const syncPopupAudio = (nextVolume, muted) => {
        const safeVolume = Math.max(0, Math.min(100, nextVolume));

        sendYoutubeCommand("setVolume", [safeVolume]);

        if (muted || safeVolume === 0) {
            sendYoutubeCommand("mute");
        } else {
            sendYoutubeCommand("unMute");
        }

        const nativeVideo = nativeVideoRef.current;

        if (nativeVideo) {
            nativeVideo.volume = safeVolume / 100;
            nativeVideo.muted = muted || safeVolume === 0;
        }
    };

    const openProject = (project) => {
        setVolume(70);
        setIsMuted(false);
        setIsMaximized(false);
        setSelectedProject(project);
    };

    const closeProject = () => {
        sendYoutubeCommand("pauseVideo");

        if (nativeVideoRef.current) {
            nativeVideoRef.current.pause();
        }

        setSelectedProject(null);
        setIsMaximized(false);
    };

    const handleVolumeChange = (event) => {
        const nextVolume = Number(event.target.value);
        const shouldMute = nextVolume === 0;

        setVolume(nextVolume);
        setIsMuted(shouldMute);

        syncPopupAudio(nextVolume, shouldMute);
    };

    const handleMuteToggle = () => {
        if (isMuted || volume === 0) {
            const restoredVolume = volume === 0 ? 70 : volume;

            setVolume(restoredVolume);
            setIsMuted(false);

            syncPopupAudio(restoredVolume, false);
            return;
        }

        setIsMuted(true);
        syncPopupAudio(volume, true);
    };

    const handleYoutubePlayerLoad = () => {
        window.setTimeout(() => {
            const shouldMute = isMuted || volume === 0;

            syncPopupAudio(volume, shouldMute);
            sendYoutubeCommand("playVideo");
        }, 700);
    };

    const handleNativeVideoReady = (event) => {
        const video = event.currentTarget;

        video.volume = volume / 100;
        video.muted = isMuted;

        video.play().catch(() => { });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const items =
                            entry.target.querySelectorAll(".scroll-reveal");

                        items.forEach((item, i) => {
                            setTimeout(() => {
                                item.classList.add("revealed");
                            }, i * 150);
                        });
                    }
                });
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Fetch video data from YouTube API
    useEffect(() => {
        const fetchVideoData = async () => {
            const videoIds = projects.map((p) => p.videoId).join(",");

            try {
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
                );

                const data = await response.json();

                if (data.items) {
                    const newVideoData = {};

                    data.items.forEach((item) => {
                        const duration = item.contentDetails.duration;
                        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

                        let formattedDuration = "";

                        if (match) {
                            const hours = (match[1] || "").replace("H", "");
                            const minutes = (match[2] || "").replace("M", "");
                            const seconds = (match[3] || "").replace("S", "");

                            if (hours) {
                                formattedDuration = `${hours}:${minutes.padStart(
                                    2,
                                    "0"
                                )}:${seconds.padStart(2, "0")}`;
                            } else {
                                formattedDuration = `${minutes || "0"}:${seconds.padStart(
                                    2,
                                    "0"
                                )}`;
                            }
                        }

                        const viewCount = parseInt(item.statistics.viewCount);

                        let formattedViews = "";

                        if (viewCount >= 1000000) {
                            formattedViews =
                                (viewCount / 1000000).toFixed(1) + "M";
                        } else if (viewCount >= 1000) {
                            formattedViews = (viewCount / 1000).toFixed(1) + "K";
                        } else {
                            formattedViews = viewCount.toString();
                        }

                        newVideoData[item.id] = {
                            duration: formattedDuration,
                            views: formattedViews,
                            rawViews: viewCount,
                        };
                    });

                    setVideoData(newVideoData);
                }
            } catch (error) {
                console.error("Error fetching YouTube data:", error);
            }
        };

        if (YOUTUBE_API_KEY !== "YOUR_YOUTUBE_API_KEY_HERE") {
            fetchVideoData();
        }
    }, [projects]);

    const handlePrev = () => {
        setActiveIndex((prev) =>
            prev === 0 ? projects.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setActiveIndex((prev) =>
            prev === projects.length - 1 ? 0 : prev + 1
        );
    };

    // Auto-play carousel
    useEffect(() => {
        if (selectedProject) return;

        const interval = setInterval(() => {
            handleNext();
        }, 6000);

        return () => clearInterval(interval);
    }, [activeIndex, selectedProject]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (event) => {
            if (selectedProject) {
                if (event.key === "Escape") {
                    closeProject();
                }
            } else {
                if (event.key === "ArrowLeft") handlePrev();
                if (event.key === "ArrowRight") handleNext();
            }
        };

        window.addEventListener("keydown", handleKey);

        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedProject]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedProject]);

    const getYoutubeId = (url) => {
        if (!url) return "";

        const match = url.match(/embed\/([^?&]+)/);

        return match ? match[1] : "";
    };

    const getVideoStats = (project) => {
        const data = videoData[project.videoId];

        return {
            duration: data?.duration || project.duration,
            views: data?.views || project.views,
        };
    };

    return (
        <>
            <section
                ref={sectionRef}
                id="portfolio"
                className="relative w-full overflow-hidden bg-white px-5 pt-32 pb-24 text-[#1b1f3b] sm:px-10 md:pt-40 md:pb-32 lg:px-16 xl:px-24"
            >
                {/* Top Blend */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-40"
                    style={{
                        background:
                            "linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
                    }}
                />

                {/* Bottom Blend */}
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40"
                    style={{
                        background:
                            "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
                    }}
                />

                {/* Ambient Glows */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="orb-glow orb-1 absolute -top-20 right-[-10%] h-[500px] w-[500px] rounded-full bg-[#8168F0]/5 blur-[130px]" />
                    <div className="orb-glow orb-2 absolute bottom-0 left-[-10%] h-[500px] w-[500px] rounded-full bg-[#B296FE]/5 blur-[130px]" />
                    <div className="orb-glow orb-3 absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b5cf6]/6 blur-[120px]" />
                </div>

                {/* Floating Particles */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="particle absolute rounded-full bg-[#8b5cf6]"
                            style={{
                                width: `${3 + Math.random() * 4}px`,
                                height: `${3 + Math.random() * 4}px`,
                                left: `${10 + Math.random() * 80}%`,
                                top: `${10 + Math.random() * 80}%`,
                                animationDelay: `${i * 1.2}s`,
                                animationDuration: `${6 + Math.random() * 4}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
                    {/* ===== HEADER ===== */}
                    <div className="mb-16 flex max-w-4xl flex-col items-center space-y-6 text-center">
                        <div className="scroll-reveal inline-flex items-center gap-2 rounded-full border border-[#8168F0]/25 bg-[#8168F0]/8 px-6 py-2.5 backdrop-blur-md">
                            <span className="pulse-dot h-2 w-2 rounded-full bg-[#8168F0] shadow-[0_0_8px_rgba(98,59,253,0.4)]" />

                            <span className="text-sm font-semibold uppercase tracking-wider text-[#8168F0]">
                                Portfolio Showcase
                            </span>
                        </div>

                        <h2 className="scroll-reveal text-[32px] font-extrabold leading-[1.1] tracking-tight text-[#1b1f3b] sm:text-[42px] md:text-[50px] lg:text-[58px]">
                            My Most Popular{" "}
                            <span className="heading-gradient inline-block bg-gradient-to-r from-[#8168F0] via-[#8b5cf6] to-[#9D6BFF] bg-clip-text text-transparent">
                                Edit Collections
                            </span>
                        </h2>

                        <p className="scroll-reveal max-w-2xl text-[17px] leading-[1.8] text-[#4b5563]">
                            Explore my featured portfolio of cinematic edits,
                            motion graphics, and high-impact commercial productions
                            crafted for global brands.
                        </p>
                    </div>

                    {/* ===== CAROUSEL STAGE ===== */}
                    <div className="scroll-reveal relative flex h-[420px] w-full items-center justify-center sm:h-[480px] md:h-[520px]">
                        {/* Prev Button */}
                        <button
                            onClick={handlePrev}
                            aria-label="Previous project"
                            className="carousel-btn group absolute left-2 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#e6e7ec] bg-white text-[#1b1f3b] shadow-[0_8px_24px_rgba(27,31,59,0.1)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-black/20 hover:bg-[#141414] hover:text-white sm:h-14 sm:w-14 lg:-left-4"
                        >
                            <svg
                                className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5 sm:h-6 sm:w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        {/* Cards Container */}
                        <div className="relative flex h-full w-full items-center justify-center overflow-visible">
                            {projects.map((project, index) => {
                                const offset = index - activeIndex;

                                let calculatedOffset = offset;

                                if (offset > projects.length / 2) {
                                    calculatedOffset -= projects.length;
                                }

                                if (offset < -projects.length / 2) {
                                    calculatedOffset += projects.length;
                                }

                                const absOffset = Math.abs(calculatedOffset);

                                if (absOffset > 3) return null;

                                const transformX = calculatedOffset * 32;
                                const scale = 1 - absOffset * 0.12;
                                const zIndex = 30 - absOffset;
                                const opacity = 1 - absOffset * 0.35;
                                const rotateY = calculatedOffset * -15;

                                const isActive = calculatedOffset === 0;
                                const ytId =
                                    project.videoId ||
                                    getYoutubeId(project.videoUrl);

                                const stats = getVideoStats(project);

                                return (
                                    <div
                                        key={project.id}
                                        onClick={() =>
                                            isActive && openProject(project)
                                        }
                                        className={`carousel-card group absolute flex h-[360px] w-[500px] flex-col overflow-hidden rounded-[28px] border border-[#e6e7ec] bg-white shadow-[0_30px_60px_rgba(27,31,59,0.14)] backdrop-blur-xl will-change-transform sm:h-[400px] sm:w-[600px] md:h-[440px] md:w-[720px] ${isActive
                                                ? "cursor-pointer border-[#8168F0]/40 hover:border-[#8168F0]/60 hover:shadow-[0_35px_70px_rgba(98,59,253,0.22)]"
                                                : "pointer-events-none"
                                            }`}
                                        style={{
                                            transform: `translateX(${transformX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                                            zIndex,
                                            opacity,
                                        }}
                                    >
                                        {/* Thumbnail / Video Area */}
                                        <div className="relative h-[75%] w-full overflow-hidden">
                                            {isActive && project.videoUrl ? (
                                                project.videoUrl.includes(
                                                    "youtube.com"
                                                ) ||
                                                    project.videoUrl.includes(
                                                        "embed"
                                                    ) ? (
                                                    <div className="relative h-full w-full overflow-hidden">
                                                        <div className="yt-wrapper absolute inset-0">
                                                            <iframe
                                                                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&modestbranding=1&iv_load_policy=3&rel=0&showinfo=0&disablekb=1&fs=0&playsinline=1`}
                                                                className="yt-iframe pointer-events-none"
                                                                title={project.title}
                                                                frameBorder="0"
                                                                allow="autoplay; encrypted-media"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <video
                                                        src={project.videoUrl}
                                                        className="h-full w-full object-cover"
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                    />
                                                )
                                            ) : (
                                                <img
                                                    src={project.thumbnail}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                />
                                            )}

                                            {/* Gradient overlay */}
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1b1f3b] via-[#1b1f3b]/25 to-transparent" />

                                            {/* Top edge overlay */}
                                            <div className="pointer-events-none absolute top-0 right-0 left-0 h-16 bg-gradient-to-b from-[#1b1f3b]/60 via-[#1b1f3b]/25 to-transparent" />

                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/25 bg-black/50 px-3 py-1.5 backdrop-blur-md">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#B296FE]" />

                                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E9E2FF]">
                                                    {project.category}
                                                </span>
                                            </div>

                                            {/* Duration Badge */}
                                            <div className="absolute top-4 right-4 z-10 rounded-full border border-white/25 bg-black/50 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                                                {stats.duration}
                                            </div>

                                            {/* Play Button */}
                                            {isActive && (
                                                <div className="play-overlay pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-500">
                                                    <div className="play-pulse flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#8168F0] to-[#B296FE] shadow-[0_0_30px_rgba(98,59,253,0.6)] sm:h-20 sm:w-20">
                                                        <svg
                                                            className="h-7 w-7 translate-x-0.5 text-white sm:h-8 sm:w-8"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom Info Bar */}
                                        <div className="flex flex-1 items-center justify-between border-t border-[#e6e7ec] bg-[#f6f7f9] px-5 py-4 backdrop-blur-md sm:px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#8168F0] to-[#B296FE] p-[2px]">
                                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#1b1f3b] text-xs font-bold text-white">
                                                        {project.client
                                                            .substring(0, 2)
                                                            .toUpperCase()}
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-sm font-bold text-[#1b1f3b]">
                                                        {project.title}
                                                    </p>

                                                    <p className="text-xs text-[#8a8fa3]">
                                                        {project.client}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-[#8a8fa3]">
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>

                                                <span className="font-semibold">
                                                    {stats.views}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={handleNext}
                            aria-label="Next project"
                            className="carousel-btn group absolute right-2 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#e6e7ec] bg-white text-[#1b1f3b] shadow-[0_8px_24px_rgba(27,31,59,0.1)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-black/20 hover:bg-[#141414] hover:text-white sm:h-14 sm:w-14 lg:-right-4"
                        >
                            <svg
                                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-6 sm:w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* ===== PROGRESS INDICATORS ===== */}
                    <div className="scroll-reveal mt-12 flex items-center gap-3">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                className={`h-2 rounded-full transition-all duration-500 ${index === activeIndex
                                        ? "w-10 bg-gradient-to-r from-[#8168F0] to-[#B296FE] shadow-[0_0_10px_rgba(98,59,253,0.4)]"
                                        : "w-2 bg-[#1b1f3b]/15 hover:bg-[#1b1f3b]/30"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* ===== SLIDE COUNTER ===== */}
                    <div className="scroll-reveal mt-6 flex items-center gap-2 text-sm text-[#8a8fa3]">
                        <span className="text-lg font-bold text-[#1b1f3b]">
                            {String(activeIndex + 1).padStart(2, "0")}
                        </span>

                        <span className="text-[#8168F0]">/</span>

                        <span>{String(projects.length).padStart(2, "0")}</span>
                    </div>

                    {/* ===== SEE MY HIDDEN SKILLS BUTTON ===== */}
                    <div className="scroll-reveal mt-16">
                        <a
                            href="/work"
                            className="cta-shimmer group inline-flex items-center gap-3 rounded-2xl bg-[#141414] px-10 py-5 text-base font-bold text-white shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
                        >
                            See My Hidden Skills

                            <svg
                                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* ==================== PREMIUM MODAL ==================== */}
            {selectedProject && (
                <div
                    className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10"
                    onClick={closeProject}
                >
                    {/* Backdrop Glows */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute -top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-[#8168F0]/6 blur-[150px]" />

                        <div className="absolute -right-1/4 -bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#B296FE]/6 blur-[150px]" />
                    </div>

                    <div
                        onClick={(event) => event.stopPropagation()}
                        className={`modal-scale-in relative flex flex-col overflow-hidden rounded-[28px] border border-[#e6e7ec] bg-white shadow-[0_40px_120px_rgba(27,31,59,0.35)] transition-all duration-500 ${isMaximized
                                ? "w-full max-w-[1400px]"
                                : "w-full max-w-5xl"
                            }`}
                    >
                        {/* Decorative gradient border */}
                        <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#8168F0] to-transparent" />

                        {/* Modal Header */}
                        <div className="relative z-10 flex items-center justify-between border-b border-[#e6e7ec] bg-[#f6f7f9] px-5 py-4 backdrop-blur-md sm:px-6">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-[#8168F0] to-[#B296FE] p-[2px]">
                                        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#1b1f3b] text-sm font-bold text-white">
                                            {selectedProject.client
                                                .substring(0, 2)
                                                .toUpperCase()}
                                        </div>
                                    </div>

                                    <span className="pulse-dot absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#8168F0]" />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8168F0]">
                                            {selectedProject.category}
                                        </span>

                                        <span className="rounded-full bg-[#8168F0]/12 px-2 py-0.5 text-[9px] font-bold uppercase text-[#8168F0]">
                                            HD
                                        </span>
                                    </div>

                                    <h3 className="text-base font-bold text-[#1b1f3b] sm:text-lg">
                                        {selectedProject.title}
                                    </h3>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        setIsMaximized(!isMaximized)
                                    }
                                    aria-label={
                                        isMaximized ? "Minimize" : "Maximize"
                                    }
                                    className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[#e6e7ec] bg-white text-[#6b7280] transition-all hover:border-[#8168F0]/50 hover:bg-[#8168F0]/10 hover:text-[#8168F0] sm:flex"
                                >
                                    {isMaximized ? (
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 9L4 4m0 0v5m0-5h5m6 0h5m0 0v5m0-5l-5 5M9 15l-5 5m0 0v-5m0 5h5m6 0h5m0 0v-5m0 5l-5-5"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                            />
                                        </svg>
                                    )}
                                </button>

                                <button
                                    onClick={closeProject}
                                    aria-label="Close"
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e6e7ec] bg-white text-[#6b7280] transition-all hover:rotate-90 hover:border-red-400/50 hover:bg-red-50 hover:text-red-500"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* ===== VIDEO VIEWPORT ===== */}
                        <div className="relative aspect-video w-full overflow-hidden bg-black">
                            {/* Loading placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#8168F0]" />

                                    <span className="text-xs uppercase tracking-widest text-[#9DA3C2]">
                                        Loading Project
                                    </span>
                                </div>
                            </div>

                            {selectedProject.videoUrl ? (
                                isYoutubeVideo(selectedProject) ? (
                                    <iframe
                                        ref={youtubePlayerRef}
                                        src={`${selectedProject.videoUrl}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&enablejsapi=1&playsinline=1`}
                                        onLoad={handleYoutubePlayerLoad}
                                        className="relative z-10 h-full w-full"
                                        title={selectedProject.title}
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video
                                        ref={nativeVideoRef}
                                        src={selectedProject.videoUrl}
                                        className="relative z-10 h-full w-full"
                                        autoPlay
                                        controls
                                        playsInline
                                        muted={isMuted}
                                        onLoadedMetadata={handleNativeVideoReady}
                                    />
                                )
                            ) : (
                                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#8168F0]/20 to-[#B296FE]/10">
                                        <svg
                                            className="h-10 w-10 text-[#B296FE]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2 2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>

                                    <div>
                                        <p className="text-lg font-bold text-white">
                                            Video Coming Soon
                                        </p>

                                        <p className="mt-1 text-sm text-[#9DA3C2]">
                                            This project's video feed will be
                                            available shortly.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ===== PREMIUM AUDIO PANEL ===== */}
                        <div className="player-audio-panel relative z-20 border-t border-[#e6e7ec] px-5 py-4 sm:px-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                {/* Audio Status */}
                                <div className="flex items-center gap-3">
                                    <div className="audio-equalizer flex h-9 w-9 items-center justify-center gap-1 rounded-xl border border-[#8168F0]/30 bg-[#8168F0]/10">
                                        <span />
                                        <span />
                                        <span />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-[#1b1f3b]">
                                            Project Audio
                                        </p>

                                        <p className="text-[11px] text-[#8a8fa3]">
                                            {isMuted || volume === 0
                                                ? "Sound is muted"
                                                : "Background sound is enabled"}
                                        </p>
                                    </div>
                                </div>

                                {/* Volume Controls */}
                                <div className="flex items-center gap-3 rounded-xl border border-[#e6e7ec] bg-[#f6f7f9] px-3 py-2.5 backdrop-blur-md">
                                    <button
                                        type="button"
                                        onClick={handleMuteToggle}
                                        aria-label={
                                            isMuted
                                                ? "Unmute project audio"
                                                : "Mute project audio"
                                        }
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#8168F0]/12 text-[#8168F0] transition-all duration-300 hover:bg-[#8168F0]/25 hover:text-white"
                                    >
                                        {isMuted || volume === 0 ? (
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11 5L6 9H2v6h4l5 4V5z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19 9l-6 6m0-6l6 6"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11 5L6 9H2v6h4l5 4V5z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"
                                                />
                                            </svg>
                                        )}
                                    </button>

                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={isMuted ? 0 : volume}
                                        onChange={handleVolumeChange}
                                        aria-label="Project audio volume"
                                        className="volume-slider h-1.5 w-24 cursor-pointer appearance-none rounded-full sm:w-36"
                                        style={{
                                            background: `linear-gradient(
                                                to right,
                                                #8168F0 0%,
                                                #B296FE ${isMuted ? 0 : volume
                                                }%,
                                                rgba(27,31,59,0.12) ${isMuted ? 0 : volume
                                                }%,
                                                rgba(27,31,59,0.12) 100%
                                            )`,
                                        }}
                                    />

                                    <span className="min-w-[44px] text-right text-xs font-bold text-[#8168F0]">
                                        {isMuted || volume === 0
                                            ? "Muted"
                                            : `${volume}%`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ===== MODAL FOOTER ===== */}
                        <div className="relative border-t border-[#e6e7ec] bg-[#f6f7f9] px-5 py-5 sm:px-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                {/* Client Detail */}
                                <div className="flex items-center gap-2 text-sm text-[#4b5563]">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8168F0]/10">
                                        <svg
                                            className="h-4 w-4 text-[#8168F0]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-[#8a8fa3]">
                                            Client
                                        </p>

                                        <p className="text-sm font-bold text-[#1b1f3b]">
                                            {selectedProject.client}
                                        </p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <a
                                    href="/work"
                                    className="cta-shimmer group inline-flex items-center gap-2 rounded-xl bg-[#141414] px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_10px_28px_rgba(0,0,0,0.26)]"
                                >
                                    View More Work

                                    <svg
                                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        section {
          perspective: 1600px;
        }

        /* ===== YOUTUBE IFRAME - HIDE BRANDING ===== */
        .yt-wrapper {
          overflow: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .yt-iframe {
          position: absolute;
          top: -60px;
          left: -60px;
          width: calc(100% + 120px);
          height: calc(100% + 120px);
          pointer-events: none;
        }

        /* ===== CAROUSEL CARD ===== */
        .carousel-card {
          transition:
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.6s ease,
            border-color 0.4s ease,
            box-shadow 0.4s ease;
          transform-style: preserve-3d;
        }

        .carousel-card:hover .play-overlay {
          opacity: 1;
        }

        /* ===== SCROLL REVEAL ===== */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition:
            opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== HEADING GRADIENT ===== */
        .heading-gradient {
          background-size: 300% 300%;
          animation: headingShift 5s ease-in-out infinite;
        }

        @keyframes headingShift {
          0%, 100% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }
        }

        /* ===== PULSE DOT ===== */
        .pulse-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }

        @keyframes pulseDot {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 8px rgba(178, 150, 254, 0.6);
          }

          50% {
            opacity: 0.5;
            box-shadow: 0 0 16px rgba(178, 150, 254, 0.9);
          }
        }

        /* ===== ORBS ===== */
        .orb-glow {
          animation: orbFloat 12s ease-in-out infinite;
        }

        .orb-1 {
          animation-delay: 0s;
        }

        .orb-2 {
          animation-delay: -4s;
        }

        .orb-3 {
          animation-delay: -8s;
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

        /* ===== PARTICLES ===== */
        .particle {
          opacity: 0.3;
          animation: particleDrift linear infinite;
        }

        @keyframes particleDrift {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }

          10% {
            opacity: 0.4;
          }

          90% {
            opacity: 0.4;
          }

          100% {
            transform: translateY(-120px) translateX(40px);
            opacity: 0;
          }
        }

        /* ===== PLAY PULSE ===== */
        .play-pulse {
          animation: playPulse 2s ease-in-out infinite;
        }

        @keyframes playPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 30px rgba(98, 59, 253, 0.6);
          }

          50% {
            transform: scale(1.08);
            box-shadow: 0 0 45px rgba(98, 59, 253, 0.9);
          }
        }

        /* ===== MODAL ANIMATIONS ===== */
        .modal-backdrop {
          background: rgba(27, 31, 59, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          animation: modalBackdropFade 0.3s ease-out forwards;
        }

        @keyframes modalBackdropFade {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        .modal-scale-in {
          animation: modalScaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }

        @keyframes modalScaleIn {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(20px);
          }

          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* ===== CTA SHIMMER ===== */
        .cta-shimmer {
          position: relative;
          overflow: hidden;
        }

        .cta-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }

          50%, 100% {
            left: 100%;
          }
        }

        /* ===== PREMIUM AUDIO PLAYER ===== */
        .player-audio-panel {
          background:
            radial-gradient(
              circle at left,
              rgba(98, 59, 253, 0.06),
              transparent 44%
            ),
            #ffffff;
        }

        .audio-equalizer span {
          display: block;
          width: 3px;
          border-radius: 999px;
          background: linear-gradient(to top, #8168F0, #D4C8FE);
          box-shadow: 0 0 10px rgba(178, 150, 254, 0.55);
          animation: audioWave 1s ease-in-out infinite;
        }

        .audio-equalizer span:nth-child(1) {
          height: 9px;
          animation-delay: 0s;
        }

        .audio-equalizer span:nth-child(2) {
          height: 15px;
          animation-delay: 0.18s;
        }

        .audio-equalizer span:nth-child(3) {
          height: 11px;
          animation-delay: 0.35s;
        }

        @keyframes audioWave {
          0%, 100% {
            transform: scaleY(0.55);
            opacity: 0.55;
          }

          50% {
            transform: scaleY(1.15);
            opacity: 1;
          }
        }

        .volume-slider {
          outline: none;
        }

        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          cursor: pointer;
          border: 2px solid #ffffff;
          border-radius: 999px;
          background: #B296FE;
          box-shadow: 0 0 14px rgba(178, 150, 254, 0.85);
          transition: transform 0.2s ease;
        }

        .volume-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .volume-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          cursor: pointer;
          border: 2px solid #ffffff;
          border-radius: 999px;
          background: #B296FE;
          box-shadow: 0 0 14px rgba(178, 150, 254, 0.85);
        }

        /* ===== REDUCED MOTION ===== */
        @media (prefers-reduced-motion: reduce) {
          .scroll-reveal,
          .heading-gradient,
          .pulse-dot,
          .orb-glow,
          .particle,
          .play-pulse,
          .carousel-card,
          .modal-backdrop,
          .modal-scale-in,
          .cta-shimmer::before,
          .audio-equalizer span {
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
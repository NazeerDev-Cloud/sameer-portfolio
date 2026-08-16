import { useState, useEffect, useRef } from 'react';

const COLORS = {
    bgDeep: "#05071D",
    bgMain: "#080B29",
    bgLight: "#17104A",
    primary: "#623BFD",
    primaryLight: "#7C5CFF",
    accent: "#9999FF",
    lavender: "#B296FE",
    softPurple: "#D4C8FE",
    aePurple: "#D291FF",
};

const GRADIENT_PRIMARY = `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 50%, ${COLORS.lavender} 100%)`;
const GRADIENT_TEXT = `linear-gradient(90deg, ${COLORS.lavender}, #ffffff, ${COLORS.primaryLight}, ${COLORS.softPurple})`;

// ✅ FIX 1: Pre-generate particle data OUTSIDE component (stable, no re-render issues)
const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    width: 3 + (((i * 7) % 5)),
    height: 3 + (((i * 13) % 5)),
    left: 15 + ((i * 19) % 70),
    top: 40 + ((i * 11) % 30),
    color: i % 3 === 0 ? COLORS.lavender : i % 3 === 1 ? COLORS.primaryLight : COLORS.aePurple,
    duration: 4 + ((i * 3) % 3),
    delay: i * 0.15,
    // ✅ FIX: Pre-determine direction instead of Math.random() in CSS
    directionX: i % 2 === 0 ? 50 : -50,
}));

export default function Intro({ onComplete }) {
    const [phase, setPhase] = useState('loading');
    const [progress, setProgress] = useState(0);
    // ✅ FIX 4: Use ref for onComplete to avoid dependency issues
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const loadingTimer = setTimeout(() => setPhase('entering'), 1500);
        const enterTimer = setTimeout(() => setPhase('visible'), 2000);
        const visibleTimer = setTimeout(() => setPhase('exiting'), 3500);
        const exitTimer = setTimeout(() => {
            setPhase('done');
            if (onCompleteRef.current) onCompleteRef.current();
        }, 4300);

        return () => {
            clearTimeout(loadingTimer);
            clearTimeout(enterTimer);
            clearTimeout(visibleTimer);
            clearTimeout(exitTimer);
        };
    }, []); // ✅ Empty dependency - runs once only

    // ✅ FIX 2: Progress bar - only use state, no CSS animation conflict
    useEffect(() => {
        if (phase !== 'loading') return;

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [phase]);

    if (phase === 'done') return null;

    return (
        <>
            <style>{`
                @keyframes introFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes introFadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes introScale3D {
                    0% { 
                        transform: perspective(1000px) rotateY(-90deg) scale(0.5);
                        opacity: 0;
                    }
                    60% {
                        transform: perspective(1000px) rotateY(10deg) scale(1.1);
                        opacity: 1;
                    }
                    100% { 
                        transform: perspective(1000px) rotateY(0deg) scale(1);
                        opacity: 1;
                    }
                }
                @keyframes introTextReveal {
                    0% {
                        transform: translateY(80px) rotateX(-45deg);
                        opacity: 0;
                        letter-spacing: 0.8em;
                    }
                    100% {
                        transform: translateY(0) rotateX(0deg);
                        opacity: 1;
                        letter-spacing: 0.15em;
                    }
                }
                @keyframes introLineExpand {
                    0% { 
                        width: 0%;
                        opacity: 0;
                    }
                    100% { 
                        width: 80%;
                        opacity: 1;
                    }
                }
                @keyframes introOrbFloat1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(120px, -60px) scale(1.3); }
                }
                @keyframes introOrbFloat2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-100px, 80px) scale(1.4); }
                }
                @keyframes introOrbFloat3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(80px, 100px) scale(0.9); }
                }
                @keyframes introShimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes introPulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.08); }
                }
                @keyframes introRotate3D {
                    from { transform: perspective(1000px) rotateY(0deg) rotateX(10deg); }
                    to { transform: perspective(1000px) rotateY(360deg) rotateX(10deg); }
                }
                
                /* ✅ FIX 1: Separate keyframes for each direction */
                @keyframes introParticleRight {
                    0% {
                        transform: translateY(0) translateX(0) scale(0);
                        opacity: 0;
                    }
                    50% { opacity: 1; }
                    100% {
                        transform: translateY(-250px) translateX(50px) scale(0);
                        opacity: 0;
                    }
                }
                @keyframes introParticleLeft {
                    0% {
                        transform: translateY(0) translateX(0) scale(0);
                        opacity: 0;
                    }
                    50% { opacity: 1; }
                    100% {
                        transform: translateY(-250px) translateX(-50px) scale(0);
                        opacity: 0;
                    }
                }
                @keyframes introPlayButton {
                    0% {
                        transform: scale(0) rotate(-180deg);
                        opacity: 0;
                    }
                    60% {
                        transform: scale(1.2) rotate(10deg);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1) rotate(0deg);
                        opacity: 1;
                    }
                }
                @keyframes introGlowRing {
                    0% { transform: scale(0.8); opacity: 0; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes introFilmStrip {
                    0% { transform: translateX(-100%); opacity: 0; }
                    100% { transform: translateX(100%); opacity: 0.3; }
                }
                @keyframes introGlassShine {
                    0% { transform: translateX(-100%) skewX(-15deg); }
                    100% { transform: translateX(200%) skewX(-15deg); }
                }

                /* ✅ Container needs position relative for absolute children */
                .intro-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background: radial-gradient(
                        circle at top left,
                        ${COLORS.bgLight} 0%,
                        ${COLORS.bgMain} 38%,
                        ${COLORS.bgDeep} 100%
                    );
                }
                .intro-entering { animation: introFadeIn 0.5s ease forwards; }
                .intro-exiting  { animation: introFadeOut 0.8s ease forwards; }

                .intro-logo-3d {
                    animation: introScale3D 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                    animation-delay: 0.3s;
                    opacity: 0;
                    transform-style: preserve-3d;
                }
                .intro-text-3d {
                    animation: introTextReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    animation-delay: 1s;
                    opacity: 0;
                    transform-style: preserve-3d;
                }
                .intro-line {
                    height: 3px;
                    border-radius: 9999px;
                    background: ${GRADIENT_PRIMARY};
                    box-shadow: 0 0 30px ${COLORS.primary}80, 0 0 60px ${COLORS.primaryLight}50;
                    width: 0%;
                    opacity: 0;
                    animation: introLineExpand 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    animation-delay: 1.5s;
                    animation-fill-mode: forwards;
                }
                .intro-orb-1 { animation: introOrbFloat1 10s ease-in-out infinite; }
                .intro-orb-2 { animation: introOrbFloat2 12s ease-in-out infinite; }
                .intro-orb-3 { animation: introOrbFloat3 11s ease-in-out infinite; }

                .intro-shimmer-text {
                    background: ${GRADIENT_TEXT};
                    background-size: 260% 100%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: introShimmer 4s linear infinite;
                }
                .intro-pulse {
                    animation: introPulse 2.5s ease-in-out infinite;
                }
                .intro-rotate-3d {
                    animation: introRotate3D 25s linear infinite;
                    transform-style: preserve-3d;
                }
                .intro-play-button {
                    animation: introPlayButton 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                    animation-delay: 0.5s;
                    opacity: 0;
                }
                .intro-glow-ring {
                    animation: introGlowRing 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    animation-delay: 0.8s;
                    opacity: 0;
                }
                .intro-film-strip {
                    animation: introFilmStrip 8s linear infinite;
                }
                .intro-glass-shine {
                    animation: introGlassShine 2s ease-in-out infinite;
                    animation-delay: 1s;
                }
                .intro-tagline {
                    animation: introTextReveal 1s ease forwards;
                    animation-delay: 1.8s;
                    opacity: 0;
                }
                .intro-corner {
                    position: absolute;
                    width: 96px;
                    height: 96px;
                    opacity: 0;
                    animation: introFadeIn 1s ease forwards;
                    backdrop-filter: blur(10px);
                }
            `}</style>

            <div
                className={`intro-container ${phase === 'entering' ? 'intro-entering' : ''
                    } ${phase === 'exiting' ? 'intro-exiting' : ''
                    }`}
            >
                {/* ── Background Orbs ── */}
                <div
                    className="intro-orb-1"
                    style={{
                        position: 'absolute',
                        top: '25%', left: '25%',
                        width: 600, height: 600,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${COLORS.primary}30 0%, transparent 70%)`,
                        filter: 'blur(100px)',
                        pointerEvents: 'none',
                    }}
                />
                <div
                    className="intro-orb-2"
                    style={{
                        position: 'absolute',
                        bottom: '25%', right: '25%',
                        width: 700, height: 700,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${COLORS.primaryLight}25 0%, transparent 70%)`,
                        filter: 'blur(120px)',
                        pointerEvents: 'none',
                    }}
                />
                <div
                    className="intro-orb-3"
                    style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500, height: 500,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${COLORS.lavender}20 0%, transparent 70%)`,
                        filter: 'blur(90px)',
                        pointerEvents: 'none',
                    }}
                />

                {/* ── 3D Rotating Ring ── */}
                <div
                    className="intro-rotate-3d"
                    style={{
                        position: 'absolute',
                        width: 500, height: 500,
                        borderRadius: '50%',
                        border: `2px solid ${COLORS.primary}30`,
                        boxShadow: `0 0 60px ${COLORS.primary}40, inset 0 0 60px ${COLORS.primary}20`,
                        pointerEvents: 'none',
                    }}
                >
                    {[
                        { pos: { top: 0, left: '50%', transform: 'translateX(-50%)' }, color: COLORS.primary, size: 16 },
                        { pos: { bottom: 0, left: '50%', transform: 'translateX(-50%)' }, color: COLORS.lavender, size: 12 },
                        { pos: { top: '50%', left: 0, transform: 'translateY(-50%)' }, color: COLORS.aePurple, size: 12 },
                    ].map((dot, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                width: dot.size, height: dot.size,
                                borderRadius: '50%',
                                background: dot.color,
                                boxShadow: `0 0 25px ${dot.color}`,
                                ...dot.pos,
                            }}
                        />
                    ))}
                </div>

                {/* ── Film Strip Top ── */}
                <div style={{
                    position: 'absolute', top: 80, left: 0,
                    width: '100%', height: 64,
                    overflow: 'hidden', opacity: 0.2, pointerEvents: 'none',
                }}>
                    <div className="intro-film-strip" style={{ display: 'flex', gap: 16 }}>
                        {Array.from({ length: 20 }, (_, i) => (
                            <div key={i} style={{
                                width: 48, height: 48, flexShrink: 0,
                                borderRadius: 8,
                                border: `2px solid ${COLORS.primary}60`,
                                background: `${COLORS.primary}10`,
                            }} />
                        ))}
                    </div>
                </div>

                {/* ── Film Strip Bottom ── */}
                <div style={{
                    position: 'absolute', bottom: 80, left: 0,
                    width: '100%', height: 64,
                    overflow: 'hidden', opacity: 0.2, pointerEvents: 'none',
                }}>
                    <div className="intro-film-strip" style={{ display: 'flex', gap: 16, animationDelay: '4s' }}>
                        {Array.from({ length: 20 }, (_, i) => (
                            <div key={i} style={{
                                width: 48, height: 48, flexShrink: 0,
                                borderRadius: 8,
                                border: `2px solid ${COLORS.lavender}60`,
                                background: `${COLORS.lavender}10`,
                            }} />
                        ))}
                    </div>
                </div>

                {/* ✅ FIX 1: Particles using pre-generated stable data */}
                {PARTICLES.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            position: 'absolute',
                            width: p.width,
                            height: p.height,
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            borderRadius: '50%',
                            background: p.color,
                            // ✅ Use correct keyframe based on pre-determined direction
                            animation: `${p.directionX > 0 ? 'introParticleRight' : 'introParticleLeft'} ${p.duration}s ease-in-out infinite`,
                            animationDelay: `${p.delay}s`,
                            opacity: 0.7,
                            boxShadow: `0 0 20px ${p.color}`,
                            pointerEvents: 'none',
                        }}
                    />
                ))}

                {/* ── Main Content ── */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 40,
                }}>

                    {/* 3D Logo */}
                    <div className="intro-logo-3d" style={{ position: 'relative' }}>
                        {/* Glow Ring */}
                        <div
                            className="intro-glow-ring"
                            style={{
                                position: 'absolute', inset: 0,
                                borderRadius: '50%',
                                background: GRADIENT_PRIMARY,
                                filter: 'blur(40px)',
                                opacity: 0.6,
                            }}
                        />

                        {/* Logo Box */}
                        <div style={{
                            position: 'relative',
                            width: 144, height: 144,
                            borderRadius: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: GRADIENT_PRIMARY,
                            boxShadow: `
                                0 30px 80px ${COLORS.primary}70,
                                0 0 100px ${COLORS.primaryLight}50,
                                inset 0 0 60px rgba(255,255,255,0.2)
                            `,
                            border: '2px solid rgba(255,255,255,0.2)',
                            overflow: 'hidden',
                        }}>
                            {/* Shine */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                borderRadius: 40, overflow: 'hidden',
                            }}>
                                <div
                                    className="intro-glass-shine"
                                    style={{
                                        position: 'absolute', top: 0, left: 0,
                                        width: '33%', height: '100%',
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                    }}
                                />
                            </div>

                            {/* Play Icon */}
                            <div className="intro-play-button" style={{ position: 'relative' }}>
                                <svg
                                    width={80} height={80}
                                    fill="white"
                                    viewBox="0 0 24 24"
                                    style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' }}
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>

                            {/* Pulse */}
                            <div
                                className="intro-pulse"
                                style={{
                                    position: 'absolute', inset: 0,
                                    borderRadius: 40,
                                    background: GRADIENT_PRIMARY,
                                    opacity: 0.4,
                                    filter: 'blur(30px)',
                                }}
                            />
                        </div>
                    </div>

                    {/* Brand Name */}
                    <div className="intro-text-3d" style={{
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', gap: 16,
                    }}>
                        <h1
                            className="intro-shimmer-text"
                            style={{
                                fontSize: 'clamp(3rem, 8vw, 6rem)',
                                fontWeight: 900,
                                letterSpacing: '0.15em',
                                margin: 0,
                                textShadow: `0 0 60px ${COLORS.primary}50, 0 0 100px ${COLORS.primaryLight}30`,
                                transform: 'perspective(500px) rotateX(5deg)',
                            }}
                        >
                            SAMEER
                        </h1>
                        <h2 style={{
                            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                            fontWeight: 700,
                            letterSpacing: '0.4em',
                            color: 'rgba(255,255,255,0.9)',
                            margin: 0,
                            textShadow: `0 0 40px ${COLORS.lavender}70, 0 0 80px ${COLORS.primaryLight}40`,
                            transform: 'perspective(500px) rotateX(5deg)',
                        }}>
                            VISUALS
                        </h2>
                    </div>

                    {/* ✅ FIX 2: Divider - pure CSS animation, no width conflict */}
                    <div className="intro-line" />

                    {/* Tagline */}
                    <p
                        className="intro-tagline"
                        style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                            fontWeight: 700,
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            color: COLORS.softPurple,
                            textShadow: `0 0 30px ${COLORS.lavender}60`,
                            transform: 'perspective(500px) rotateX(5deg)',
                            margin: 0,
                        }}
                    >
                        Crafting Visual Stories
                    </p>

                    {/* ✅ FIX 2: Progress Bar - only state controls width */}
                    {phase === 'loading' && (
                        <div style={{
                            width: 256, height: 4,
                            borderRadius: 9999,
                            overflow: 'hidden',
                            marginTop: 32,
                            background: `${COLORS.primary}20`,
                            border: `1px solid ${COLORS.primary}40`,
                        }}>
                            <div style={{
                                height: '100%',
                                borderRadius: 9999,
                                background: GRADIENT_PRIMARY,
                                boxShadow: `0 0 20px ${COLORS.primary}`,
                                width: `${progress}%`,        // ✅ Only JS controls this
                                transition: 'width 0.03s linear',
                            }} />
                        </div>
                    )}
                </div>

                {/* ── Corner Decorations ── */}
                {[
                    { style: { top: 48, left: 48, borderTop: `2px solid ${COLORS.primary}50`, borderLeft: `2px solid ${COLORS.primary}50`, borderRadius: '40px 0 0 0', background: `linear-gradient(135deg, ${COLORS.primary}10, transparent)`, animationDelay: '0.5s' } },
                    { style: { top: 48, right: 48, borderTop: `2px solid ${COLORS.lavender}50`, borderRight: `2px solid ${COLORS.lavender}50`, borderRadius: '0 40px 0 0', background: `linear-gradient(135deg, ${COLORS.lavender}10, transparent)`, animationDelay: '0.7s' } },
                    { style: { bottom: 48, left: 48, borderBottom: `2px solid ${COLORS.lavender}50`, borderLeft: `2px solid ${COLORS.lavender}50`, borderRadius: '0 0 0 40px', background: `linear-gradient(135deg, ${COLORS.lavender}10, transparent)`, animationDelay: '0.9s' } },
                    { style: { bottom: 48, right: 48, borderBottom: `2px solid ${COLORS.primary}50`, borderRight: `2px solid ${COLORS.primary}50`, borderRadius: '0 0 40px 0', background: `linear-gradient(135deg, ${COLORS.primary}10, transparent)`, animationDelay: '1.1s' } },
                ].map((corner, i) => (
                    <div key={i} className="intro-corner" style={corner.style} />
                ))}
            </div>
        </>
    );
}
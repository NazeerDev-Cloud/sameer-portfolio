import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logoMark from "../../assets/logo-mark.svg";

// ── Brand Palette (light / Hostinger-style) ──
const COLORS = {
    bg: "#ffffff",
    surface: "#f6f7f9",
    border: "#e6e7ec",
    text: "#1b1f3b",
    textBody: "#4b5563",
    textMuted: "#8a8fa3",
    left: "#8168F0",
    leftDark: "#4b26d4",
    mid: "#7C5CFF",
    right: "#8b5cf6",
};

const GRADIENT = `linear-gradient(135deg, ${COLORS.left} 0%, #7C5CFF 55%, #9D6BFF 100%)`;

// ── Navigation Links ──
const navItems = [
    { name: "Home", to: "/", isHash: false },
    { name: "Work", to: "/work", isHash: false },
    { name: "Process", to: "/#process", isHash: true },
    { name: "Testimonials", to: "/#testimonials", isHash: true },
    { name: "Contact", to: "/#contact", isHash: true },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("Home");
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const location = useLocation();

    const navRef = useRef(null);
    const linksRef = useRef([]);
    const ctaRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // ── URL ke according active navigation update ──
    useEffect(() => {
        if (location.pathname === "/work") {
            setActiveLink("Work");
            return;
        }

        const matchedHashLink = navItems.find(
            (item) => item.isHash && item.to === `/${location.hash}`
        );

        setActiveLink(matchedHashLink?.name || "Home");
    }, [location.pathname, location.hash]);

    // ── Home page/top par le jane ke liye ──
    const handleHomeClick = () => {
        setActiveLink("Home");

        // Agar already Home page par hai to smooth top scroll hoga
        if (location.pathname === "/") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    // ── Entry animation ──
    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
        );

        if (linksRef.current.length > 0) {
            tl.fromTo(
                linksRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
                "-=0.5"
            );
        }

        tl.fromTo(
            ctaRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.3"
        );
    }, []);

    // ── Scroll listener ──
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 30);

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ── Mobile menu animation ──
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";

            gsap.fromTo(
                mobileMenuRef.current,
                { x: "100%", opacity: 0 },
                { x: "0%", opacity: 1, duration: 0.6, ease: "power4.out" }
            );

            gsap.fromTo(
                ".mobile-link",
                { x: 60, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    delay: 0.2,
                    ease: "power3.out",
                }
            );
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out"
                style={{
                    background: isScrolled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)",
                    backdropFilter: isScrolled ? "blur(24px)" : "blur(16px)",
                    WebkitBackdropFilter: isScrolled ? "blur(24px)" : "blur(16px)",
                    borderBottom: `1px solid ${isScrolled
                            ? COLORS.border
                            : "rgba(27,31,59,0.06)"
                        }`,
                    boxShadow: isScrolled
                        ? `0 12px 40px -14px ${COLORS.left}26`
                        : "none",
                }}
            >
                {/* Top gradient accent line */}
                <div
                    className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-700"
                    style={{ background: GRADIENT, opacity: isScrolled ? 1 : 0 }}
                />

                {/* Ambient glow when scrolled */}
                {isScrolled && (
                    <div
                        className="pointer-events-none absolute inset-0 opacity-60"
                        style={{
                            background: `radial-gradient(ellipse at top, ${COLORS.left}0c 0%, transparent 60%)`,
                        }}
                    />
                )}

                <div
                    className={`relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between transition-all duration-500 ${isScrolled ? "py-4" : "py-5"
                        }`}
                >
                    {/* ═══════════ LOGO ═══════════ */}
                    <Link
                        to="/"
                        onClick={handleHomeClick}
                        className="flex items-center gap-3.5 select-none group"
                    >
                        <div className="relative">
                            <div
                                className="relative w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                                style={{
                                    background: "#141414",
                                    boxShadow: "0 8px 22px rgba(0,0,0,0.22)",
                                }}
                            >
                                <img
                                    src={logoMark}
                                    alt="Sameer Visuals logo"
                                    className="h-full w-full"
                                />

                                {/* Shimmer overlay */}
                                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                    <div className="logo-shimmer absolute inset-0" />
                                </div>
                            </div>

                            {/* Active status dot */}
                            <span
                                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 pulse-dot"
                                style={{
                                    background: "#4ade80",
                                    borderColor: COLORS.bg,
                                }}
                            />
                        </div>

                        <div className="text-[19px] sm:text-[21px] font-extrabold tracking-tight leading-none">
                            <span className="transition-colors duration-500 group-hover:text-[#8168F0]" style={{ color: COLORS.text }}>
                                Sameer
                            </span>

                            <span
                                style={{ color: COLORS.right }}
                                className="transition-colors duration-500 group-hover:text-[#1b1f3b]"
                            >
                                Visuals
                            </span>

                            <p
                                className="text-[10px] font-semibold uppercase tracking-[0.2em] mt-1"
                                style={{ color: COLORS.textMuted }}
                            >
                                Video Editing
                            </p>
                        </div>
                    </Link>

                    {/* ═══════════ DESKTOP MENU ═══════════ */}
                    <div className="hidden lg:flex items-center gap-1.5 relative">
                        {navItems.map((item, index) => {
                            const isActive = activeLink === item.name;
                            const isHovered = hoveredIndex === index;

                            const commonProps = {
                                ref: (el) => (linksRef.current[index] = el),
                                onClick: () => {
                                    if (item.name === "Home") {
                                        handleHomeClick();
                                    } else {
                                        setActiveLink(item.name);
                                    }
                                },
                                onMouseEnter: () => setHoveredIndex(index),
                                onMouseLeave: () => setHoveredIndex(null),
                                className:
                                    "nav-link relative px-5 py-2.5 rounded-xl text-[15px] font-semibold transition-all duration-500",
                                style: {
                                    color: isActive
                                        ? COLORS.left
                                        : isHovered
                                            ? COLORS.left
                                            : COLORS.textBody,
                                },
                            };

                            const navContent = (
                                <>
                                    {/* Active pill background */}
                                    {isActive && (
                                        <span
                                            className="absolute inset-0 rounded-xl -z-10 active-pill"
                                            style={{
                                                background: `linear-gradient(135deg, ${COLORS.left}14, ${COLORS.right}0d)`,
                                                border: `1px solid ${COLORS.left}2b`,
                                                boxShadow: `0 4px 16px ${COLORS.left}1f`,
                                            }}
                                        />
                                    )}

                                    {/* Hover glow (non-active) */}
                                    {!isActive && isHovered && (
                                        <span
                                            className="absolute inset-0 rounded-xl -z-10 opacity-100 transition-opacity duration-500"
                                            style={{
                                                background: `${COLORS.left}0d`,
                                            }}
                                        />
                                    )}

                                    <span className="relative">
                                        {item.name}

                                        {/* Underline for active */}
                                        {isActive && (
                                            <span
                                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-6 rounded-full"
                                                style={{ background: GRADIENT }}
                                            />
                                        )}
                                    </span>
                                </>
                            );

                            // Home aur Work proper routes hain
                            if (!item.isHash) {
                                return (
                                    <Link key={item.name} to={item.to} {...commonProps}>
                                        {navContent}
                                    </Link>
                                );
                            }

                            // Baqi Home page ke sections par smooth scroll karenge
                            return (
                                <HashLink
                                    key={item.name}
                                    to={item.to}
                                    smooth
                                    {...commonProps}
                                >
                                    {navContent}
                                </HashLink>
                            );
                        })}
                    </div>

                    {/* ═══════════ ACTIONS ═══════════ */}
                    <div className="flex items-center gap-3">
                        {/* Quick Call Button */}
                        <div ref={ctaRef} className="hidden sm:block">
                            <a
                                href="tel:+923039800035"
                                aria-label="Quick call on +92 303 9800035"
                                className="cta-premium group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-6 py-3 text-[15px] font-semibold text-white transition-all duration-500 hover:-translate-y-0.5"
                                style={{
                                    background: "#141414",
                                    boxShadow: "0 8px 22px rgba(0,0,0,0.18)",
                                }}
                            >
                                <span className="relative z-10">Quick Call</span>

                                <svg
                                    className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
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

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open menu"
                            className="lg:hidden group flex flex-col justify-center items-center gap-[6px] w-12 h-12 rounded-xl transition-all duration-500 border"
                            style={{
                                borderColor: "rgba(27,31,59,0.1)",
                                background: "rgba(27,31,59,0.03)",
                            }}
                        >
                            <span
                                className="w-6 h-[2px] rounded-full transition-all duration-500 group-hover:w-7"
                                style={{ background: COLORS.text }}
                            />
                            <span
                                className="w-4 h-[2px] rounded-full transition-all duration-500 group-hover:w-7"
                                style={{ background: COLORS.left }}
                            />
                            <span
                                className="w-6 h-[2px] rounded-full transition-all duration-500 group-hover:w-4"
                                style={{ background: COLORS.text }}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ══════════ MOBILE DRAWER ══════════ */}
            {isMobileMenuOpen && (
                <div
                    ref={mobileMenuRef}
                    className="fixed inset-0 z-[100] flex flex-col justify-between p-8 lg:hidden overflow-hidden"
                    style={{ background: COLORS.bg }}
                >
                    {/* Ambient glows */}
                    <div
                        className="orb-glow absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[130px] pointer-events-none"
                        style={{ background: COLORS.left, opacity: 0.1 }}
                    />

                    <div
                        className="orb-glow absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none"
                        style={{ background: COLORS.right, opacity: 0.08 }}
                    />

                    <div
                        className="orb-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
                        style={{ background: COLORS.mid, opacity: 0.05 }}
                    />

                    {/* Grid overlay */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(27,31,59,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(27,31,59,0.4) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />

                    {/* Header */}
                    <div className="flex items-center justify-between w-full relative z-10">
                        <Link
                            to="/"
                            onClick={() => {
                                handleHomeClick();
                                setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-3.5"
                        >
                            <div
                                className="relative w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden"
                                style={{
                                    background: "#141414",
                                    boxShadow: "0 8px 22px rgba(0,0,0,0.22)",
                                }}
                            >
                                <img
                                    src={logoMark}
                                    alt="Sameer Visuals logo"
                                    className="h-full w-full"
                                />

                                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                    <div className="logo-shimmer absolute inset-0" />
                                </div>
                            </div>

                            <div>
                                <div className="text-[20px] font-extrabold leading-none">
                                    <span style={{ color: COLORS.text }}>Sameer</span>
                                    <span style={{ color: COLORS.right }}>
                                        Visuals
                                    </span>
                                </div>

                                <p
                                    className="text-[10px] font-semibold uppercase tracking-[0.2em] mt-1"
                                    style={{ color: COLORS.textMuted }}
                                >
                                    Video Editing
                                </p>
                            </div>
                        </Link>

                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close menu"
                            className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 hover:rotate-90 group"
                            style={{
                                borderColor: `${COLORS.left}30`,
                                background: `${COLORS.left}0a`,
                            }}
                        >
                            <svg
                                className="w-5 h-5 transition-transform duration-500"
                                style={{ color: COLORS.text }}
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

                    {/* Links */}
                    <div className="flex flex-col space-y-2 my-auto relative z-10">
                        <p
                            className="mobile-link text-[11px] font-semibold uppercase tracking-[0.25em] mb-6"
                            style={{ color: COLORS.mid }}
                        >
                            Navigation
                        </p>

                        {navItems.map((item, i) => {
                            const mobileLinkContent = (
                                <>
                                    <span
                                        className="text-[13px] font-bold font-mono transition-all duration-500 group-hover:scale-110"
                                        style={{ color: COLORS.left }}
                                    >
                                        0{i + 1}
                                    </span>

                                    <span
                                        className="text-[32px] font-extrabold tracking-tight transition-colors duration-500 group-hover:text-[#8168F0]"
                                        style={{
                                            color:
                                                activeLink === item.name
                                                    ? COLORS.right
                                                    : COLORS.text,
                                        }}
                                    >
                                        {item.name}
                                    </span>

                                    <svg
                                        className="ml-auto w-5 h-5 text-[#8a8fa3] opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
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
                                </>
                            );

                            const mobileProps = {
                                onClick: () => {
                                    if (item.name === "Home") {
                                        handleHomeClick();
                                    } else {
                                        setActiveLink(item.name);
                                    }

                                    setIsMobileMenuOpen(false);
                                },
                                className:
                                    "mobile-link group flex items-center gap-5 py-3 border-b border-[#1b1f3b]/10 transition-all duration-500 hover:pl-3",
                            };

                            if (!item.isHash) {
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        {...mobileProps}
                                    >
                                        {mobileLinkContent}
                                    </Link>
                                );
                            }

                            return (
                                <HashLink
                                    key={item.name}
                                    to={item.to}
                                    smooth
                                    {...mobileProps}
                                >
                                    {mobileLinkContent}
                                </HashLink>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="w-full space-y-5 relative z-10">
                        {/* Social */}
                        <div className="mobile-link flex items-center justify-center gap-2">
                            {["Instagram", "YouTube", "LinkedIn", "Twitter"].map(
                                (social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="flex-1 py-3 rounded-xl border text-center text-[11px] font-bold tracking-wider uppercase text-[#8a8fa3] transition-all duration-500 hover:border-[#8168F0]/50 hover:bg-[#8168F0]/5 hover:text-[#1b1f3b]"
                                        style={{
                                            borderColor:
                                                "rgba(27,31,59,0.1)",
                                        }}
                                    >
                                        {social.slice(0, 2)}
                                    </a>
                                )
                            )}
                        </div>

                        {/* Quick Call Button */}
                        <a
                            href="tel:+923039800035"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Quick call on +92 303 9800035"
                            className="mobile-link group relative w-full py-4 rounded-2xl font-semibold text-[16px] overflow-hidden transition-all duration-500 hover:-translate-y-0.5"
                            style={{
                                background: "#141414",
                                boxShadow: "0 10px 26px rgba(0,0,0,0.2)",
                            }}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                                Quick Call

                                <svg
                                    className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
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
                            </span>
                        </a>

                        {/* Copyright */}
                        <p className="mobile-link text-center text-[11px] text-[#8a8fa3]">
                            © {new Date().getFullYear()} Sameer Visuals. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            )}

            <style>{`
        /* ===== LOGO SHIMMER ===== */
        .logo-shimmer {
          background: linear-gradient(
            135deg,
            transparent 30%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 70%
          );
          animation: logoShimmer 3.5s ease-in-out infinite;
        }

        @keyframes logoShimmer {
          0%, 100% { opacity: 0; transform: translateX(-100%); }
          50% { opacity: 1; transform: translateX(100%); }
        }

        /* ===== PULSE DOT ===== */
        .pulse-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }

        @keyframes pulseDot {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
          }
          50% { 
            opacity: 0.9; 
            transform: scale(1.15);
            box-shadow: 0 0 0 6px rgba(74, 222, 128, 0);
          }
        }

        /* ===== ACTIVE PILL ===== */
        .active-pill {
          animation: pillGlow 3s ease-in-out infinite;
        }

        @keyframes pillGlow {
          0%, 100% {
            box-shadow: 0 4px 16px ${COLORS.left}1c;
          }
          50% {
            box-shadow: 0 4px 24px ${COLORS.left}30;
          }
        }

        /* ===== ORB GLOWS ===== */
        .orb-glow {
          animation: orbFloat 15s ease-in-out infinite;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }

        /* ===== CTA PREMIUM SHIMMER ===== */
        .cta-premium::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.25),
            transparent
          );
          animation: shimmerCta 3s ease-in-out infinite;
        }

        @keyframes shimmerCta {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }

        .cta-premium:hover {
          box-shadow: 0 12px 35px ${COLORS.left}55 !important;
        }

        /* ===== NAV LINK ===== */
        .nav-link {
          position: relative;
        }

        /* ===== REDUCED MOTION ===== */
        @media (prefers-reduced-motion: reduce) {
          .logo-shimmer,
          .pulse-dot,
          .active-pill,
          .orb-glow,
          .cta-premium::before {
            animation: none !important;
          }
        }

        /* ===== HIDE MOBILE MENU ORB ON SMALL SCREENS ===== */
        @media (max-width: 380px) {
          .mobile-link a[href="#"] {
            padding: 0.6rem 0.3rem !important;
            font-size: 10px !important;
          }
        }
      `}</style>
        </>
    );
}
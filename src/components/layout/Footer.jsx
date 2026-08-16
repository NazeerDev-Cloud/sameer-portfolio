import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const EMAIL = "connectsameervisuals@gmail.com";
const PHONE_NUMBER = "+923039800035";
const PHONE_DISPLAY = "+92 303 9800035";
const WHATSAPP_LINK = "https://wa.me/923039800035";

export default function Footer() {
    const footerRef = useRef(null);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const items =
                            entry.target.querySelectorAll(".scroll-reveal");

                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add("revealed");
                            }, index * 100);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleHomeClick = () => {
        if (window.location.pathname === "/") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const services = [
        "YouTube Editing",
        "Short Form Content",
        "SaaS Explainer Videos",
        "Documentary Editing",
        "Tutorials & Walkthroughs",
        "Color Grading",
    ];

    const quickLinks = [
        { name: "Home", to: "/", type: "route" },
        { name: "Work", to: "/work", type: "route" },
        { name: "About Us", to: "/#about", type: "hash" },
        { name: "Services", to: "/#services", type: "hash" },
        { name: "Portfolio", to: "/#projects", type: "hash" },
        { name: "Testimonials", to: "/#testimonials", type: "hash" },
        { name: "Contact", to: "/#contact", type: "hash" },
    ];

    const socials = [
        {
            name: "Instagram",
            href: "https://instagram.com",
            icon: (
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
        },
        {
            name: "YouTube",
            href: "https://youtube.com",
            icon: (
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            ),
        },
        {
            name: "Facebook",
            href: "https://facebook.com",
            icon: (
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.931-1.956 1.887v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com",
            icon: (
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            <footer
                ref={footerRef}
                className="relative w-full overflow-hidden text-white"
            >
                {/* ===== TOP GRADIENT DIVIDER ===== */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#623BFD] to-transparent" />

                {/* ===== TOP BLEND ===== */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-40"
                    style={{
                        background:
                            "linear-gradient(to bottom, #080B29 0%, rgba(8, 11, 41, 0.7) 50%, transparent 100%)",
                    }}
                />

                {/* ===== AMBIENT GLOWS ===== */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="orb-glow orb-1 absolute -top-40 left-[-10%] h-[600px] w-[600px] rounded-full bg-[#623BFD]/20 blur-[150px]" />

                    <div className="orb-glow orb-2 absolute right-[-10%] bottom-0 h-[600px] w-[600px] rounded-full bg-[#B296FE]/15 blur-[150px]" />

                    <div className="orb-glow orb-3 absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#D4C8FE]/8 blur-[130px]" />
                </div>

                {/* ===== FLOATING PARTICLES ===== */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {[...Array(12)].map((_, index) => (
                        <div
                            key={index}
                            className="particle absolute rounded-full bg-[#D4C8FE]"
                            style={{
                                width: `${2 + Math.random() * 4}px`,
                                height: `${2 + Math.random() * 4}px`,
                                left: `${5 + Math.random() * 90}%`,
                                top: `${5 + Math.random() * 90}%`,
                                animationDelay: `${index * 1.5}s`,
                                animationDuration: `${8 + Math.random() * 6}s`,
                            }}
                        />
                    ))}
                </div>

                {/* ===== CTA BANNER ===== */}
                <div className="relative z-10 w-full px-6 pt-24 sm:px-12 md:pt-32 lg:px-20 xl:px-28">
                    <div className="scroll-reveal relative w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#623BFD]/20 via-[#080B29]/60 to-[#B296FE]/15 p-10 shadow-[0_25px_60px_rgba(98,59,253,0.25)] backdrop-blur-xl sm:p-14 md:p-20">
                        <div className="cta-glow-1 pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#623BFD]/25 blur-[100px]" />
                        <div className="cta-glow-2 pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#B296FE]/20 blur-[100px]" />

                        <div className="relative flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
                            <div className="max-w-3xl flex-1">
                                <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#623BFD]/30 bg-[#623BFD]/10 px-6 py-3 backdrop-blur-md">
                                    <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-[#B296FE] shadow-[0_0_10px_rgba(178,150,254,0.8)]" />

                                    <span className="text-[15px] font-semibold uppercase tracking-[0.15em] text-[#D4C8FE]">
                                        Let's Create Together
                                    </span>
                                </div>

                                <h3 className="text-[36px] font-extrabold leading-[1.15] tracking-tight text-white sm:text-[44px] md:text-[52px] lg:text-[60px]">
                                    Ready to Elevate Your{" "}
                                    <span className="heading-gradient inline-block bg-gradient-to-r from-[#623BFD] via-[#D4C8FE] to-[#B296FE] bg-clip-text text-transparent">
                                        Visual Story?
                                    </span>
                                </h3>

                                <p className="mt-6 text-[20px] leading-[1.7] text-[#B8BDD9]">
                                    Let's collaborate on your next cinematic
                                    project. From concept to final cut — we
                                    bring vision to life.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
                                {/* WhatsApp Button */}
                                <a
                                    href={WHATSAPP_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cta-premium group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#623BFD] via-[#8562FE] to-[#B296FE] px-10 py-5 text-[18px] font-semibold text-white shadow-[0_10px_35px_rgba(98,59,253,0.4)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(98,59,253,0.55)]"
                                >
                                    <span className="relative z-10">
                                        WhatsApp Us
                                    </span>

                                    <svg
                                        className="relative z-10 h-5 w-5 transition-transform duration-500 group-hover:translate-x-1"
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

                                {/* Call Button */}
                                <a
                                    href={`tel:${PHONE_NUMBER}`}
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-10 py-5 text-[18px] font-semibold text-[#D4C8FE] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#623BFD]/40 hover:bg-white/[0.08] hover:text-white"
                                >
                                    Call Now

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
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== MAIN FOOTER CONTENT ===== */}
                <div className="relative z-10 w-full px-6 pt-24 pb-12 sm:px-12 lg:px-20 xl:px-28">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
                        {/* ===== BRAND COLUMN ===== */}
                        <div className="scroll-reveal lg:col-span-5">
                            {/* Logo */}
                            <Link
                                to="/"
                                onClick={handleHomeClick}
                                className="group flex w-fit items-center gap-4"
                            >
                                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#623BFD] to-[#B296FE] shadow-[0_0_25px_rgba(98,59,253,0.4)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                    <svg
                                        className="h-7 w-7 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>

                                    <div className="icon-shimmer absolute inset-0 rounded-2xl" />
                                </div>

                                <div>
                                    <h4 className="text-[26px] font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-[#D4C8FE]">
                                        Sameer Visuals
                                    </h4>

                                    <p className="text-[13px] font-semibold uppercase tracking-widest text-[#B296FE]">
                                        Cinematic Post-Production
                                    </p>
                                </div>
                            </Link>

                            <p className="mt-8 max-w-md text-[18px] leading-[1.8] text-[#B8BDD9]">
                                Crafting high-impact visual stories through
                                cinematic editing, color grading, and motion
                                design. We turn raw footage into unforgettable
                                experiences.
                            </p>

                            {/* Contact Information */}
                            <div className="mt-10 space-y-5">
                                {/* Email */}
                                <a
                                    href={`mailto:${EMAIL}`}
                                    className="contact-item group flex items-center gap-4 text-[17px] text-[#B8BDD9] transition-all duration-500 hover:text-white"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#B296FE] transition-all duration-500 group-hover:border-[#623BFD]/50 group-hover:bg-[#623BFD]/15 group-hover:text-white">
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
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>

                                    <span>{EMAIL}</span>
                                </a>

                                {/* Call */}
                                <a
                                    href={`tel:${PHONE_NUMBER}`}
                                    className="contact-item group flex items-center gap-4 text-[17px] text-[#B8BDD9] transition-all duration-500 hover:text-white"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#B296FE] transition-all duration-500 group-hover:border-[#623BFD]/50 group-hover:bg-[#623BFD]/15 group-hover:text-white">
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
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                    </div>

                                    <span>Call: {PHONE_DISPLAY}</span>
                                </a>

                                {/* WhatsApp */}
                                <a
                                    href={WHATSAPP_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-item group flex items-center gap-4 text-[17px] text-[#B8BDD9] transition-all duration-500 hover:text-white"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#B296FE] transition-all duration-500 group-hover:border-[#623BFD]/50 group-hover:bg-[#623BFD]/15 group-hover:text-white">
                                        <svg
                                            className="h-5 w-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.52 3.48A11.82 11.82 0 0012.15 0C5.62 0 .31 5.31.31 11.84c0 2.09.55 4.13 1.59 5.92L.21 24l6.4-1.67a11.82 11.82 0 005.54 1.41h.01c6.53 0 11.84-5.31 11.84-11.84 0-3.16-1.23-6.13-3.47-8.42zM12.15 21.74a9.86 9.86 0 01-5.03-1.38l-.36-.21-3.8.99 1.02-3.7-.23-.38a9.86 9.86 0 01-1.52-5.22c0-5.45 4.43-9.88 9.88-9.88 2.64 0 5.12 1.03 6.99 2.9a9.81 9.81 0 012.89 6.99c0 5.45-4.43 9.89-9.84 9.89zm5.42-7.41c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.18-.18.2-.36.22-.66.07-.3-.15-1.26-.46-2.4-1.46-.88-.78-1.48-1.74-1.65-2.04-.17-.3-.02-.46.13-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.69-1.65-.94-2.26-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.52.08-.79.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35z" />
                                        </svg>
                                    </div>

                                    <span>WhatsApp: {PHONE_DISPLAY}</span>
                                </a>

                                {/* Location */}
                                <div className="contact-item group flex items-center gap-4 text-[17px] text-[#B8BDD9]">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#B296FE]">
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
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>

                                    <span>Remote Worldwide</span>
                                </div>
                            </div>
                        </div>

                        {/* ===== NAVIGATION ===== */}
                        <div className="scroll-reveal lg:col-span-3">
                            <h5 className="text-[20px] font-bold tracking-tight text-white">
                                Navigate
                            </h5>

                            <div className="mt-4 h-[3px] w-12 rounded-full bg-gradient-to-r from-[#623BFD] to-[#B296FE]" />

                            <ul className="mt-8 space-y-4">
                                {quickLinks.map((link) => {
                                    const content = (
                                        <>
                                            <span className="inline-block h-px w-0 bg-gradient-to-r from-[#623BFD] to-[#B296FE] transition-all duration-500 group-hover:w-6" />
                                            <span>{link.name}</span>
                                        </>
                                    );

                                    const classes =
                                        "footer-link group inline-flex items-center gap-2 text-[18px] text-[#B8BDD9] transition-all duration-500 hover:text-white";

                                    if (link.type === "route") {
                                        return (
                                            <li key={link.name}>
                                                <Link
                                                    to={link.to}
                                                    onClick={
                                                        link.name === "Home"
                                                            ? handleHomeClick
                                                            : undefined
                                                    }
                                                    className={classes}
                                                >
                                                    {content}
                                                </Link>
                                            </li>
                                        );
                                    }

                                    return (
                                        <li key={link.name}>
                                            <HashLink
                                                smooth
                                                to={link.to}
                                                className={classes}
                                            >
                                                {content}
                                            </HashLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* ===== SERVICES ===== */}
                        <div className="scroll-reveal lg:col-span-4">
                            <h5 className="text-[20px] font-bold tracking-tight text-white">
                                Services
                            </h5>

                            <div className="mt-4 h-[3px] w-12 rounded-full bg-gradient-to-r from-[#623BFD] to-[#B296FE]" />

                            <ul className="mt-8 space-y-4">
                                {services.map((service) => (
                                    <li key={service}>
                                        <HashLink
                                            smooth
                                            to="/#services"
                                            className="footer-link group inline-flex items-center gap-2 text-[18px] text-[#B8BDD9] transition-all duration-500 hover:text-white"
                                        >
                                            <span className="inline-block h-px w-0 bg-gradient-to-r from-[#623BFD] to-[#B296FE] transition-all duration-500 group-hover:w-6" />
                                            <span>{service}</span>
                                        </HashLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ===== SOCIAL MEDIA BAR ===== */}
                <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28">
                    <div className="scroll-reveal rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md sm:p-10">
                        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                            <div className="text-center sm:text-left">
                                <p className="text-[14px] font-semibold uppercase tracking-widest text-[#B296FE]">
                                    Follow Our Journey
                                </p>

                                <p className="mt-2 text-[20px] font-bold text-white">
                                    Connect on Social Media
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-3">
                                {socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="social-icon group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] text-[#B8BDD9] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#623BFD]/50 hover:bg-gradient-to-br hover:from-[#623BFD]/20 hover:to-[#B296FE]/10 hover:text-white hover:shadow-[0_8px_25px_rgba(98,59,253,0.3)]"
                                    >
                                        <div className="relative z-10 h-6 w-6 transition-transform duration-500 group-hover:scale-110">
                                            {social.icon}
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== BOTTOM BAR ===== */}
                <div className="relative z-10 w-full px-6 pt-12 pb-0 sm:px-12 lg:px-20 xl:px-28">
                    <div className="scroll-reveal flex flex-col items-center justify-center gap-2 border-t border-white/5 pt-10 text-center">
                        <p className="text-[16px] text-[#9DA3C2]">
                            © {currentYear}{" "}
                            <span className="font-bold text-white">
                                Sameer Visuals
                            </span>
                            . All rights reserved.
                        </p>

                        <p className="text-[16px] text-[#9DA3C2]">
                            Designed & Developed by{" "}
                            <span className="font-bold text-[#D4C8FE]">
                                Nexwim
                            </span>
                            .
                        </p>
                    </div>

                    {/* Scroll To Top */}
                    <button
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            })
                        }
                        aria-label="Scroll to top"
                        className="scroll-top group fixed right-8 bottom-8 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[#623BFD]/40 bg-gradient-to-br from-[#623BFD] to-[#B296FE] text-white shadow-[0_10px_30px_rgba(98,59,253,0.4)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(98,59,253,0.6)]"
                    >
                        <svg
                            className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                    </button>
                </div>

                {/* ===== GIANT BRAND TEXT ===== */}
                <div
                    className="pointer-events-none relative z-[1] w-full overflow-hidden"
                    style={{
                        height: "clamp(60px, 12vw, 200px)",
                        marginTop: "2rem",
                    }}
                >
                    <h1
                        className="brand-text-glow absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center font-black tracking-tighter text-transparent"
                        style={{
                            WebkitTextStroke:
                                "1px rgba(178, 150, 254, 0.1)",
                            fontSize: "clamp(80px, 18vw, 320px)",
                            lineHeight: "0.85",
                            bottom: "-15%",
                            margin: 0,
                            padding: 0,
                        }}
                    >
                        SAMEER VISUALS
                    </h1>
                </div>
            </footer>

            <style>{`
                /* ===== SCROLL REVEAL ===== */
                .scroll-reveal {
                    opacity: 0;
                    transform: translateY(30px);
                    transition:
                        opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .scroll-reveal.revealed {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* ===== HEADING GRADIENT ===== */
                .heading-gradient {
                    background-size: 300% 300%;
                    animation: headingShift 6s ease-in-out infinite;
                }

                @keyframes headingShift {
                    0%,
                    100% {
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
                    0%,
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }

                    50% {
                        opacity: 0.6;
                        transform: scale(1.2);
                    }
                }

                /* ===== ORBS ===== */
                .orb-glow {
                    animation: orbFloat 15s ease-in-out infinite;
                }

                .orb-1 {
                    animation-delay: 0s;
                }

                .orb-2 {
                    animation-delay: -5s;
                }

                .orb-3 {
                    animation-delay: -10s;
                }

                @keyframes orbFloat {
                    0%,
                    100% {
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
                    opacity: 0.25;
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
                        transform: translateY(-140px) translateX(50px);
                        opacity: 0;
                    }
                }

                /* ===== CTA BANNER GLOWS ===== */
                .cta-glow-1 {
                    animation: ctaGlow1 8s ease-in-out infinite;
                }

                .cta-glow-2 {
                    animation: ctaGlow2 10s ease-in-out infinite;
                }

                @keyframes ctaGlow1 {
                    0%,
                    100% {
                        opacity: 0.6;
                        transform: scale(1);
                    }

                    50% {
                        opacity: 1;
                        transform: scale(1.15);
                    }
                }

                @keyframes ctaGlow2 {
                    0%,
                    100% {
                        opacity: 0.5;
                        transform: scale(1);
                    }

                    50% {
                        opacity: 0.9;
                        transform: scale(1.12);
                    }
                }

                /* ===== ICON SHIMMER ===== */
                .icon-shimmer {
                    background: linear-gradient(
                        135deg,
                        transparent 30%,
                        rgba(255, 255, 255, 0.2) 50%,
                        transparent 70%
                    );
                    animation: iconShimmer 4s ease-in-out infinite;
                }

                @keyframes iconShimmer {
                    0%,
                    100% {
                        opacity: 0;
                        transform: translateX(-100%);
                    }

                    50% {
                        opacity: 1;
                        transform: translateX(100%);
                    }
                }

                /* ===== CTA PREMIUM ===== */
                .cta-premium::before {
                    content: "";
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
                    animation: shimmerCta 3.5s ease-in-out infinite;
                }

                @keyframes shimmerCta {
                    0% {
                        left: -100%;
                    }

                    50%,
                    100% {
                        left: 100%;
                    }
                }

                /* ===== BRAND TEXT GLOW ===== */
                .brand-text-glow {
                    animation: brandGlow 8s ease-in-out infinite;
                }

                @keyframes brandGlow {
                    0%,
                    100% {
                        opacity: 0.4;
                    }

                    50% {
                        opacity: 0.8;
                    }
                }

                /* ===== FOOTER LINK ===== */
                .footer-link:hover {
                    transform: translateX(4px);
                }

                /* ===== CONTACT ITEM ===== */
                .contact-item {
                    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .contact-item:hover {
                    transform: translateX(4px);
                }

                /* ===== SCROLL TO TOP ===== */
                .scroll-top {
                    animation: scrollTopFloat 3s ease-in-out infinite;
                }

                @keyframes scrollTopFloat {
                    0%,
                    100% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(-6px);
                    }
                }

                /* ===== REDUCED MOTION ===== */
                @media (prefers-reduced-motion: reduce) {
                    .scroll-reveal,
                    .heading-gradient,
                    .pulse-dot,
                    .orb-glow,
                    .particle,
                    .cta-glow-1,
                    .cta-glow-2,
                    .icon-shimmer,
                    .cta-premium::before,
                    .brand-text-glow,
                    .footer-link,
                    .contact-item,
                    .scroll-top {
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
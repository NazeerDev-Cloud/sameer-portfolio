import React, { useEffect, useRef, useState } from 'react';
import { HashLink } from 'react-router-hash-link';

// ── Brand Palette ──
const COLORS = {
    bg: '#080B29',
    left: '#623BFD',
    mid: '#D4C8FE',
    right: '#B296FE',
};
const GRADIENT = `linear-gradient(135deg, ${COLORS.left} 0%, ${COLORS.right} 60%, ${COLORS.mid} 100%)`;

const categories = ['All', 'Pricing', 'Process', 'Delivery', 'Revisions'];

const faqs = [
    {
        id: 1,
        category: 'Pricing',
        question: "What's included in the price of a video edit?",
        answer: "Every package includes color correction, audio mixing, and a set number of revision rounds. Higher tiers add motion graphics, cinematic grading, sound design, and priority delivery. There are no hidden fees — the price you see is the price you pay.",
    },
    {
        id: 2,
        category: 'Process',
        question: "How does the editing workflow actually work?",
        answer: "You upload your raw footage via a secure cloud link along with a creative brief. I analyze pacing, tone, and target audience, then build the first cut. You review it, leave frame-accurate notes, and I lock in revisions until it's exactly right.",
    },
    {
        id: 3,
        category: 'Delivery',
        question: "What file formats and resolutions do you deliver?",
        answer: "Standard delivery is 4K UHD (3840×2160) in H.264 MP4, but I can export in ProRes, DNxHD, or any custom spec your platform requires — including vertical 9:16 for Shorts/Reels and cinematic DCI 4K for film work.",
    },
    {
        id: 4,
        category: 'Revisions',
        question: "How many revisions do I get, and what if I need more?",
        answer: "Each plan includes a set number of revision rounds (2 for Starter/Professional, unlimited for Signature). If you need additional rounds beyond your plan, they're billed at a flat per-round rate — no surprises, just transparent add-ons.",
    },
    {
        id: 5,
        category: 'Process',
        question: "Can I request specific music, fonts, or brand colors?",
        answer: "Absolutely. Send over your brand guidelines, licensed music tracks, or style references and I'll match every kinetic typography element, color grade, and sound cue to your existing brand identity.",
    },
    {
        id: 6,
        category: 'Delivery',
        question: "What's the typical turnaround time?",
        answer: "Short-form content typically ships in 2-3 days. Long-form YouTube videos take 4-6 days depending on length and complexity. Documentary and Signature-tier projects run 5-7 days. Rush delivery is available on request.",
    },
    {
        id: 7,
        category: 'Pricing',
        question: "Do you offer discounts for ongoing or bulk projects?",
        answer: "Yes — creators and brands with recurring editing needs get custom retainer pricing. Reach out with your volume and cadence and I'll put together a tailored quote that fits your workflow.",
    },
    {
        id: 8,
        category: 'Revisions',
        question: "What happens if I'm not satisfied with the final cut?",
        answer: "Client satisfaction is the priority. If something isn't landing right after your included revisions, we hop on a call to realign on vision and I'll make it right — your feedback drives every frame of the process.",
    },
];

// ── Chevron ──
const Chevron = ({ open, color }) => (
    <svg
        className="w-4 h-4 flex-shrink-0 transition-transform duration-500"
        style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color }}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

// ── FAQ Item ──
const FAQItem = ({ faq, isOpen, onClick, index, visible }) => {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isOpen]);

    return (
        <div
            className="relative rounded-2xl border overflow-hidden transition-all duration-500"
            style={{
                borderColor: isOpen ? `${COLORS.left}50` : 'rgba(255,255,255,0.07)',
                background: isOpen ? `${COLORS.left}08` : 'rgba(255,255,255,0.015)',
                boxShadow: isOpen ? `0 8px 30px -10px ${COLORS.left}30` : 'none',
                animation: visible
                    ? `faqSlideIn 0.6s ease forwards ${index * 0.07 + 0.1}s`
                    : 'none',
                opacity: 0,
            }}
        >
            {/* Top accent line */}
            <div
                className="absolute top-0 left-0 h-[2px] transition-all duration-700"
                style={{ width: isOpen ? '100%' : '0%', background: GRADIENT }}
            />

            {/* Question row */}
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
            >
                <div className="flex items-center gap-4 min-w-0">
                    <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-black font-mono flex-shrink-0 transition-all duration-500"
                        style={{
                            background: isOpen ? GRADIENT : 'rgba(255,255,255,0.04)',
                            color: isOpen ? COLORS.bg : '#6b7280',
                        }}
                    >
                        {String(faq.id).padStart(2, '0')}
                    </div>
                    <h3
                        className="text-sm font-semibold tracking-wide transition-colors duration-300"
                        style={{ color: isOpen ? '#fff' : '#d1d5db' }}
                    >
                        {faq.question}
                    </h3>
                </div>
                <Chevron open={isOpen} color={isOpen ? COLORS.mid : '#6b7280'} />
            </button>

            {/* Answer */}
            <div
                style={{
                    maxHeight: `${height}px`,
                    overflow: 'hidden',
                    transition: 'max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                <div ref={contentRef} className="px-6 pb-6" style={{ paddingLeft: '68px' }}>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                        {faq.answer}
                    </p>
                    <span
                        className="inline-block mt-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border"
                        style={{
                            color: COLORS.mid,
                            borderColor: `${COLORS.left}40`,
                            background: `${COLORS.left}10`,
                        }}
                    >
                        {faq.category}
                    </span>
                </div>
            </div>
        </div>
    );
};

// ── Right Panel ──
const ContactPanel = ({ visible }) => (
    <div
        className="sticky top-28 flex flex-col gap-5"
        style={{
            animation: visible ? 'fadeSlideRight 0.7s ease forwards 0.3s' : 'none',
            opacity: 0,
        }}
    >
        {/* Main CTA card */}
        <div
            className="relative p-8 rounded-3xl border overflow-hidden"
            style={{ borderColor: `${COLORS.left}30`, background: `${COLORS.left}08` }}
        >
            <div
                className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl pointer-events-none"
                style={{ background: COLORS.left, opacity: 0.18, animation: 'floatSlow 6s ease-in-out infinite' }}
            />
            <div
                className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full blur-3xl pointer-events-none"
                style={{ background: COLORS.right, opacity: 0.14, animation: 'floatSlow 8s ease-in-out infinite reverse' }}
            />

            <div className="relative z-10 text-center">
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5"
                    style={{ background: GRADIENT, boxShadow: `0 8px 30px ${COLORS.left}50` }}
                >
                    💬
                </div>
                <h3 className="text-white text-xl font-black mb-2">Still have questions?</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 max-w-xs mx-auto">
                    Can't find the answer? Send me a message and I'll get back within 24 hours.
                </p>

                {/* Primary CTA — slide gradient */}
                <HashLink
                    smooth
                    to="/#contact"
                    aria-label="Go to contact section"
                    className="group relative mb-3 flex w-full items-center justify-center overflow-hidden rounded-xl border py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                        borderColor: `${COLORS.left}50`,
                        background: '#0d0b2a',
                        color: '#fff',
                    }}
                >
                    <span
                        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                        style={{ background: GRADIENT }}
                    />

                    <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-[#080B29]">
                        Get In Touch

                        <svg
                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
                </HashLink>

                {/* Secondary CTA */}
                <a
                    href="tel:+923039800035"
                    aria-label="Call us on +92 303 9800035"
                    className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                        background: GRADIENT,
                        color: COLORS.bg,
                    }}
                >
                    <div className="absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/10" />

                    <span className="relative z-10">Call Us</span>
                </a>
            </div>
        </div>

        {/* Quick info grid */}
        <div
            className="grid grid-cols-2 gap-3"
            style={{
                animation: visible ? 'fadeSlideRight 0.7s ease forwards 0.45s' : 'none',
                opacity: 0,
            }}
        >
            {[
                { icon: '⚡', label: 'Response Time', value: '< 24 Hours' },
                { icon: '🌍', label: 'Available', value: 'Worldwide' },
                { icon: '🔒', label: 'Contracts', value: 'NDA Friendly' },
                { icon: '🏆', label: 'Satisfaction', value: '100% Rate' },
            ].map((item) => (
                <div
                    key={item.label}
                    className="p-4 rounded-2xl border flex flex-col gap-1.5 transition-all duration-300 cursor-default"
                    style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = `${COLORS.left}40`;
                        e.currentTarget.style.background = `${COLORS.left}08`;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    }}
                >
                    <span className="text-lg">{item.icon}</span>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{item.label}</p>
                    <p className="text-xs font-black text-white">{item.value}</p>
                </div>
            ))}
        </div>

        {/* Socials */}
        <div
            className="p-5 rounded-2xl border"
            style={{
                borderColor: 'rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.015)',
                animation: visible ? 'fadeSlideRight 0.7s ease forwards 0.6s' : 'none',
                opacity: 0,
            }}
        >
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-4">Find me on</p>
            <div className="flex flex-col gap-2">
                {[
                    { label: 'YouTube', handle: '@sameervisuals', icon: '▶' },
                    { label: 'Instagram', handle: '@sameer.editor', icon: '◈' },
                    { label: 'LinkedIn', handle: 'Sameer Visuals', icon: '◆' },
                ].map((social) => (
                    <a
                        key={social.label}
                        href="#"
                        className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 group"
                        style={{ borderColor: 'transparent', background: 'transparent' }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = `${COLORS.left}30`;
                            e.currentTarget.style.background = `${COLORS.left}08`;
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] flex-shrink-0"
                            style={{ background: `${COLORS.left}20`, color: COLORS.mid }}
                        >
                            {social.icon}
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white">{social.label}</p>
                            <p className="text-[9px] text-gray-500 font-mono truncate">{social.handle}</p>
                        </div>
                        <svg
                            className="w-3.5 h-3.5 ml-auto text-gray-600 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                ))}
            </div>
        </div>
    </div>
);

// ══════════════════════════════════════════
//  FAQ — Main Component
// ══════════════════════════════════════════
export default function FAQ() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [openId, setOpenId] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.05 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const filteredFaqs = faqs.filter((faq) => {
        const matchesCategory =
            activeCategory === 'All' || faq.category === activeCategory;
        const matchesSearch =
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleToggle = (id) => setOpenId(openId === id ? null : id);

    return (
        <>
            <style>{`
                @keyframes faqSlideIn {
                    from { opacity: 0; transform: translateX(-20px); }
                    to   { opacity: 1; transform: translateX(0);     }
                }
                @keyframes fadeSlideDown {
                    from { opacity: 0; transform: translateY(-25px); }
                    to   { opacity: 1; transform: translateY(0);     }
                }
                @keyframes fadeSlideRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to   { opacity: 1; transform: translateX(0);    }
                }
                @keyframes shimmer {
                    0%   { background-position: -300% center; }
                    100% { background-position:  300% center; }
                }
                @keyframes glowPulse {
                    0%, 100% { opacity: 1;   }
                    50%       { opacity: 0.4; }
                }
                @keyframes rotateSlow {
                    from { transform: rotate(0deg);   }
                    to   { transform: rotate(360deg); }
                }
                @keyframes floatSlow {
                    0%, 100% { transform: translateY(0px);   }
                    50%       { transform: translateY(-10px); }
                }
            `}</style>

            <section
                ref={sectionRef}
                className="relative w-full text-white py-28 md:py-44 px-6 sm:px-12 lg:px-24 overflow-hidden font-sans"
                style={{ background: COLORS.bg }}
            >
                {/* ══════════════════════════════════════ */}
                {/* ── GRADIENT SHADOW BACKGROUND EFFECTS ── */}
                {/* ══════════════════════════════════════ */}

                {/* Top-left corner radial glow */}
                <div
                    className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at top left, ${COLORS.left}30 0%, ${COLORS.left}10 40%, transparent 70%)`,
                    }}
                />

                {/* Top-right corner radial glow */}
                <div
                    className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at top right, ${COLORS.right}20 0%, ${COLORS.right}08 40%, transparent 70%)`,
                    }}
                />

                {/* Bottom-left corner radial glow */}
                <div
                    className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at bottom left, ${COLORS.right}18 0%, transparent 65%)`,
                    }}
                />

                {/* Bottom-right corner radial glow */}
                <div
                    className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at bottom right, ${COLORS.left}25 0%, ${COLORS.left}08 40%, transparent 70%)`,
                    }}
                />

                {/* Center radial glow — big soft pulse */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at center, ${COLORS.left}12 0%, ${COLORS.right}06 40%, transparent 70%)`,
                        animation: 'floatSlow 10s ease-in-out infinite',
                    }}
                />

                {/* Top center beam */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at top center, ${COLORS.mid}18 0%, transparent 70%)`,
                    }}
                />

                {/* Background grid */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(${COLORS.left} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.left} 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Rotating ring top-right */}
                <div
                    className="absolute top-20 right-20 w-32 h-32 rounded-full border hidden xl:block pointer-events-none"
                    style={{
                        borderColor: `${COLORS.left}15`,
                        animation: 'rotateSlow 22s linear infinite',
                    }}
                >
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                        style={{ background: COLORS.left }}
                    />
                </div>

                {/* Rotating ring bottom-left */}
                <div
                    className="absolute bottom-20 left-16 w-20 h-20 rounded-full border hidden xl:block pointer-events-none"
                    style={{
                        borderColor: `${COLORS.right}15`,
                        animation: 'rotateSlow 16s linear infinite reverse',
                    }}
                >
                    <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: COLORS.right }}
                    />
                </div>

                {/* ════════════════════════════════ */}
                {/* ── CONTENT ──                  */}
                {/* ════════════════════════════════ */}
                <div className="max-w-7xl mx-auto relative z-10">

                    {/* ── Section Header ── */}
                    <div
                        className="text-center mb-16 space-y-5"
                        style={{
                            animation: visible ? 'fadeSlideDown 0.7s ease forwards' : 'none',
                            opacity: 0,
                        }}
                    >
                        {/* Pill */}
                        <div
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border backdrop-blur-sm"
                            style={{ borderColor: `${COLORS.left}50`, background: `${COLORS.left}12` }}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: COLORS.mid, animation: 'glowPulse 2s ease-in-out infinite' }}
                            />
                            <span
                                className="text-[10px] font-black tracking-[0.35em] uppercase"
                                style={{ color: COLORS.mid }}
                            >
                                Got Questions?
                            </span>
                        </div>

                        {/* Heading — matches other sections */}
                        <h2 className="text-5xl sm:text-7xl font-black tracking-widest uppercase leading-none">
                            <span className="text-white">Frequently </span>
                            <span
                                style={{
                                    background: `linear-gradient(135deg, ${COLORS.left} 0%, ${COLORS.right} 50%, ${COLORS.mid} 100%)`,
                                    backgroundSize: '200% auto',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    animation: 'shimmer 5s linear infinite',
                                }}
                            >
                                Asked
                            </span>
                            <br />
                            <span className="text-white">Questions</span>
                        </h2>

                        <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed normal-case tracking-normal">
                            Everything about pricing, process & delivery —{' '}
                            <span style={{ color: COLORS.mid }} className="font-semibold">
                                answered clearly
                            </span>.
                        </p>

                        {/* Decorative line */}
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-px w-24" style={{ background: `linear-gradient(to right, transparent, ${COLORS.left})` }} />
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.left }} />
                            <div className="h-px w-24" style={{ background: `linear-gradient(to left, transparent, ${COLORS.left})` }} />
                        </div>
                    </div>

                    {/* ══ TWO COLUMN LAYOUT ══ */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">

                        {/* ════ LEFT — FAQ List ════ */}
                        <div className="lg:col-span-7 flex flex-col gap-5">

                            {/* Search bar */}
                            <div
                                style={{
                                    animation: visible ? 'faqSlideIn 0.6s ease forwards 0.1s' : 'none',
                                    opacity: 0,
                                }}
                            >
                                <div
                                    className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border transition-all duration-300"
                                    style={{
                                        borderColor: searchTerm ? `${COLORS.left}50` : 'rgba(255,255,255,0.08)',
                                        background: 'rgba(255,255,255,0.02)',
                                    }}
                                >
                                    <svg
                                        className="w-4 h-4 flex-shrink-0"
                                        fill="none" stroke={COLORS.mid} strokeWidth="2" viewBox="0 0 24 24"
                                    >
                                        <circle cx="11" cy="11" r="7" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search your question..."
                                        className="flex-1 bg-transparent outline-none text-white text-sm placeholder-gray-600 normal-case tracking-normal"
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm('')}
                                            className="text-gray-500 hover:text-white transition-colors duration-200 text-sm flex-shrink-0"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Category tabs */}
                            <div
                                className="flex flex-wrap items-center gap-2"
                                style={{
                                    animation: visible ? 'faqSlideIn 0.6s ease forwards 0.18s' : 'none',
                                    opacity: 0,
                                }}
                            >
                                {categories.map((cat) => {
                                    const isActive = activeCategory === cat;
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border"
                                            style={{
                                                background: isActive ? GRADIENT : 'rgba(255,255,255,0.02)',
                                                borderColor: isActive ? 'transparent' : 'rgba(255,255,255,0.08)',
                                                color: isActive ? COLORS.bg : '#9ca3af',
                                            }}
                                            onMouseEnter={e => {
                                                if (!isActive) e.currentTarget.style.borderColor = `${COLORS.left}40`;
                                            }}
                                            onMouseLeave={e => {
                                                if (!isActive) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                            }}
                                        >
                                            {cat}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* FAQ Items */}
                            <div className="space-y-3">
                                {filteredFaqs.length > 0 ? (
                                    filteredFaqs.map((faq, index) => (
                                        <FAQItem
                                            key={faq.id}
                                            faq={faq}
                                            index={index}
                                            visible={visible}
                                            isOpen={openId === faq.id}
                                            onClick={() => handleToggle(faq.id)}
                                        />
                                    ))
                                ) : (
                                    <div
                                        className="text-center py-16 rounded-2xl border"
                                        style={{
                                            borderColor: 'rgba(255,255,255,0.05)',
                                            background: 'rgba(255,255,255,0.01)',
                                        }}
                                    >
                                        <p className="text-4xl mb-3">🔍</p>
                                        <p className="text-gray-400 text-sm normal-case">
                                            No questions found matching your search.
                                        </p>
                                        <button
                                            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                                            className="mt-4 text-xs font-bold uppercase tracking-widest"
                                            style={{ color: COLORS.mid }}
                                        >
                                            Clear filters
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ════ RIGHT — Contact Panel ════ */}
                        <div className="lg:col-span-5">
                            <ContactPanel visible={visible} />
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
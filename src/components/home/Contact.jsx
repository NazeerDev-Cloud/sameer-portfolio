import React, { useEffect, useRef, useState } from "react";

// ── Brand Palette ──
const COLORS = {
    bg: "#080B29",
    left: "#623BFD",
    mid: "#D4C8FE",
    right: "#B296FE",
};
const GRADIENT = `linear-gradient(135deg, ${COLORS.left} 0%, ${COLORS.right} 60%, ${COLORS.mid} 100%)`;

// ── Backend API Configuration ──
const API_CONFIG = {
    // Development (local testing)
    endpoint: "http://localhost:5000/api/contact",

    // Production (deployment ke baad ye uncomment karna aur upar wala comment karna)
    // endpoint: "https://your-backend-url.onrender.com/api/contact",
};

// ── Pricing Plans ──
const PRICING_PLANS = [
    { value: "starter", label: "Starter - $149/video" },
    { value: "professional", label: "Professional - $299/video" },
    { value: "signature", label: "Signature - $499/video" },
    { value: "custom", label: "Custom Package" },
];

// ── Helper Function ──
const getSelectedPlanValue = (selectedPlan) => {
    if (!selectedPlan) return "";

    // Backward compatibility agar string pass ho
    if (typeof selectedPlan === "string") {
        return selectedPlan.toLowerCase();
    }

    return selectedPlan.value || "";
};

// ── Input Field ──
const InputField = ({ label, type = "text", placeholder, value, onChange, error, required }) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="flex flex-col gap-2.5">
            <label
                className="text-[13px] font-bold uppercase tracking-[0.15em] transition-colors duration-500"
                style={{ color: focused ? COLORS.mid : "#9DA3C2" }}
            >
                {label} {required && <span style={{ color: COLORS.right }}>*</span>}
            </label>
            <div
                className="relative rounded-2xl border transition-all duration-500 overflow-hidden"
                style={{
                    borderColor: error
                        ? "#ef4444"
                        : focused
                            ? COLORS.left
                            : "rgba(255,255,255,0.08)",
                    background: focused ? `${COLORS.left}10` : "rgba(255,255,255,0.02)",
                    boxShadow: focused ? `0 0 25px ${COLORS.left}20` : "none",
                }}
            >
                <div
                    className="absolute top-0 left-0 h-[2px] transition-all duration-700 ease-out"
                    style={{
                        width: focused ? "100%" : "0%",
                        background: GRADIENT,
                    }}
                />
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full px-5 py-4 bg-transparent outline-none text-white text-[16px] font-medium placeholder-[#6B7194]"
                />
            </div>
            {error && (
                <p className="text-[13px] font-semibold flex items-center gap-1.5" style={{ color: "#ef4444" }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};

// ── Textarea Field ──
const TextareaField = ({ label, placeholder, value, onChange, error, required }) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="flex flex-col gap-2.5">
            <label
                className="text-[13px] font-bold uppercase tracking-[0.15em] transition-colors duration-500"
                style={{ color: focused ? COLORS.mid : "#9DA3C2" }}
            >
                {label} {required && <span style={{ color: COLORS.right }}>*</span>}
            </label>
            <div
                className="relative rounded-2xl border transition-all duration-500 overflow-hidden"
                style={{
                    borderColor: error
                        ? "#ef4444"
                        : focused
                            ? COLORS.left
                            : "rgba(255,255,255,0.08)",
                    background: focused ? `${COLORS.left}10` : "rgba(255,255,255,0.02)",
                    boxShadow: focused ? `0 0 25px ${COLORS.left}20` : "none",
                }}
            >
                <div
                    className="absolute top-0 left-0 h-[2px] transition-all duration-700 ease-out"
                    style={{
                        width: focused ? "100%" : "0%",
                        background: GRADIENT,
                    }}
                />
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    rows={5}
                    className="w-full px-5 py-4 bg-transparent outline-none text-white text-[16px] font-medium placeholder-[#6B7194] resize-none leading-relaxed"
                />
            </div>
            {error && (
                <p className="text-[13px] font-semibold flex items-center gap-1.5" style={{ color: "#ef4444" }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};

// ── Select Field ──
const SelectField = ({ label, value, onChange, options, required, error }) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="flex flex-col gap-2.5">
            <label
                className="text-[13px] font-bold uppercase tracking-[0.15em] transition-colors duration-500"
                style={{ color: focused ? COLORS.mid : "#9DA3C2" }}
            >
                {label} {required && <span style={{ color: COLORS.right }}>*</span>}
            </label>
            <div
                className="relative rounded-2xl border transition-all duration-500 overflow-hidden"
                style={{
                    borderColor: error
                        ? "#ef4444"
                        : focused
                            ? COLORS.left
                            : "rgba(255,255,255,0.08)",
                    background: focused ? `${COLORS.left}10` : "rgba(255,255,255,0.02)",
                    boxShadow: focused ? `0 0 25px ${COLORS.left}20` : "none",
                }}
            >
                <div
                    className="absolute top-0 left-0 h-[2px] transition-all duration-700 ease-out"
                    style={{
                        width: focused ? "100%" : "0%",
                        background: GRADIENT,
                    }}
                />
                <select
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full px-5 py-4 pr-12 bg-transparent outline-none text-white text-[16px] font-medium appearance-none cursor-pointer"
                    style={{ background: "transparent" }}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} style={{ background: "#0D0F35" }}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke={COLORS.right} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {error && (
                <p className="text-[13px] font-semibold flex items-center gap-1.5" style={{ color: "#ef4444" }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};

// ── Contact Info Card ──
const InfoCard = ({ icon, label, value, sub, link, index, visible }) => (
    <a
        href={link || "#"}
        target={link ? "_blank" : undefined}
        rel="noreferrer"
        className="info-card group flex items-center gap-5 p-6 rounded-2xl border transition-all duration-500"
        style={{
            borderColor: "rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
            animation: visible ? `fadeSlideRight 0.7s ease forwards ${index * 0.12 + 0.3}s` : "none",
            opacity: 0,
            textDecoration: "none",
        }}
    >
        <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
            style={{
                background: `${COLORS.left}20`,
                border: `1px solid ${COLORS.left}40`,
                color: COLORS.mid,
            }}
        >
            {icon}
        </div>
        <div className="min-w-0 flex-1">
            <p
                className="text-[12px] font-bold uppercase tracking-[0.2em] mb-1"
                style={{ color: COLORS.right }}
            >
                {label}
            </p>
            <p className="text-white text-[18px] font-bold truncate">{value}</p>
            {sub && (
                <p className="text-[#9DA3C2] text-[14px] mt-1">{sub}</p>
            )}
        </div>
        <svg
            className="w-5 h-5 flex-shrink-0 transition-all duration-500 group-hover:translate-x-1 opacity-40 group-hover:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke={COLORS.right}
            strokeWidth={2.5}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    </a>
);

// ══════════════════════════════════════════
//  CONTACT — Main Component
// ══════════════════════════════════════════
export default function Contact({ selectedPlan }) {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        budget: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    // ✅ Update form when selectedPlan changes
    useEffect(() => {
        const planValue = getSelectedPlanValue(selectedPlan);

        if (!planValue) return;

        // Reset submitted state when new plan selected
        setSubmitted(false);

        // Update service field with plan value
        setForm((previousForm) => ({
            ...previousForm,
            service: planValue,
        }));

        // Clear service error if any
        setErrors((previousErrors) => ({
            ...previousErrors,
            service: "",
        }));
    }, [selectedPlan]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.05 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // ✅ Updated service options with pricing plans
    const serviceOptions = [
        { value: "", label: "Select a service..." },
        ...PRICING_PLANS,
        { value: "youtube", label: "YouTube Editing" },
        { value: "shortform", label: "Short Form Content" },
        { value: "saas", label: "SaaS Explainer Videos" },
        { value: "documentary", label: "Documentary Editing" },
        { value: "tutorial", label: "Tutorials & Walkthroughs" },
        { value: "other", label: "Other / Custom" },
    ];

    const budgetOptions = [
        { value: "", label: "Select a budget range..." },
        { value: "100-300", label: "$100 – $300" },
        { value: "300-500", label: "$300 – $500" },
        { value: "500-1000", label: "$500 – $1,000" },
        { value: "1000+", label: "$1,000+" },
        { value: "discuss", label: "Let's Discuss" },
    ];

    // ✅ Validation
    const validate = () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Full name is required.";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Please enter a valid email.";
        }

        if (!form.service) {
            newErrors.service = "Please select a service or pricing plan.";
        }

        if (!form.message.trim()) {
            newErrors.message = "Tell me about your project.";
        }

        return newErrors;
    };

    // ✅ Updated handleSubmit with Backend API
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const response = await fetch(API_CONFIG.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (data.success) {
                setLoading(false);
                setSubmitted(true);

                // Form reset
                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    service: "",
                    budget: "",
                    message: "",
                });

                // Auto hide success message after 10 seconds
                setTimeout(() => {
                    setSubmitted(false);
                }, 10000);
            } else {
                setLoading(false);
                alert(data.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            alert('Network error. Please check your connection and try again.');
        }
    };

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    return (
        <>
            <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(40px); }
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
        @keyframes floatY {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-10px);  }
        }
        @keyframes successPop {
          0%   { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1);    }
        }
        @keyframes spin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
        .info-card:hover {
          border-color: ${COLORS.left}50 !important;
          background: ${COLORS.left}10 !important;
          box-shadow: 0 12px 40px ${COLORS.left}20 !important;
          transform: translateX(4px);
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
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>

            <section
                ref={sectionRef}
                className="relative w-full text-white py-28 md:py-36 px-6 sm:px-12 lg:px-20 xl:px-28 overflow-hidden"
            >
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-40 z-[2]"
                    style={{
                        background: "linear-gradient(to bottom, #080B29 0%, rgba(8, 11, 41, 0.7) 50%, transparent 100%)",
                    }}
                />

                <div
                    className="orb-1 absolute top-0 left-0 w-[700px] h-[700px] pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at top left, ${COLORS.left}30 0%, transparent 65%)`,
                        animation: "orbFloat 15s ease-in-out infinite",
                    }}
                />
                <div
                    className="orb-2 absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at top right, ${COLORS.right}20 0%, transparent 65%)`,
                        animation: "orbFloat 18s ease-in-out infinite reverse",
                    }}
                />
                <div
                    className="orb-3 absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at bottom left, ${COLORS.right}15 0%, transparent 65%)`,
                        animation: "orbFloat 20s ease-in-out infinite",
                    }}
                />
                <div
                    className="orb-4 absolute bottom-0 right-0 w-[700px] h-[700px] pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at bottom right, ${COLORS.left}25 0%, transparent 65%)`,
                        animation: "orbFloat 22s ease-in-out infinite reverse",
                    }}
                />

                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(${COLORS.left} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.left} 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                        maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
                        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
                    }}
                />

                <div
                    className="absolute top-32 right-32 w-40 h-40 rounded-full border hidden xl:block pointer-events-none"
                    style={{ borderColor: `${COLORS.left}20`, animation: "rotateSlow 22s linear infinite" }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style={{ background: COLORS.left, boxShadow: `0 0 15px ${COLORS.left}` }} />
                </div>
                <div
                    className="absolute bottom-32 left-24 w-28 h-28 rounded-full border hidden xl:block pointer-events-none"
                    style={{ borderColor: `${COLORS.right}20`, animation: "rotateSlow 16s linear infinite reverse" }}
                >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ background: COLORS.right, boxShadow: `0 0 12px ${COLORS.right}` }} />
                </div>

                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: `${2 + Math.random() * 4}px`,
                                height: `${2 + Math.random() * 4}px`,
                                left: `${5 + Math.random() * 90}%`,
                                top: `${5 + Math.random() * 90}%`,
                                background: COLORS.mid,
                                opacity: 0.3,
                                animation: `floatY ${6 + Math.random() * 4}s ease-in-out infinite`,
                                animationDelay: `${i * 1.2}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div
                        className="text-center mb-20 space-y-6"
                        style={{
                            animation: visible ? "fadeSlideDown 0.8s ease forwards" : "none",
                            opacity: 0,
                        }}
                    >
                        <div
                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border backdrop-blur-sm"
                            style={{ borderColor: `${COLORS.left}50`, background: `${COLORS.left}12` }}
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
                                Get In Touch
                            </span>
                        </div>

                        <h2 className="text-[42px] sm:text-[54px] md:text-[64px] lg:text-[72px] font-extrabold tracking-tight leading-[1.05]">
                            <span className="text-white">Let's </span>
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
                                Create
                            </span>
                            <span className="text-white"> Together</span>
                        </h2>

                        <p className="text-[#B8BDD9] text-[20px] leading-[1.7] max-w-2xl mx-auto">
                            Have a project in mind? Fill in the form and I'll get back to you within{" "}
                            <span style={{ color: COLORS.mid }} className="font-bold">
                                24 hours
                            </span>
                            .
                        </p>

                        <div className="flex items-center justify-center gap-4 pt-2">
                            <div
                                className="h-px w-28"
                                style={{ background: `linear-gradient(to right, transparent, ${COLORS.left})` }}
                            />
                            <div className="w-2 h-2 rounded-full" style={{ background: COLORS.left, boxShadow: `0 0 10px ${COLORS.left}` }} />
                            <div
                                className="h-px w-28"
                                style={{ background: `linear-gradient(to left, transparent, ${COLORS.left})` }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
                        <div className="lg:col-span-5 flex flex-col gap-5">
                            <div
                                className="flex items-center gap-4 p-5 rounded-2xl border"
                                style={{
                                    borderColor: `${COLORS.left}30`,
                                    background: `${COLORS.left}10`,
                                    animation: visible ? "fadeSlideLeft 0.7s ease forwards 0.1s" : "none",
                                    opacity: 0,
                                }}
                            >
                                <span className="relative flex h-3.5 w-3.5 flex-shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400" style={{ boxShadow: "0 0 12px rgba(74,222,128,0.8)" }} />
                                </span>
                                <div>
                                    <p className="text-white text-[16px] font-bold uppercase tracking-wider">
                                        Available for New Projects
                                    </p>
                                    <p className="text-[14px] mt-0.5" style={{ color: COLORS.right }}>
                                        Currently accepting new projects
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <InfoCard
                                    icon={
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    }
                                    label="Email"
                                    value="connectsameervisuals@gmail.com"
                                    sub="Replies within 24 hours"
                                    link="mailto:connectsameervisuals@gmail.com"
                                    index={0}
                                    visible={visible}
                                />
                                <InfoCard
                                    icon={
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    }
                                    label="Phone / WhatsApp"
                                    value="+92 303 9800035"
                                    sub="Available Mon–Sat, 9am–6pm PKT"
                                    link="tel:+923039800035"
                                    index={1}
                                    visible={visible}
                                />
                                <InfoCard
                                    icon={
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    }
                                    label="Location"
                                    value="Remote — Worldwide"
                                    sub="Working across all time zones"
                                    index={2}
                                    visible={visible}
                                />
                                <InfoCard
                                    icon={
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    }
                                    label="Response Time"
                                    value="Under 24 Hours"
                                    sub="Guaranteed first reply"
                                    index={3}
                                    visible={visible}
                                />
                            </div>

                            <div
                                className="relative overflow-hidden p-6 rounded-2xl border"
                                style={{
                                    borderColor: `${COLORS.left}30`,
                                    background: `linear-gradient(135deg, ${COLORS.left}15, ${COLORS.right}08)`,
                                    animation: visible ? "fadeSlideLeft 0.7s ease forwards 0.7s" : "none",
                                    opacity: 0,
                                }}
                            >
                                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl" style={{ background: COLORS.left, opacity: 0.15 }} />
                                <div className="relative flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: GRADIENT, boxShadow: `0 8px 25px ${COLORS.left}40` }}
                                    >
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white text-[18px] font-bold mb-1">
                                            100% Confidential
                                        </p>
                                        <p className="text-[15px] leading-relaxed" style={{ color: COLORS.right }}>
                                            Your project details are kept strictly private and never shared with third parties.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="lg:col-span-7 relative rounded-3xl border p-8 sm:p-10 md:p-12 overflow-hidden"
                            style={{
                                borderColor: `${COLORS.left}25`,
                                background: "rgba(255,255,255,0.02)",
                                backdropFilter: "blur(10px)",
                                animation: visible ? "fadeSlideRight 0.8s ease forwards 0.3s" : "none",
                                opacity: 0,
                            }}
                        >
                            <div
                                className="absolute top-0 left-0 right-0 h-[2px]"
                                style={{ background: GRADIENT }}
                            />

                            <div
                                className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                                style={{ background: COLORS.left, opacity: 0.1 }}
                            />
                            <div
                                className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-3xl pointer-events-none"
                                style={{ background: COLORS.right, opacity: 0.08 }}
                            />

                            <div className="flex items-center justify-between mb-10 pb-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                                <div>
                                    <p
                                        className="text-[13px] font-semibold uppercase tracking-[0.2em] mb-2"
                                        style={{ color: COLORS.mid }}
                                    >
                                        Project Brief
                                    </p>
                                    <h3 className="text-[28px] sm:text-[32px] font-extrabold text-white tracking-tight">
                                        Tell Me About Your Project
                                    </h3>
                                </div>
                                <div
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border text-[12px] font-bold uppercase tracking-wider"
                                    style={{
                                        borderColor: `${COLORS.left}40`,
                                        background: `${COLORS.left}10`,
                                        color: COLORS.mid,
                                    }}
                                >
                                    <span
                                        className="w-2 h-2 rounded-full bg-emerald-400"
                                        style={{ animation: "glowPulse 2s ease-in-out infinite", boxShadow: "0 0 8px rgba(74,222,128,0.8)" }}
                                    />
                                    Free Consultation
                                </div>
                            </div>

                            {submitted ? (
                                <div
                                    className="flex flex-col items-center justify-center py-20 text-center gap-6"
                                    style={{ animation: "successPop 0.5s ease forwards" }}
                                >
                                    <div
                                        className="w-24 h-24 rounded-3xl flex items-center justify-center relative"
                                        style={{ background: GRADIENT, boxShadow: `0 15px 45px ${COLORS.left}50` }}
                                    >
                                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <div className="absolute inset-0 rounded-3xl" style={{ background: GRADIENT, opacity: 0.5, filter: "blur(20px)" }} />
                                    </div>
                                    <div>
                                        <h4 className="text-white text-[32px] font-extrabold mb-3">Thank You!</h4>
                                        <p className="text-[#B8BDD9] text-[18px] leading-relaxed max-w-md">
                                            Your response has been recorded and we will contact you shortly. I'll review your project details and get back to you within{" "}
                                            <span style={{ color: COLORS.mid }} className="font-bold">
                                                24 hours
                                            </span>
                                            .
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSubmitted(false);
                                        }}
                                        className="mt-4 px-6 py-3 rounded-xl border text-[14px] font-bold uppercase tracking-wider transition-all duration-500 hover:-translate-y-0.5"
                                        style={{
                                            borderColor: `${COLORS.left}50`,
                                            background: `${COLORS.left}10`,
                                            color: COLORS.mid,
                                        }}
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <InputField
                                            label="Full Name"
                                            placeholder="John Doe"
                                            value={form.name}
                                            onChange={handleChange("name")}
                                            error={errors.name}
                                            required
                                        />
                                        <InputField
                                            label="Email Address"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={form.email}
                                            onChange={handleChange("email")}
                                            error={errors.email}
                                            required
                                        />
                                    </div>

                                    <InputField
                                        label="Phone Number (Optional)"
                                        type="tel"
                                        placeholder="+92 300 1234567"
                                        value={form.phone}
                                        onChange={handleChange("phone")}
                                    />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <SelectField
                                            label="Service / Pricing Plan"
                                            value={form.service}
                                            onChange={handleChange("service")}
                                            options={serviceOptions}
                                            required
                                            error={errors.service}
                                        />
                                        <SelectField
                                            label="Budget Range"
                                            value={form.budget}
                                            onChange={handleChange("budget")}
                                            options={budgetOptions}
                                            error={errors.budget}
                                        />
                                    </div>

                                    <TextareaField
                                        label="Project Details"
                                        placeholder="Tell me about your project — what are you creating, what's your target audience, and what results are you aiming for?"
                                        value={form.message}
                                        onChange={handleChange("message")}
                                        error={errors.message}
                                        required
                                    />

                                    <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                                        <p className="text-[14px] text-[#9DA3C2] max-w-xs">
                                            Your information is kept private and never shared with third parties.
                                        </p>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="cta-shimmer group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-[16px] overflow-hidden transition-all duration-500 hover:-translate-y-1 flex-shrink-0"
                                            style={{
                                                background: GRADIENT,
                                                color: "#fff",
                                                boxShadow: `0 10px 35px ${COLORS.left}40`,
                                                opacity: loading ? 0.7 : 1,
                                            }}
                                        >
                                            <span className="relative z-10 flex items-center gap-2.5">
                                                {loading ? (
                                                    <>
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            style={{ animation: "spin 1s linear infinite" }}
                                                        >
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                        </svg>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
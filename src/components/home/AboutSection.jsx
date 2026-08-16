import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

export default function AboutSection({
  mainImg = "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?auto=format&fit=crop&q=80&w=1200",
  bottomLeftImg = "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=800",
  bottomRightImg = "https://images.unsplash.com/photo-1579165466991-467135ad3110?auto=format&fit=crop&q=80&w=800",
  topLeftImg = "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&q=80&w=400",
  bottomSmallImg = "https://images.unsplash.com/photo-1520446269009-2f7c23fd1205?auto=format&fit=crop&q=80&w=400",
}) {

  const sectionRef = useRef(null);
  const [imgErrors, setImgErrors] = useState({});

  const handleImageError = (key) => {
    setImgErrors(prev => ({ ...prev, [key]: true }));
    console.warn(`Image ${key} failed, using fallback`);
  };

  const getSrc = (src, key) => {
    if (imgErrors[key]) {
      return getFallback(key);
    }
    return src;
  };

  const getFallback = (key) => {
    const fallbacks = {
      main: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=1200",
      topLeft: "https://images.unsplash.com/photo-1518329024707-5ce6a13ff777?auto=format&fit=crop&q=80&w=400",
      bottomLeft: "https://images.unsplash.com/photo-1595855759920-86582396756c?auto=format&fit=crop&q=80&w=800",
      bottomRight: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=800",
      bottomSmall: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&q=80&w=400"
    };
    return fallbacks[key] || fallbacks.bottomSmall;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".scroll-reveal");
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

  const features = [
    {
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: "Cinematic Editing",
      desc: "Hollywood-grade cutting techniques with seamless pacing and rhythm.",
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "Color Science",
      desc: "Advanced grading pipelines to achieve the perfect visual tone.",
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      title: "Sound Design",
      desc: "Crystal-clear audio alignment and immersive sound engineering.",
    },
  ];

  return (
    <>
      <section
        ref={sectionRef}
        id="about"
        aria-labelledby="about-heading"
        className="about-section relative overflow-hidden bg-[#080B29] px-5 pt-32 pb-24 text-white sm:px-10 md:pt-40 md:pb-32 lg:px-16 xl:px-24"
      >
        {/* ===== SEAMLESS TOP BLEND (Fixes seam with Hero section) ===== */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 z-2"
          style={{
            background: 'linear-gradient(to bottom, #080B29 0%, rgba(8, 11, 41, 0.7) 50%, transparent 100%)'
          }}
        />

        {/* ===== SEAMLESS BOTTOM BLEND (For next section) ===== */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-2"
          style={{
            background: 'linear-gradient(to top, #080B29 0%, rgba(8, 11, 41, 0.7) 50%, transparent 100%)'
          }}
        />

        {/* Grid Background */}
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="grid-dots pointer-events-none absolute inset-0" />

        {/* Radial Glow Orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="orb orb-1 absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#623BFD]/20 blur-[120px]" />
          <div className="orb orb-2 absolute -right-20 top-1/2 h-[400px] w-[400px] rounded-full bg-[#B296FE]/15 blur-[100px]" />
          <div className="orb orb-3 absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-[#D4C8FE]/10 blur-[110px]" />
        </div>

        {/* Floating Particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="particle absolute rounded-full bg-[#D4C8FE]"
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

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* Top Header Area */}
          <div className="mb-20 text-center">
            <div className="scroll-reveal inline-flex items-center gap-2 rounded-full border border-[#623BFD]/30 bg-[#623BFD]/10 px-6 py-2.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#B296FE] shadow-[0_0_8px_rgba(178,150,254,0.6)] pulse-dot" />
              <span className="text-sm font-semibold tracking-wider text-[#D4C8FE] uppercase">
                About My Studio
              </span>
            </div>

            <h2
              id="about-heading"
              className="scroll-reveal mt-8 text-[32px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[42px] md:text-[50px] lg:text-[58px]"
            >
              I Create
              <br />
              <span className="heading-gradient inline-block bg-linear-to-r from-[#623BFD] via-[#D4C8FE] to-[#B296FE] bg-clip-text text-transparent">
                Stunning Visuals
              </span>
            </h2>

            <p className="scroll-reveal mx-auto mt-8 max-w-3xl text-[18px] leading-[1.8] text-[#B8BDD9] sm:text-[20px] md:text-[22px]">
              I operate at the intersection of pacing, narrative architecture,
              and cutting-edge visual post-production. Every single frame is
              carefully crafted to capture attention from the very first moment.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">

            {/* Left: Feature Cards + CTA */}
            <div className="order-2 lg:order-1">

              {/* Feature Cards */}
              <div className="space-y-5">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="scroll-reveal feature-card group flex gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-500 hover:border-[#623BFD]/40 hover:bg-white/[0.06]"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#623BFD]/30 bg-gradient-to-br from-[#623BFD]/20 to-[#B296FE]/10 text-[#D4C8FE] transition-all duration-500 group-hover:border-[#B296FE]/50 group-hover:shadow-[0_0_20px_rgba(98,59,253,0.3)]">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-[20px] font-bold text-white sm:text-[22px]">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-[16px] leading-relaxed text-[#9DA3C2] sm:text-[18px]">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="scroll-reveal mt-10">
                <Link
                  to="/work"
                  className="cta-primary group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#623BFD] via-[#8562FE] to-[#B296FE] px-8 py-4 text-[16px] font-semibold text-white shadow-[0_8px_32px_rgba(98,59,253,0.4)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_44px_rgba(98,59,253,0.5)] sm:text-[18px]"
                >
                  View My Work
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
                </Link>
              </div>
            </div>

            {/* Right: Bento Image Grid */}
            <div className="order-1 lg:order-2">
              <div className="scroll-reveal bento-grid mx-auto grid max-w-[540px] grid-cols-12 grid-rows-12 gap-3 sm:gap-4" style={{ height: "620px" }}>

                {/* Main Large Image */}
                <div className="bento-item float-up-down col-span-8 row-span-7 col-start-4 row-start-1 overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.04] p-2 backdrop-blur-lg sm:rounded-[32px] sm:p-3">
                  <div className="relative h-full w-full overflow-hidden rounded-[22px] sm:rounded-[26px]">
                    <img
                      src={getSrc(mainImg, "main")}
                      alt="Premiere Pro editing timeline"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={() => handleImageError("main")}
                      loading="lazy"
                    />
                    {!imgErrors.main && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080B29]/40 via-transparent to-transparent" />
                    )}
                  </div>
                </div>

                {/* Top Left Accent */}
                <div className="bento-item float-diag-1 col-span-3 row-span-3 col-start-1 row-start-1 overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.04] p-1.5 backdrop-blur-lg sm:rounded-[24px] sm:p-2">
                  <img
                    src={getSrc(topLeftImg, "topLeft")}
                    alt="Video editing interface"
                    className="h-full w-full rounded-[16px] object-cover transition-transform duration-700 hover:scale-105 sm:rounded-[18px]"
                    onError={() => handleImageError("topLeft")}
                    loading="lazy"
                  />
                </div>

                {/* Bottom Left */}
                <div className="bento-item float-left-right col-span-6 row-span-5 col-start-1 row-start-5 overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.04] p-2 backdrop-blur-lg sm:rounded-[28px] sm:p-2.5">
                  <div className="relative h-full w-full overflow-hidden rounded-[18px] sm:rounded-[22px]">
                    <img
                      src={getSrc(bottomLeftImg, "bottomLeft")}
                      alt="After Effects composition"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={() => handleImageError("bottomLeft")}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#623BFD]/10 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Bottom Right */}
                <div className="bento-item float-diag-2 col-span-6 row-span-5 col-start-7 row-start-8 overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.04] p-2 backdrop-blur-lg sm:rounded-[28px] sm:p-2.5">
                  <div className="relative h-full w-full overflow-hidden rounded-[18px] sm:rounded-[22px]">
                    <img
                      src={getSrc(bottomRightImg, "bottomRight")}
                      alt="Color grading workspace"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={() => handleImageError("bottomRight")}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tl from-[#B296FE]/10 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Small Accent Node */}
                <div className="bento-item float-up-down-delayed col-span-2 row-span-2 col-start-5 row-start-10 overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.06] p-1.5 backdrop-blur-lg relative">
                  {imgErrors.bottomSmall && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#623BFD] to-[#B296FE]">
                      <svg className="h-4 w-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                        <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <img
                    src={getSrc(bottomSmallImg, "bottomSmall")}
                    alt="Editing accent"
                    className="h-full w-full rounded-xl object-cover"
                    onError={() => handleImageError("bottomSmall")}
                    loading="lazy"
                  />
                </div>

                {/* Decorative Glow Ring */}
                <div className="col-span-2 row-span-2 col-start-1 row-start-4 flex items-center justify-center">
                  <div className="glow-ring h-10 w-10 rounded-full border-2 border-[#623BFD]/40 shadow-[0_0_20px_rgba(98,59,253,0.3)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ===== GRID BACKGROUND ===== */
        .grid-bg {
          background-image:
            linear-gradient(rgba(98, 59, 253, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(98, 59, 253, 0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%);
        }

        .grid-dots {
          background-image: radial-gradient(circle, rgba(212, 200, 254, 0.12) 1px, transparent 1px);
          background-size: 60px 60px;
          background-position: 30px 30px;
          mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black 10%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black 10%, transparent 70%);
        }

        /* ===== ORB ANIMATIONS ===== */
        .orb {
          animation: orbFloat 12s ease-in-out infinite;
        }
        .orb-1 { animation-delay: 0s; }
        .orb-2 { animation-delay: -4s; }
        .orb-3 { animation-delay: -8s; }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }

        /* ===== PARTICLE ANIMATION ===== */
        .particle {
          opacity: 0.3;
          animation: particleDrift linear infinite;
        }

        @keyframes particleDrift {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% {
            transform: translateY(-120px) translateX(40px);
            opacity: 0;
          }
        }

        /* ===== PULSE DOT ===== */
        .pulse-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(178, 150, 254, 0.6); }
          50% { opacity: 0.5; box-shadow: 0 0 16px rgba(178, 150, 254, 0.9); }
        }

        /* ===== HEADING GRADIENT ANIMATION ===== */
        .heading-gradient {
          background-size: 300% 300%;
          animation: headingShift 5s ease-in-out infinite;
        }

        @keyframes headingShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* ===== SCROLL REVEAL ===== */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== BENTO ITEM HOVER ===== */
        .bento-item {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.4s ease,
                      box-shadow 0.4s ease;
        }

        .bento-item:hover {
          border-color: rgba(98, 59, 253, 0.35) !important;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.4),
            0 0 30px rgba(98, 59, 253, 0.15);
        }

        /* ===== FEATURE CARD GLOW ===== */
        .feature-card {
          position: relative;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          background: linear-gradient(135deg, rgba(98, 59, 253, 0.08), transparent 60%);
          transition: opacity 0.5s ease;
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        /* ===== FLOAT ANIMATIONS ===== */
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }

        @keyframes floatUpDownDelayed {
          0%, 100% { transform: translateY(-8px); }
          50% { transform: translateY(8px); }
        }

        @keyframes floatLeftRight {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(10px); }
        }

        @keyframes floatDiag1 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(8px, -10px); }
        }

        @keyframes floatDiag2 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-10px, 8px); }
        }

        .float-up-down { animation: floatUpDown 6s ease-in-out infinite; }
        .float-up-down-delayed { animation: floatUpDownDelayed 5s ease-in-out infinite; }
        .float-left-right { animation: floatLeftRight 7s ease-in-out infinite; }
        .float-diag-1 { animation: floatDiag1 6.5s ease-in-out infinite; }
        .float-diag-2 { animation: floatDiag2 7.5s ease-in-out infinite; }

        /* ===== GLOW RING ===== */
        .glow-ring {
          animation: glowRingPulse 3s ease-in-out infinite;
        }

        @keyframes glowRingPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
            box-shadow: 0 0 20px rgba(98, 59, 253, 0.3);
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
            box-shadow: 0 0 30px rgba(98, 59, 253, 0.5);
          }
        }

        /* ===== CTA SHIMMER ===== */
        .cta-primary {
          position: relative;
          overflow: hidden;
        }

        .cta-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }

        /* ===== REDUCED MOTION ===== */
        @media (prefers-reduced-motion: reduce) {
          .scroll-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .float-up-down,
          .float-up-down-delayed,
          .float-left-right,
          .float-diag-1,
          .float-diag-2,
          .orb,
          .particle,
          .pulse-dot,
          .heading-gradient,
          .glow-ring,
          .cta-primary::before {
            animation: none !important;
          }

          .bento-item,
          .feature-card {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
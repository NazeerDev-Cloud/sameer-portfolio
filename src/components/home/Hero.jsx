import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import sameerImg from "../../assets/sameer.jpeg";
const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePos({ x, y });
  };

  const handleCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;

    setCardTilt({ x: rotateX, y: rotateY });
  };

  const resetCardTilt = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  const stats = [
    { value: "200+", label: "Projects" },
    { value: "12+", label: "Festival Picks" },
    { value: "3+", label: "Years" },
    { value: "98%", label: "Satisfaction" },
  ];

  const tools = [
    { short: "Pr", name: "Premiere Pro", color: "#9999FF" },
    { short: "Ae", name: "After Effects", color: "#D291FF" },
    { short: "Da", name: "DaVinci", color: "#FF6B6B" },
    { short: "Bl", name: "Blender", color: "#FF8C42" },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      style={{
        background:
          "radial-gradient(circle at top left, #17104A 0%, #080B29 38%, #05071D 100%)",
        fontFamily: "'Inter','Segoe UI',sans-serif",
      }}
    >
      {/* Mouse Glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: "760px",
          height: "760px",
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: "translate(-50%, -50%)",
          borderRadius: "999px",
          background:
            "radial-gradient(circle, rgba(126,87,255,0.17) 0%, rgba(126,87,255,0.07) 32%, transparent 68%)",
          filter: "blur(8px)",
          transition: "left 0.7s ease, top 0.7s ease",
          zIndex: 0,
        }}
      />

      {/* Deep Ambient Blobs */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-purple-600/25 blur-[110px] animate-blobOne" />
      <div className="absolute -bottom-44 -right-32 h-[620px] w-[620px] rounded-full bg-indigo-500/20 blur-[130px] animate-blobTwo" />
      <div className="absolute left-[45%] top-[20%] h-[320px] w-[320px] rounded-full bg-violet-300/10 blur-[90px] animate-blobThree" />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(151,125,255,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(151,125,255,0.055) 1px, transparent 1px)
          `,
          backgroundSize: "68px 68px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 80%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* Background Glass Icons */}
      <div className="absolute left-20 top-24 hidden md:block z-[1] animate-floatSoft">
        <div className="glassAppIcon">
          <span style={{ color: "#9999FF" }}>Pr</span>
        </div>
        <p className="glassAppLabel" style={{ color: "#9999FF" }}>
          Premiere Pro
        </p>
      </div>

      <div className="absolute right-20 top-24 hidden md:block z-[1] animate-floatSoft animation-delay-1200">
        <div className="glassAppIcon aeIcon">
          <span style={{ color: "#D291FF" }}>Ae</span>
        </div>
        <p className="glassAppLabel" style={{ color: "#D291FF" }}>
          After Effects
        </p>
      </div>

      <div className="absolute right-[12%] bottom-[14%] hidden lg:block z-[1] animate-floatSoft animation-delay-2200 opacity-60">
        <div className="glassAppIcon largeIcon">
          <span style={{ color: "#9999FF" }}>Pr</span>
        </div>
      </div>

      <div className="absolute left-[9%] bottom-[10%] hidden lg:block z-[1] animate-floatSoft animation-delay-3000 opacity-50">
        <div className="glassAppIcon largeIcon aeIcon">
          <span style={{ color: "#D291FF" }}>Ae</span>
        </div>
      </div>

      {/* Main Container - INCREASED PADDING HERE */}
      <div className="relative z-10 w-full px-10 sm:px-16 lg:px-[10vw] pt-[100px] pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 xl:gap-24">
          {/* Left Content */}
          <div
            className="max-w-2xl"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded
                ? "translateY(0px)"
                : "translateY(34px)",
              transition:
                "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-violet-400/35 bg-violet-500/10 px-5 py-2.5 backdrop-blur-xl shadow-[0_0_35px_rgba(124,92,255,0.18)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_14px_rgba(167,139,250,1)]" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-violet-200">
                Available for Projects
              </span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-[clamp(38px,5vw,76px)] font-black leading-[0.98] tracking-[-0.055em] text-white">
              Crafting{" "}
              <span className="animatedTextGradient">Cinematic</span>
              <br />
              Stories With
              <br />
              Visual Impact
            </h1>

            {/* Description */}
            <p className="mb-9 max-w-xl text-[16px] sm:text-[18px] leading-[1.8] text-white/58">
              I transform raw footage into polished, high-retention films,
              branded edits, social campaigns, trailers, and cinematic content
              with sharp pacing, clean sound design, rich color, and premium VFX.
            </p>

            {/* Buttons */}
            <div className="mb-11 flex flex-wrap gap-4">
              <HashLink
                smooth
                to="/#projects"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#623BFD] via-[#7C5CFF] to-[#B296FE] px-8 py-4 text-[15px] font-black text-white shadow-[0_16px_48px_rgba(98,59,253,0.42)] transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.025] hover:shadow-[0_24px_70px_rgba(98,59,253,0.62)]"
              >
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
                <span className="relative">View Showreel</span>
              </HashLink>

              <Link
                to="/work"
                className="rounded-2xl border border-white/13 bg-white/[0.045] px-8 py-4 text-[15px] font-black text-white/78 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:border-violet-300/50 hover:bg-violet-500/12 hover:text-violet-100 hover:shadow-[0_18px_50px_rgba(124,92,255,0.2)]"
              >
                Explore Portfolio
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-white/9 bg-white/[0.035] p-5 text-center backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-500/10 hover:shadow-[0_18px_50px_rgba(98,59,253,0.18)]"
                  style={{
                    animation: isLoaded
                      ? `fadeRise 0.9s cubic-bezier(0.16,1,0.3,1) ${0.18 + index * 0.08
                      }s both`
                      : "none",
                  }}
                >
                  <p className="text-[24px] font-black tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-violet-500">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-white/35">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Tools */}
            <div className="mt-9 max-w-2xl border-t border-white/8 pt-6">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.19em] text-white/25">
                Post Production Stack
              </p>

              <div className="flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/[0.075] hover:shadow-[0_16px_42px_rgba(0,0,0,0.26)]"
                    style={{
                      "--tool-color": tool.color,
                    }}
                  >
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-black text-white shadow-lg transition-all duration-500 group-hover:scale-110"
                      style={{
                        background: tool.color,
                        boxShadow: `0 0 18px ${tool.color}55`,
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      {tool.short}
                    </span>

                    <span
                      className="text-[13px] font-bold text-white/46 transition-colors duration-500 group-hover:text-white/85"
                    >
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div
            className="relative flex justify-center lg:justify-end"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded
                ? "translateY(0px)"
                : "translateY(44px)",
              transition:
                "opacity 1.1s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.18s",
              perspective: "1200px",
            }}
          >
            <div className="relative h-[600px] w-[480px] max-w-full -ml-32">
              {/* Main Glow Behind Card */}
              <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/18 blur-[90px] animate-glowBreath" />

              {/* Blurred Grey Tilt Frame 1 */}
              <div
                className="absolute inset-0 rounded-[56px] border border-white/10 bg-slate-300/10 backdrop-blur-md"
                style={{
                  transform:
                    "rotate(-13deg) translateX(-22px) translateY(18px)",
                  filter: "blur(1px)",
                  boxShadow: "0 45px 100px rgba(0,0,0,0.34)",
                }}
              />

              {/* Blurred Grey Tilt Frame 2 */}
              <div
                className="absolute inset-0 rounded-[56px] border border-white/10 bg-slate-300/8 backdrop-blur-md"
                style={{
                  transform:
                    "rotate(9deg) translateX(26px) translateY(14px)",
                  filter: "blur(1.2px)",
                  boxShadow: "0 45px 100px rgba(0,0,0,0.28)",
                }}
              />

              {/* Main Image Card */}
              <div
                onMouseMove={handleCardMove}
                onMouseLeave={resetCardTilt}
                className="group relative h-full w-full overflow-hidden rounded-[56px] border border-white/14 bg-[#11132F] shadow-[0_55px_130px_rgba(0,0,0,0.72)] transition-all duration-700 ease-out"
                style={{
                  transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Shine Layer */}
                <div className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/18 to-transparent transition-transform duration-1000 group-hover:translate-x-[420%]" />
                </div>

                <img
                  src={sameerImg}
                  alt="Sameer Video Editor"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.055]"
                  style={{
                    objectPosition: "top center",
                    filter:
                      "brightness(0.9) contrast(1.08) saturate(1.08)",
                  }}
                />

                {/* Soft Purple Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/12 via-transparent to-transparent mix-blend-overlay" />

                {/* Bottom Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060820] via-[#060820]/18 to-transparent" />

                {/* Inner Border Glow */}
                <div className="pointer-events-none absolute inset-0 rounded-[56px] shadow-[inset_0_0_90px_rgba(124,92,255,0.14)]" />

                {/* Name Inside Card Only */}
                <div
                  className="absolute bottom-7 left-7 right-7"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div className="rounded-3xl border border-white/12 bg-black/18 px-5 py-4 backdrop-blur-xl">
                    <p className="text-[22px] font-black tracking-[-0.04em] text-white">
                      Sameer Visuals
                    </p>
                    <p className="mt-1 text-[13px] font-bold text-violet-200/70">
                      Professional Video Editor
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Small Glow Dots */}
              <span className="absolute -left-6 top-24 h-3 w-3 rounded-full bg-violet-300 shadow-[0_0_25px_rgba(196,181,253,1)] animate-dotPulse" />
              <span className="absolute -right-4 bottom-32 h-2.5 w-2.5 rounded-full bg-indigo-300 shadow-[0_0_25px_rgba(165,180,252,1)] animate-dotPulse animation-delay-1200" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animatedTextGradient {
          background: linear-gradient(90deg, #B296FE, #ffffff, #7C5CFF, #D4C8FE);
          background-size: 260% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientMove 5s ease-in-out infinite;
          text-shadow: 0 0 55px rgba(124,92,255,0.24);
        }

        .glassAppIcon {
          width: 62px;
          height: 62px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.035));
          border: 1px solid rgba(255,255,255,0.16);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          box-shadow:
            0 18px 55px rgba(0,0,0,0.36),
            inset 0 1px 0 rgba(255,255,255,0.12),
            0 0 34px rgba(153,153,255,0.16);
          transition: all 0.55s cubic-bezier(0.16,1,0.3,1);
        }

        .glassAppIcon span {
          font-size: 22px;
          font-weight: 900;
          font-family: Georgia, serif;
          letter-spacing: -0.04em;
          text-shadow: 0 0 18px currentColor;
        }

        .glassAppIcon:hover {
          transform: translateY(-6px) scale(1.11);
          border-color: rgba(255,255,255,0.32);
          box-shadow:
            0 28px 70px rgba(0,0,0,0.45),
            inset 0 1px 0 rgba(255,255,255,0.18),
            0 0 46px rgba(153,153,255,0.35);
        }

        .aeIcon {
          box-shadow:
            0 18px 55px rgba(0,0,0,0.36),
            inset 0 1px 0 rgba(255,255,255,0.12),
            0 0 34px rgba(210,145,255,0.16);
        }

        .largeIcon {
          width: 78px;
          height: 78px;
          border-radius: 26px;
        }

        .largeIcon span {
          font-size: 28px;
        }

        .glassAppLabel {
          margin-top: 9px;
          text-align: center;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          opacity: 0.55;
        }

        .animation-delay-1200 {
          animation-delay: 1.2s;
        }

        .animation-delay-2200 {
          animation-delay: 2.2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        @keyframes gradientMove {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fadeRise {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatSoft {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-14px) rotate(1.5deg);
          }
        }

        .animate-floatSoft {
          animation: floatSoft 7s ease-in-out infinite;
        }

        @keyframes blobOne {
          0%, 100% {
            transform: translate(0,0) scale(1);
          }
          50% {
            transform: translate(28px,22px) scale(1.08);
          }
        }

        .animate-blobOne {
          animation: blobOne 12s ease-in-out infinite;
        }

        @keyframes blobTwo {
          0%, 100% {
            transform: translate(0,0) scale(1);
          }
          50% {
            transform: translate(-26px,-22px) scale(1.06);
          }
        }

        .animate-blobTwo {
          animation: blobTwo 14s ease-in-out infinite;
        }

        @keyframes blobThree {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-28px) scale(1.08);
          }
        }

        .animate-blobThree {
          animation: blobThree 11s ease-in-out infinite;
        }

        @keyframes glowBreath {
          0%, 100% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.38;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }

        .animate-glowBreath {
          animation: glowBreath 6s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.55);
            opacity: 0.42;
          }
        }

        .animate-dotPulse {
          animation: dotPulse 2.6s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .glassAppIcon {
            width: 52px;
            height: 52px;
            border-radius: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
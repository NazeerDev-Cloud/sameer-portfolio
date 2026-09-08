import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import sameerImg from "../../assets/Sameer.jpg";
import premiereProIcon from "../../assets/tools/premiere-pro.svg";
import afterEffectsIcon from "../../assets/tools/after-effects.svg";
import capcutIcon from "../../assets/tools/capcut.svg";
import photoshopIcon from "../../assets/tools/photoshop.svg";
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
    { name: "Premiere Pro", icon: premiereProIcon },
    { name: "After Effects", icon: afterEffectsIcon },
    { name: "CapCut", icon: capcutIcon },
    { name: "Photoshop", icon: photoshopIcon },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      style={{
        background:
          "radial-gradient(circle at top left, #f6f7f9 0%, #ffffff 46%, #f6f7f9 100%)",
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
            "radial-gradient(circle, rgba(98,59,253,0.06) 0%, rgba(98,59,253,0.02) 32%, transparent 68%)",
          filter: "blur(8px)",
          transition: "left 0.7s ease, top 0.7s ease",
          zIndex: 0,
        }}
      />

      {/* Deep Ambient Blobs */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#8168F0]/5 blur-[110px] animate-blobOne" />
      <div className="absolute -bottom-44 -right-32 h-[620px] w-[620px] rounded-full bg-[#7C5CFF]/5 blur-[130px] animate-blobTwo" />
      <div className="absolute left-[45%] top-[20%] h-[320px] w-[320px] rounded-full bg-[#B296FE]/5 blur-[90px] animate-blobThree" />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(27,31,59,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,31,59,0.045) 1px, transparent 1px)
          `,
          backgroundSize: "68px 68px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 80%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full px-10 sm:px-16 lg:px-[10vw] pt-[150px] md:pt-[180px] pb-24">
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
            {/* Heading */}
            <h1 className="mb-6 text-[clamp(38px,5vw,76px)] font-black leading-[0.98] tracking-[-0.055em] text-[#1b1f3b]">
              Crafting{" "}
              <span className="animatedTextGradient">Cinematic</span>
              <br />
              Stories With
              <br />
              Visual Impact
            </h1>

            {/* Description */}
            <p className="mb-9 max-w-xl text-[17px] leading-[1.8] text-[#4b5563]">
              I transform raw footage into polished, high-retention films,
              branded edits, social campaigns, trailers, and cinematic content
              with sharp pacing, clean sound design, rich color, and premium VFX.
            </p>

            {/* Buttons */}
            <div className="mb-11 flex flex-wrap gap-4">
              <HashLink
                smooth
                to="/#projects"
                className="group relative overflow-hidden rounded-2xl bg-[#141414] px-8 py-4 text-[15px] font-black text-white shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.025] hover:bg-black hover:shadow-[0_18px_44px_rgba(0,0,0,0.28)]"
              >
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
                <span className="relative">View Showreel</span>
              </HashLink>

              <Link
                to="/work"
                className="rounded-2xl border border-[#e6e7ec] bg-white px-8 py-4 text-[15px] font-black text-[#4b5563] backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#8168F0]/40 hover:bg-[#8168F0]/[0.06] hover:text-[#8168F0] hover:shadow-[0_18px_44px_rgba(98,59,253,0.15)]"
              >
                Explore Portfolio
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-[#e6e7ec] bg-white p-5 text-center backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#8168F0]/30 hover:bg-[#8168F0]/[0.04] hover:shadow-[0_18px_44px_rgba(98,59,253,0.12)]"
                  style={{
                    animation: isLoaded
                      ? `fadeRise 0.9s cubic-bezier(0.16,1,0.3,1) ${0.18 + index * 0.08
                      }s both`
                      : "none",
                  }}
                >
                  <p className="text-[24px] font-black tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-r from-[#8168F0] to-[#8b5cf6]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-[#8a8fa3]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Tools */}
            <div className="mt-9 max-w-2xl border-t border-[#e6e7ec] pt-6">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.19em] text-[#8a8fa3]">
                Video Editing Stack
              </p>

              <div className="flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="group flex items-center gap-3 rounded-xl border border-[#e6e7ec] bg-white px-4 py-3 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-[#f6f7f9] hover:shadow-[0_16px_38px_rgba(27,31,59,0.1)]"
                  >
                    <img
                      src={tool.icon}
                      alt={`${tool.name} logo`}
                      className="h-7 w-7 rounded-lg transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    <span
                      className="text-[13px] font-bold text-[#6b7280] transition-colors duration-500 group-hover:text-[#1b1f3b]"
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
              <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8168F0]/5 blur-[90px] animate-glowBreath" />

              {/* Blurred Tilt Frame 1 */}
              <div
                className="absolute inset-0 rounded-[56px] border border-[#e6e7ec] bg-white backdrop-blur-md"
                style={{
                  transform:
                    "rotate(-13deg) translateX(-22px) translateY(18px)",
                  filter: "blur(1px)",
                  boxShadow: "0 45px 100px rgba(27,31,59,0.12)",
                }}
              />

              {/* Blurred Tilt Frame 2 */}
              <div
                className="absolute inset-0 rounded-[56px] border border-[#e6e7ec] bg-[#f6f7f9] backdrop-blur-md"
                style={{
                  transform:
                    "rotate(9deg) translateX(26px) translateY(14px)",
                  filter: "blur(1.2px)",
                  boxShadow: "0 45px 100px rgba(27,31,59,0.1)",
                }}
              />

              {/* Main Image Card */}
              <div
                onMouseMove={handleCardMove}
                onMouseLeave={resetCardTilt}
                className="group relative h-full w-full overflow-hidden rounded-[56px] border border-[#e6e7ec] bg-white shadow-[0_45px_120px_rgba(27,31,59,0.18)] transition-all duration-700 ease-out"
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
                      "brightness(1.02) contrast(1.03) saturate(1.05)",
                  }}
                />

                {/* Soft Purple Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8168F0]/10 via-transparent to-transparent mix-blend-multiply" />

                {/* Bottom Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1f3b]/70 via-[#1b1f3b]/10 to-transparent" />

                {/* Inner Border Glow */}
                <div className="pointer-events-none absolute inset-0 rounded-[56px] shadow-[inset_0_0_90px_rgba(98,59,253,0.12)]" />

                {/* Name Inside Card Only */}
                <div
                  className="absolute bottom-7 left-7 right-7"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div className="rounded-3xl border border-white/20 bg-white/15 px-5 py-4 backdrop-blur-xl">
                    <p className="text-[22px] font-black tracking-[-0.04em] text-white">
                      Sameer Visuals
                    </p>
                    <p className="mt-1 text-[13px] font-bold text-white/80">
                      Professional Video Editor
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Small Glow Dots */}
              <span className="absolute -left-6 top-24 h-3 w-3 rounded-full bg-[#8168F0] shadow-[0_0_20px_rgba(98,59,253,0.6)] animate-dotPulse" />
              <span className="absolute -right-4 bottom-32 h-2.5 w-2.5 rounded-full bg-[#8b5cf6] shadow-[0_0_20px_rgba(139,92,246,0.6)] animate-dotPulse animation-delay-1200" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animatedTextGradient {
          background: linear-gradient(90deg, #8168F0, #8b5cf6, #7C5CFF, #9D6BFF);
          background-size: 260% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientMove 5s ease-in-out infinite;
        }

        .animation-delay-1200 {
          animation-delay: 1.2s;
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
      `}</style>
    </section>
  );
};

export default Hero;
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import VideoModal from "@/components/VideoModal";

function CountUpStat({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let frame: number;
          const start = performance.now();
          const duration = 1800;
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            setCount(Math.round(eased * number));
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
          observer.disconnect();
          return () => cancelAnimationFrame(frame);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [number]);

  return (
    <div ref={ref} className="text-center px-4 group">
      <div className="font-display font-extrabold text-[clamp(2.2rem,5vw,4rem)] leading-none text-white count-up tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-[#6B6560] text-xs mt-2 font-inter tracking-widest uppercase">{label}</div>
    </div>
  );
}

export default function InstituteIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".institute-section", start: "top 72%" },
      });
      tl.fromTo(".institute-title", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out" });
      tl.fromTo(".institute-description", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out" }, "-=0.6");
      tl.fromTo(".institute-video-container", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out" }, "-=0.7");
      tl.fromTo(".institute-quote", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, "-=0.5");
      tl.fromTo(".institute-badges", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, "-=0.4");

      gsap.to(".institute-video-container", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".institute-video-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="institute-section relative overflow-hidden bg-[#0a0a0a]">
      <div
        className="relative py-20 md:py-28 section-fade animated-mesh-bg"
      >
        <div className="atmosphere-blob blob-red top-[-10%] right-[-10%] opacity-15" />
        <div className="grain-warm" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* ── Stat Bar ── */}
          <div className="relative z-10 flex flex-wrap md:flex-nowrap items-center justify-around md:justify-between mb-16 md:mb-24 pb-10 border-b border-white/8">
            <CountUpStat number={50} suffix="K+" label="Students Trained" />
            <div className="hidden md:block w-px h-14 bg-white/8" />
            <CountUpStat number={30} suffix="+" label="Years Legacy" />
            <div className="hidden md:block w-px h-14 bg-white/8" />
            <CountUpStat number={95} suffix="%" label="Placement Rate" />
            <div className="hidden md:block w-px h-14 bg-white/8" />
            <CountUpStat number={100} suffix="+" label="Centers" />
          </div>

          {/* ── Content Grid ── */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text */}
            <div>
              <div className="flex items-start gap-3 mb-7">
                <div className="w-1 h-14 bg-[#E31837] flex-shrink-0 rounded-full mt-1" />
                <h2 className="institute-title font-display font-bold text-[clamp(1.6rem,3.2vw,2.8rem)] leading-tight text-white">
                  Join the{" "}
                  <span className="bg-[#E31837] text-white px-2 py-0.5 rounded-md whitespace-nowrap">
                    Best Animation Institute
                  </span>{" "}
                  In Jaipur
                </h2>
              </div>

              <div className="institute-description space-y-4 text-[#A8A29C] text-base md:text-lg leading-relaxed mb-8">
                <p>
                  Welcome to Maya Academy of Advanced Cinematics — MAAC. Our centre is equipped with an expert training team specializing in 3D Animation, VFX, Film Making, Gaming, Web Design, and more.
                </p>
                <p>
                  We are proud to be one of the leading Animation and VFX Training Institutes in Rajasthan, with state-of-the-art infrastructure and industry-aligned curriculum.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="institute-badges flex flex-wrap gap-3 mb-8">
                {["NSDC Partner", "MESC Certified", "Skill India", "B.Voc Degree"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(227,24,55,0.08)",
                      border: "1px solid rgba(227,24,55,0.2)",
                      color: "#E31837",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>

              {/* Pull Quote */}
              <blockquote className="institute-quote pl-5 py-1 border-l-3 border-[#8B7355]">
                <p className="text-[#E8DCC8] text-base md:text-lg italic font-display leading-relaxed">
                  &ldquo;MAAC gave me the skills and confidence to land my dream job at a top VFX studio.&rdquo;
                </p>
                <cite className="text-[#6B6560] text-sm mt-2 block not-italic">
                  — Alumni, VFX Artist at DNEG
                </cite>
              </blockquote>
            </div>

            {/* Right: Video */}
            <div className="institute-video-container relative">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#080808]" />

                {/* Placeholder icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-7xl opacity-10">🎬</div>
                </div>

                {/* Subtle red glow */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(circle at 50% 60%, rgba(227,24,55,0.1) 0%, transparent 60%)",
                  }}
                />

                {/* Overlay for click */}
                <div
                  className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer group"
                  onClick={() => setShowModal(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Play showreel"
                  onKeyDown={(e) => e.key === "Enter" && setShowModal(true)}
                >
                  <div className="relative">
                    {/* Pulse rings */}
                    <div className="absolute inset-0 rounded-full bg-[#E31837]/20 animate-ping" />
                    <div
                      className="w-18 h-18 md:w-20 md:h-20 rounded-full bg-[#E31837] flex items-center justify-center shadow-xl shadow-[#E31837]/40 group-hover:scale-110 transition-transform duration-300 relative"
                      style={{ width: "72px", height: "72px" }}
                    >
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Scrim */}
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Floating stat card */}
              <div
                className="absolute -bottom-4 -right-4 rounded-xl px-5 py-4 hidden lg:block"
                style={{
                  background: "rgba(12,12,12,0.9)",
                  border: "1px solid rgba(227,24,55,0.2)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="text-2xl font-display font-extrabold text-[#E31837]">15L+</div>
                <div className="text-[#6B6560] text-xs uppercase tracking-wider mt-0.5">Highest Package</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <VideoModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          videoUrl="/intro.mp4"
        />
      )}
    </div>
  );
}
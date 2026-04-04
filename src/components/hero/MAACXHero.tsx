"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import VideoModal from "@/components/VideoModal";
import SplitTextReveal from "@/components/ui/SplitTextReveal";

const HERO_VIDEO_MP4 = "/hero-video-compressed.mp4";
const HERO_VIDEO_WEBM = "/hero-video.webm";
const INTRO_VIDEO_MP4 = "/intro.mp4";
const INTRO_VIDEO_WEBM = "/intro.webm";

export default function MAACXHero() {
  const containerRef = useRef<HTMLElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const hasAnimatedRef = useRef(false);
  const [videoError, setVideoError] = useState(false);

  // Handle intro video ending → sweep up
  const handleIntroEnded = useCallback(() => {
    if (introComplete) return;
    setIntroComplete(true);

    const overlay = introOverlayRef.current;
    if (overlay) {
      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.9,
        ease: "power3.inOut",
        onComplete: () => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("maac:intro_revealed"));
          }
        },
      });
    }
  }, [introComplete]);

  // Run hero entrance animations AFTER sweep completes
  useEffect(() => {
    if (!introComplete || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const video = heroVideoRef.current;
    if (video) {
      video.play().catch(() => {});
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.set(".maacx-badge", { opacity: 0, y: 20 });
        gsap.set(".maacx-cta-row", { opacity: 0, y: 20 });
        gsap.set(".maacx-stats-card", { opacity: 0, x: 30 });
        gsap.set(".maacx-scroll", { opacity: 0, y: 15 });

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.to(".maacx-badge", { opacity: 1, y: 0, duration: 0.6 });
        tl.to(".maacx-cta-row", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
        tl.to(".maacx-stats-card", { opacity: 1, x: 0, duration: 0.7 }, "-=0.4");
        tl.to(".maacx-scroll", { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");

        const statEls = containerRef.current?.querySelectorAll(".maacx-stat-value");
        statEls?.forEach((el) => {
          const text = el.textContent?.trim() || "0";
          const match = text.match(/(\d+)(.*)/);
          if (!match) return;
          const counter = { val: 0 };
          gsap.to(counter, {
            val: parseInt(match[1], 10),
            duration: 2,
            ease: "expo.out",
            delay: 0.5,
            onUpdate: () => {
              el.textContent = Math.round(counter.val) + match[2];
            },
          });
        });
      }, containerRef);

      return () => ctx.revert();
    }, 900);
  }, [introComplete]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════ */}
      {/* INTRO VIDEO OVERLAY - Fixed, full viewport             */}
      {/* ═══════════════════════════════════════════════════════ */}
      {!introComplete && (
        <div
          ref={introOverlayRef}
          className="fixed inset-0 z-[9999]"
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#0C0C0C",
          }}
        >
          {/* Video - explicitly sized */}
          <video
            ref={introVideoRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleIntroEnded}
            onError={() => setVideoError(true)}
          >
            <source src={INTRO_VIDEO_WEBM} type="video/webm" />
            <source src={INTRO_VIDEO_MP4} type="video/mp4" />
          </video>

          {/* Loading fallback (shown if video fails) */}
          {videoError && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #E31837, #B8132C)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg viewBox="0 0 48 48" style={{ width: "28px", height: "28px", color: "white" }} fill="currentColor">
                    <path d="M6 6v36l8-4V18l10 14 10-14v20l8 4V6L24 30 6 6z" />
                  </svg>
                </div>
                <span style={{ color: "white", fontWeight: 700, fontSize: "24px" }}>MAAC</span>
              </div>
              <p style={{
                color: "#E31837",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}>
                Loading
              </p>
            </div>
          )}

          {/* Progress bar */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            backgroundColor: "rgba(255,255,255,0.05)",
          }}>
            <div
              style={{
                height: "100%",
                backgroundColor: "#E31837",
                width: "0%",
                animation: "progressFill 8s linear forwards",
              }}
            />
          </div>

          <style jsx>{`
            @keyframes progressFill {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════ */}
      {/* HERO SECTION                                           */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section
        ref={containerRef}
        className="relative min-h-[100svh] w-full bg-[#080808] overflow-hidden"
      >
        {/* ── Background Video ── */}
        <div className="absolute inset-0">
          <video
            ref={heroVideoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={HERO_VIDEO_WEBM} type="video/webm" />
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
          </video>

          {/* Bottom gradient */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 40%, transparent 100%)",
            }}
          />

          {/* Side vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(8,8,8,0.5) 0%, transparent 30%, transparent 70%, rgba(8,8,8,0.3) 100%)",
            }}
          />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 min-h-[100svh] flex flex-col justify-end px-5 sm:px-8 md:px-12 lg:px-16 pb-[100px] sm:pb-14 md:pb-16 lg:pb-20">
          
          {/* Left side content */}
          <div className="w-full lg:max-w-[540px]">
            {/* Badge */}
            <div className="maacx-badge mb-5">
              <span className="inline-block px-3.5 py-1.5 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full text-[#E31837] text-[10px] font-semibold tracking-[0.12em] uppercase">
                NSDC / MESC Partner
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-3">
              <span className="block text-white font-display font-bold text-[clamp(2.8rem,7vw,5rem)] leading-[1.02] tracking-tight">
                <SplitTextReveal delay={0.2} stagger={0.035}>
                  Big Leaps
                </SplitTextReveal>
              </span>
            </h1>

            {/* Subtitle */}
            <div className="mb-7">
              <span className="block text-[#E31837] font-sans font-medium text-[clamp(0.9rem,1.8vw,1.2rem)] leading-[1.3] uppercase tracking-widest">
                <SplitTextReveal delay={0.45} stagger={0.012}>
                  Begin With The Right Course
                </SplitTextReveal>
              </span>
            </div>

            {/* CTAs */}
            <div className="maacx-cta-row flex flex-wrap items-center gap-3 md:gap-4">
              <a
                href="#courses"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn btn-primary group inline-flex items-center gap-2 px-5 py-3"
              >
                <span className="text-sm">Explore Courses</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <button
                className="btn btn-ghost group inline-flex items-center gap-2.5 px-4 py-3"
                onClick={() => setShowVideoModal(true)}
                aria-label="Watch Showreel"
              >
                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-[#E31837]/20 transition-colors">
                  <svg className="w-3.5 h-3.5 text-[#E31837] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Showreel</span>
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="maacx-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-white/35 text-[9px] tracking-[0.35em] uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/35 to-transparent relative overflow-hidden">
              <div className="absolute top-0 w-full h-4 bg-white animate-[scrollLine_1.8s_ease-in-out_infinite]" />
            </div>
          </div>

          {/* Desktop stats card */}
          <div className="maacx-stats-card hidden lg:block absolute right-0 bottom-0 px-12 lg:px-16 pb-16 lg:pb-20">
            <div
              className="rounded-2xl p-6 max-w-[240px]"
              style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {[
                { value: "30+", label: "Years Legacy" },
                { value: "95%", label: "Placement Rate" },
                { value: "100+", label: "Centers Across India" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 ${i < 2 ? "pb-4 mb-4 border-b border-white/8" : ""}`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#E31837] to-[#FF6B35] flex items-center justify-center">
                    <span className="maacx-stat-value text-white font-bold text-sm">{item.value}</span>
                  </div>
                  <p className="text-white/70 font-medium text-xs leading-tight">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile stats bar */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 z-10 flex items-stretch border-t border-white/10" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)" }}>
          {[
            { value: "30+", label: "Years" },
            { value: "95%", label: "Placement" },
            { value: "100+", label: "Centers" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`flex-1 text-center py-2.5 ${i < 2 ? "border-r border-white/10" : ""}`}
            >
              <div className="text-white font-bold text-sm leading-none">{stat.value}</div>
              <div className="text-white/45 text-[9px] uppercase tracking-widest mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videoUrl={HERO_VIDEO_MP4}
      />
    </>
  );
}

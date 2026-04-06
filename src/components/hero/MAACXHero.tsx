"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { VolumeX, Volume2 } from "lucide-react";
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
  const progressRef = useRef<HTMLDivElement>(null);
  const progressDotRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>();
  const progressStartRef = useRef<number>(0);

  // Skip intro on mobile, return visitors, or reduced-motion preference
  const [introComplete, setIntroComplete] = useState(false);
  const [shouldSkipIntro, setShouldSkipIntro] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const hasAnimatedRef = useRef(false);

  // Determine if intro should be skipped (client-side only)
  useEffect(() => {
    // Skip on mobile (saves ~8s LCP for 70%+ of users)
    if (window.innerWidth < 768) { setShouldSkipIntro(true); setIntroComplete(true); return; }
    // Skip for return visitors
    if (sessionStorage.getItem("maac_intro_v3")) { setShouldSkipIntro(true); setIntroComplete(true); return; }
    // Skip if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShouldSkipIntro(true); setIntroComplete(true); return; }
  }, []);

  // Connection-aware hero video loading
  useEffect(() => {
    if (!introComplete || !heroVideoRef.current) return;
    
    // Check for slow connection or data saver
    const conn = (navigator as any).connection;
    const slowConn = conn && (conn.saveData || ['slow-2g', '2g'].includes(conn.effectiveType));
    
    if (slowConn) {
      // Don't autoplay video on slow connections
      heroVideoRef.current.preload = "none";
      return;
    }
    
    heroVideoRef.current.preload = "auto";
    heroVideoRef.current.load();
    heroVideoRef.current.play().catch(() => {});
  }, [introComplete]);

  // Progress bar animation
  useEffect(() => {
    if (introComplete || videoError) return;

    progressStartRef.current = Date.now();
    const DURATION = 8000;

    const animate = () => {
      const elapsed = Date.now() - progressStartRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);

      if (progressRef.current) {
        progressRef.current.style.width = `${pct}%`;
      }
      if (progressDotRef.current) {
        progressDotRef.current.style.left = `${pct}%`;
      }

      if (pct < 100) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [introComplete, videoError]);

  // Show skip button after 2 seconds
  useEffect(() => {
    if (introComplete) return;
    const timer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(timer);
  }, [introComplete]);

  // Handle intro video ending → sweep up
  const handleIntroEnded = useCallback(() => {
    if (introComplete) return;
    sessionStorage.setItem("maac_intro_v3", "1");
    setIntroComplete(true);

    const overlay = introOverlayRef.current;
    if (overlay) {
      // Fade out UI elements first
      gsap.to(".intro-ui-elements", { opacity: 0, duration: 0.3 });

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

  // Mute video initially
  useEffect(() => {
    if (introVideoRef.current) {
      introVideoRef.current.muted = true;
    }
  }, []);

  // Reveal navbar immediately if intro was skipped
  useEffect(() => {
    if (introComplete) {
      // Use RAF to ensure DOM is ready
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("maac:intro_revealed"));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

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
          role="dialog"
          aria-label="Loading experience"
          aria-modal="true"
          className="fixed inset-0 z-[9999]"
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#0C0C0C",
          }}
        >
          {videoError ? (
            /* Loading fallback (shown if video fails) */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #E31837, #C4132D)",
                  }}
                >
                  <span className="text-white font-display font-bold text-3xl">M</span>
                </div>
                {/* Pulse ring animation */}
                <div
                  className="absolute inset-0 rounded-2xl animate-ping"
                  style={{
                    background: "linear-gradient(135deg, #E31837, #C4132D)",
                    opacity: 0.3,
                    animationDuration: "2s",
                  }}
                />
              </div>
              <p
                className="text-white/40 text-xs tracking-[0.3em] uppercase"
              >
                Loading Experience
              </p>
            </div>
          ) : (
            <>
              {/* Video - explicitly sized */}
              <video
                ref={introVideoRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                autoPlay
                muted
                playsInline
                preload={introComplete ? "none" : "auto"}
                onEnded={handleIntroEnded}
                onError={() => setVideoError(true)}
              >
                <source src={INTRO_VIDEO_WEBM} type="video/webm" />
                <source src={INTRO_VIDEO_MP4} type="video/mp4" />
              </video>

              {/* Dark vignette overlay on top of video */}
              <div
                className="absolute inset-0 z-[1]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
                }}
              />

              {/* MAAC Logo/wordmark at top */}
              <div className="intro-ui-elements absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                <div className="w-6 h-[2px] mb-2" style={{ backgroundColor: "#E31837" }} />
                <Image
                  src="/maac-logo.png"
                  alt="MAAC"
                  width={32}
                  height={32}
                  className="opacity-90"
                  style={{ width: "auto", height: "auto" }}
                  priority
                />
              </div>

              {/* Mute toggle button (bottom-right) */}
              <button
                className="intro-ui-elements absolute bottom-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                onClick={() => {
                  setIsMuted((m) => !m);
                  if (introVideoRef.current) {
                    introVideoRef.current.muted = !isMuted;
                  }
                }}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              {/* Skip button (bottom-left, appears after 2s) */}
              {showSkip && (
                <button
                  onClick={handleIntroEnded}
                  className="intro-ui-elements absolute bottom-6 left-6 z-10 text-white/40 hover:text-white/80 text-xs tracking-[0.15em] uppercase transition-colors flex items-center gap-2"
                >
                  <span>Skip</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="13 17 18 12 13 7" />
                    <polyline points="6 17 11 12 6 7" />
                  </svg>
                </button>
              )}

              {/* Premium progress bar */}
              <div className="intro-ui-elements absolute bottom-0 left-0 right-0 z-10" style={{ height: "2px", backgroundColor: "rgba(255,255,255,0.08)" }}>
                <div
                  ref={progressRef}
                  className="h-full"
                  style={{
                    background: "linear-gradient(90deg, #E31837, #FF6B35)",
                    width: "0%",
                  }}
                />
                {/* Glowing dot at leading edge */}
                <div
                  ref={progressDotRef}
                  className="absolute top-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#E31837",
                    boxShadow: "0 0 8px #E31837",
                    left: "0%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════ */}
      {/* HERO SECTION                                            */}
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
            preload="none"
            poster="/hero-poster.jpg"
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

            {/* Headline — SEO-optimized H1 targeting primary keyword */}
            <h1 className="mb-3">
              <span className="block text-white font-display font-bold text-[clamp(2.8rem,7vw,5rem)] leading-[1.02] tracking-tight">
                <SplitTextReveal delay={0.2} stagger={0.035}>
                  Best Animation
                </SplitTextReveal>
              </span>
              <span className="block text-[#E31837] font-display font-bold text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] tracking-tight">
                <SplitTextReveal delay={0.35} stagger={0.035}>
                  Institute in Jaipur
                </SplitTextReveal>
              </span>
            </h1>

            {/* Subtitle — brand tagline (not H1) */}
            <p className="text-[#A8A29C] text-lg font-medium mb-7 italic">
              Big Leaps Begin With The Right Course
            </p>

            {/* CTAs - only Explore Courses (showreel removed) */}
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
        <div
          className="lg:hidden absolute bottom-0 left-0 right-0 z-10 flex items-stretch border-t border-white/10"
          style={{
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(12px)",
            paddingBottom: "max(0px, env(safe-area-inset-bottom))",
          }}
        >
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
    </>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./Preloader";
import VideoModal from "@/components/VideoModal";
import SplitTextReveal from "@/components/ui/SplitTextReveal";

gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEO_SRC = "/hero video.mp4";

export default function MAACXHero() {
  const containerRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const animationDoneRef = useRef(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
    // Dispatch global event for navbar and other components
    if (typeof window !== "undefined") {
      // Small delay to let React re-render with the video element before dispatching
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("maac:preloader_done"));
      });
    }
  }, []);

  // Run entrance animations only once after preloader completes
  useEffect(() => {
    if (!preloaderDone || animationDoneRef.current) return;
    animationDoneRef.current = true;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Start hero video
    const video = heroVideoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked — video will show static first frame
      });
    }

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Set initial states before animating
      gsap.set(".maacx-badge", { opacity: 0, y: 12 });
      gsap.set(".maacx-cta-row", { opacity: 0, y: 12 });
      gsap.set(".maacx-content-right", { opacity: 0, x: 16 });
      gsap.set(".maacx-scroll", { opacity: 0, y: 8 });

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(".maacx-badge", {
        opacity: 1, y: 0, duration: 0.5, ease: "expo.out",
      });

      tl.to(".maacx-cta-row", {
        opacity: 1, y: 0, duration: 0.5, ease: "expo.out",
      }, "-=0.25");

      tl.to(".maacx-content-right", {
        opacity: 1, x: 0, duration: 0.6, ease: "expo.out",
      }, "-=0.35");

      tl.to(".maacx-scroll", {
        opacity: 1, y: 0, duration: 0.4,
      }, "-=0.2");

      // Count-up for stats
      const statEls = containerRef.current?.querySelectorAll(".maacx-stat-value");
      statEls?.forEach((el) => {
        const element = el as HTMLElement;
        const text = element.textContent?.trim() || "0";
        const match = text.match(/(\d+)(.*)/);
        if (!match) return;
        const finalVal = parseInt(match[1], 10);
        const suffix = match[2];
        const counter = { val: 0 };
        gsap.to(counter, {
          val: finalVal,
          duration: 1.8,
          ease: "expo.out",
          delay: 0.6,
          onUpdate: () => {
            element.textContent = Math.round(counter.val) + suffix;
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [preloaderDone]);

  return (
    <>
      {/* Preloader — rendered above everything, unmounts via opacity then parent re-render */}
      {!preloaderDone && (
        <div className="fixed inset-0 z-[9999]">
          <Preloader onComplete={handlePreloaderComplete} />
        </div>
      )}

      <section
        ref={containerRef}
        className="maacx-hero relative min-h-[100svh] w-full bg-[#080808] overflow-hidden"
      >
        {/* ── Background Video ── */}
        <div className="absolute inset-0 z-0">
          {/* Only mount video element after preloader finishes — avoids race/double-load */}
          {preloaderDone && (
            <video
              ref={heroVideoRef}
              className="absolute inset-0 h-full w-full object-cover z-10"
              muted
              loop
              playsInline
              preload="none"
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          )}

          {/* Bottom gradient for text legibility */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 z-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 40%, transparent 100%)",
            }}
          />

          {/* Side vignette */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(8,8,8,0.5) 0%, transparent 30%, transparent 70%, rgba(8,8,8,0.3) 100%)",
            }}
          />
        </div>

        {/* ── Left Content — Bottom Aligned ── */}
        <div className="absolute left-0 bottom-0 z-30 w-full lg:max-w-[540px] px-5 sm:px-8 md:px-12 lg:px-16 pb-[80px] sm:pb-14 md:pb-16 lg:pb-20">
          {/* Accreditation Badge */}
          <div className="maacx-badge mb-5" style={{ opacity: 0 }}>
            <span className="inline-block px-3.5 py-1.5 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full text-[#E31837] text-[10px] font-semibold tracking-[0.12em] uppercase">
              NSDC / MESC Partner
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-3 text-left">
            <span className="block text-white font-display font-bold text-[clamp(2.8rem,7vw,5rem)] leading-[1.02] tracking-tight">
              {preloaderDone && (
                <SplitTextReveal delay={0.2} stagger={0.035}>
                  Big Leaps
                </SplitTextReveal>
              )}
            </span>
          </h1>

          {/* Subtitle */}
          <div className="mb-7">
            <span className="block text-[#E31837] font-sans font-medium text-[clamp(0.9rem,1.8vw,1.2rem)] leading-[1.3] uppercase tracking-widest">
              {preloaderDone && (
                <SplitTextReveal delay={0.45} stagger={0.012}>
                  Begin With The Right Course
                </SplitTextReveal>
              )}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="maacx-cta-row flex flex-wrap items-center gap-3 md:gap-4" style={{ opacity: 0 }}>
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

        {/* ── Scroll Indicator ── */}
        <div className="maacx-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
          <span className="text-white/35 text-[9px] tracking-[0.35em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/35 to-transparent relative overflow-hidden">
            <div className="absolute top-0 w-full h-4 bg-white animate-[scrollLine_1.8s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* ── Section Blend ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0C0C0C)" }}
        />

        {/* ── Mobile Stats Bar ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-30 lg:hidden flex items-stretch border-t border-white/10"
          style={{
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(12px)",
            paddingBottom: "env(safe-area-inset-bottom)",
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

        {/* ── Desktop Stats Card ── */}
        <div
          className="maacx-content-right absolute right-0 bottom-0 z-30 hidden lg:block px-12 lg:px-16 pb-16 lg:pb-20"
          style={{ opacity: 0 }}
        >
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
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videoUrl={HERO_VIDEO_SRC}
      />
    </>
  );
}
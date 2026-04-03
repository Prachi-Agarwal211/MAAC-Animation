"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./Preloader";
import VideoModal from "@/components/VideoModal";
import SplitTextReveal from "@/components/ui/SplitTextReveal";

gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEO_SRC = "/hero video.mp4";

/**
 * MAACX Hero Component - Clean Professional Design
 *
 * Layout:
 * - Left side: Content (badge, headline, subtitle, program, CTAs) - bottom aligned
 * - Right side: Stats card (desktop only) - bottom aligned
 * - Removed duplicate stats from left side
 * - Professional Inter font throughout
 * - Cleaner, more spacious layout
 */
export default function MAACXHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Check mount status
  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("maac:preloader_done"));
    }
  }, []);

  // GSAP animations - simplified fade-up
  useEffect(() => {
    if (!preloaderDone) return;

    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        gsap.to(containerRef.current, { opacity: 1, duration: 0.5 });
        return;
      }

      const tl = gsap.timeline();

      // Initial video fade-in (first video only)
      tl.from(".maacx-video", {
        opacity: 0,
        scale: 1.05,
        duration: 1,
        ease: "expo.out",
      });

      // Badge
      tl.from(".maacx-badge", {
        opacity: 0,
        y: 15,
        duration: 0.4,
        ease: "expo.out",
      }, "-=0.2");

      // CTA buttons
      tl.from(".maacx-cta-row", {
        opacity: 0,
        y: 15,
        duration: 0.4,
        ease: "expo.out",
      }, "-=0.1");

      // Right side stats card (desktop)
      tl.from(".maacx-content-right", {
        opacity: 0,
        x: 20,
        duration: 0.5,
        ease: "expo.out",
      }, "-=0.3");

      // Scroll indicator
      tl.from(".maacx-scroll", {
        opacity: 0,
        y: 10,
        duration: 0.3,
      }, "-=0.2");

      // Add count-up animation to stats values
      const stats = containerRef.current?.querySelectorAll(".maacx-stat-value");
      stats?.forEach((stat) => {
        const element = stat as HTMLElement;
        // Extract the numeric value and suffix from the element's text
        const textContent = element.textContent?.trim() || "0";
        const match = textContent.match(/(\d+)(.*)/);
        const finalValue = match ? parseInt(match[1], 10) : 0;
        const suffix = match ? match[2] : "+";

        // Use gsap.to() with counter object, not DOM element textContent
        const counter = { val: 0 };
        gsap.to(counter, {
          val: finalValue,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            element.textContent = Math.round(counter.val) + suffix;
          },
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [preloaderDone]);

  return (
    <>
      {!preloaderDone && (
        <div className="fixed inset-0 z-[9999]">
          <Preloader onComplete={handlePreloaderComplete} />
        </div>
      )}
      <section
        ref={containerRef}
        className="maacx-hero relative min-h-[100svh] w-full bg-[#080808] overflow-hidden"
      >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {/* Single Infinity Loop Hero Video */}
          <div className="absolute inset-0 z-[1] opacity-100 transition-opacity duration-1000">
            {preloaderDone && (
              <video
                className="maacx-video absolute inset-0 h-full w-full object-cover z-10"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src={HERO_VIDEO_SRC} type="video/mp4" />
              </video>
            )}
          </div>
          
          {/* Extremely subtle bottom gradient only for text contrast, removed solid black fog */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 z-[2] bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Left Side Content - Bottom Aligned */}
        <div className="maacx-content-left absolute left-0 bottom-0 z-30 w-full lg:max-w-[520px] px-5 sm:px-8 md:px-12 lg:px-16 pb-[80px] sm:pb-12 md:pb-14 lg:pb-16">
          {/* Accreditation Badge - Cleaner */}
          <div className="maacx-badge mb-5">
            <span className="inline-block px-3.5 py-1.5 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full text-[#E31837] text-[9px] md:text-xs font-semibold tracking-[0.12em] uppercase">
              NSDC / MESC Partner
            </span>
          </div>

          {/* Headline - SplitText Animation */}
          <h1 className="mb-3 text-left">
            <span className="maacx-headline block text-white font-sans font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight">
              {preloaderDone && <SplitTextReveal delay={0.4} stagger={0.04}>Big Leaps</SplitTextReveal>}
            </span>
          </h1>

          {/* Subtitle - SplitText Animation */}
          <div className="maacx-subtitle-text mb-6">
            <span className="block text-[#E31837] font-sans font-medium text-[clamp(1rem,2vw,1.25rem)] leading-[1.3] uppercase tracking-widest">
              {preloaderDone && <SplitTextReveal delay={0.6} stagger={0.015}>Begin With The Right Course</SplitTextReveal>}
            </span>
          </div>          {/* CTA Buttons - Cleaner */}
          <div className="maacx-cta-row flex flex-wrap items-center gap-3 md:gap-4 mb-6">
            {/* Primary CTA */}
            <a
              href="#courses"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary group inline-flex items-center gap-2 px-5 py-2.5"
            >
              <span className="text-xs md:text-sm">Explore Courses</span>
              <svg
                className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            {/* Secondary CTA - Showreel */}
            <button
              className="btn btn-ghost group inline-flex items-center gap-2 px-4 py-2.5"
              onClick={() => setShowVideoModal(true)}
              aria-label="Watch Showreel"
            >
              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-[#E31837]/20 transition-colors">
                <svg
                  className="w-3.5 h-3.5 text-[#E31837] ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-medium">Showreel</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="maacx-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
            <div className="absolute top-0 w-full h-4 bg-white animate-[scrollLine_1.8s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Bottom fog for smooth section transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0C0C0C)" }}
        />

        {/* Mobile Stats Box */}
        <div className="absolute bottom-0 left-0 right-0 z-20 lg:hidden flex items-stretch border-t border-white/10 bg-black/60 backdrop-blur-md" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          {[{ value: "30+", label: "Years" }, { value: "95%", label: "Placement" }, { value: "100+", label: "Centers" }]
            .map((stat, i) => (
              <div key={i} className={`flex-1 text-center py-2.5 ${i < 2 ? "border-r border-white/10" : ""}`}>
                <div className="text-white font-bold text-sm leading-none">{stat.value}</div>
                <div className="text-white/50 text-[9px] uppercase tracking-widest mt-0.5">{stat.label}</div>
              </div>
            ))}
        </div>

        {/* Right Side Stats - Bottom Aligned (Desktop Only) */}
        <div className="maacx-content-right absolute right-0 bottom-0 z-20 hidden lg:block px-12 lg:px-20 pb-12 md:pb-16">
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-6 max-w-[240px]">
            {[
              { value: "30+", label: "Years Legacy" },
              { value: "95%", label: "Placement Rate" },
              { value: "100+", label: "Centers Across India" },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 ${
                  i < 2 ? "pb-4 mb-4 border-b border-white/10" : ""
                }`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#E31837] to-[#FF6B35] flex items-center justify-center">
                  <span className="maacx-stat-value text-white font-bold text-sm">{item.value}</span>
                </div>
                <div>
                  <p className="text-white font-medium text-xs">{item.label}</p>
                </div>
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

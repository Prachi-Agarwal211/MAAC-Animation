"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./Preloader";
import VideoModal from "@/components/VideoModal";

gsap.registerPlugin(ScrollTrigger);

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Check mount status
  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
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

      // Video fade-in
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
      }, "-=0.6");

      // Headline - "Big Leaps" - smaller, cleaner
      tl.from(".maacx-headline", {
        opacity: 0,
        y: 15,
        duration: 0.4,
        ease: "expo.out",
      }, "-=0.3");

      // Subtitle - "Begin with the Right Course" - smaller
      tl.from(".maacx-subtitle-text", {
        opacity: 0,
        y: 12,
        duration: 0.35,
        ease: "expo.out",
      }, "-=0.3");

      // Program badge
      tl.from(".maacx-program-badge", {
        opacity: 0,
        y: 15,
        duration: 0.4,
        ease: "expo.out",
      }, "-=0.3");

      // CTA buttons
      tl.from(".maacx-cta-row", {
        opacity: 0,
        y: 15,
        duration: 0.4,
        ease: "expo.out",
      }, "-=0.3");

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
    }, containerRef);

    return () => ctx.revert();
  }, [preloaderDone]);

  if (!mounted) return <div className="h-screen w-full bg-[#080808]" />;
  if (!preloaderDone) return <Preloader onComplete={handlePreloaderComplete} />;

  return (
    <>
      <section
        ref={containerRef}
        className="maacx-hero relative min-h-[100svh] w-full bg-[#080808] overflow-hidden"
      >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {/* Gradient base */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 50% 50%, rgba(180,20,40,0.25) 0%, transparent 60%),
                linear-gradient(160deg, #0A0A0A 0%, #1a0508 40%, #0A0A0A 100%)
              `,
            }}
          />

          {/* Video background */}
          <video
            ref={videoRef}
            className="maacx-video absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/images/hero-poster.webp"
          >
            <source src="/intro.webm" type="video/webm" />
            <source src="/intro.mp4" type="video/mp4" />
          </video>

          {/* Uniform overlay */}
          <div className="absolute inset-0 z-[2] bg-black/50" />
        </div>

        {/* Left Side Content - Bottom Aligned */}
        <div className="maacx-content-left absolute left-0 bottom-0 z-30 w-full max-w-[500px] px-6 md:px-12 lg:px-16 pb-12 md:pb-16">
          {/* Accreditation Badge - Cleaner */}
          <div className="maacx-badge mb-5">
            <span className="inline-block px-3.5 py-1.5 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full text-[#E31837] text-[9px] md:text-xs font-semibold tracking-[0.12em] uppercase">
              NSDC / MESC Partner
            </span>
          </div>

          {/* Headline - Left Aligned, Professional Size */}
          <h1 className="mb-3 text-left">
            <span className="maacx-headline block text-white font-sans font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] tracking-tight">
              Big Leaps
            </span>
          </h1>

          {/* Subtitle - Red, left aligned, smaller */}
          <div className="maacx-subtitle-text mb-5">
            <span className="block text-[#E31837] font-sans font-medium text-[clamp(1rem,2.5vw,1.5rem)] leading-[1.3]">
              Begin with the Right Course
            </span>
          </div>

          {/* Program Badge - Cleaner */}
          <div className="maacx-program-badge mb-6">
            <span className="inline-block px-4 py-2.5 bg-[#E31837] rounded-lg text-white text-sm md:text-base font-semibold shadow-xl">
              B.Voc in 3D Animation & VFX
            </span>
          </div>

          {/* CTA Buttons - Cleaner */}
          <div className="maacx-cta-row flex flex-wrap items-center gap-3 md:gap-4 mb-6">
            {/* Primary CTA */}
            <a
              href="#courses"
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
                  <span className="text-white font-bold text-sm">{item.value}</span>
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
        videoUrl="/intro.mp4"
      />
    </>
  );
}

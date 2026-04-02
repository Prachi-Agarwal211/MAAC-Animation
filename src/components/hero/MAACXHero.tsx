"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./Preloader";

gsap.registerPlugin(ScrollTrigger);

export default function MAACXHero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Start as false so SSR renders the preloader, then client takes over
  const [mounted, setMounted] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mark mounted so we can render preloader client-side
  useEffect(() => {
    setMounted(true);
  }, []);
    
  // Run Splitting client-side only, BEFORE animation useEffect
  useEffect(() => {
    let mounted = true;
    import("splitting").then((mod) => {
      if (mounted) mod.default({ target: ".maacx-split-chars", by: "chars" });
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setIsMobile(window.innerWidth < 768);
  }, [mounted]);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  useEffect(() => {
    if (!preloaderDone) return;

    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        gsap.to(containerRef.current, { opacity: 1, duration: 0.5 });
        return;
      }

      const tl = gsap.timeline();

      // Video reveal
      tl.from(".maacx-video", {
        opacity: 0,
        scale: 1.08,
        duration: 2,
        ease: "expo.out",
      });

      // Char split headline — "Big Leaps"
      tl.from(".maacx-headline .char", {
        opacity: 0,
        y: 80,
        rotateX: -45,
        stagger: 0.04,
        duration: 0.9,
        ease: "expo.out",
      }, "-=1.5");

      // Accent line — "Begin with the Right Course"
      tl.from(".maacx-headline-accent", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "expo.out",
      }, "-=0.6");

      // Badge
      tl.from(".maacx-badge", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "expo.out",
      }, "-=0.4");

      // Subtitle
      tl.from(".maacx-subtitle", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "expo.out",
      }, "-=0.5");

      // CTA
      tl.from(".maacx-cta", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "expo.out",
      }, "-=0.5");

      // Info card items
      tl.from(".maacx-info-item", {
        opacity: 0,
        x: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
      }, "-=0.8");

      // Scroll indicator
      tl.from(".maacx-scroll", {
        opacity: 0,
        y: 10,
        duration: 0.5,
      }, "-=0.3");

      // Parallax (desktop only)
      if (!isMobile) {
        gsap.to(".maacx-video", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".maacx-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".maacx-content-left", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: ".maacx-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".maacx-info-card", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".maacx-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [preloaderDone, isMobile]);

  // Show nothing during SSR to avoid document access issues
  if (!mounted) {
    return <div className="h-screen w-full bg-[#080808]" />;
  }

  if (!preloaderDone) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <section
      ref={containerRef}
      className="maacx-hero relative h-screen w-full overflow-hidden bg-[#080808]"
    >
      {/* === VIDEO BACKGROUND === */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="maacx-video absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
        >
          <source src="/intro.webm" type="video/webm" />
          <source src="/intro.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay gradient for text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />

        {/* Radial gradient for focus */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      {/* === HERO CONTENT - LEFT SIDE === */}
      <div className="maacx-content-left absolute left-0 top-1/2 translate-y-[10%] z-30 w-full md:max-w-[55%] px-6 md:px-12 lg:px-20">
        {/* Badge */}
        <div className="maacx-badge mb-5">
          <span className="inline-block px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/15 rounded-full text-[#E31837] text-[10px] md:text-xs font-bold tracking-[0.18em] uppercase">
            SKILL INDIA · NSDC · MESC PARTNER
          </span>
        </div>

        {/* Main Headline — Splitting.js chars */}
        <h1 className="mb-4">
          <span className="maacx-headline maacx-split-chars block text-white font-display font-extrabold text-[clamp(2.5rem,5.5vw,6rem)] leading-[1.05] tracking-tight overflow-hidden">
            Big Leaps
          </span>
          <span className="maacx-headline-accent block text-[#E31837] font-display font-extrabold text-[clamp(2rem,4.5vw,5rem)] leading-[1.05] tracking-tight overflow-hidden mt-1">
            Begin with the Right Course
          </span>
        </h1>

        {/* Subtitle */}
        <div className="maacx-subtitle mb-7 max-w-xl">
          <span className="inline-block px-5 py-3 bg-gradient-to-r from-[#E31837]/90 to-[#FF6B35]/90 backdrop-blur-sm rounded-lg text-white text-base md:text-lg font-bold shadow-2xl">
            B.Voc in 3D Animation & VFX
          </span>
        </div>

        {/* CTA Button */}
        <a
          href="#explore"
          className="maacx-cta btn btn-primary group"
        >
          <span>Explore Now</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* === INFO CARD - RIGHT SIDE (hidden on mobile) === */}
      <div className="maacx-content-right absolute right-0 top-1/2 -translate-y-[35%] z-20 hidden md:block px-6 md:px-12 lg:px-20">
        <div className="maacx-info-card backdrop-blur-xl bg-black/35 border border-white/10 rounded-2xl p-6 md:p-8 max-w-[300px]">
          {/* Item 1 */}
          <div className="maacx-info-item flex items-start gap-4 pb-5 mb-5 border-b border-white/10">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#E31837] to-[#FF6B35] flex items-center justify-center">
              <span className="text-white font-bold text-lg">30+</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-base tracking-wide">YEARS</h3>
              <p className="text-[#6b6b6b] text-xs tracking-widest uppercase mt-0.5">LEGACY OF EXCELLENCE</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="maacx-info-item flex items-start gap-4 py-5 border-b border-white/10">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#E31837] to-[#FF6B35] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-base tracking-wide">CAREERX</h3>
              <p className="text-[#6b6b6b] text-xs tracking-widest uppercase mt-0.5">INDUSTRY PATHWAYS</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="maacx-info-item flex items-start gap-4 pt-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#E31837] to-[#FF6B35] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-base tracking-wide">DEDICATED</h3>
              <p className="text-[#6b6b6b] text-xs tracking-widest uppercase mt-0.5">PLACEMENT SUPPORT</p>
            </div>
          </div>
        </div>
      </div>

      {/* === MOBILE INFO STRIP === */}
      <div className="md:hidden absolute bottom-20 left-0 right-0 z-20 px-6">
        <div className="flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3">
          {[
            { v: "30+", l: "Years" },
            { v: "95%", l: "Placed" },
            { v: "100+", l: "Centers" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <span className="block text-[#E31837] font-display font-bold text-xl">{s.v}</span>
              <span className="block text-[#6b6b6b] text-[10px] uppercase tracking-wide">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* === SCROLL INDICATOR === */}
      <div className="maacx-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <div className="w-px h-14 bg-gradient-to-b from-transparent via-[#E31837]/60 to-transparent overflow-hidden">
          <div className="w-full h-6 bg-[#E31837] animate-scroll-indicator" />
        </div>
        <span className="text-[#6b6b6b] text-[10px] tracking-[0.2em] uppercase">
          Scroll
        </span>
      </div>
    </section>
  );
}
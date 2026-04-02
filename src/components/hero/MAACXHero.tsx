"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./Preloader";
import VideoModal from "@/components/VideoModal";

gsap.registerPlugin(ScrollTrigger);

export default function MAACXHero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

      tl.from(".maacx-video", {
        opacity: 0,
        scale: 1.08,
        duration: 1.5,
        ease: "expo.out",
      });

      tl.from(".maacx-headline .char", {
        opacity: 0,
        y: 80,
        rotateX: -45,
        stagger: 0.04,
        duration: 0.9,
        ease: "expo.out",
      }, "-=1.0");

      tl.from(".maacx-headline-accent", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "expo.out",
      }, "-=0.6");

      tl.from(".maacx-badge", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "expo.out",
      }, "-=0.4");

      tl.from(".maacx-subtitle", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "expo.out",
      }, "-=0.5");

      tl.from(".maacx-cta-row", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "expo.out",
      }, "-=0.5");

      tl.from(".maacx-trust", {
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: "expo.out",
      }, "-=0.3");

      tl.from(".maacx-info-item", {
        opacity: 0,
        x: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
      }, "-=0.8");

      tl.from(".maacx-scroll", {
        opacity: 0,
        y: 10,
        duration: 0.5,
      }, "-=0.3");

      // Parallax (desktop)
      if (!isMobile) {
        gsap.to(".maacx-video", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: ".maacx-hero", start: "top top", end: "bottom top", scrub: 1 },
        });
        gsap.to(".maacx-content-left", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: ".maacx-hero", start: "top top", end: "bottom top", scrub: 1 },
        });
        gsap.to(".maacx-info-card", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: ".maacx-hero", start: "top top", end: "bottom top", scrub: 1 },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [preloaderDone, isMobile]);

  if (!mounted) return <div className="h-screen w-full bg-[#080808]" />;
  if (!preloaderDone) return <Preloader onComplete={handlePreloaderComplete} />;

  return (
    <>
      <section
        ref={containerRef}
        className="maacx-hero relative h-screen w-full overflow-hidden bg-[#080808]"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="maacx-video absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero-poster.webp"
          >
            <source src="/intro.webm" type="video/webm" />
            <source src="/intro.mp4" type="video/mp4" />
          </video>

          {/* Gradient fallback */}
          <div className="absolute inset-0 z-5 bg-[radial-gradient(ellipse_at_30%_50%,#1a0505_0%,#080808_70%)]" />

          {/* Overlay gradient */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/75 via-black/50 to-black/85" />

          {/* Red radial accent */}
          <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_70%_60%,rgba(227,24,55,0.08)_0%,transparent_60%)]" />
        </div>

        {/* Content — Left */}
        <div className="maacx-content-left absolute left-0 top-1/2 -translate-y-1/2 z-30 w-full md:max-w-[60%] px-6 md:px-12 lg:px-20">
          {/* Badge */}
          <div className="maacx-badge mb-5">
            <span className="inline-block px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/15 rounded-full text-[#E31837] text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase">
              NSDC / MESC Partner
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-4">
            <span className="maacx-headline maacx-split-chars block text-white font-display font-extrabold text-[clamp(2.8rem,7vw,6rem)] leading-[1.05] tracking-tight overflow-hidden">
              Big Leaps
            </span>
            <span className="maacx-headline-accent block text-[#E31837] font-display font-extrabold text-[clamp(2rem,5vw,5rem)] leading-[1.05] tracking-tight overflow-hidden mt-1">
              Begin with the Right Course
            </span>
          </h1>

          {/* Program badge */}
          <div className="maacx-subtitle mb-7">
            <span className="inline-block px-5 py-3 bg-[#E31837] rounded-lg text-white text-base md:text-lg font-bold shadow-2xl">
              B.Voc in 3D Animation & VFX
            </span>
          </div>

          {/* CTA Row */}
          <div className="maacx-cta-row flex flex-wrap items-center gap-4 mb-6">
            <a href="#courses" className="btn btn-primary group">
              <span>Explore Courses</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button
              className="btn btn-ghost group"
              onClick={() => setShowVideoModal(true)}
            >
              <svg className="w-5 h-5 text-[#E31837]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Watch Showreel</span>
            </button>
          </div>

          {/* Trust row */}
          <div className="maacx-trust flex flex-wrap items-center gap-3 text-[#A8A29C] text-sm">
            <span>30+ Years</span>
            <span className="w-1 h-1 rounded-full bg-[#E31837]" />
            <span>95% Placements</span>
            <span className="w-1 h-1 rounded-full bg-[#E31837]" />
            <span>NSDC Certified</span>
          </div>
        </div>

        {/* Info Card — Right (desktop) */}
        <div className="maacx-content-right absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:block px-6 md:px-12 lg:px-20">
          <div className="maacx-info-card backdrop-blur-xl bg-black/35 border border-white/10 rounded-2xl p-6 md:p-8 max-w-[300px]">
            {[
              { value: "30+", label: "YEARS", sub: "Legacy of Excellence" },
              { value: "95%", label: "PLACEMENT", sub: "Rate Guaranteed" },
              { value: "100+", label: "CENTERS", sub: "Across India" },
            ].map((item, i) => (
              <div
                key={i}
                className={`maacx-info-item flex items-start gap-4 ${
                  i < 2 ? "pb-5 mb-5 border-b border-white/10" : "pt-0"
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#E31837] to-[#FF6B35] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{item.value}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base tracking-wide">{item.label}</h3>
                  <p className="text-[#6b6b6b] text-xs tracking-widest uppercase mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Stats Strip */}
        <div className="md:hidden absolute bottom-24 left-0 right-0 z-20 px-6">
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

        {/* Scroll Indicator */}
        <div className="maacx-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 hidden md:flex">
          <span className="text-[#6b6b6b] text-[8px] tracking-[0.3em] uppercase">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="opacity-40">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="#6b6b6b" strokeWidth="1.5" />
            <circle cx="8" cy="8" r="2" fill="#E31837">
              <animate attributeName="cy" values="8;16;8" dur="1.6s" repeatCount="indefinite" />
            </circle>
          </svg>
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

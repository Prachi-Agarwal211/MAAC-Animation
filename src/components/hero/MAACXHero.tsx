"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

type Props = {
  onIntroReveal?: () => void;
};

export default function MAACXHero({ onIntroReveal }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaReduced.matches);

    const reducedHandler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaReduced.addEventListener("change", reducedHandler);
    return () => {
      mediaReduced.removeEventListener("change", reducedHandler);
    };
  }, []);

  // Video loads eagerly via src attributes — no lazy loading needed

  const playVideo = useCallback(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    if (isReducedMotion) {
      v.pause();
      return;
    }
    v.muted = isMuted;
    v.play().catch(() => {
      v.muted = true;
      setIsMuted(true);
      v.play().catch(() => {});
    });
  }, [isMuted, isReducedMotion]);

  // Content reveal — show immediately after mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onIntroReveal?.();
          window.dispatchEvent(new Event("maac:intro_revealed"));
        },
      });

      tl.to(contentRef.current, { opacity: 1, duration: 0.1 })
        .fromTo(
          ".maacx-element",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.2,
          }
        );
    }, contentRef);

    return () => ctx.revert();
  }, [loaded, onIntroReveal]);

  // ── Video dissolve + content exit handled by parent wrapper ──

  // Ensure video plays (autoPlay may be blocked by browser)
  useEffect(() => {
    if (isReducedMotion) return;
    playVideo();
  }, [isReducedMotion, playVideo]);

  // Kinetic typography — weight drops on fast scroll, settles at rest
  useEffect(() => {
    const h1 = sectionRef.current?.querySelector("h1");
    if (!h1 || isReducedMotion) return;

    let raf: number;
    const update = () => {
      const lenis = getLenis();
      const v = lenis?.velocity ?? 0;
      const clamped = Math.min(Math.abs(v), 1200);
      const wght = 800 - (clamped / 1200) * 400;
      h1.style.setProperty("--wght", String(wght));
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [isReducedMotion]);

  const toggleMute = useCallback(() => {
    const next = !isMuted;
    setIsMuted(next);
    if (heroVideoRef.current) heroVideoRef.current.muted = next;
  }, [isMuted]);

  return (
    <section ref={sectionRef} className="relative isolate min-h-[100svh] w-full overflow-x-hidden">
      {/* Background — video loads and plays immediately */}
      <div ref={bgRef} className="hero-bg-container absolute inset-0 z-0 overflow-hidden will-change-transform origin-top">

        {/* Video element — loads immediately, plays when ready */}
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          muted={isMuted}
          playsInline
          loop
          autoPlay
          preload="auto"
        >
          <source src="/intro.mp4" type="video/mp4" />
          <source src="/intro.webm" type="video/webm" />
        </video>

      </div>

      {/* Foreground content */}
      <div
        ref={contentRef}
        className="hero-content relative z-10 mx-auto flex min-h-[100svh] w-full max-w-content flex-col justify-end px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[calc(4rem+env(safe-area-inset-top))] sm:px-8 sm:pb-10 sm:pt-[calc(5.5rem+env(safe-area-inset-top))] lg:px-16 lg:pb-12 xl:px-24 xl:pb-14 opacity-0 will-change-transform"
      >
        <div className="flex w-full flex-col gap-8 md:gap-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="maacx-content min-w-0 max-w-3xl flex-1">
              <h1 className="mb-6 sm:mb-12 maacx-element kinetic-weight" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.5)" }}>
              <span className="block font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold uppercase leading-[0.9] tracking-[0.1em] text-white">
                FROM BASICS
              </span>
              <span className="block font-display mt-2 text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold uppercase leading-[0.9] tracking-[0.1em] metallic-gold-text italic">
                TO PORTFOLIO
              </span>
            </h1>

            <div className="flex flex-col gap-12">
              <a
                href="#features"
                className="group inline-flex items-center gap-5 self-start maacx-element"
              >
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/90 group-hover:text-white transition-colors" style={{ textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}>
                  Explore Programs
                </span>
                <div className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:border-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-white group-hover:text-black transition-transform duration-500 group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </a>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                aria-pressed={!isMuted}
                className="group inline-flex items-center gap-3.5 self-start mt-2 sm:mt-10 maacx-element"
              >
                <div className="flex h-4 items-center gap-0.5 opacity-70 transition-opacity group-hover:opacity-100">
                  <div
                    className={`w-[2px] bg-white transition-all duration-300 ${!isMuted ? "h-full" : "h-1.5"}`}
                  />
                  <div
                    className={`w-[2px] bg-white transition-all duration-300 ${!isMuted ? "h-2" : "h-1.5"}`}
                  />
                  <div
                    className={`w-[2px] bg-white transition-all duration-300 delay-75 ${!isMuted ? "h-3" : "h-1.5"}`}
                  />
                  <div
                    className={`w-[2px] bg-white transition-all duration-300 delay-100 ${!isMuted ? "h-4" : "h-1.5"}`}
                  />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors group-hover:text-white/90" style={{ textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}>
                  SOUND {isMuted ? "OFF" : "ON"}
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

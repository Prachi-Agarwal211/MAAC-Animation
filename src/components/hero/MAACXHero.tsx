"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "@/lib/gsap";

const HERO_VIDEO_MP4 = "/intro.mp4";
const HERO_VIDEO_WEBM = "/intro.webm";

type Props = {
  onIntroReveal?: () => void;
};

export default function MAACXHero({ onIntroReveal }: Props) {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const playVideo = useCallback(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    v.muted = isMuted;
    v.play().catch(() => {
      v.muted = true;
      setIsMuted(true);
      v.play().catch(() => {});
    });
  }, [isMuted]);

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
        .fromTo(".maacx-element", 
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

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (heroVideoRef.current) heroVideoRef.current.muted = next;
  };

  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-x-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          onLoadedData={() => {
            setLoaded(true);
            playVideo();
          }}
          >
          <source src={HERO_VIDEO_MP4} type="video/mp4" />
          <source src={HERO_VIDEO_WEBM} type="video/webm" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Foreground content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1800px] flex-col justify-end px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[calc(5rem+env(safe-area-inset-top))] sm:px-8 sm:pb-10 sm:pt-[calc(5.5rem+env(safe-area-inset-top))] lg:px-16 lg:pb-12 xl:px-24 xl:pb-14 opacity-0"
      >
        <div className="flex w-full flex-col gap-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="maacx-content min-w-0 max-w-3xl flex-1">
            <h1 className="mb-10 sm:mb-12 maacx-element">
              <span className="block font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold uppercase leading-[0.9] tracking-[0.1em] text-white">
                FROM BASICS
              </span>
              <span className="block font-display mt-2 text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold uppercase leading-[0.9] tracking-[0.1em] metallic-gold-text italic">
                TO PORTFOLIO
              </span>
            </h1>

            <div className="flex flex-col gap-12">
              <a
                href="#courses"
                className="group inline-flex items-center gap-6 self-start maacx-element"
              >
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/90 group-hover:text-white transition-colors">
                  Explore Programs
                </span>
                <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:border-white">
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
                className="group inline-flex items-center gap-3.5 self-start mt-4 sm:mt-10 maacx-element"
              >
                <div className="flex h-4 items-center gap-0.5 opacity-70 transition-opacity group-hover:opacity-100">
                  <div className={`w-[2px] bg-white transition-all duration-300 ${!isMuted ? 'h-full' : 'h-1.5'}`} />
                  <div className={`w-[2px] bg-white transition-all duration-300 ${!isMuted ? 'h-2' : 'h-1.5'}`} />
                  <div className={`w-[2px] bg-white transition-all duration-300 delay-75 ${!isMuted ? 'h-3' : 'h-1.5'}`} />
                  <div className={`w-[2px] bg-white transition-all duration-300 delay-100 ${!isMuted ? 'h-4' : 'h-1.5'}`} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 transition-colors group-hover:text-white/90">
                  SOUND {isMuted ? "OFF" : "ON"}
                </span>
              </button>
            </div>
          </div>

          <div className="maacx-hero-stats opacity-0 flex flex-row gap-12 sm:gap-16 pb-2 lg:pb-0 justify-start lg:justify-end">
          </div>
        </div>
      </div>
    </section>
  );
}

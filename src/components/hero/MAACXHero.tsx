"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { isDataSaverMode } from "@/lib/constants";
import { ArrowRight, GraduationCap, Briefcase, Award, Sparkles } from "lucide-react";

type Props = {
  onIntroReveal?: () => void;
};

export default function MAACXHero({ onIntroReveal }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const introSignaledRef = useRef(false);

  const [isMuted, setIsMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isDataSaver, setIsDataSaver] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsDataSaver(isDataSaverMode());

    const mediaReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaReduced.matches);

    const reducedHandler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaReduced.addEventListener("change", reducedHandler);
    return () => {
      mediaReduced.removeEventListener("change", reducedHandler);
    };
  }, []);

  const playVideo = useCallback(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    if (isReducedMotion || isDataSaver) {
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    // No delay gate — text is visible in first paint; entrance is transform-only
    setLoaded(true);
  }, []);

  // Hide poster image until video is ready — prevents 347KB flash on refresh
  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    const onReady = () => v.classList.add("video-ready");
    // metadata loaded = poster can be replaced; data loaded = video can play
    v.addEventListener("loadeddata", onReady, { once: true });
    // Fallback: if video is already cached and ready, add class immediately
    if (v.readyState >= 2) v.classList.add("video-ready");
    return () => v.removeEventListener("loadeddata", onReady);
  }, []);

  useEffect(() => {
    if (!loaded || !contentRef.current) return;

    // Reduced motion: content is already visible (no opacity gate) — just signal done (once)
    if (isReducedMotion) {
      if (!introSignaledRef.current) {
        introSignaledRef.current = true;
        onIntroReveal?.();
        window.dispatchEvent(new Event("maac:intro_revealed"));
      }
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onIntroReveal?.();
          window.dispatchEvent(new Event("maac:intro_revealed"));
        },
      });

      // Transform-only entrance — never hides text, so LCP paints in first frame
      tl.fromTo(
        ".maacx-element",
        { y: 24 },
        {
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.2,
        }
      )
        .fromTo(
          ".hero-glass-card",
          { y: 20, scale: 0.97 },
          {
            y: 0,
            scale: 1,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.6"
        );
    }, contentRef);

    return () => ctx.revert();
  }, [loaded, onIntroReveal, isReducedMotion]);

  useEffect(() => {
    if (isReducedMotion) return;
    playVideo();
  }, [isReducedMotion, playVideo]);

  // Kinetic typography
  useEffect(() => {
    const h1 = sectionRef.current?.querySelector("h1");
    if (!h1 || isReducedMotion) return;

    let raf: number;
    const update = () => {
      const lenis = getLenis();
      const v = lenis?.velocity ?? 0;
      const clamped = Math.min(Math.abs(v), 1200);
      const wght = 800 - (clamped / 1200) * 200;
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

  const stats = [
    { icon: GraduationCap, value: "25+", label: "Programs" },
    { icon: Briefcase, value: "95%", label: "Placement" },
    { icon: Award, value: "30+", label: "Years Legacy" },
  ];

  return (
    <section ref={sectionRef} className="relative isolate min-h-[100svh] w-full overflow-x-hidden">
      <div ref={bgRef} className="hero-bg-container absolute inset-0 z-0 overflow-hidden will-change-transform origin-top">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover object-center hero-video-fade-full"
          style={{ '--video-target-opacity': '1' } as React.CSSProperties}
          muted={isMuted}
          playsInline
          loop
          autoPlay={!isDataSaver}
          poster="/hero-poster.jpg"
          preload={isDataSaver ? "metadata" : "auto"}
        >
          <source src="/intro.mp4" type="video/mp4" />
          <source src="/intro.webm" type="video/webm" />
        </video>
      </div>

      <div
        ref={contentRef}
        className="hero-content relative z-10 mx-auto flex min-h-[100svh] w-full max-w-content flex-col justify-end px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[calc(4rem+env(safe-area-inset-top))] sm:px-8 sm:pb-10 sm:pt-[calc(5.5rem+env(safe-area-inset-top))] lg:px-16 lg:pb-12 xl:px-24 xl:pb-14 will-change-transform"
      >
        <div className="flex w-full flex-col gap-10 md:gap-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          {/* Left: Hero Text */}
          <div className="maacx-content min-w-0 max-w-3xl flex-1">
              <h1 className="mb-6 sm:mb-12 maacx-element kinetic-weight" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.5)" }}>
              <span className="hero-dual-layer block">
                <span className="hero-text-outline block font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold uppercase leading-[0.9] tracking-[0.1em]" aria-hidden="true">FROM BASICS</span>
                <span className="hero-text-fill block font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold uppercase leading-[0.9] tracking-[0.1em] text-white">FROM BASICS</span>
              </span>
              <span className="hero-dual-layer block mt-2">
                <span className="hero-text-outline block font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold uppercase leading-[0.9] tracking-[0.1em] italic" aria-hidden="true">TO PORTFOLIO</span>
                <span className="hero-text-fill block font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold uppercase leading-[0.9] tracking-[0.1em] metallic-gold-text italic">TO PORTFOLIO</span>
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
            </div>
          </div>

          {/* Right: Wolverine-inspired Glass Card CTA */}
          <div className="hero-glass-card w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div className="relative rounded-2xl bg-black/20 backdrop-blur-lg lg:backdrop-blur-2xl border border-white/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-[#C4A882]/30 transition-all duration-500">
              {/* Subtle rim light */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
              
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-5">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="flex justify-center mb-1">
                      <stat.icon size={16} className="text-[#C4A882]/80" />
                    </div>
                    <div className="font-display text-lg md:text-xl font-bold text-white leading-none">{stat.value}</div>
                    <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/50 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />

              {/* CTA */}
              <a
                href="/contact"
                className="group/cta relative flex items-center justify-between w-full px-5 py-3 rounded-xl bg-gradient-to-r from-[#C4A882]/10 to-[#C4A882]/5 border border-[#C4A882]/20 hover:bg-[#C4A882] hover:border-[#C4A882] transition-all duration-500"
              >
                <span className="flex items-center gap-2.5">
                  <Sparkles size={14} className="text-[#C4A882] group-hover/cta:text-black transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white group-hover/cta:text-black transition-colors">
                    Free Demo Class
                  </span>
                </span>
                <ArrowRight size={14} className="text-white/60 group-hover/cta:text-black group-hover/cta:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 maacx-element opacity-60">
          <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/70">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

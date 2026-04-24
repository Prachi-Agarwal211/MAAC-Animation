"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { VolumeX, Volume2 } from "lucide-react";

const HERO_VIDEO_MP4 = "/hero-video-compressed.mp4";
const HERO_VIDEO_WEBM = "/hero-video.webm";
const INTRO_VIDEO_MP4 = "/intro.mp4";
const INTRO_VIDEO_WEBM = "/intro.webm";
const INTRO_DONE_KEY = "maac_intro_done";

type Props = {
  /** Fires when the intro is done and the rest of the homepage may mount (after exit animation). */
  onIntroReveal?: () => void;
};

export default function MAACXHero({ onIntroReveal }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentLabelRef = useRef<HTMLSpanElement>(null);
  const hasEndedRef = useRef(false);
  const introStartedAtRef = useRef<number | null>(null);

  const [heroRevealed, setHeroRevealed] = useState(false);
  const [introLayerDone, setIntroLayerDone] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const markIntroDone = useCallback(() => {
    document.documentElement.dataset.maacIntroDone = "1";
    try {
      window.localStorage.setItem(INTRO_DONE_KEY, "1");
    } catch {
      // Ignore storage errors (private mode / strict browser policies).
    }
  }, []);

  const isIntroAlreadyDone = useCallback(() => {
    if (typeof window === "undefined") return false;
    if (document.documentElement.dataset.maacIntroDone === "1") return true;
    try {
      return window.localStorage.getItem(INTRO_DONE_KEY) === "1";
    } catch {
      return false;
    }
  }, []);

  const setProgressToFull = useCallback(() => {
    const bar = progressRef.current;
    const label = percentLabelRef.current;
    if (bar) bar.style.width = "100%";
    if (label) label.textContent = "100%";
  }, []);

  const getIntroDuration = useCallback((el: HTMLVideoElement) => {
    const d = el.duration;
    if (d === Infinity) {
      if (el.seekable && el.seekable.length > 0) {
        const end = el.seekable.end(el.seekable.length - 1);
        if (Number.isFinite(end) && end > 0) return end;
      }
      if (el.buffered && el.buffered.length > 0) {
        const end = el.buffered.end(el.buffered.length - 1);
        if (Number.isFinite(end) && end > 0) return end;
      }
      return 0;
    }
    if (Number.isFinite(d) && d > 0) return d;
    if (el.seekable && el.seekable.length > 0) {
      const end = el.seekable.end(el.seekable.length - 1);
      if (Number.isFinite(end) && end > 0) return end;
    }
    if (el.buffered && el.buffered.length > 0) {
      const end = el.buffered.end(el.buffered.length - 1);
      if (Number.isFinite(end) && end > 0) return end;
    }
    return 0;
  }, []);

  const finishIntro = useCallback(() => {
    if (hasEndedRef.current || introLayerDone) return;
    hasEndedRef.current = true;
    setProgressToFull();

    // Mount hero + start exit transition so hero is visible *under* the fading intro.
    setHeroRevealed(true);

    const tl = gsap.timeline({
      onComplete: () => {
        markIntroDone();
        setIntroLayerDone(true);
        onIntroReveal?.();
        window.dispatchEvent(new Event("maac:intro_revealed"));
      },
    });

    const overlay = introOverlayRef.current;
    if (overlay) {
      tl.to(overlay, {
        opacity: 0,
        scale: 1.02,
        duration: 1.05,
        ease: "power3.inOut",
      });
    } else {
      setIntroLayerDone(true);
      markIntroDone();
      onIntroReveal?.();
      window.dispatchEvent(new Event("maac:intro_revealed"));
    }
  }, [introLayerDone, markIntroDone, onIntroReveal, setProgressToFull]);

  const applyMuteState = useCallback((next: boolean) => {
    setIsMuted(next);
    if (introVideoRef.current) introVideoRef.current.muted = next;
    if (heroVideoRef.current) heroVideoRef.current.muted = next;
  }, []);

  const playHeroVideo = useCallback(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    v.muted = isMuted;
    v.play().catch(() => {
      // Browsers may block autoplay with sound; fallback to muted playback.
      v.muted = true;
      setIsMuted(true);
      v.play().catch(() => {});
    });
  }, [isMuted]);

  useEffect(() => {
    if (isIntroAlreadyDone()) {
      hasEndedRef.current = true;
      setHeroRevealed(true);
      setIntroLayerDone(true);
      requestAnimationFrame(() => {
        onIntroReveal?.();
        window.dispatchEvent(new Event("maac:intro_revealed"));
      });
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      hasEndedRef.current = true;
      markIntroDone();
      setHeroRevealed(true);
      setIntroLayerDone(true);
      requestAnimationFrame(() => {
        onIntroReveal?.();
        window.dispatchEvent(new Event("maac:intro_revealed"));
      });
    }
  }, [isIntroAlreadyDone, markIntroDone, onIntroReveal]);

  useEffect(() => {
    if (introLayerDone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [introLayerDone]);

  useEffect(() => {
    if (introLayerDone || videoError) return;
    const v = introVideoRef.current;
    if (!v) return;
    introStartedAtRef.current = performance.now();
    v.play().catch(() => setVideoError(true));
  }, [introLayerDone, videoError]);

  useEffect(() => {
    if (introLayerDone) return;
    // Guard against broken media metadata/network stalls so home content is never blocked.
    const timeout = window.setTimeout(() => {
      if (!hasEndedRef.current) finishIntro();
    }, 18000);
    return () => window.clearTimeout(timeout);
  }, [introLayerDone, finishIntro]);

  const onIntroTimeUpdate = () => {
    const el = introVideoRef.current;
    const bar = progressRef.current;
    const label = percentLabelRef.current;
    if (!el || !bar) return;
    const dur = getIntroDuration(el);
    let pct = 0;
    if (dur && Number.isFinite(dur)) {
      pct = Math.min(100, (el.currentTime / dur) * 100);
    } else if (introStartedAtRef.current) {
      // Metadata can be unavailable for some encodes; show a time-based loading fallback.
      const elapsed = performance.now() - introStartedAtRef.current;
      pct = Math.min(95, (elapsed / 9000) * 100);
    } else {
      return;
    }
    bar.style.width = `${pct}%`;
    if (label) label.textContent = `${Math.min(100, Math.floor(pct))}%`;
  };

  useGSAP(() => {
    if (!heroRevealed) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.fromTo(
      ".maacx-hero-video",
      { opacity: 0, scale: 1.035 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      0
    )
      .fromTo(
        ".maacx-content > *",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.065, ease: "expo.out" },
        0.12
      )
      .fromTo(
        ".maacx-hero-stats",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, ease: "expo.out" },
        0.22
      );

    playHeroVideo();
  }, { dependencies: [heroRevealed, playHeroVideo], scope: containerRef });

  const toggleHeroMute = () => {
    applyMuteState(!isMuted);
  };

  const toggleIntroMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    applyMuteState(!isMuted);
  };

  return (
    <>
      {!introLayerDone && (
        <div
          ref={introOverlayRef}
          className="fixed inset-0 z-[10050] bg-black overflow-hidden will-change-[opacity,transform]"
        >
          {videoError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-20 px-6 text-center">
              <button
                type="button"
                onClick={finishIntro}
                className="text-[10px] font-bold tracking-[0.3em] uppercase text-white border border-white/20 px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Continue
              </button>
            </div>
          ) : (
            <>
              <video
                ref={introVideoRef}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                autoPlay
                muted={isMuted}
                playsInline
                preload="auto"
                onEnded={finishIntro}
                onTimeUpdate={onIntroTimeUpdate}
                onProgress={onIntroTimeUpdate}
                onLoadedMetadata={() => {
                  const el = introVideoRef.current;
                  const label = percentLabelRef.current;
                  if (label) label.textContent = "0%";
                  if (el && progressRef.current) progressRef.current.style.width = "0%";
                  onIntroTimeUpdate();
                }}
                onLoadedData={onIntroTimeUpdate}
                onCanPlay={onIntroTimeUpdate}
                onError={() => setVideoError(true)}
              >
                <source src={INTRO_VIDEO_MP4} type="video/mp4" />
                <source src={INTRO_VIDEO_WEBM} type="video/webm" />
              </video>

              <div className="absolute top-6 left-6 right-6 z-[10060] flex items-center justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={toggleIntroMute}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/75 backdrop-blur-sm transition-colors hover:text-white pointer-events-auto"
                  aria-label={isMuted ? "Unmute intro video" : "Mute intro video"}
                >
                  {isMuted ? <VolumeX size={18} strokeWidth={2} /> : <Volume2 size={18} strokeWidth={2} />}
                </button>

                <button
                  type="button"
                  onClick={finishIntro}
                  className="px-6 py-2.5 rounded-full border border-white/20 bg-black/40 text-[10px] font-bold uppercase tracking-[0.2em] text-white/75 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white pointer-events-auto"
                >
                  Skip Intro
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-8 pb-6 sm:pb-8 pt-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                <div className="flex items-end justify-between gap-4 max-w-4xl mx-auto mb-2">
                  <span className="text-[10px] sm:text-xs font-medium tracking-widest text-white/35 uppercase">Loading</span>
                  <span ref={percentLabelRef} className="text-[11px] sm:text-sm font-semibold tabular-nums text-white/90">
                    0%
                  </span>
                </div>
                <div className="max-w-4xl mx-auto h-1.5 sm:h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    ref={progressRef}
                    className="h-full w-0 rounded-full metallic-gold-accent shadow-[0_0_20px_rgba(227,24,55,0.6)]"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <section
        ref={containerRef}
        className="relative isolate min-h-[100svh] w-full bg-transparent overflow-x-hidden"
        aria-hidden={!heroRevealed}
      >
        {/* Full-bleed background video */}
        <div className="maacx-hero-video absolute inset-0 z-0 opacity-0">
          {heroRevealed ? (
            <video
              ref={heroVideoRef}
              className="absolute inset-0 h-full w-full object-cover object-center"
              muted={isMuted}
              loop
              playsInline
              preload="auto"
              poster="/hero-poster.jpg"
              onLoadedData={playHeroVideo}
            >
              <source src={HERO_VIDEO_MP4} type="video/mp4" />
              <source src={HERO_VIDEO_WEBM} type="video/webm" />
            </video>
          ) : (
            <div className="absolute inset-0 bg-transparent" aria-hidden />
          )}
          {/* Readability: very light semi-transparent gradients to allow background to show through clearly */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </div>

        {/* Foreground: clear of fixed header + safe areas; content anchored bottom */}
        <div
          className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1800px] flex-col justify-end px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[calc(5rem+env(safe-area-inset-top))] sm:px-8 sm:pb-10 sm:pt-[calc(5.5rem+env(safe-area-inset-top))] lg:px-16 lg:pb-12 xl:px-24 xl:pb-14"
        >
          <div className="flex w-full flex-col gap-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="maacx-content min-w-0 max-w-3xl flex-1 [&>*]:opacity-0">
              <h1 className="mb-10 sm:mb-12">
                <span className="block font-display text-[clamp(2rem,6vw,3.8rem)] font-light uppercase leading-[1.1] tracking-[0.15em] text-white">
                  FROM BASICS
                </span>
                <span className="block font-display mt-1 text-[clamp(2rem,6vw,3.8rem)] font-light uppercase leading-[1.1] tracking-[0.15em] metallic-gold-text">
                  TO PORTFOLIO
                </span>
              </h1>

              <div className="flex flex-col gap-12">
                <a
                  href="#courses"
                  className="group inline-flex items-center gap-6 self-start"
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

                {/* Sound Button Placeholder / Actual */}
                <button
                  type="button"
                  onClick={toggleHeroMute}
                  className="group inline-flex items-center gap-3.5 self-start mt-4 sm:mt-10"
                >
                  <div className="flex h-4 items-center gap-0.5 opacity-70 transition-opacity group-hover:opacity-100">
                    <div className={`w-[2px] bg-white transition-all duration-300 ${!isMuted ? 'h-full' : 'h-1.5'}`} />
                    <div className={`w-[2px] bg-white transition-all duration-300 ${!isMuted ? 'h-2' : 'h-1.5'}`} />
                    <div className={`w-[2px] bg-white transition-all duration-300 delay-75 ${!isMuted ? 'h-3' : 'h-1.5'}`} />
                    <div className={`w-[2px] bg-white transition-all duration-300 delay-100 ${!isMuted ? 'h-4' : 'h-1.5'}`} />
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/50 transition-colors group-hover:text-white/90">
                    SOUND {isMuted ? "OFF" : "ON"}
                  </span>
                </button>
              </div>
            </div>

            {/* Desktop & Mobile Stats aligned to bottom-right style - Removed per request */}
            <div className="maacx-hero-stats opacity-0 flex flex-row gap-12 sm:gap-16 pb-2 lg:pb-0 justify-start lg:justify-end">
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

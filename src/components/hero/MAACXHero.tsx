"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { VolumeX, Volume2 } from "lucide-react";
import SplitTextReveal from "@/components/ui/SplitTextReveal";

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

  /** Hero video + section mount under the intro layer (before overlay finishes fading out). */
  const [heroRevealed, setHeroRevealed] = useState(false);
  /** Intro overlay removed; rest of app + scroll unlocked. */
  const [introLayerDone, setIntroLayerDone] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const markIntroDone = useCallback(() => {
    document.documentElement.dataset.maacIntroDone = "1";
    try {
      window.sessionStorage.setItem(INTRO_DONE_KEY, "1");
    } catch {
      // Ignore storage errors (private mode / strict browser policies).
    }
  }, []);

  const isIntroAlreadyDone = useCallback(() => {
    if (document.documentElement.dataset.maacIntroDone === "1") return true;
    try {
      return window.sessionStorage.getItem(INTRO_DONE_KEY) === "1";
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

  const toggleIntroMute = () => {
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

              <button
                type="button"
                onClick={toggleIntroMute}
                className="absolute bottom-20 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/75 backdrop-blur-sm transition-colors hover:text-white sm:bottom-24 sm:right-8"
                aria-label={isMuted ? "Unmute intro video" : "Mute intro video"}
              >
                {isMuted ? <VolumeX size={18} strokeWidth={2} /> : <Volume2 size={18} strokeWidth={2} />}
              </button>

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
                    className="h-full w-0 rounded-full bg-[#E31837] shadow-[0_0_12px_rgba(227,24,55,0.5)]"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <section
        ref={containerRef}
        className="relative isolate min-h-[100svh] w-full bg-[#080808] overflow-x-hidden"
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
            <div className="absolute inset-0 bg-[#080808]" aria-hidden />
          )}
          {/* Readability: lighter on small screens so type stays legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/85 md:from-black/75 md:via-black/20 md:to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/15 md:from-black/50" />
        </div>

        {/* Foreground: clear of fixed header + safe areas; content anchored bottom */}
        <div
          className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1800px] flex-col justify-end px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[calc(5rem+env(safe-area-inset-top))] sm:px-8 sm:pb-10 sm:pt-[calc(5.5rem+env(safe-area-inset-top))] lg:px-16 lg:pb-12 xl:px-24 xl:pb-14"
        >
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="maacx-content min-w-0 max-w-3xl flex-1 [&>*]:opacity-0">
              <div className="mb-4 sm:mb-5">
                <span className="inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-white/95 backdrop-blur-md sm:px-4 sm:text-[10px] sm:tracking-[0.3em]">
                  Animation & VFX Academy · Jaipur
                </span>
              </div>

              <h1 className="mb-5 sm:mb-6">
                <span className="block font-display font-bold uppercase leading-[1.02] tracking-tighter text-white text-[clamp(1.45rem,5.5vw,2.55rem)]">
                  <SplitTextReveal>Learn Animation & VFX</SplitTextReveal>
                </span>
                <span className="font-display mt-2 block text-[clamp(1.15rem,4.6vw,2rem)] font-black uppercase leading-[1.08] tracking-tight text-white/90">
                  From Basics to Portfolio
                </span>
              </h1>

              <p className="mb-6 max-w-xl text-[15px] font-medium leading-relaxed text-[#C4BEB6] sm:mb-8 sm:text-base md:text-lg md:leading-relaxed lg:border-l-2 lg:border-[#E31837]/40 lg:pl-5 lg:italic">
                Get hands-on training in 3D, VFX, motion graphics, and game art—learn industry tools, build real
                projects, and graduate with a showreel that’s ready for interviews.
              </p>

              <div className="flex w-full max-w-xl flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch">
                  <Link
                    href="/contact"
                    className="btn btn-primary flex min-h-[48px] w-full items-center justify-center rounded-xl px-6 py-3.5 text-center text-[10px] font-bold tracking-[0.26em] sm:w-auto sm:min-w-[188px] sm:px-8"
                  >
                    Enquire Now
                  </Link>
                  <a
                    href="#courses"
                    className="btn btn-ghost flex min-h-[48px] w-full items-center justify-center rounded-xl border border-white/18 px-6 py-3.5 text-center text-[10px] font-bold tracking-[0.26em] text-white/90 sm:w-auto sm:min-w-[188px] sm:px-8"
                  >
                    View programs
                  </a>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  {/* Stats: always visible; compact on phone, column on large desktop */}
                  <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-4 sm:gap-x-10 lg:border-t-0 lg:pt-0 xl:hidden">
                    {[
                      { v: "95%", l: "Placements" },
                      { v: "30+", l: "Years legacy" },
                    ].map((s) => (
                      <div key={s.l} className="min-w-[6rem]">
                        <div className="font-display text-2xl font-black leading-none text-white sm:text-3xl">{s.v}</div>
                        <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.35em] text-[#8A827A]">{s.l}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={toggleHeroMute}
                    className="group inline-flex items-center justify-center gap-3 self-start sm:justify-start"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/65 transition-all hover:border-white/25 hover:text-white">
                      {isMuted ? <VolumeX size={18} strokeWidth={2} /> : <Volume2 size={18} strokeWidth={2} />}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-[0.28em] text-white/35 transition-colors group-hover:text-white/80">
                      {isMuted ? "Play reel audio" : "Mute"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop / large: stats column */}
            <div className="maacx-hero-stats hidden shrink-0 text-right opacity-0 xl:block xl:pb-2">
              <div className="space-y-10">
                {[
                  { v: "95%", l: "PLACEMENTS" },
                  { v: "30+", l: "YEARS LEGACY" },
                ].map((s) => (
                  <div key={s.l} className="group cursor-default">
                    <div className="font-display text-5xl font-black leading-none text-white transition-all duration-500 group-hover:-translate-x-1 group-hover:text-[#E31837]">
                      {s.v}
                    </div>
                    <div className="mt-3 text-[9px] font-bold uppercase tracking-[0.4em] text-[#6B6560]">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

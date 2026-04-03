"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const clearAllTimers = useCallback(() => {
    timerRefs.current.forEach(t => clearTimeout(t));
    timerRefs.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timerRefs.current.push(t);
    return t;
  }, []);

  const triggerExit = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    clearAllTimers();

    const wrapper = wrapperRef.current;
    const bar = progressBarRef.current;

    // Fill progress bar to 100%
    if (bar) {
      bar.style.transition = "width 0.4s cubic-bezier(0.4,0,0.2,1)";
      bar.style.width = "100%";
    }

    // Brief pause at 100%, then fade out
    addTimer(() => {
      if (wrapper) {
        wrapper.style.transition = "opacity 0.7s cubic-bezier(0.4,0,0.2,1)";
        wrapper.style.opacity = "0";
        wrapper.style.pointerEvents = "none";
      }
      // Call onComplete slightly before opacity finishes so hero is ready
      addTimer(() => {
        onComplete();
      }, 650);
    }, 350);
  }, [onComplete, clearAllTimers, addTimer]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      // No video element — bail immediately
      addTimer(triggerExit, 100);
      return () => clearAllTimers();
    }

    // Hard global fallback — never hang more than 12s
    addTimer(triggerExit, 12000);

    // If video completely fails to load any data within 3s, exit
    const noDataFallback = addTimer(() => {
      if (!completedRef.current && video.readyState === 0) {
        triggerExit();
      }
    }, 3000);

    const handleCanPlay = () => {
      setVideoLoaded(true);
      clearTimeout(noDataFallback);
    };

    const handleEnded = () => {
      triggerExit();
    };

    const handleError = () => {
      // Video failed — exit cleanly
      addTimer(triggerExit, 300);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || !progressBarRef.current) return;
      const pct = Math.min((video.currentTime / video.duration) * 100, 95);
      progressBarRef.current.style.width = `${pct}%`;
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);
    video.addEventListener("timeupdate", handleTimeUpdate);

    // Attempt play — browser may block autoplay
    const playAttempt = video.play();
    if (playAttempt !== undefined) {
      playAttempt.catch(() => {
        // Autoplay blocked — show loading state, let fallback handle it
      });
    }

    return () => {
      clearAllTimers();
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [triggerExit, addTimer, clearAllTimers]);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[9999] bg-[#0C0C0C] overflow-hidden flex items-center justify-center"
      style={{ willChange: "opacity" }}
    >
      {/* Fallback background shown before video loads */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-0 transition-opacity duration-500"
        style={{ opacity: videoLoaded ? 0 : 1 }}
      >
        {/* MAAC Logo Mark */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E31837] to-[#B8132C] flex items-center justify-center shadow-lg shadow-[#E31837]/30">
            <svg viewBox="0 0 48 48" className="w-7 h-7 text-white" fill="currentColor">
              <path d="M6 6v36l8-4V18l10 14 10-14v20l8 4V6L24 30 6 6z" />
            </svg>
          </div>
          <span className="text-white font-display font-bold text-2xl tracking-tight">MAAC</span>
        </div>
        <p className="text-[#E31837] text-[10px] font-medium tracking-[0.3em] uppercase animate-pulse">
          Loading
        </p>
      </div>

      {/* Intro Video — full screen */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-contain z-10"
        style={{
          opacity: videoLoaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setVideoLoaded(true)}
      >
        {/* WebM first for faster decode on Chrome/Firefox */}
        <source src="/intro.webm" type="video/webm" />
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Progress bar — bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-[3px] bg-white/5">
        <div
          ref={progressBarRef}
          className="h-full bg-[#E31837] rounded-full"
          style={{ width: "0%", transition: "width 0.15s linear" }}
        />
      </div>
    </div>
  );
}
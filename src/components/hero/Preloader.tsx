"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const [progress, setProgress] = useState(0);

  const triggerExit = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    console.log("Preloader: triggerExit initiated!");

    // Native CSS Transition instead of GSAP (Removes dependency instability)
    if (progressBarRef.current) {
      progressBarRef.current.style.transition = 'width 0.3s ease-out';
      progressBarRef.current.style.width = '100%';
    }

    // Wait exactly 300ms for progress bar to fake 100%, then fade out natively
    setTimeout(() => {
      if (wrapperRef.current) {
        wrapperRef.current.style.transition = 'opacity 0.8s ease-in-out';
        wrapperRef.current.style.opacity = '0';
        wrapperRef.current.style.pointerEvents = 'none';
        
        // Notify parent 800ms later when fade-out is complete
        setTimeout(() => {
          onComplete();
        }, 800);
      } else {
        onComplete();
      }
    }, 300);

  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    console.log("Preloader: Component mounted. Video Element:", video);
    
    // Safety 1: Global fallback if everything hangs
    const fallback = setTimeout(() => {
      console.log("Preloader: 15s global fallback hit!");
      triggerExit();
    }, 15000);

    // Safety 2: Missing/corrupted file fast-abort
    // If the video hasn't fired onLoadedData within 2.5 seconds, it's dead. Bypass instantly.
    const fastAbortTimeout = setTimeout(() => {
      if (video && video.readyState === 0) {
        console.warn("Preloader: Video failed to load first frame (readyState 0) within 2.5s. Fast bypassing black screen.");
        triggerExit();
      }
    }, 2500);

    if (video) {
      // Clear fast abort if data loads
      const handleDataLoaded = () => {
        clearTimeout(fastAbortTimeout);
        console.log("Preloader: Video data successfully loaded!");
        // Fade the video in nicely once frames exist to avoid the harsh black wall
        if (videoRef.current) {
          videoRef.current.style.opacity = '1';
        }
      };
      video.addEventListener("loadeddata", handleDataLoaded);

      // Standard Play initialization
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Preloader: Video autoplay prevented or delayed natively:", err);
        });
      }

      // Update progress bar based on video time
      const updateProgress = () => {
        if (video.duration) {
          const pct = (video.currentTime / video.duration) * 100;
          setProgress(pct);
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${pct}%`;
          }
        }
      };

      video.addEventListener("timeupdate", updateProgress);

      return () => {
        clearTimeout(fallback);
        clearTimeout(fastAbortTimeout);
        video.removeEventListener("timeupdate", updateProgress);
        video.removeEventListener("loadeddata", handleDataLoaded);
      };
    }

    return () => {
      clearTimeout(fallback);
      clearTimeout(fastAbortTimeout);
    }
  }, [triggerExit]);

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-[9999] bg-[#0C0C0C] overflow-hidden pointer-events-auto flex items-center justify-center transition-opacity duration-800">
      {/* Fallback Text in case video refuses to load */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <span className="text-[#E31837] text-[10px] tracking-[0.3em] uppercase font-sans animate-pulse">Connecting to MAAC...</span>
      </div>

      {/* Full screen intro video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-contain z-10 opacity-0 transition-opacity duration-700"
        autoPlay
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        onEnded={() => {
          console.log("Preloader: Video natural onEnded fired!");
          triggerExit();
        }}
        onError={(e) => {
          console.error("Preloader: Video loading ERROR natively fired!", e);
        }}
      >
        {/* Prioritize webm for significantly faster loading on Chrome without black frames */}
        <source src="/intro.webm" type="video/webm" />
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Thin red loading bar — bottom only, no text */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-[4px] bg-white/10">
        <div
          ref={progressBarRef}
          className="h-full bg-[#E31837]"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        />
      </div>
    </div>
  );
}

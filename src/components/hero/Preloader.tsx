"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showSkip, setShowSkip] = useState(false);
  const completedRef = useRef(false);

  const triggerExit = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    const tl = gsap.timeline({
      onComplete,
      ease: "expo.inOut",
    });
    tl.to(".pl-curtain-top", {
      yPercent: -100,
      duration: 0.45,
      force3D: true,
    }).to(".pl-curtain-bottom", {
      yPercent: 100,
      duration: 0.45,
      force3D: true,
    }, "<");
  }, [onComplete]);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 5000);
    const fallbackTimer = setTimeout(triggerExit, 12000);
    return () => {
      clearTimeout(skipTimer);
      clearTimeout(fallbackTimer);
    };
  }, [triggerExit]);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[9999] bg-[#080808] overflow-hidden"
    >
      <div className="pl-curtain-top absolute inset-x-0 top-0 h-1/2 bg-[#080808] z-20 origin-top will-change-transform" />
      <div className="pl-curtain-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#080808] z-20 origin-bottom will-change-transform" />

      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-10"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={triggerExit}
        onError={triggerExit}
      >
        <source src="/intro.webm" type="video/webm" />
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {showSkip && (
        <button
          onClick={triggerExit}
          className="absolute bottom-8 right-8 z-30 px-4 py-1.5 text-xs text-white/60 bg-black/40 border border-white/10 rounded-full backdrop-blur-sm hover:text-white transition-colors"
          aria-label="Skip intro"
        >
          Skip →
        </button>
      )}
    </div>
  );
}

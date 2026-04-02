"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Count animation: 0 → 100 in ~1.6 seconds
    let frame: number;
    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // expo ease out
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setCount(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // Curtain exit timeline
    const tl = gsap.timeline({
      delay: 1.8,
      onComplete,
    });

    // Split curtains: top slides up, bottom slides down
    tl.to(".pl__curtain-top", {
      yPercent: -100,
      duration: 1.1,
      ease: "expo.inOut",
    }).to(".pl__curtain-bottom", {
      yPercent: 100,
      duration: 1.1,
      ease: "expo.inOut",
    }, "<")
    // Fade out the counter UI slightly before curtains leave
    .to(".pl__content", {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "expo.in",
    }, "<0.1");

    return () => {
      cancelAnimationFrame(frame);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[#080808]"
      aria-label="Loading"
      role="status"
    >
      {/* Top curtain panel */}
      <div className="pl__curtain-top absolute inset-x-0 top-0 h-1/2 bg-[#080808] z-20 origin-bottom" />

      {/* Bottom curtain panel */}
      <div className="pl__curtain-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#080808] z-20 origin-top" />

      {/* Center content */}
      <div className="pl__content relative z-10 flex flex-col items-center select-none">
        {/* Logo mark */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E31837] flex items-center justify-center">
            <span className="text-white font-bold text-xl font-display">M</span>
          </div>
          <span className="text-[#f5f0e8] font-display font-bold text-2xl tracking-wide">MAAC</span>
        </div>

        {/* Counter */}
        <div className="flex items-baseline gap-1 mb-4">
          <span className="font-display text-[clamp(4rem,12vw,8rem)] font-bold text-[#f5f0e8] tabular-nums leading-none">
            {String(count).padStart(3, "0")}
          </span>
          <span className="font-display text-2xl text-[#6b6b6b] mb-2">%</span>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-px bg-[#1a1a1a] overflow-hidden">
          <div
            className="h-full bg-[#E31837] origin-left"
            style={{
              transform: `scaleX(${count / 100})`,
              transition: "transform 0.08s linear",
            }}
          />
        </div>
      </div>

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-30 opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px",
        }}
      />
    </div>
  );
}
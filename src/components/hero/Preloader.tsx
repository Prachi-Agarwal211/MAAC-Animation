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

    // Count 0 -> 100 in 1s
    let frame: number;
    const start = performance.now();
    const duration = 1000;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setCount(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // 300ms curtain exit after 1.1s
    const tl = gsap.timeline({
      delay: 1.2,
      onComplete,
    });

    tl.to(".pl__curtain-top", {
      yPercent: -100,
      duration: 0.3,
      ease: "expo.inOut",
    })
      .to(
        ".pl__curtain-bottom",
        { yPercent: 100, duration: 0.3, ease: "expo.inOut" },
        "<"
      )
      .to(
        ".pl__content",
        { opacity: 0, y: -10, duration: 0.15, ease: "expo.in" },
        "<0.05"
      );

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
      <div className="pl__curtain-top absolute inset-x-0 top-0 h-1/2 bg-[#080808] z-20 origin-bottom" />
      <div className="pl__curtain-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#080808] z-20 origin-top" />

      <div className="pl__content relative z-10 flex flex-col items-center select-none">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E31837] flex items-center justify-center">
            <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
              <path d="M2 2L8 24H12L18 2M5 14H17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-[#F0EBE1] font-display font-bold text-2xl tracking-wide">
            MAAC
          </span>
        </div>

        <div className="flex items-baseline gap-1 mb-4">
          <span className="font-display text-[clamp(4rem,12vw,8rem)] font-bold text-[#F0EBE1] tabular-nums leading-none">
            {String(count).padStart(3, "0")}
          </span>
          <span className="font-display text-2xl text-[#6B6560] mb-2">%</span>
        </div>

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

      <div
        className="absolute inset-0 pointer-events-none z-30 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px",
        }}
      />
    </div>
  );
}

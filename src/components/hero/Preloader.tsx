"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const componentRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Count animation 0-100
      const duration = 1.8;
      const startTime = Date.now();
      
      const animateCount = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing: expo.inOut
        const eased = progress < 0.5 
          ? Math.pow(2, 20 * progress - 10) / 2
          : (2 - Math.pow(2, -20 * progress + 10)) / 2;
        
        setCount(Math.floor(eased * 100));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      
      animateCount();

      // Curtain wipe timeline
      const tl = gsap.timeline({
        onComplete,
        delay: 0.3,
      });

      // Top curtain rises
      tl.to(".preloader__curtain--top", {
        height: "0%",
        duration: 1.2,
        ease: "expo.inOut",
      });

      // Bottom curtain falls
      tl.to(".preloader__curtain--bottom", {
        height: "0%",
        duration: 1.2,
        ease: "expo.inOut",
      }, 0);

      // Fade out preloader content
      tl.to(".preloader__content", {
        opacity: 0,
        y: -40,
        duration: 0.8,
        ease: "expo.in",
      }, 0);

      // Logo scatter effect
      tl.fromTo(".preloader__logo",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out" },
        "-=1"
      );

    }, componentRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={componentRef}
      className="preloader fixed inset-0 z-[200] flex items-center justify-center bg-tiger-black"
    >
      {/* Top curtain */}
      <div 
        ref={curtainRef}
        className="preloader__curtain preloader__curtain--top absolute inset-x-0 top-0 h-full bg-tiger-black z-20"
      />
      
      {/* Bottom curtain */}
      <div className="preloader__curtain preloader__curtain--bottom absolute inset-x-0 bottom-0 h-full bg-tiger-black z-20" />
      
      {/* Content */}
      <div className="preloader__content relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="preloader__logo mb-8">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-tiger-text tracking-tight">
            MAAC
          </h1>
        </div>
        
        {/* Counter */}
        <div className="flex items-baseline gap-2">
          <span className="font-display text-7xl md:text-9xl font-bold text-tiger-text tabular-nums">
            {String(count).padStart(3, "0")}
          </span>
          <span className="font-body text-lg text-tiger-muted">%</span>
        </div>
        
        {/* Progress bar */}
        <div className="preloader__bar mt-6 h-px w-48 bg-tiger-surface overflow-hidden">
          <div 
            className="h-full bg-tiger-accent origin-left"
            style={{ 
              transform: `scaleX(${count / 100})`,
              transition: 'transform 0.1s linear'
            }}
          />
        </div>
      </div>
      
      {/* Grain overlay */}
      <div className="preloader__grain pointer-events-none fixed inset-0 opacity-[0.04] mix-blend-overlay z-30">
        <svg className="absolute w-0 h-0">
          <filter id="preloader-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px",
          }}
        />
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

const partners = [
  "NILEE GAMES",
  "MUGAFI",
  "AUTODESK",
  "CANON",
  "COPPERSEED",
  "PIXEL RATIO",
  "CEDGE",
  "PHYSICS WALLAH",
  "ZEBU",
  "RESONANCE",
  "CIMPRESS",
  "PHANTOMFX",
  "TECH MAHINDRA",
  "POSTIFY",
  "LFX STUDIOS",
];

// Create 4 copies for seamless loop
const extendedPartners = [...partners, ...partners, ...partners, ...partners];
const reversedPartners = [...extendedPartners].reverse();

export default function IndustryPartners() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Setup Row 1: Scroll left
    if (row1Ref.current) {
      const row1 = row1Ref.current;
      const items = Array.from(row1.children) as HTMLElement[];
      
      let singleSetWidth = 0;
      for (let i = 0; i < partners.length && i < items.length; i++) {
        singleSetWidth += items[i].offsetWidth + 32; // 32px gap
      }

      const duration = singleSetWidth / 80; // 80px per second

      gsap.to(row1, {
        x: -singleSetWidth,
        duration,
        ease: "none",
        repeat: -1,
        onRepeat: () => { gsap.set(row1, { x: 0 }); }
      });
    }

    // Setup Row 2: Scroll right
    if (row2Ref.current) {
      const row2 = row2Ref.current;
      const items = Array.from(row2.children) as HTMLElement[];
      
      let singleSetWidth = 0;
      for (let i = 0; i < partners.length && i < items.length; i++) {
        singleSetWidth += items[i].offsetWidth + 32;
      }

      const duration = singleSetWidth / 80;

      gsap.set(row2, { x: -singleSetWidth });
      gsap.to(row2, {
        x: 0,
        duration,
        ease: "none",
        repeat: -1,
        onRepeat: () => { gsap.set(row2, { x: -singleSetWidth }); }
      });
    }

    // Header animation
    gsap.fromTo(".ip-header > *",
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.1, 
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative bg-transparent py-12 md:py-20 overflow-hidden border-y border-yellow-600/30"
    >
      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="ip-header text-center mb-12">
          <h2 className="font-display font-black text-[clamp(1.5rem,3.5vw,2.5rem)] text-white leading-[0.9] tracking-tighter uppercase">
            Hiring <span className="text-yellow-500 italic">Ecosystem</span>
          </h2>
        </div>

        {/* Dual-Row Scrolling */}
        <div className="relative space-y-6">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />

          {/* Row 1 - Scrolls Left */}
          <div 
            ref={row1Ref}
            className="flex items-center gap-8 w-max"
            onMouseEnter={(e) => gsap.to(e.currentTarget, { timeScale: 0.2, duration: 0.3 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { timeScale: 1, duration: 0.3 })}
          >
            {extendedPartners.map((partner, i) => (
              <div key={`${partner}-${i}`} className="shrink-0 group">
                <div className="w-48 h-20 md:w-56 md:h-24 bg-white/[0.03] backdrop-blur-xl border border-white/10 flex items-center justify-center px-6 transition-all duration-300 hover:border-yellow-400/50 hover:bg-white/[0.08] hover:scale-105">
                  <span className="text-xs md:text-sm text-white font-bold uppercase tracking-wider text-center">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 - Scrolls Right */}
          <div 
            ref={row2Ref}
            className="flex items-center gap-8 w-max"
            onMouseEnter={(e) => gsap.to(e.currentTarget, { timeScale: 0.2, duration: 0.3 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { timeScale: 1, duration: 0.3 })}
          >
            {reversedPartners.map((partner, i) => (
              <div key={`${partner}-${i}`} className="shrink-0 group">
                <div className="w-48 h-20 md:w-56 md:h-24 bg-white/[0.03] backdrop-blur-xl border border-white/10 flex items-center justify-center px-6 transition-all duration-300 hover:border-yellow-400/50 hover:bg-white/[0.08] hover:scale-105">
                  <span className="text-xs md:text-sm text-white font-bold uppercase tracking-wider text-center">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

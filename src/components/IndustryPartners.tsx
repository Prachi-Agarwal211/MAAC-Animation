"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  "Nilee Games", "Mugafi", "Autodesk", "Canon", "Copperseed Games",
  "Pixel:Ratio", "Cedge Productions", "Physics Wallah", "Zebu",
  "Resonance Digital", "Cimpress", "PhantomFX", "Tech Mahindra", "Postify", "LFX",
];

export default function IndustryPartners() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".partners-heading", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const row1 = [...partners, ...partners];
  const row2 = [...partners.slice().reverse(), ...partners.slice().reverse()];

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Dark Theme background */}
      <div className="bg-[#0C0C0C]/50 border-y border-white/5 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Header */}
          <div className="partners-heading text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#E31837]/10 text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase rounded-full mb-4">
              Knowledge Partners
            </span>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,3rem)] text-[#F0EBE1] leading-[1.05] tracking-tight">
              Trusted by India&apos;s Leading Studios
            </h2>
          </div>

          {/* Marquee Row 1 — left to right */}
          <div className="overflow-hidden mb-4">
            <div className="animate-marquee flex items-center gap-4">
              {row1.map((partner, i) => (
                <div
                  key={`${partner}-${i}`}
                  className="flex-shrink-0 w-[140px] h-[70px] bg-white/5 rounded-lg border border-white/10 flex items-center justify-center hover:shadow-lg hover:border-[#E31837]/50 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300 cursor-default"
                >
                  <span className="text-xs text-white/80 font-medium text-center px-2">{partner}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 — right to left */}
          <div className="overflow-hidden">
            <div className="animate-marquee-reverse flex items-center gap-4">
              {row2.map((partner, i) => (
                <div
                  key={`${partner}-r-${i}`}
                  className="flex-shrink-0 w-[140px] h-[70px] bg-white/5 rounded-lg border border-white/10 flex items-center justify-center hover:shadow-lg hover:border-[#E31837]/50 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300 cursor-default"
                >
                  <span className="text-xs text-white/80 font-medium text-center px-2">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

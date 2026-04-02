"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { awardsData } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function Awards() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".aw-heading", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.fromTo(".aw-card", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".aw-grid", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Angled divider transition from dark to cream (replaces section-clip-light to fix shadow clipping) */}
      <div className="relative h-16 overflow-hidden -mb-1" style={{ background: "#0C0C0C" }}>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "100%",
          background: "#F5F0E8",
          clipPath: "polygon(0 100%, 100% 0%, 100% 100%)",
        }} />
      </div>

      {/* Cream section (no clip-path — preserves card shadows) */}
      <div className="bg-[#F5F0E8] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="aw-heading text-center mb-16">
            <p className="text-[#E31837] text-xs font-semibold tracking-[0.12em] uppercase mb-4">Recognition</p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#0C0C0C] leading-[1.08] tracking-tight mb-4 pb-1">
              Awards & <span className="text-[#E31837]">Recognition</span>
            </h2>
            <p className="text-[#4A4540] text-lg max-w-2xl mx-auto">
              Celebrated by industry leaders for our commitment to excellence
            </p>
          </div>

          {/* Magazine-style grid */}
          <div className="aw-grid grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {awardsData.map((award, index) => (
              <div key={index} className="aw-card relative bg-white rounded-2xl p-8 overflow-hidden group hover:shadow-xl transition-shadow duration-500">
                {/* Large year watermark */}
                <span className="absolute -top-4 -right-4 font-display font-extrabold text-[6rem] md:text-[8rem] leading-none text-[#E31837]/[0.08] pointer-events-none select-none">
                  {award.year}
                </span>

                {/* SVG badge */}
                <div className="w-12 h-12 rounded-full bg-[#E31837]/10 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31837" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>

                <p className="text-[#7A7570] text-xs font-semibold tracking-[0.12em] uppercase mb-2">{award.year}</p>
                <h3 className="font-display font-bold text-xl md:text-2xl text-[#0C0C0C] mb-1 relative z-10">
                  {award.name}
                </h3>
                <p className="text-[#7A7570] text-sm">{award.org}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

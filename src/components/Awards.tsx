"use client";

import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { awardsData } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

function Awards() {
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
      {/* REPLACE the cream section with: */}
      <div className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, #0C0C0C 0%, #1C1208 50%, #0C0C0C 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="aw-heading text-center mb-16">
            <p className="text-[#C4A882] text-xs font-semibold tracking-[0.12em] uppercase mb-4">Recognition</p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#F0EBE1] leading-[1.08] tracking-tight mb-4 pb-1">
              Awards & <span className="text-[#E31837]">Recognition</span>
            </h2>
            <p className="text-[#A8A29C] text-lg max-w-2xl mx-auto">
              Celebrated by industry leaders for our commitment to excellence
            </p>
          </div>

          {/* Cards - dark version */}
          <div className="aw-grid grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {awardsData.map((award, index) => (
              <div
                key={index}
                className="aw-card relative rounded-2xl p-8 overflow-hidden group"
                style={{
                  background: "rgba(28, 20, 16, 0.6)",
                  border: "1px solid rgba(196, 168, 130, 0.12)",
                  backdropFilter: "blur(10px)"
                }}
              >
                {/* Year watermark */}
                <span className="absolute -top-4 -right-4 font-display font-extrabold text-[6rem] md:text-[8rem] leading-none pointer-events-none select-none" style={{ color: "rgba(196,168,130,0.06)" }}>
                  {award.year}
                </span>

                {/* Badge */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(196,168,130,0.1)", border: "1px solid rgba(196,168,130,0.2)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>

                <p className="text-[#8B7355] text-xs font-semibold tracking-[0.12em] uppercase mb-2">{award.year}</p>
                <h3 className="font-display font-bold text-xl md:text-2xl text-[#E8DCC8] mb-1 relative z-10">{award.name}</h3>
                <p className="text-[#A8A29C] text-sm">{award.org}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Awards);

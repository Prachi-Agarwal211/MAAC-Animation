"use client";

import { useEffect, useRef, memo } from "react";
import { gsap } from "@/lib/gsap";
import { shouldAnimate } from "@/lib/animationUtils";
import { placementCompanies } from "@/data/siteData";

function Placements() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".pl-heading", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const row1 = [...placementCompanies, ...placementCompanies];
  const row2 = [...placementCompanies.slice(7).reverse(), ...placementCompanies.slice(7).reverse()];

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #0C0C0C 0%, #120E0A 50%, #0C0C0C 100%)" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pl-heading text-center mb-16">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase mb-4">Career Support</p>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#F0EBE1] leading-[1.05] tracking-tight mb-4">
            Our Alumni Work At The <span className="gradient-text-warm">Best</span>
          </h2>
          <p className="text-[#A8A29C] text-lg max-w-2xl mx-auto">
            Our students are hired by the world&apos;s top studios
          </p>
        </div>
      </div>

      {/* Red Stats Ticker Bar */}
      <div className="stats-ticker-bar py-3 mb-12">
        <div className="animate-ticker flex items-center gap-12 whitespace-nowrap">
          {["95% Placement Rate", "500+ Partner Companies", "₹15L Highest Package", "NSDC Certified", "30+ Years Legacy"].map((item, i) => (
            <span key={i} className="text-white font-medium text-sm flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              {item}
            </span>
          ))}
          {["95% Placement Rate", "500+ Partner Companies", "₹15L Highest Package", "NSDC Certified", "30+ Years Legacy"].map((item, i) => (
            <span key={`d-${i}`} className="text-white font-medium text-sm flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Marquee Row 1 */}
        <div className="overflow-hidden mb-4">
          <div className="animate-marquee flex items-center gap-4">
            {row1.map((company, i) => (
              <div key={`${company}-${i}`} className="flex-shrink-0 bg-white/[0.03] border border-white/5 rounded-xl px-6 py-4 flex items-center gap-3 hover:bg-white/[0.06] hover:border-[#C4A882]/20 transition-all duration-300">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,168,130,0.1)", border: "1px solid rgba(196,168,130,0.15)" }}>
                  <span className="text-xs font-bold text-[#C4A882]">{company.charAt(0)}</span>
                </div>
                <span className="text-[#A8A29C] text-sm font-medium whitespace-nowrap">{company}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 — reverse */}
        <div className="overflow-hidden">
          <div className="animate-marquee-reverse flex items-center gap-4">
            {row2.map((company, i) => (
              <div key={`${company}-r-${i}`} className="flex-shrink-0 bg-white/[0.03] border border-white/5 rounded-xl px-6 py-4 flex items-center gap-3 hover:bg-white/[0.06] hover:border-[#C4A882]/20 transition-all duration-300">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,168,130,0.1)", border: "1px solid rgba(196,168,130,0.15)" }}>
                  <span className="text-xs font-bold text-[#C4A882]">{company.charAt(0)}</span>
                </div>
                <span className="text-[#A8A29C] text-sm font-medium whitespace-nowrap">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Placements);

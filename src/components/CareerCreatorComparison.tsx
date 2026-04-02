"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function CareerCreatorComparison() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ccc-header", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".ccc-section", start: "top 75%" },
      });

      gsap.fromTo(".ccc-card-career", { opacity: 0, y: 80, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".ccc-cards", start: "top 80%" },
      });
      gsap.fromTo(".ccc-card-creator", { opacity: 0, y: 80, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 1, ease: "expo.out", delay: 0.2,
        scrollTrigger: { trigger: ".ccc-cards", start: "top 80%" },
      });

      gsap.fromTo(".ccc-bullet", { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "expo.out",
        scrollTrigger: { trigger: ".ccc-cards", start: "top 75%" },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="ccc-section relative bg-[#0C0C0C] py-20 md:py-28 overflow-hidden">
      {/* Atmospheric blob */}
      <div className="atmosphere-blob blob-red" style={{ top: "-100px", right: "-100px" }} />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 z-10">
        {/* Header — Animated Split */}
        <div className="ccc-header mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-8 md:gap-16 mb-8">
            <span className="font-display font-extrabold text-[clamp(2rem,5vw,5rem)] text-[#E31837]/20 tracking-tight" style={{ writingMode: "vertical-rl" }}>
              CAREERX
            </span>
            <div className="w-px h-32 md:h-48 bg-gradient-to-b from-transparent via-[#E31837]/50 to-transparent" />
            <span className="font-display font-extrabold text-[clamp(2rem,5vw,5rem)] text-[#FF6B35]/20 tracking-tight" style={{ writingMode: "vertical-rl" }}>
              CREATORX
            </span>
          </div>
          <h2 className="text-center font-display font-bold text-[clamp(1.5rem,3vw,2.5rem)] text-[#F0EBE1] leading-tight mb-4">
            Two Paths, One Goal: <span className="gradient-text">Your Success</span>
          </h2>
          <p className="text-center text-[#A8A29C] text-base max-w-3xl mx-auto leading-relaxed">
            CareerX and CreatorX are industry-led learning pathways to equip students with future-ready skills in creative and digital media.
          </p>
        </div>

        {/* Cards */}
        <div className="ccc-cards grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* CareerX Card */}
          <div className="ccc-card-career group relative rounded-2xl p-8 md:p-10 overflow-hidden border-l-[3px] border-[#E31837] bg-[#E31837]/5">
            <div className="relative z-10">
              <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
                <span className="gradient-text">CAREER</span><span className="text-[#FF6B35]">X</span>
              </h3>
              <p className="text-[#A8A29C] text-sm md:text-base font-medium mb-6 leading-relaxed">
                Industry-led, Studio-aligned Learning Program
              </p>
              <ul className="space-y-3 mb-6">
                {["Industry-academia learning", "Studio-led delivery", "Live case studies", "End-to-end production workflow"].map((item) => (
                  <li key={item} className="ccc-bullet flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#E31837] mt-2 flex-shrink-0" />
                    <span className="text-[#A8A29C] text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs text-[#6B6560] bg-white/5 border border-white/10 px-3 py-1 rounded-full">DNEG</span>
                <span className="text-xs text-[#6B6560] bg-white/5 border border-white/10 px-3 py-1 rounded-full">Prime Focus</span>
                <span className="text-xs text-[#6B6560] bg-white/5 border border-white/10 px-3 py-1 rounded-full">MPC</span>
              </div>
              <p className="text-[#6B6560] text-xs mb-4">₹4L–₹15L avg. package</p>
              <Link href="/courses" className="inline-flex items-center gap-2 text-[#E31837] text-sm font-semibold group/link">
                Explore CareerX
                <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </div>
          </div>

          {/* CreatorX Card */}
          <div className="ccc-card-creator group relative rounded-2xl p-8 md:p-10 overflow-hidden border-l-[3px] border-[#FF6B35] bg-[#FF6B35]/5">
            <div className="relative z-10">
              <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
                <span className="text-[#FF6B35]">CREATOR</span><span className="text-[#FF8C5A]">X</span>
              </h3>
              <p className="text-[#A8A29C] text-sm md:text-base font-medium mb-6 leading-relaxed">
                Create. Collaborate. Grow.
              </p>
              <ul className="space-y-3 mb-6">
                {["Entrepreneurship readiness", "Gig economy & freelance prep", "Project & client management", "IP creation & monetisation", "Training from industry experts"].map((item) => (
                  <li key={item} className="ccc-bullet flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B35] mt-2 flex-shrink-0" />
                    <span className="text-[#A8A29C] text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#6B6560] text-xs mb-4">For freelancers & independent creators</p>
              <Link href="/courses" className="inline-flex items-center gap-2 text-[#FF6B35] text-sm font-semibold group/link">
                Explore CreatorX
                <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

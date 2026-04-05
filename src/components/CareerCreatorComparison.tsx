"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { shouldAnimate } from "@/lib/animationUtils";
import Link from "next/link";

export default function CareerCreatorComparison() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".ccc-left-panel", { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(".ccc-right-panel", { opacity: 0, x: 60 }, {
        opacity: 1, x: 0, duration: 1, ease: "expo.out", delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(".ccc-bullet", { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="ccc-section relative overflow-hidden">


      <div className="flex flex-col lg:flex-row">
        {/* LEFT HALF — CareerX */}
        <div className="ccc-left-panel flex-1 relative overflow-hidden group" style={{ background: "linear-gradient(135deg, #0C0C0C 0%, #1a0000 100%)" }}>
          <div className="absolute inset-0 bg-[#E31837]/0 group-hover:bg-[#E31837]/5 transition-colors duration-700" />
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <p className="text-[#E31837] text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase mb-6">PATHWAY 01</p>
            <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,4rem)] leading-[1.08] tracking-tight mb-2">
              <span className="text-[#F0EBE1]">CAREER</span><span className="gradient-text">X</span>
            </h2>
            <p className="text-[#A8A29C] text-base font-medium mb-8 leading-relaxed">
              Industry-led, Studio-aligned Learning Program
            </p>

            <ul className="space-y-4 mb-8">
              {["Industry-academia learning", "Studio-led delivery", "Live case studies", "End-to-end production workflow"].map((item) => (
                <li key={item} className="ccc-bullet flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-0.5 bg-[#E31837] mt-2.5" />
                  <span className="text-[#A8A29C] text-sm md:text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-[10px] text-[#6B6560] bg-white/5 border border-white/10 px-3 py-1 rounded-full">DNEG</span>
              <span className="text-[10px] text-[#6B6560] bg-white/5 border border-white/10 px-3 py-1 rounded-full">Prime Focus</span>
              <span className="text-[10px] text-[#6B6560] bg-white/5 border border-white/10 px-3 py-1 rounded-full">MPC</span>
            </div>
            <p className="text-[#6B6560] text-xs mb-6">₹4L–₹15L avg. package</p>

            <Link href="/courses" className="inline-flex items-center gap-2 text-[#E31837] text-sm font-semibold group/link hover:gap-3 transition-all duration-300">
              Explore CareerX
              <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-[#E31837]/40 to-transparent" />

        {/* RIGHT HALF — CreatorX */}
        <div className="ccc-right-panel flex-1 relative overflow-hidden group" style={{ background: "linear-gradient(135deg, #0C0C0C 0%, #100808 100%)" }}>
          <div className="absolute inset-0 bg-[#FF6B35]/0 group-hover:bg-[#FF6B35]/5 transition-colors duration-700" />
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <p className="text-[#FF6B35] text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase mb-6">PATHWAY 02</p>
            <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,4rem)] leading-[1.08] tracking-tight mb-2">
              <span className="text-[#F0EBE1]">CREATOR</span><span className="text-[#FF6B35]">X</span>
            </h2>
            <p className="text-[#A8A29C] text-base font-medium mb-8 leading-relaxed">
              Create. Collaborate. Grow.
            </p>

            <ul className="space-y-4 mb-8">
              {["Entrepreneurship readiness", "Gig economy & freelance prep", "Project & client management", "IP creation & monetisation", "Training from industry experts"].map((item) => (
                <li key={item} className="ccc-bullet flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-0.5 bg-[#FF6B35] mt-2.5" />
                  <span className="text-[#A8A29C] text-sm md:text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-[#6B6560] text-xs mb-6">For freelancers & independent creators</p>

            <Link href="/courses" className="inline-flex items-center gap-2 text-[#FF6B35] text-sm font-semibold group/link hover:gap-3 transition-all duration-300">
              Explore CreatorX
              <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
        </div>
      </div>


    </div>
  );
}

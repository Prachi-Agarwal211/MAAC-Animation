"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import Link from "next/link";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";

export default function CareerCreatorComparison() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".ccc-panel", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "expo.out" });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-[#080808]">
      <div className="flex flex-col lg:flex-row min-h-[80svh]">

        {/* LEFT: CAREER X */}
        <div className="ccc-panel group relative flex-1 overflow-hidden transition-all duration-700 ease-expo-out lg:hover:flex-[1.5]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0000] to-[#080808]" />
          <div className="absolute inset-0 bg-[#E31837]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#E31837]/10 flex items-center justify-center border border-[#E31837]/30">
                  <Rocket size={18} className="text-[#E31837]" />
                </div>
                <span className="text-[#E31837] text-[10px] font-bold tracking-[0.3em] uppercase">Pathway 01</span>
              </div>

              <h2 className="font-display font-black text-[clamp(1.5rem,3.5vw,2.5rem)] text-white leading-[0.85] tracking-tighter mb-6">
                CAREER<span className="gradient-text italic">X</span>
              </h2>

              <p className="text-[#A8A29C] text-base md:text-lg font-medium max-w-md leading-relaxed mb-8 border-l-2 border-[#E31837] pl-4">
                Studio-aligned programs designed for those seeking high-impact careers in global production houses.
              </p>

              <ul className="space-y-4 mb-8">
                {["Industry-academia learning", "Studio-led delivery", "Live case studies", "End-to-end production workflow"].map((item) => (
                  <li key={item} className="text-white/60 text-sm font-bold uppercase tracking-wider pl-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {["DNEG", "MPC", "Framestore", "Prime Focus"].map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-full glass border border-white/5 text-[9px] font-bold tracking-widest text-white/40">{s}</span>
                ))}
              </div>
              <Link href="/courses" className="btn btn-primary px-8 py-4 rounded-2xl text-xs font-bold tracking-[0.3em] group/btn">
                Explore CareerX
                <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT: CREATOR X */}
        <div className="ccc-panel group relative flex-1 overflow-hidden transition-all duration-700 ease-expo-out lg:hover:flex-[1.5] border-t lg:border-t-0 lg:border-l border-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c0805] to-[#080808]" />
          <div className="absolute inset-0 bg-[#FF6B35]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center border border-[#FF6B35]/30">
                  <Sparkles size={18} className="text-[#FF6B35]" />
                </div>
                <span className="text-[#FF6B35] text-[10px] font-bold tracking-[0.3em] uppercase">Pathway 02</span>
              </div>

              <h2 className="font-display font-black text-[clamp(1.5rem,3.5vw,2.5rem)] text-white leading-[0.85] tracking-tighter mb-6">
                CREATOR<span className="text-[#FF6B35] italic">X</span>
              </h2>

              <p className="text-[#A8A29C] text-base md:text-lg font-medium max-w-md leading-relaxed mb-8 border-l-2 border-[#FF6B35] pl-4">
                Empowering independent artists to build their own brand, manage clients, and master the gig economy.
              </p>

              <ul className="space-y-4 mb-8">
                {["Entrepreneurship readiness", "Freelance strategy", "IP creation & growth", "Client management", "Monetization"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/60 text-sm font-bold uppercase tracking-wider">
                    <div className="w-1 h-1 rounded-full bg-[#FF6B35] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-[#6B6560] text-[9px] font-bold uppercase tracking-[0.2em]">Ideal for Independent Creators & Freelancers</p>
              <Link href="/courses" className="flex items-center gap-4 text-white text-xs font-bold tracking-[0.3em] uppercase group/link">
                Launch CreatorX
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/link:bg-[#FF6B35] group-hover/link:border-[#FF6B35] transition-all duration-500">
                  <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                </div>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

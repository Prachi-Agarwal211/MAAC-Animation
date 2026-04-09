"use client";

import { useRef, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { placementCompanies } from "@/data/siteData";
import { Globe, Star, ShieldCheck, Briefcase } from "lucide-react";

// Professional Studio Wordmark Styles
const studioStyles: Record<string, string> = {
  "DNEG": "font-display font-black tracking-tighter",
  "Prime Focus": "font-sans font-black uppercase tracking-widest",
  "Redchillies VFX": "font-serif italic font-bold",
  "MPC": "font-sans font-bold uppercase tracking-[0.2em]",
  "Technicolor": "font-serif font-medium uppercase tracking-wide",
  "Method Studios": "font-display font-bold italic",
  "Ubisoft": "font-sans font-black tracking-tight uppercase",
  "EA Games": "font-display font-black uppercase",
  "Rockstar Games": "font-mono font-bold uppercase tracking-tighter",
  "Makuta VFX": "font-serif italic",
  "DQ Entertainment": "font-sans font-medium uppercase",
  "Green Gold Animation": "font-display font-bold",
  "Reliance MediaWorks": "font-sans font-bold uppercase tracking-widest",
  "Xentrix Studios": "font-mono font-black italic",
};

function Placements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".pl-header > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "expo.out" })
      .fromTo(".placement-card", { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "expo.out" }, "-=0.6");

    // Interactive Tilt for Desktop
    const cards = gsap.utils.toArray(".placement-card");
    cards.forEach((card: any) => {
      card.addEventListener("mousemove", (e: MouseEvent) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - (left + width / 2)) / 15;
        const y = (e.clientY - (top + height / 2)) / 15;
        gsap.to(card, { rotateY: x, rotateX: -y, duration: 0.5, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power2.out" });
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-[#080808] py-24 md:py-40 overflow-hidden border-t border-white/5 perspective-1000">
      <div className="atmosphere-blob blob-red top-0 right-0 opacity-5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-24 md:mb-32">
        <div className="pl-header text-center">
          <p className="text-[#E31837] text-[10px] font-bold tracking-[0.4em] uppercase mb-6 flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#E31837]" />
            Career Trajectory
            <span className="w-6 h-[1px] bg-[#E31837]" />
          </p>
          <h2 className="font-display font-black text-[clamp(2.2rem,5vw,4.5rem)] text-white leading-[0.95] tracking-tight mb-8 uppercase">
            The Alumni <span className="gradient-text italic">Network</span>
          </h2>
          <p className="text-[#A8A29C] text-lg md:text-xl max-w-2xl mx-auto italic">
            Engineering success at the world&apos;s most prestigious production houses.
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
          {placementCompanies.map((company, i) => (
            <div 
              key={i} 
              className="placement-card group relative aspect-[3/2] rounded-[32px] glass border border-white/5 flex items-center justify-center transition-all duration-500 hover:border-[#E31837]/30 hover:bg-white/[0.02] will-change-transform overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E31837]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <span className={`text-[10px] md:text-sm text-white/20 group-hover:text-white transition-all duration-500 text-center leading-tight px-4 pointer-events-none select-none ${studioStyles[company] || 'font-sans font-bold uppercase'}`}>
                {company}
              </span>
              
              {/* Refined accent */}
              <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-white/10 group-hover:bg-[#E31837] transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Trust Ticker */}
      <div className="mt-32 py-12 border-y border-white/5 bg-[#111111]/50 backdrop-blur-md">
        <div className="animate-marquee-fast flex items-center gap-20 whitespace-nowrap">
          {[
            { l: "95% PLACEMENT SUCCESS", i: <ShieldCheck size={14} /> },
            { l: "500+ HIRING PARTNERS", i: <Globe size={14} /> },
            { l: "₹15L TOP PACKAGE", i: <Star size={14} /> },
            { l: "30+ YEARS LEGACY", i: <Briefcase size={14} /> }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-white/40 font-black uppercase tracking-[0.4em] text-[10px]">
              <span className="text-[#E31837]">{item.i}</span>
              {item.l}
            </div>
          ))}
          {/* Duplicate */}
          {[
            { l: "95% PLACEMENT SUCCESS", i: <ShieldCheck size={14} /> },
            { l: "500+ HIRING PARTNERS", i: <Globe size={14} /> },
            { l: "₹15L TOP PACKAGE", i: <Star size={14} /> },
            { l: "30+ YEARS LEGACY", i: <Briefcase size={14} /> }
          ].map((item, i) => (
            <div key={`d-${i}`} className="flex items-center gap-4 text-white/40 font-black uppercase tracking-[0.4em] text-[10px]">
              <span className="text-[#E31837]">{item.i}</span>
              {item.l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Placements);

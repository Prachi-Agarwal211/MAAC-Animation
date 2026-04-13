"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

const partners = [
  { name: "Nilee Games", style: "font-display font-black tracking-tighter" },
  { name: "Mugafi", style: "font-serif italic tracking-wide" },
  { name: "Autodesk", style: "font-sans font-bold uppercase tracking-[0.2em]" },
  { name: "Canon", style: "font-serif font-black uppercase" },
  { name: "Copperseed", style: "font-mono font-medium tracking-tight" },
  { name: "Pixel:Ratio", style: "font-display font-bold italic" },
  { name: "Cedge", style: "font-sans font-black tracking-widest uppercase" },
  { name: "Physics Wallah", style: "font-sans font-bold tracking-tight" },
  { name: "Zebu", style: "font-display font-black uppercase tracking-tighter" },
  { name: "Resonance", style: "font-serif italic font-bold" },
  { name: "Cimpress", style: "font-sans font-medium uppercase tracking-[0.1em]" },
  { name: "PhantomFX", style: "font-display font-black italic tracking-tighter" },
  { name: "Tech Mahindra", style: "font-sans font-bold uppercase" },
  { name: "Postify", style: "font-mono font-bold italic" },
  { name: "LFX Studios", style: "font-display font-black tracking-widest uppercase" },
];

export default function IndustryPartners() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const logos = gsap.utils.toArray(".floating-logo");
    
    logos.forEach((logo: any, i) => {
      gsap.to(logo, {
        x: "random(-15, 15)",
        y: "random(-15, 15)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.15,
      });
    });

    gsap.fromTo(".ip-header > *", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-[#080808] py-24 md:py-40 overflow-hidden border-y border-white/5">
      <div className="atmosphere-blob blob-red top-[-10%] right-[-10%] opacity-10" />
      
      <div className="relative z-10 max-w-[1800px] mx-auto px-6">
        {/* Header */}
        <div className="ip-header text-center mb-32">
          <p className="text-[#E31837] text-[10px] font-bold tracking-[0.4em] uppercase mb-6">Our Production Network</p>
          <h2 className="font-display font-black text-[clamp(1.8rem,4.5vw,3rem)] text-white leading-[0.9] tracking-tighter">
            Hiring <span className="gradient-text italic">Ecosystem</span>
          </h2>
        </div>

        {/* Logo Cloud */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-20">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="floating-logo group relative"
            >
              <div className="w-32 h-32 md:w-56 md:h-56 rounded-[48px] glass border border-white/5 flex items-center justify-center p-8 transition-all duration-700 hover:border-[#E31837]/40 hover:bg-white/[0.02] hover:scale-105 shadow-2xl relative overflow-hidden">
                {/* Internal Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <span className={`text-[11px] md:text-sm text-white/20 group-hover:text-white transition-all duration-500 text-center leading-none pointer-events-none select-none ${partner.style}`}>
                  {partner.name}
                </span>
              </div>
              
              {/* Context Label */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                 <span className="text-[8px] font-bold text-[#E31837] tracking-[0.3em] uppercase whitespace-nowrap">Hiring Partner</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

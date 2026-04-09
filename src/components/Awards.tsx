"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { awardsData } from "@/data/siteData";
import { Trophy, ArrowUpRight } from "lucide-react";

function Awards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Desktop: Kinetic Typography Parallax
      const rows = gsap.utils.toArray(".awards-row");
      rows.forEach((row: any, i) => {
        const speed = (i + 1) * 50;
        gsap.to(row, {
          x: i % 2 === 0 ? -speed : speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    });

    gsap.fromTo(".aw-header > *", 
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
    <section ref={containerRef} className="relative py-24 md:py-40 bg-[#080808] overflow-hidden">
      <div className="atmosphere-blob blob-orange top-1/2 -left-20 opacity-5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-32">
        <div className="aw-header text-left">
          <p className="text-[#E31837] text-sm font-bold tracking-[0.3em] uppercase mb-6">Excellence Recognized</p>
          <h2 className="font-display font-black text-[clamp(2.5rem,6vw,5.5rem)] text-white leading-[0.9] tracking-tighter">
            Our Legacy of <br /> <span className="gradient-text">Winning</span>
          </h2>
        </div>
      </div>

      {/* Kinetic Rows (Desktop) */}
      <div className="hidden lg:block space-y-12 mb-40">
        {[0, 1].map((rowIndex) => (
          <div key={rowIndex} className="awards-row flex gap-12 whitespace-nowrap px-20">
            {awardsData.map((award, i) => (
              <div key={i} className="group relative flex-shrink-0">
                <div className="flex items-end gap-6 cursor-none">
                  <span className="text-[10vw] font-display font-black text-white/5 transition-colors group-hover:text-white group-hover:skew-x-[-10deg] duration-700 leading-none">
                    {award.name.split(' ')[0]}
                  </span>
                  <div className="mb-4">
                    <Trophy size={48} className="text-[#E31837] opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0" />
                  </div>
                </div>

                {/* Detailed Reveal */}
                <div className="absolute top-1/2 left-full ml-12 -translate-y-1/2 w-80 p-8 glass-card rounded-[32px] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-20">
                   <div className="text-[10px] font-bold text-[#E31837] uppercase tracking-[0.3em] mb-4">{award.year}</div>
                   <h3 className="text-white text-xl font-display font-bold mb-4">{award.name}</h3>
                   <p className="text-[#A8A29C] text-sm leading-relaxed border-t border-white/5 pt-4">{award.org}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile: Elegant Staggered List */}
      <div className="lg:hidden px-6 space-y-6">
        {awardsData.map((award, i) => (
          <div key={i} className="p-8 rounded-[32px] glass border border-white/5 flex items-start justify-between group">
            <div>
              <div className="text-[10px] font-bold text-[#E31837] uppercase tracking-[0.2em] mb-2">{award.year}</div>
              <h3 className="text-white text-xl font-display font-bold leading-tight mb-1">{award.name}</h3>
              <p className="text-[#6B6560] text-xs font-bold uppercase tracking-widest">{award.org}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#E31837]">
              <Trophy size={18} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Awards;

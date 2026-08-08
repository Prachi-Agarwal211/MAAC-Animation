"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { Trophy } from "lucide-react";

interface Award {
  year: string;
  name: string;
  org: string;
}

export default function KineticAwardsRows({ awards }: { awards: Award[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const rows = gsap.utils.toArray<HTMLElement>(".awards-row");
      rows.forEach((row, i) => {
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
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="hidden lg:block space-y-12 mb-40">
      {[0, 1].map((rowIndex) => (
        <div key={rowIndex} className="awards-row flex gap-12 whitespace-nowrap px-20">
          {awards.map((award, i) => (
            <div key={i} className="group relative flex-shrink-0">
              <div className="flex items-end gap-6 cursor-none">
                <span className="text-[clamp(2.5rem,6vw,6rem)] font-display text-white/35 transition-colors group-hover:text-white group-hover:skew-x-[-10deg] duration-700 font-bold uppercase leading-[1.1] tracking-[0.1em]">
                  {award.name.split(' ')[0]}
                </span>
                <div className="mb-4">
                  <Trophy size={48} className="metallic-gold-text opacity-40 group-hover:opacity-100 transition-all duration-700 translate-y-1 group-hover:translate-y-0" />
                </div>
              </div>

              {/* Detailed Reveal */}
              <div className="absolute top-1/2 left-full ml-12 -translate-y-1/2 w-80 p-8 glass-card rounded-[32px] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-20">
                 <div className="text-[10px] font-bold metallic-gold-text uppercase tracking-[0.3em] mb-4">{award.year}</div>
                 <h3 className="text-white text-xl font-display mb-4 font-bold uppercase leading-[1.1] tracking-[0.1em]">{award.name}</h3>
                 <p className="text-white/85 text-sm leading-relaxed border-t border-white/5 pt-4">{award.org}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, 
  Calendar, 
  Folder, 
  TrendingUp, 
  Users, 
  Building2, 
  Rocket, 
  Briefcase 
} from "lucide-react";
import { maacStandardFeatures } from "@/data/siteData";

const featureIcons = [
  Calendar, Folder, TrendingUp, Users, Building2, Rocket, Briefcase
];

// Source of truth for Creative Evolution / MAAC Standard section images + copy.
// Uses real campus + event photos for facilities/events/ exposure features (instead of mismatched portfolio work).
// Portfolio shots kept only where they directly illustrate "portfolio", "future tech", "careers".
const featureCards = maacStandardFeatures;

const CX = 256, CY = 256, OUTER_R = 190, INNER_R = 75;
const SEGMENTS = featureCards.length;
const ANGLE_PER_SEG = 360 / SEGMENTS;

function getSegmentPath(index: number, outerR: number, innerR: number) {
  const startDeg = index * ANGLE_PER_SEG - 90;
  const endDeg = (index + 1) * ANGLE_PER_SEG - 90;
  const start = startDeg * (Math.PI / 180);
  const end = endDeg * (Math.PI / 180);
  
  const x1o = CX + outerR * Math.cos(start);
  const y1o = CY + outerR * Math.sin(start);
  const x2o = CX + outerR * Math.cos(end);
  const y2o = CY + outerR * Math.sin(end);
  const x1i = CX + innerR * Math.cos(end);
  const y1i = CY + innerR * Math.sin(end);
  const x2i = CX + innerR * Math.cos(start);
  const y2i = CY + innerR * Math.sin(start);
  
  const largeArcFlag = ANGLE_PER_SEG > 180 ? 1 : 0;
  return `M ${x1o} ${y1o} A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${x2o} ${y2o} L ${x1i} ${y1i} A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${x2i} ${y2i} Z`;
}

export default function VerticalCardGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rightViewportRef = useRef<HTMLDivElement>(null);
  const rightTrackRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<(SVGPathElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pieCenterTextRef = useRef<SVGTextElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveSegment = (index: number) => {
    if (index < 0 || index >= SEGMENTS) return;
    setActiveIndex(index);

    if (pieCenterTextRef.current) {
      pieCenterTextRef.current.textContent = String(index + 1).padStart(2, "0");
    }

    segmentRefs.current.forEach((seg, i) => {
      if (!seg) return;
      if (i === index) {
        gsap.to(seg, {
          strokeWidth: 3,
          stroke: "#E5D7B3", 
          filter: "drop-shadow(0px 0px 8px rgba(229,215,179,0.3))",
          duration: 0.3
        });
      } else {
        gsap.to(seg, {
          strokeWidth: 1,
          stroke: "rgba(255,255,255,0.1)",
          filter: "none",
          duration: 0.3
        });
      }
    });

    labelRefs.current.forEach((label, i) => {
      if (!label) return;
      if (i === index) {
        gsap.to(label, {
          color: "#E5D7B3",
          scale: 1.05,
          opacity: 1,
          duration: 0.3
        });
      } else {
        gsap.to(label, {
          color: "rgba(255,255,255,0.4)",
          scale: 1,
          opacity: 0.5,
          duration: 0.3
        });
      }
    });
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    updateActiveSegment(0);

    const mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
       const section = containerRef.current;
       const viewport = rightViewportRef.current;
       const track = rightTrackRef.current;
       if (!section || !viewport || !track) return;

       const getMaxTranslate = () => Math.max(1, track.scrollHeight - viewport.clientHeight);

       const tween = gsap.to(track, {
         y: () => -getMaxTranslate(),
         ease: "none",
         scrollTrigger: {
           trigger: section,
           start: "top top",
           end: () => `+=${getMaxTranslate()}`,
           scrub: true,
           pin: true,
           pinReparent: true,
           anticipatePin: 1,
           invalidateOnRefresh: true,
           onUpdate: (self) => {
             const max = getMaxTranslate();

             const y = self.progress * max;
             const focusY = y + viewport.clientHeight * 0.35;

             let active = 0;
             for (let i = 0; i < cardRefs.current.length; i++) {
               const el = cardRefs.current[i];
               if (!el) continue;
               const top = el.offsetTop;
               if (top <= focusY) active = i;
             }
             updateActiveSegment(Math.min(SEGMENTS - 1, Math.max(0, active)));
           },
         },
       });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const triggers: ScrollTrigger[] = [];

      cards.forEach((card, index) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: "top 65%",
            end: "bottom 35%",
            onEnter: () => updateActiveSegment(index),
            onEnterBack: () => updateActiveSegment(index),
          })
        );
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-transparent min-h-[100vh] z-10 pb-20 lg:pb-0">
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12 py-12 lg:py-16">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-12 xl:mb-20">
          <p className="text-[9px] font-bold tracking-[0.4em] uppercase mb-4 text-[#C19A5B] opacity-60">
            The MAAC Standard
          </p>
          <h2 className="font-display font-bold text-[clamp(1.5rem,5.5vw,4rem)] text-white/90 uppercase leading-[1.1] tracking-[0.15em] px-4">
            CREATIVE <span className="metallic-gold-text italic tracking-normal">EVOLUTION</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-y-12">
          
          {/* Desktop: sticky left "MAAC Standard" panel with pie. 
              Has its own subtle dark backing so the (now properly defined) feature images 
              inside the pie + labels have consistent contrast and don't fight the global 
              page background or scrolling right cards. Clean separation for the creative evolution visuals. */}
          <div className="hidden lg:flex w-full lg:w-[45%] xl:w-[48%] flex-shrink-0 sticky top-[70px] lg:top-16 z-30 flex-col items-center lg:items-start lg:pl-4 xl:pl-16 bg-transparent py-6 lg:py-0 lg:border-none">
            
            <div className="relative w-[85%] sm:w-[320px] lg:w-[90%] xl:w-full max-w-[480px] mx-auto lg:mx-0">
              <svg viewBox="0 0 512 512" className="w-full h-full relative z-10 overflow-visible">
                <defs>
                  {featureCards.map((_, i) => (
                    <clipPath key={`clip-${i}`} id={`segClip-${i}`}>
                      <path d={getSegmentPath(i, OUTER_R, INNER_R)} />
                    </clipPath>
                  ))}
                </defs>

                <circle cx={CX} cy={CY} r={OUTER_R} fill="rgba(20,20,20,0.2)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />

                {/* Segments + Connector Lines */}
                {featureCards.map((card, i) => {
                  const midDeg = (i + 0.5) * ANGLE_PER_SEG - 90;
                  const midRad = midDeg * (Math.PI / 180);
                  // Connector line logic
                  const lineStartR = OUTER_R + 5;
                  const lineEndR = OUTER_R + 65;
                  const sx = CX + lineStartR * Math.cos(midRad);
                  const sy = CY + lineStartR * Math.sin(midRad);
                  const ex = CX + lineEndR * Math.cos(midRad);
                  const ey = CY + lineEndR * Math.sin(midRad);

                  return (
                    <g key={i}>
                      {/* Radiating Connector Line */}
                      <line 
                        x1={sx} y1={sy} x2={ex} y2={ey} 
                        stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" 
                      />
                      
                      <path
                        ref={el => { segmentRefs.current[i] = el; }}
                        d={getSegmentPath(i, OUTER_R, INNER_R)}
                        fill="rgba(255,255,255,0.03)"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />
                      
                      <g clipPath={`url(#segClip-${i})`}>
                        <image
                          href={featureCards[i]?.image || "/placeholder.jpg"}
                          x={CX - OUTER_R}
                          y={CY - OUTER_R}
                          width={OUTER_R * 2}
                          height={OUTER_R * 2}
                          preserveAspectRatio="xMidYMid slice"
                          opacity={activeIndex === i ? "0.8" : "0.2"}
                          className="transition-opacity duration-500"
                        />
                      </g>
                    </g>
                  );
                })}

                {/* Center Circle */}
                <circle cx={CX} cy={CY} r={INNER_R} fill="rgba(10,10,10,0.9)" stroke="#FFD700" strokeWidth="3" className="drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]" />
                
                <text ref={pieCenterTextRef} x={CX} y={CY + 5} textAnchor="middle" className="fill-white font-display font-bold uppercase leading-[1.1] tracking-[0.1em]" style={{ fontSize: "clamp(40px, 8vw, 64px)" }}>01</text>
                <text x={CX} y={CY + 38} textAnchor="middle" className="fill-[#FFD700] font-black uppercase tracking-[0.3em]" style={{ fontSize: "clamp(10px, 2vw, 16px)" }}>OF {String(SEGMENTS).padStart(2,'0')}</text>
              </svg>

              {/* DOM Labels mounted over the SVG — desktop only (too cramped + absolute positioning on mobile) */}
              {featureCards.map((card, i) => {
                const midDeg = (i + 0.5) * ANGLE_PER_SEG - 90;
                const midRad = midDeg * (Math.PI / 180);
                const labelR = OUTER_R + 85; 
                const lx = CX + labelR * Math.cos(midRad);
                const ly = CY + labelR * Math.sin(midRad);
                
                const Icon = featureIcons[i];

                return (
                  <div
                    key={`label-${i}`}
                    ref={el => { labelRefs.current[i] = el; }}
                    className="absolute hidden lg:flex flex-col items-center gap-1 xl:gap-2 transition-all duration-300 w-[100px] xl:w-[140px]"
                    style={{
                      left: `${(lx / 512) * 100}%`,
                      top: `${(ly / 512) * 100}%`,
                      transform: `translate(-50%, -50%) scale(var(--tw-scale-x))`,
                      color: activeIndex === i ? "#FFD700" : "rgba(255,255,255,0.6)",
                      opacity: activeIndex === i ? 1 : 0.7,
                    }}
                  >
                    <Icon strokeWidth={2.5} className={`w-5 h-5 xl:w-6 xl:h-6 ${activeIndex === i ? "text-[#FFD700]" : "text-white"}`} />
                    <span className="text-[8px] xl:text-[10px] font-black tracking-[0.15em] xl:tracking-[0.2em] uppercase text-center max-w-[90px] xl:max-w-[120px] leading-tight break-words drop-shadow-md">
                      {card.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Vertical Scroll Timeline Indicator — desktop only */}
            <div className="absolute hidden lg:flex h-[min(360px,50vh)] xl:h-[480px] w-8 xl:w-12 flex-col items-center justify-between right-0 xl:right-8 top-1/2 -translate-y-1/2 py-[30px] xl:py-[40px]">
               {/* Background Track Line */}
               <div className="absolute top-[30px] xl:top-[40px] bottom-[30px] xl:bottom-[40px] left-1/2 -translate-x-1/2 w-[1px] bg-white/10 z-0" />
               
               {/* Line Ticks */}
               {featureCards.map((_, i) => (
                 <div key={i} className="w-[4px] h-[4px] xl:w-[5px] xl:h-[5px] rounded-full border border-white/40 bg-black/60 z-10 relative">
                 </div>
               ))}

               {/* Active Glowing Dot */}
               <div 
                 className="absolute left-1/2 -translate-x-1/2 w-[7px] h-[7px] xl:w-[9px] xl:h-[9px] rounded-full bg-[#E5D7B3] shadow-[0_0_12px_rgba(229,215,179,0.8)] z-20 transition-all duration-300 ease-out"
                 style={{
                   top: `calc(30px + (100% - 60px) * (${activeIndex} / ${Math.max(1, SEGMENTS - 1)}))`,
                   transform: `translate(-50%, -50%)`
                 }}
               />
            </div>
            
          </div>

          <div
            ref={rightViewportRef}
            className="w-full lg:w-[50%] xl:w-[48%] lg:h-[calc(100vh-8rem)] lg:overflow-hidden px-4 sm:px-8 lg:px-0 pt-2 lg:pt-0"
          >
            <div ref={rightTrackRef} className="space-y-16 lg:space-y-24 lg:pb-[25vh]">
              {featureCards.map((card, index) => (
                <div
                  key={index}
                  ref={el => { cardRefs.current[index] = el; }}
                  className="w-full flex-shrink-0 group flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all duration-500"
                >
                  {/* Card Left Image Container */}
                  <div className="w-full md:w-[45%] aspect-[4/5] relative bg-black rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                     <Image
                      src={featureCards[index]?.image || "/placeholder.jpg"}
                      alt={card.title}
                      fill
                      className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 30vw"
                    />
                  </div>

                  {/* Card Right Floating Typography */}
                  <div className="w-full md:w-[55%] flex flex-col justify-center py-4 md:pl-6">
                    <div className="text-[#E5D7B3] font-display text-[10px] md:text-[11px] tracking-[0.2em] mb-4 opacity-70 font-bold uppercase leading-[1.1] tracking-[0.1em]">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    {/* Floating Title with Header Font Style */}
                    <h3 className="font-display font-bold text-[15px] md:text-[17px] text-white/90 mb-3 tracking-[0.25em] leading-snug uppercase">
                      {card.title}
                    </h3>
                    
                    <p className="text-white/70 text-[11px] md:text-[12px] leading-[1.8] mb-8 max-w-[300px]">
                      {card.desc}
                    </p>
                    
                    <Link href="/contact" className="mt-auto group/link flex items-center justify-between w-[85%] border-t border-white/10 pt-5">
                      <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white group-hover/link:text-white transition-colors">
                        View Details
                      </span>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all group-hover/link:bg-[#E5D7B3] group-hover/link:border-[#E5D7B3]">
                         <ArrowRight size={12} className="text-white/50 group-hover/link:text-black transition-colors" />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";
import { maacStandardFeatures } from "@/data/siteData";

const featureCards = maacStandardFeatures;

const CX = 256, CY = 256, OUTER_R = 190, INNER_R = 75;
const SEGMENTS = featureCards.length;
const ANGLE_PER_SEG = 360 / SEGMENTS;
const GAP = 1.2; // degrees gap between segments

function getSegmentPath(index: number, outerR: number, innerR: number) {
  const startDeg = index * ANGLE_PER_SEG - 90 + GAP;
  const endDeg = (index + 1) * ANGLE_PER_SEG - 90 - GAP;
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
  const headerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const rightViewportRef = useRef<HTMLDivElement>(null);
  const rightTrackRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<(SVGPathElement | null)[]>([]);
  const pieCenterTextRef = useRef<SVGTextElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const prefersReduced = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updateActiveSegment = (index: number) => {
    if (index < 0 || index >= SEGMENTS) return;
    setActiveIndex(index);
    if (pieCenterTextRef.current) {
      pieCenterTextRef.current.textContent = String(index + 1).padStart(2, "0");
    }
    segmentRefs.current.forEach((seg, i) => {
      if (!seg) return;
      const isActive = i === index;
      gsap.to(seg, {
        strokeWidth: isActive ? 3 : 0.3,
        stroke: isActive ? "#E5D7B3" : "rgba(255,255,255,0.08)",
        filter: isActive ? "url(#premiumShadow)" : "none",
        duration: 0.4,
        ease: "power2.out",
      });
    });
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    updateActiveSegment(0);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const pinSection = pinSectionRef.current;
      const viewport = rightViewportRef.current;
      const track = rightTrackRef.current;
      if (!pinSection || !viewport || !track) return;

      const getMaxTranslate = () => Math.max(1, track.scrollHeight - viewport.clientHeight);

      const tween = gsap.to(track, {
        y: () => -getMaxTranslate(),
        ease: "none",
        scrollTrigger: {
          trigger: pinSection,
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
              if (el.offsetTop <= focusY) active = i;
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
      return () => { triggers.forEach((t) => t.kill()); };
    });

    return () => mm.revert();
  }, {});

  return (
    <>
      {/* Header — scrolls away naturally, not pinned */}
      <div ref={headerRef} className="relative z-10 max-w-content mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="text-center mb-16 lg:mb-12 xl:mb-20">
          <p className="text-[9px] font-bold tracking-[0.4em] uppercase mb-4 text-[#C19A5B] opacity-60">
            The MAAC Standard
          </p>
          <h2 className="font-display font-bold text-[clamp(1.5rem,5.5vw,4rem)] text-white/90 uppercase leading-[1.1] tracking-[0.15em] px-4">
            CREATIVE <span className="metallic-gold-text italic tracking-normal">EVOLUTION</span>
          </h2>
        </div>
      </div>

      {/* Pinned section — pie centered in viewport, cards scroll on right */}
      <div ref={pinSectionRef} className="relative bg-transparent lg:h-screen z-10 pb-20 lg:pb-0">
        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12 h-full">
          {/* On desktop: stretch (not items-start) so left column fills viewport height */}
          <div className="flex flex-col lg:flex-row justify-between gap-y-12 lg:h-full">

            {/* Left: pie — fills full height, centers pie vertically */}
            <div className="hidden lg:flex w-full lg:w-[50%] xl:w-[52%] flex-shrink-0 items-center justify-center lg:pl-4 xl:pl-8">
              <div className="w-full max-w-[600px]">
                <svg viewBox="0 0 512 512" className="w-full h-full overflow-visible">
                  <defs>
                    {/* Clip paths for segment images */}
                    {featureCards.map((_, i) => (
                      <clipPath key={`clip-${i}`} id={`segClip-${i}`}>
                        <path d={getSegmentPath(i, OUTER_R, INNER_R)} />
                      </clipPath>
                    ))}

                    {/* Premium Gold Glow Filter */}
                    <filter id="premiumShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#E5D7B3" floodOpacity="0.6" />
                    </filter>

                    {/* Center circle gradient */}
                    <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1a1a1a" />
                      <stop offset="100%" stopColor="#0a0a0a" />
                    </radialGradient>

                    {/* Gold ring gradient */}
                    <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="50%" stopColor="#E5D7B3" />
                      <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>

                    {/* Dot glow filter */}
                    <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Outer decorative tick ring */}
                  <circle cx={CX} cy={CY} r={OUTER_R + 10} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" strokeDasharray="1.5 7" />

                  {/* Background circle behind segments */}
                  <circle cx={CX} cy={CY} r={OUTER_R} fill="rgba(15,15,15,0.3)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                  {/* Segment paths + clipped images */}
                  {featureCards.map((card, i) => (
                    <g key={i} 
                       className="cursor-pointer group" 
                       onClick={() => {
                         const el = cardRefs.current[i];
                         if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                         }
                       }}
                       onMouseEnter={() => {
                         if (i !== activeIndex) {
                           const seg = segmentRefs.current[i];
                           if (seg) {
                             gsap.to(seg, { stroke: "rgba(229, 215, 179, 0.4)", duration: 0.3 });
                           }
                         }
                       }}
                       onMouseLeave={() => {
                         if (i !== activeIndex) {
                           const seg = segmentRefs.current[i];
                           if (seg) {
                             gsap.to(seg, { stroke: "rgba(255,255,255,0.08)", duration: 0.3 });
                           }
                         }
                       }}
                    >
                      {/* Clipped image */}
                      <g clipPath={`url(#segClip-${i})`}>
                        <image
                          href={featureCards[i]?.image || "/campus-image.jpg"}
                          x={CX - OUTER_R} y={CY - OUTER_R}
                          width={OUTER_R * 2} height={OUTER_R * 2}
                          preserveAspectRatio="xMidYMid slice"
                          opacity={activeIndex === i ? "1" : "0.12"}
                          className="transition-opacity duration-500 group-hover:opacity-40"
                        />
                      </g>
                      {/* Base segment path (drawn on top for clear strokes and shadow) */}
                      <path
                        ref={el => { segmentRefs.current[i] = el; }}
                        d={getSegmentPath(i, OUTER_R, INNER_R)}
                        fill="transparent"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="0.3"
                      />
                    </g>
                  ))}

                  {/* Inner decorative ring */}
                  <circle cx={CX} cy={CY} r={INNER_R + 8} fill="none" stroke="rgba(255,215,0,0.1)" strokeWidth="0.5" />

                  {/* Center: outer frame ring */}
                  <circle cx={CX} cy={CY} r={INNER_R + 3} fill="none" stroke="rgba(255,215,0,0.15)" strokeWidth="0.5" />

                  {/* Center: main circle */}
                  <circle cx={CX} cy={CY} r={INNER_R} fill="url(#centerGrad)" stroke="url(#goldRing)" strokeWidth="2.5" />

                  {/* Center: inner pulse ring */}
                  <circle cx={CX} cy={CY} r={INNER_R - 5} fill="none" stroke="rgba(255,215,0,0.15)" strokeWidth="0.5" className="animate-[pulse-ring_2.5s_ease-out_infinite]" />

                  {/* Center: counter text */}
                  <text ref={pieCenterTextRef} x={CX} y={CY + 5} textAnchor="middle" className="fill-white font-display font-bold uppercase leading-[1.1] tracking-[0.1em]" style={{ fontSize: "clamp(40px, 8vw, 64px)" }}>01</text>
                  <text x={CX} y={CY + 38} textAnchor="middle" className="fill-[#FFD700] font-black uppercase tracking-[0.3em]" style={{ fontSize: "clamp(10px, 2vw, 16px)" }}>OF {String(SEGMENTS).padStart(2,'0')}</text>
                </svg>
              </div>
            </div>

            {/* Right: scrolling cards */}
            <div
              ref={rightViewportRef}
              className="w-full lg:w-[46%] xl:w-[44%] lg:h-full lg:overflow-hidden px-4 sm:px-8 lg:px-0 pt-2 lg:pt-0"
            >
              <div ref={rightTrackRef} className="space-y-16 lg:space-y-24 lg:pb-[25vh]">
                {featureCards.map((card, index) => (
                  <div
                    key={index}
                    ref={el => { cardRefs.current[index] = el; }}
                    className="w-full flex-shrink-0 group flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all duration-500"
                  >
                    <div className="w-full md:w-[45%] aspect-[4/5] relative bg-black rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                      <Image
                        src={featureCards[index]?.image || "/campus-image.jpg"}
                        alt={card.title}
                        fill
                        className="object-cover opacity-90 transition-transform duration-700 group-hover:-translate-y-1"
                        sizes="(max-width: 1024px) 100vw, 30vw"
                        priority={index === 0}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI0OCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzBhMGEwYSIvPjwvc3ZnPg=="
                      />
                    </div>
                    <div className="w-full md:w-[55%] flex flex-col justify-center py-4 md:pl-6">
                      <div className="text-[#E5D7B3] font-display text-[10px] md:text-[11px] tracking-[0.2em] mb-4 opacity-70 font-bold uppercase leading-[1.1] tracking-[0.1em]">
                        {String(index + 1).padStart(2, '0')}
                      </div>
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
      </div>
    </>
  );
}

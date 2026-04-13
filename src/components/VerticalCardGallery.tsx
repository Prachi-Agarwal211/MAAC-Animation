"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

const cardImages: Record<number, string> = {
  0: "/portfolio/featured/nancy-verma-page1.jpg",
  1: "/portfolio/character-modeling/aarush-kumar-page1.jpg",
  2: "/portfolio/matte-painting/akshat-asolkar.jpg",
  3: "/portfolio/digital-painting/deshna-shah.jpg",
  4: "/portfolio/environment-modeling/raghav-gupta-page1.jpg",
  5: "/portfolio/3d-game-asset/archita-roy-page1.jpg",
  6: "/portfolio/architectural-design/sharanjit-kaur-page1.jpg",
};

const featureCards = [
  { title: "Educational Events", desc: "Industry workshops, masterclasses, and live projects that bridge classroom learning with real-world experience" },
  { title: "Portfolio Mastery", desc: "Build a professional portfolio with live projects, animations, and visual effects work that showcases your skills" },
  { title: "Industry Exposure", desc: "Studio visits, live briefs, and internship opportunities with top animation and VFX companies" },
  { title: "Premier Placements", desc: "Graduate with a professional showreel and portfolio that showcases your skills to potential employers" },
  { title: "Pro Facilities", desc: "State-of-the-art labs, rendering farms, and production suites equipped with latest software and hardware" },
  { title: "Future-Proof Courses", desc: "Curriculum updated regularly with emerging technologies like AI, VR, AR, and real-time rendering" },
  { title: "Creative Careers", desc: "Placement support, career counseling, and alumni network that helps you land your dream job" },
];

const CX = 256, CY = 256, OUTER_R = 200, INNER_R = 80;
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
  const large = ANGLE_PER_SEG > 180 ? 1 : 0;
  return `M ${x1o} ${y1o} A ${outerR} ${outerR} 0 ${large} 1 ${x2o} ${y2o} L ${x1i} ${y1i} A ${innerR} ${innerR} 0 ${large} 0 ${x2i} ${y2i} Z`;
}

export default function VerticalCardGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<(SVGPathElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pieCenterTextRef = useRef<SVGTextElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updatePieChart = (index: number) => {
    setActiveIndex(index);

    // Update center text
    if (pieCenterTextRef.current) {
      pieCenterTextRef.current.textContent = String(index + 1).padStart(2, "0");
    }

    // Update segments
    segmentRefs.current.forEach((seg, i) => {
      if (!seg) return;
      if (i === index) {
        gsap.to(seg, {
          strokeWidth: 3,
          stroke: "#E31837",
          filter: "url(#segGlow)",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(seg, {
          strokeWidth: 1,
          stroke: "rgba(255,255,255,0.05)",
          filter: "none",
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    // Update labels
    labelRefs.current.forEach((label, i) => {
      if (!label) return;
      if (i === index) {
        gsap.to(label, {
          color: "#fff",
          scale: 1.15,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(label, {
          color: "rgba(255,255,255,0.2)",
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const items = gsap.utils.toArray<HTMLElement>(".content-section");

      items.forEach((item, index) => {
        gsap.fromTo(item, { opacity: 0.3, y: 60 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 50%",
            end: "top 30%",
            scrub: 0.3,
            onEnter: () => updatePieChart(index),
            onEnterBack: () => updatePieChart(index)
          }
        });
      });

      // Initialize first segment
      updatePieChart(0);
    });

    mm.add("(max-width: 1023px)", () => {
      const items = gsap.utils.toArray<HTMLElement>(".content-section");
      items.forEach((item, index) => {
        gsap.fromTo(item, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
            onEnter: () => updatePieChart(index)
          }
        });
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-[#080808] overflow-hidden">
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#E31837]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-[#FF6B35]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-[#E31837] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#E31837]" />
            The MAAC Standard
            <span className="w-8 h-[1px] bg-[#E31837]" />
          </p>
          <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-[0.85] tracking-tighter text-white">
            CREATIVE <span className="gradient-text italic">EVOLUTION</span>
          </h2>
          <p className="text-[#A8A29C] text-base lg:text-lg font-medium leading-relaxed mt-4 max-w-2xl mx-auto italic">
            Experience a curriculum engineered for the global production pipeline. We don&apos;t just teach software; we forge cinematic careers.
          </p>
        </div>

        {/* Main Layout: Pie Chart LEFT (sticky), Cards RIGHT (scrollable) */}
        <div className="flex flex-col lg:flex-row">

          {/* LEFT: Sticky Pie Chart */}
          <div className="lg:w-[45%] lg:flex-shrink-0 order-first lg:order-none">
            {/* Desktop: Fixed/Sticky pie chart */}
            <div className="hidden lg:block" style={{ position: "sticky", top: "80px" }}>
              <div className="relative w-full max-w-[480px] mx-auto" style={{ minHeight: "480px" }}>
                {/* Outer glow */}
                <div className="absolute inset-[-30px] rounded-full bg-gradient-to-br from-[#E31837]/8 to-[#FF6B35]/8 blur-3xl" />

                <svg viewBox="0 0 512 512" className="w-full h-full relative z-10" style={{ minHeight: "480px" }}>
                  <defs>
                    <filter id="segGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="10" result="blur" />
                      <feFlood floodColor="#E31837" floodOpacity="0.4" result="color" />
                      <feComposite in="color" in2="blur" operator="in" result="glow" />
                      <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    {featureCards.map((_, i) => (
                      <clipPath key={`clip-${i}`} id={`segClip-${i}`}>
                        <path d={getSegmentPath(i, OUTER_R, INNER_R)} />
                      </clipPath>
                    ))}
                  </defs>

                  {/* Background circle */}
                  <circle cx={CX} cy={CY} r={OUTER_R} fill="#111" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                  {/* 7 Segments with Images */}
                  {featureCards.map((card, i) => (
                    <g key={i}>
                      <path
                        ref={el => { segmentRefs.current[i] = el; }}
                        d={getSegmentPath(i, OUTER_R, INNER_R)}
                        fill="#1a1a1a"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                      />
                      <g clipPath={`url(#segClip-${i})`}>
                        <image
                          href={cardImages[i]}
                          x={CX - OUTER_R}
                          y={CY - OUTER_R}
                          width={OUTER_R * 2}
                          height={OUTER_R * 2}
                          preserveAspectRatio="xMidYMid slice"
                          opacity="0.65"
                        />
                      </g>
                      <path d={getSegmentPath(i, OUTER_R, INNER_R)} fill="rgba(8,8,8,0.35)" />
                    </g>
                  ))}

                  {/* Center circle */}
                  <circle cx={CX} cy={CY} r={INNER_R} fill="#080808" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <text ref={pieCenterTextRef} x={CX} y={CY - 4} textAnchor="middle" className="fill-white font-display font-black" style={{ fontSize: "32px" }}>01</text>
                  <text x={CX} y={CY + 18} textAnchor="middle" className="fill-[#6B6560] font-bold uppercase tracking-widest" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>OF {SEGMENTS}</text>
                </svg>

                {/* Labels Outside the Circle */}
                {featureCards.map((card, i) => {
                  const midDeg = (i + 0.5) * ANGLE_PER_SEG - 90;
                  const midRad = midDeg * (Math.PI / 180);
                  const labelR = OUTER_R + 40;
                  const lx = CX + labelR * Math.cos(midRad);
                  const ly = CY + labelR * Math.sin(midRad);
                  const isLeft = lx < CX;

                  return (
                    <div
                      key={i}
                      ref={el => { labelRefs.current[i] = el; }}
                      className="absolute text-[10px] lg:text-xs font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap"
                      style={{
                        left: `${(lx / 512) * 100}%`,
                        top: `${(ly / 512) * 100}%`,
                        transform: `translate(${isLeft ? "-100%" : "0%"}, -50%)`,
                        color: "rgba(255,255,255,0.2)",
                      }}
                    >
                      {card.title}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: Pie Chart */}
            <div className="lg:hidden relative w-72 h-72 mx-auto mb-8">
              <svg viewBox="0 0 512 512" className="w-full h-full">
                <defs>
                  <filter id="segGlowMobile" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="10" result="blur" />
                    <feFlood floodColor="#E31837" floodOpacity="0.4" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="glow" />
                    <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  {featureCards.map((_, i) => (
                    <clipPath key={`clipm-${i}`} id={`segClipM-${i}`}>
                      <path d={getSegmentPath(i, OUTER_R, INNER_R)} />
                    </clipPath>
                  ))}
                </defs>
                <circle cx={CX} cy={CY} r={OUTER_R} fill="#111" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                {featureCards.map((card, i) => (
                  <g key={i}>
                    <path d={getSegmentPath(i, OUTER_R, INNER_R)} fill="#1a1a1a" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <g clipPath={`url(#segClipM-${i})`}>
                      <image href={cardImages[i]} x={CX - OUTER_R} y={CY - OUTER_R} width={OUTER_R * 2} height={OUTER_R * 2} preserveAspectRatio="xMidYMid slice" opacity="0.65" />
                    </g>
                    <path d={getSegmentPath(i, OUTER_R, INNER_R)} fill="rgba(8,8,8,0.35)" />
                  </g>
                ))}
                <circle cx={CX} cy={CY} r={INNER_R} fill="#080808" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <text x={CX} y={CY - 4} textAnchor="middle" className="fill-white font-display font-black" style={{ fontSize: "32px" }}>01</text>
                <text x={CX} y={CY + 18} textAnchor="middle" className="fill-[#6B6560] font-bold uppercase tracking-widest" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>OF {SEGMENTS}</text>
              </svg>
            </div>
          </div>

          {/* RIGHT: Scrolling Content */}
          <div className="lg:w-[55%] lg:pl-12 lg:pt-8">
            <div className="flex flex-col gap-0">
              {featureCards.map((card, index) => (
                <div key={index} className="content-section group py-16 lg:py-20 first:pt-0 last:pb-0">
                  <div className="relative overflow-hidden rounded-[24px] md:rounded-[32px] bg-[#111111] border border-white/5 transition-all duration-700 group-hover:border-[#E31837]/30 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-stretch">
                      {/* Image Side */}
                      <div className="w-full md:w-1/2 aspect-square relative overflow-hidden">
                        {cardImages[index] ? (
                          <Image src={cardImages[index]} alt={card.title} fill className="object-cover transition-transform duration-[1.5s] ease-expo-out group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" priority={index < 2} />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] to-[#0c0c0c]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r" />
                      </div>
                      {/* Content Side */}
                      <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col justify-center relative">
                        <div className="flex items-center gap-3 mb-4 lg:mb-6">
                          <div className="w-6 lg:w-8 h-[1px] bg-[#E31837]" />
                          <span className="text-[#E31837] text-[9px] lg:text-[10px] font-bold tracking-[0.3em] uppercase">Insight</span>
                        </div>
                        <h4 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-white mb-3 lg:mb-6 leading-[0.9] tracking-tighter group-hover:text-[#E31837] transition-colors duration-500">{card.title}</h4>
                        <p className="text-[#A8A29C] text-sm lg:text-base font-medium leading-relaxed mb-6 lg:mb-10">{card.desc}</p>
                        <div className="flex items-center gap-3 lg:gap-6">
                          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#E31837] group-hover:border-[#E31837] transition-all duration-500">
                            <ArrowRight size={16} className="text-white transition-transform group-hover:translate-x-1" />
                          </div>
                          <span className="text-[8px] lg:text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 group-hover:text-white transition-colors">Details</span>
                        </div>
                      </div>
                    </div>
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

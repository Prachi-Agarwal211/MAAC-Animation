"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const rightViewportRef = useRef<HTMLDivElement>(null);
  const rightTrackRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<(SVGPathElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pieCenterTextRef = useRef<SVGTextElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateActiveSegment = (index: number) => {
    if (index < 0 || index >= SEGMENTS) return;

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
          duration: 0.3
        });
      } else {
        gsap.to(seg, {
          strokeWidth: 1,
          stroke: "rgba(255,255,255,0.05)",
          filter: "none",
          duration: 0.3
        });
      }
    });

    // Update labels
    labelRefs.current.forEach((label, i) => {
      if (!label) return;
      if (i === index) {
        gsap.to(label, {
          color: "#fff",
          scale: 1.1,
          duration: 0.3
        });
      } else {
        gsap.to(label, {
          color: "rgba(255,255,255,0.2)",
          scale: 1,
          duration: 0.3
        });
      }
    });
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize first segment
    updateActiveSegment(0);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const section = containerRef.current;
      const viewport = rightViewportRef.current;
      const track = rightTrackRef.current;
      if (!section || !viewport || !track) return;

      const getMaxTranslate = () => Math.max(0, track.scrollHeight - viewport.clientHeight);

      // Animate the right column "internally" while the whole section stays pinned.
      const tween = gsap.to(track, {
        y: () => -getMaxTranslate(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(1, getMaxTranslate())}`,
          scrub: true,
          pin: true,
          pinReparent: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const max = getMaxTranslate();
            if (max <= 0) {
              updateActiveSegment(0);
              return;
            }

            const y = self.progress * max;
            const focusY = y + viewport.clientHeight * 0.35;

            // Pick active card based on which card is closest to the focus line.
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
      // Mobile: normal page scroll (no pin) to avoid blank/black gaps.
      // We still update the pie highlight based on which card is in view.
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
    <section ref={containerRef} className="relative bg-[#080808] min-h-[100vh] z-[100]">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 py-20 lg:py-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#E31837] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
            The MAAC Standard
          </p>
          <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-[0.85] tracking-tighter text-white">
            CREATIVE <span className="gradient-text italic">EVOLUTION</span>
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* LEFT: Sticky Pie Chart */}
          <div className="lg:w-[45%] lg:flex-shrink-0">
            <div className="sticky top-20 lg:top-24 z-20">
              <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[480px] mx-auto -mt-4 sm:-mt-6 lg:mt-0" style={{ aspectRatio: "1/1" }}>
                <svg viewBox="0 0 512 512" className="w-full h-full relative z-10">
                  <defs>
                    <filter id="segGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="10" result="blur" />
                      <feFlood floodColor="#E31837" floodOpacity="0.4" result="color" />
                      <feComposite in="color" in2="blur" operator="in" result="glow" />
                      <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    {featureCards.map((_, i) => (
                      <clipPath key={`clip-${i}`} id={`segClip-${i}`}>
                        <path d={getSegmentPath(i, OUTER_R, INNER_R)} />
                      </clipPath>
                    ))}
                  </defs>

                  {/* Background circle */}
                  <circle cx={CX} cy={CY} r={OUTER_R} fill="#111" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                  {/* Segments */}
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
                          opacity="0.6"
                        />
                      </g>
                      <path d={getSegmentPath(i, OUTER_R, INNER_R)} fill="rgba(8,8,8,0.4)" />
                    </g>
                  ))}

                  {/* Center circle */}
                  <circle cx={CX} cy={CY} r={INNER_R} fill="#080808" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <text ref={pieCenterTextRef} x={CX} y={CY - 4} textAnchor="middle" className="fill-white font-display font-black" style={{ fontSize: "32px" }}>01</text>
                  <text x={CX} y={CY + 18} textAnchor="middle" className="fill-[#6B6560] font-bold uppercase tracking-widest" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>OF {SEGMENTS}</text>
                </svg>

                {/* Labels */}
                {featureCards.map((card, i) => {
                  const midDeg = (i + 0.5) * ANGLE_PER_SEG - 90;
                  const midRad = midDeg * (Math.PI / 180);
                  const labelR = OUTER_R + 36;
                  const lx = CX + labelR * Math.cos(midRad);
                  const ly = CY + labelR * Math.sin(midRad);
                  const isLeft = lx < CX;

                  return (
                    <div
                      key={i}
                      ref={el => { labelRefs.current[i] = el; }}
                      className="absolute text-[9px] sm:text-[10px] font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap"
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
          </div>

          {/* RIGHT: Scrolling Cards */}
          <div
            ref={rightViewportRef}
            className="lg:w-[55%] lg:h-[calc(100vh-8rem)] lg:overflow-hidden"
          >
            <div ref={rightTrackRef} className="space-y-8">
              {featureCards.map((card, index) => (
                <div
                  key={index}
                  ref={el => { cardRefs.current[index] = el; }}
                  className="group relative overflow-hidden rounded-2xl bg-[#111] border border-white/5 transition-all duration-500 hover:border-[#E31837]/30"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="w-full md:w-2/5 aspect-square relative overflow-hidden">
                      <Image
                        src={cardImages[index]}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:bg-gradient-to-r" />
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-[1px] bg-[#E31837]" />
                        <span className="text-[#E31837] text-[9px] font-bold tracking-[0.3em] uppercase">Insight</span>
                      </div>
                      <h4 className="font-display font-bold text-xl md:text-2xl text-white mb-3 leading-[0.95]">
                        {card.title}
                      </h4>
                      <p className="text-[#A8A29C] text-sm md:text-base leading-relaxed mb-6">
                        {card.desc}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#E31837] group-hover:border-[#E31837] transition-all duration-500">
                          <ArrowRight size={16} className="text-white transition-transform group-hover:translate-x-1" />
                        </div>
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/40 group-hover:text-white transition-colors">Details</span>
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

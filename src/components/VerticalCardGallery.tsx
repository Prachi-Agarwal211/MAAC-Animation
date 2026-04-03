"use client";

import { useState } from "react";

const featureCards = [
  {
    title: "Transformative Educational Events",
    desc: "Industry workshops, masterclasses, and live projects that bridge classroom learning with real-world experience",
    color: "#E31837",
    svgPaths: [
      <rect key="1" x="10" y="10" width="60" height="60" rx="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
      <path key="2" d="M10 40 L40 10 L70 40 L40 70 Z" stroke="currentColor" strokeWidth="1" fill="none"/>
    ]
  },
  {
    title: "Industry-Ready Portfolio Development",
    desc: "Build a professional portfolio with live projects, animations, and visual effects work that showcases your skills",
    color: "#FF6B35",
    svgPaths: [
      <circle key="1" cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
      <circle key="2" cx="40" cy="40" r="15" stroke="currentColor" strokeWidth="1" fill="none"/>
    ]
  },
  {
    title: "Exclusive Industry Exposure",
    desc: "Studio visits, live briefs, and internship opportunities with top animation and VFX companies",
    color: "#00B4D8",
    svgPaths: [
      <path key="1" d="M20 60 L20 20 L60 20 L60 60 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
      <path key="2" d="M20 40 L60 40" stroke="currentColor" strokeWidth="1" fill="none"/>
    ]
  },
  {
    title: "Portfolio That Speaks Volumes",
    desc: "Graduate with a professional showreel and portfolio that showcases your skills to potential employers",
    color: "#9D4EDD",
    svgPaths: [
      <rect key="1" x="15" y="15" width="50" height="50" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
      <path key="2" d="M25 35 L55 35 M25 45 L45 45" stroke="currentColor" strokeWidth="1" fill="none"/>
    ]
  },
  {
    title: "Industry-Grade Facilities",
    desc: "State-of-the-art labs, rendering farms, and production suites equipped with latest software and hardware",
    color: "#06D6A0",
    svgPaths: [
      <rect key="1" x="10" y="20" width="60" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
      <path key="2" d="M30 60 L50 60 M40 60 L40 65 M20 65 L60 65" stroke="currentColor" strokeWidth="1" fill="none"/>
    ]
  },
  {
    title: "Courses Built For Future",
    desc: "Curriculum updated regularly with emerging technologies like AI, VR, AR, and real-time rendering",
    color: "#FFD166",
    svgPaths: [
      <path key="1" d="M40 10 L70 60 L10 60 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
      <circle key="2" cx="40" cy="45" r="5" stroke="currentColor" strokeWidth="1" fill="none"/>
    ]
  },
  {
    title: "Creative Careers That Click",
    desc: "Placement support, career counseling, and alumni network that helps you land your dream job",
    color: "#EF476F",
    svgPaths: [
      <rect key="1" x="20" y="30" width="40" height="30" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
      <path key="2" d="M30 30 L30 20 L50 20 L50 30" stroke="currentColor" strokeWidth="1" fill="none"/>
    ]
  },
];

export default function VerticalCardGallery() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="bg-[#0C0C0C] py-20 md:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 relative z-10">
        
        {/* Left Side: Sticky Headers */}
        <div className="lg:w-[40%] lg:sticky lg:top-32 h-fit">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase mb-6">
            Empower Your Future
          </p>
          <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-[#F0EBE1] mb-2">
            Creative Careers
            <br />
            That Click
          </h2>
          <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-[#C4A882] mb-6 inline-block relative">
            Think MAAC
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#C4A882] to-transparent opacity-50" />
          </h2>
          <p className="text-[#A8A29C] text-lg leading-relaxed max-w-md">
            Train in animation, VFX, gaming, and digital content creation with
            expert-led courses that prepare you for real industry success.
          </p>
        </div>

        {/* Right Side: Accordion */}
        <div className="lg:w-[60%] flex flex-col gap-4">
          {featureCards.map((card, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={index}
                className="group border border-white/10 rounded-2xl overflow-hidden bg-[#161616]/50 backdrop-blur-sm cursor-pointer transition-colors hover:bg-white/[0.04]"
                onClick={() => setActiveIndex(isActive ? -1 : index)}
              >
                {/* Header (Always Visible) */}
                <div className="p-6 md:p-8 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <span 
                      className="text-sm font-semibold tracking-widest hidden sm:block"
                      style={{ color: isActive ? card.color : '#6B6560' }}
                    >
                      0{index + 1}
                    </span>
                    <h3 className={`font-display font-bold text-xl md:text-2xl transition-colors ${isActive ? 'text-white' : 'text-[#A8A29C]'}`}>
                      {card.title}
                    </h3>
                  </div>
                  <div 
                    className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-transform duration-500 ${isActive ? 'rotate-180 border-[#C4A882] bg-white/5' : 'border-white/10'}`}
                  >
                    <svg className={`w-4 h-4 transition-colors ${isActive ? 'text-[#C4A882]' : 'text-white/50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Collapsible Content */}
                <div 
                  className="grid transition-all duration-500 ease-in-out"
                  style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 md:p-8 pt-0 border-t border-white/5 mt-2 flex flex-col sm:flex-row items-center gap-8 bg-black/20">
                      {/* Left: SVG Graphic */}
                      <div className="w-full sm:w-1/3 aspect-square max-w-[160px] rounded-xl flex items-center justify-center bg-[#080808] relative overflow-hidden border border-white/5">
                         <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at center, ${card.color}, transparent 70%)` }} />
                         <svg width="60" height="60" viewBox="0 0 80 80" className="relative z-10" style={{ color: card.color }}>
                           {card.svgPaths}
                         </svg>
                      </div>
                      
                      {/* Right: Description */}
                      <p className="text-[#A8A29C] text-base md:text-lg leading-relaxed flex-1">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

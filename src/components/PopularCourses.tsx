"use client";

import { useRef } from "react";
import { coursesData } from "@/data/siteData";

const courseGradients = [
  "linear-gradient(135deg, #2A1F1A 0%, #0C0C0C 100%)",
  "linear-gradient(135deg, #1C1410 0%, #0C0C0C 100%)",
  "linear-gradient(135deg, #161616 0%, #0C0C0C 100%)",
  "linear-gradient(135deg, #2A1F1A 0%, #0C0C0C 100%)",
];

export default function PopularCourses() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Smooth scroll arrows for desktop users who don't have a trackpad
  const scrollTrack = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 420 : 320;
      trackRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#0C0C0C] py-24 md:py-32 overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#C4A882]/10 blur-[60px] md:blur-[100px] rounded-full -translate-y-1/2" />
         <div className="absolute top-1/3 right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#E31837]/10 blur-[60px] md:blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <div className="text-center relative z-10 max-w-7xl mx-auto px-6 mb-12 md:mb-16">
        <p className="text-[#C4A882] text-xs font-semibold tracking-[0.12em] uppercase mb-4">Master Your Craft</p>
        <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] text-[#F0EBE1] leading-[1.08] tracking-tight mb-4 pb-2">
          Popular Courses
        </h2>
        <p className="text-[#A8A29C] text-lg max-w-2xl mx-auto">
          Master industry-standard tools and techniques with our most sought-after programs
        </p>
      </div>

      {/* Track & Controls */}
      <div className="relative z-10 max-w-[1920px] mx-auto">
        <div 
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 lg:px-24 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {coursesData.popularCourses.map((course, index) => (
            <div
              key={course.name}
              className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-center md:snap-start"
            >
              <div className="glass-card rounded-2xl overflow-hidden h-[480px] flex flex-col border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-white/10 transition-colors">
                {/* Top image section */}
                <div className="h-[200px] relative flex items-center justify-center border-b border-white/5" style={{ background: courseGradients[index % courseGradients.length] }}>
                  <div className="text-[#C4A882]/20 font-display font-extrabold text-7xl select-none">{course.code || course.name}</div>
                </div>

                {/* Bottom content */}
                <div className="p-6 flex-1 flex flex-col">
                  <span className="inline-block w-fit px-3 py-1 rounded-full bg-[#C4A882]/10 text-[#C4A882] text-xs font-medium mb-3">
                    {course.duration}
                  </span>
                  <h3 className="font-display font-bold text-xl text-[#F0EBE1] mb-1">{course.name}</h3>
                  <p className="text-[#6B6560] text-sm mb-3">{course.fullName}</p>
                  <p className="text-[#A8A29C] text-sm leading-relaxed line-clamp-3 mb-4 flex-1">{course.description}</p>
                  <a href="/contact" className="inline-flex items-center gap-2 text-[#C4A882] text-sm font-medium group/link mt-auto w-fit">
                    Learn More
                    <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="hidden md:flex justify-end gap-3 px-12 lg:px-24 mt-4">
          <button 
            onClick={() => scrollTrack('left')}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/5 hover:text-white transition-all focus:outline-none focus:ring-1 focus:ring-[#C4A882]/50 bg-black/20"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scrollTrack('right')}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/5 hover:text-white transition-all focus:outline-none focus:ring-1 focus:ring-[#C4A882]/50 bg-black/20"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

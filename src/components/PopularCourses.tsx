"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { siteCoursesData } from "@/data/siteData";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const coursePortfolioImages: Record<string, string> = {
  "ADVFX": "/portfolio/matte-painting/akshat-asolkar.jpg",
  "AD3D": "/portfolio/character-modeling/aarush-kumar-page1.jpg",
  "DGDI": "/portfolio/3d-game-asset/archita-roy-page1.jpg",
  "APDMD": "/portfolio/digital-painting/deshna-shah.jpg",
  "D3D": "/portfolio/character-modeling/abhay-suryavanshi.jpg",
  "VFXP": "/portfolio/matte-painting/biswabrata-dutta-page1.jpg",
};

export default function PopularCourses() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".courses-heading", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out" })
      .fromTo(".course-card", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" }, "-=0.6");
  }, { scope: containerRef });

  const scroll = (dir: 'left' | 'right') => {
    if (trackRef.current) {
      const amount = dir === 'left' ? -400 : 400;
      trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative bg-transparent py-24 md:py-40 overflow-hidden">
      <div className="atmosphere-blob blob-red top-1/2 left-0 opacity-10" />
      
      {/* Header */}
      <div className="courses-heading relative z-10 max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-[#C4A882] text-sm font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#C4A882]" />
              Master Your Craft
            </p>

            <h2 className="font-display font-bold text-[clamp(1.6rem,4vw,2.8rem)] text-[#F0EBE1] leading-[0.95] tracking-tight">
              Most Popular <span className="gradient-text">Programs</span>
            </h2>
          </div>
          
          <div className="hidden md:flex gap-4">
            <button onClick={() => scroll('left')} className="w-14 h-14 rounded-full glass border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-[#E31837]/30 transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scroll('right')} className="w-14 h-14 rounded-full glass border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-[#E31837]/30 transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Track */}
      <div className="relative z-10">
        <div
          ref={trackRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 lg:px-24 pb-12 no-scrollbar"
        >
          {siteCoursesData.popularCourses.map((course) => (
            <div
              key={course.code}
              className="course-card flex-shrink-0 w-[85vw] sm:w-[420px] snap-center"
            >
              <div className="group glass-card relative overflow-hidden transition-all duration-500 hover:border-[#E31837]/30 shadow-2xl">
                {/* Image */}
                <div className="h-[240px] relative overflow-hidden">
                  {coursePortfolioImages[course.code] ? (
                    <Image
                      src={coursePortfolioImages[course.code]}
                      alt={course.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#1c1c1c] flex items-center justify-center">
                       <span className="text-white/5 font-black text-8xl">{course.code}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full glass border border-white/10 text-[10px] font-bold tracking-widest text-[#C4A882] uppercase">
                      {course.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  <h3 className="font-display font-bold text-2xl text-white mb-2 group-hover:text-[#E31837] transition-colors">{course.name}</h3>
                  <p className="text-[#6B6560] text-xs font-bold uppercase tracking-wider mb-6">{course.fullName}</p>
                  <p className="text-[#A8A29C] text-sm leading-relaxed line-clamp-3 mb-8">{course.description}</p>
                  
                  <a href="/courses" className="inline-flex items-center gap-3 text-white text-xs font-bold tracking-[0.2em] uppercase group/btn">
                    Course Details
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-[#E31837] transition-all duration-500">
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import Link from "next/link";
import { siteCoursesData } from "@/data/siteData";
import { ArrowUpRight } from "lucide-react";

const CategoryIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactElement> = {
    animation: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="8" width="48" height="48" rx="4" />
        <line x1="20" y1="8" x2="20" y2="56" />
        <line x1="44" y1="8" x2="44" y2="56" />
        <line x1="8" y1="32" x2="56" y2="32" />
      </svg>
    ),
    digital: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="18" y="8" width="28" height="48" rx="4" />
        <polygon points="27,24 39,32 27,40" />
      </svg>
    ),
    gaming: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="18" width="52" height="28" rx="6" />
        <line x1="18" y1="32" x2="26" y2="32" />
        <circle cx="42" cy="28" r="2" fill="currentColor" />
      </svg>
    ),
    vfx: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="32 6 38.5 22.5 56 24.5 43 36 46.5 53 32 44.5 17.5 53 21 36 8 24.5 25.5 22.5" />
      </svg>
    ),
    motion: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M44 42H24a14 14 0 1 1 0-28h20" />
        <polyline points="52 24 44 14 52 24 44 34" />
      </svg>
    ),
    skill: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 54V38H16l16-20 16 20h-8v16H24z" />
      </svg>
    ),
    filmmaking: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="12" width="56" height="40" rx="4" />
        <line x1="4" y1="22" x2="60" y2="22" />
        <line x1="4" y1="42" x2="60" y2="42" />
        <line x1="16" y1="12" x2="16" y2="22" />
        <line x1="32" y1="12" x2="32" y2="22" />
        <line x1="48" y1="12" x2="48" y2="22" />
        <line x1="16" y1="42" x2="16" y2="52" />
        <line x1="32" y1="42" x2="32" y2="52" />
        <line x1="48" y1="42" x2="48" y2="52" />
        <polygon points="28,28 42,32 28,36" fill="currentColor" />
      </svg>
    ),
  };
  return icons[type] || icons.animation;
};

function SlideUpCard({ course }: { course: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  return (
    <div
      className="category-card relative aspect-[4/5] rounded-[32px] overflow-hidden cursor-pointer group bg-[#111111] border border-white/5 transition-all duration-500 hover:border-[#E31837]/30"
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
      onClick={() => isTouchDevice && setIsHovered(!isHovered)}
    >
      {/* Media Layer */}
      <div className="absolute inset-0 z-0">
        {course.image ? (
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] to-[#0c0c0c]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
        <div className="mb-6 transform transition-transform duration-500 group-hover:-translate-y-4">
          <div className="text-[#E31837] mb-6">
            <CategoryIcon type={course.icon} />
          </div>
          <h3 className="text-white font-display font-bold text-2xl md:text-3xl mb-2 leading-tight">{course.title}</h3>
          <p className="text-[#A8A29C] text-sm md:text-base line-clamp-2 transition-opacity duration-500 group-hover:opacity-0">{course.description}</p>
        </div>

        {/* Hover Details */}
        <div
          className={`absolute inset-0 bg-[#0C0C0C]/95 p-8 md:p-10 flex flex-col justify-center transition-all duration-1000 ease-expo-out`}
          style={{
            clipPath: isHovered ? 'circle(150% at 100% 100%)' : 'circle(0% at 100% 100%)',
          }}
        >
           <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6 border-l-2 border-[#E31837] pl-6">
             {course.fullDescription}
           </p>
           <div className="mb-8">
             <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-3">Your Future Roles</h4>
             <div className="flex flex-wrap gap-2">
               {course.careers.map((c: string) => (
                 <span key={c} className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/60 border border-white/10 px-3 py-1.5 rounded-full">
                   {c}
                 </span>
               ))}
             </div>
           </div>
           <Link href="/courses" className="inline-flex items-center gap-4 text-white text-[10px] font-bold tracking-[0.3em] uppercase group/link">
             Read More
             <div className="w-10 h-10 rounded-full bg-[#E31837] flex items-center justify-center transition-transform group-hover/link:scale-110">
               <ArrowUpRight size={16} />
             </div>
           </Link>
        </div>
      </div>
    </div>
  );
}

export default function CourseCategories() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".categories-heading", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out" })
      .fromTo(".category-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" }, "-=0.6");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="courses" className="relative py-24 md:py-40 overflow-hidden bg-[#0C0C0C]">
      <div className="atmosphere-blob blob-orange bottom-0 -left-20 opacity-5" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="categories-heading text-center mb-20 md:mb-28">
          <p className="text-[#E31837] text-sm font-bold tracking-[0.2em] uppercase mb-6 flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#E31837]" />
            Courses at MAAC
            <span className="w-6 h-[1px] bg-[#E31837]" />
          </p>
          <h2 className="font-display font-bold text-[clamp(1.6rem,4vw,2.8rem)] text-[#F0EBE1] leading-[0.95] tracking-tight">
            Explore Our <span className="gradient-text">Course Categories</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {siteCoursesData.categories.map((course) => (
            <SlideUpCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

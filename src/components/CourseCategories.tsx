"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { shouldAnimate } from "@/lib/animationUtils";
import Link from "next/link";
import { coursesData } from "@/data/siteData";

// SVG Icons per category
const CategoryIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactElement> = {
    animation: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="48" height="48" rx="4" />
        <line x1="20" y1="8" x2="20" y2="56" />
        <line x1="44" y1="8" x2="44" y2="56" />
        <line x1="8" y1="32" x2="56" y2="32" />
        <rect x="24" y="16" width="16" height="12" rx="2" strokeDasharray="4 2" />
      </svg>
    ),
    digital: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="18" y="8" width="28" height="48" rx="4" />
        <line x1="32" y1="48" x2="32" y2="48.01" />
        <polygon points="27,24 39,32 27,40" />
      </svg>
    ),
    gaming: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="18" width="52" height="28" rx="6" />
        <line x1="18" y1="32" x2="26" y2="32" />
        <line x1="22" y1="28" x2="22" y2="36" />
        <circle cx="42" cy="28" r="2" fill="currentColor" />
        <circle cx="48" cy="32" r="2" fill="currentColor" />
      </svg>
    ),
    vfx: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="32 6 38.5 22.5 56 24.5 43 36 46.5 53 32 44.5 17.5 53 21 36 8 24.5 25.5 22.5" />
        <circle cx="32" cy="32" r="8" strokeDasharray="4 2" />
      </svg>
    ),
    motion: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M44 42H24a14 14 0 1 1 0-28h20" />
        <polyline points="52 24 44 14 52 24 44 34" />
        <line x1="28" y1="32" x2="52" y2="32" />
      </svg>
    ),
    skill: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 54V38H16l16-20 16 20h-8v16H24z" />
        <line x1="24" y1="54" x2="40" y2="54" />
      </svg>
    ),
  };
  return icons[type] || icons.animation;
};

interface SlideCardProps {
  course: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    fullDescription: string;
    icon: string;
    image?: string;
    careers: string[];
  };
  index: number;
}

function SlideUpCard({ course }: SlideCardProps) {
  const [isTapped, setIsTapped] = useState(false);

  return (
    <div
      className="category-card-item relative w-full min-h-[360px] md:min-h-[480px] rounded-2xl overflow-hidden cursor-pointer group"
      onClick={() => setIsTapped(prev => !prev)}
    >
      {/* Top section — dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#161616] to-[#0C0C0C]" />

      {/* Icon/Image area (top 60%) */}
      <div className="relative z-10 h-[60%] flex items-center justify-center pt-8">
        {course.image ? (
          <div className="relative w-full h-full px-8 py-4">
            <Image
              src={course.image}
              alt={`${course.title} course`}
              fill
              className="object-contain rounded-xl"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ) : (
          <div className="text-[#C4A882]/60 group-hover:text-[#C4A882] transition-colors duration-300">
            <CategoryIcon type={course.icon} />
          </div>
        )}
      </div>

      {/* Bottom red section — always visible */}
      <div className={`absolute bottom-0 left-0 right-0 h-[40%] bg-[#E31837] flex flex-col justify-center p-6 z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isTapped ? '-translate-y-[60%]' : 'group-hover:-translate-y-[60%]'
      }`}>
        <h3 className="text-white font-display font-bold text-xl md:text-2xl mb-1">{course.title}</h3>
        <p className="text-white/70 text-sm">{course.description}</p>
      </div>

      {/* Slide-up panel with details */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-[#0C0C0C]/95 backdrop-blur-sm p-6 z-20 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isTapped ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'
        }`}
      >
        <p className="text-[#A8A29C] text-sm leading-relaxed mb-3">{course.fullDescription}</p>
        <div className="mb-4">
          <p className="text-[#E31837] text-xs font-semibold uppercase tracking-wider mb-2">Career Options</p>
          <div className="flex flex-wrap gap-1.5">
            {course.careers.map((c) => (
              <span key={c} className="text-xs text-[#6B6560] bg-white/5 border border-white/10 px-2 py-1 rounded">{c}</span>
            ))}
          </div>
        </div>
        <Link href="/courses" className="btn btn-primary text-xs py-2 px-5">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default function CourseCategories() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate()) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.category-card-item');
      if (cards.length > 0) {
        gsap.fromTo(cards, 
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "expo.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="courses" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #0C0C0C 0%, #17110C 50%, #0C0C0C 100%)" }}>
      <div className="atmosphere-blob blob-orange" style={{ bottom: "-100px", left: "-100px" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase mb-4">Our Courses</p>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#F0EBE1] leading-[1.05] tracking-tight mb-4">
            Courses at <span className="gradient-text-warm">MAAC</span>
          </h2>
          <p className="text-[#A8A29C] text-lg max-w-2xl mx-auto">
            Step into the world of Animation, VFX, Gaming, Filmmaking, and Digital Media.
          </p>
        </div>

        {/* Cards Grid — 1col mobile, 2col tablet, 3col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {coursesData.categories.map((course, index) => (
            <SlideUpCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

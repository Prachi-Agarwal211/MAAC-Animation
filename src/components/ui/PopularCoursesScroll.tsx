"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, Clock } from "lucide-react";

interface Course {
  code: string;
  name: string;
  fullName: string;
  description: string;
  duration: string;
}

interface PopularCoursesScrollProps {
  courses: Course[];
  courseImages: Record<string, string>;
}

export default function PopularCoursesScroll({ courses, courseImages }: PopularCoursesScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (trackRef.current) {
      const amount = dir === 'left' ? -400 : 400;
      trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <div className="hidden md:flex gap-4 absolute -top-16 right-6 z-20">
        <button onClick={() => scroll('left')} aria-label="Scroll courses left" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#C4A882]/40 hover:bg-[#C4A882]/5 transition-all group/arrow">
          <ChevronLeft size={20} className="group-hover/arrow:-translate-x-0.5 transition-transform" />
        </button>
        <button onClick={() => scroll('right')} aria-label="Scroll courses right" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#C4A882]/40 hover:bg-[#C4A882]/5 transition-all group/arrow">
          <ChevronRight size={20} className="group-hover/arrow:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Scroll Track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-5 md:px-12 lg:px-24 pb-8 no-scrollbar"
      >
        {courses.map((course) => (
          <div
            key={course.code}
            className="flex-shrink-0 w-[85vw] sm:w-[380px] snap-center group"
          >
            {/* Card — Reference: Outfit product card style */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/[0.06] transition-all duration-500 hover:border-[#C4A882]/20 hover:shadow-[0_0_40px_-10px_rgba(196,168,130,0.08)]">
              {/* Image Container */}
              <div className="relative h-[220px] overflow-hidden">
                {courseImages[course.code] ? (
                  <>
                    <Image
                      src={courseImages[course.code]}
                      alt={course.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    {/* Always-visible gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a0000] to-[#0a0a0a] flex items-center justify-center">
                    <span className="text-white/[0.03] font-black text-[8rem] select-none">{course.code}</span>
                  </div>
                )}
                
                {/* Duration Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-bold tracking-wider text-[#C4A882] uppercase">
                    <Clock size={10} className="text-[#C4A882]/70" />
                    {course.duration}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-7">
                {/* Course Code — subtle */}
                <span className="text-[10px] font-mono text-white/20 tracking-[0.15em] uppercase">{course.code}</span>
                
                {/* Title */}
                <h3 className="font-display text-white text-base md:text-lg mt-1 mb-0.5 font-bold leading-tight group-hover:text-[#C4A882] transition-colors duration-500">
                  {course.name}
                </h3>
                
                {/* Full Name */}
                <p className="text-white/85 text-xs font-medium tracking-wide mb-4">{course.fullName}</p>
                
                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-6">{course.description}</p>
                
                {/* CTA */}
                <a href="/courses" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 hover:text-[#C4A882] transition-all duration-300 group/btn">
                  <span className="relative">
                    Course Details
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#C4A882] transition-all duration-300 group-hover/btn:w-full" />
                  </span>
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

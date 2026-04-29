"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface Course {
  code: string;
  name: string;
  fullName: string;
  description: string;
  duration: string;
}

interface PopularCoursesScrollProps {
  courses: Course[];
  coursePortfolioImages: Record<string, string>;
}

export default function PopularCoursesScroll({ courses, coursePortfolioImages }: PopularCoursesScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (trackRef.current) {
      const amount = dir === 'left' ? -400 : 400;
      trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="hidden md:flex gap-4 absolute top-0 right-6 z-20">
        <button onClick={() => scroll('left')} className="w-14 h-14 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:text-white hover:border-[#FFD700]/40 transition-all group/arrow">
          <ChevronLeft size={24} className="group-hover/arrow:scale-110 transition-transform" />
        </button>
        <button onClick={() => scroll('right')} className="w-14 h-14 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:text-white hover:border-[#FFD700]/40 transition-all group/arrow">
          <ChevronRight size={24} className="group-hover/arrow:scale-110 transition-transform" />
        </button>
      </div>

      <div className="relative z-10">
        <div
          ref={trackRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-5 md:px-12 lg:px-24 pb-12 no-scrollbar"
        >
          {courses.map((course) => (
            <div
              key={course.code}
              className="course-card flex-shrink-0 w-[85vw] sm:w-[420px] snap-center"
            >
              <div className="group glass-card relative overflow-hidden transition-all duration-500 hover:border-[#FFD700]/30 shadow-2xl">
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
                    <div className="absolute inset-0 bg-[#1a0000] flex items-center justify-center">
                       <span className="text-white/5 font-black text-[#F0EBE1] text-xs xl:text-[5rem]">{course.code}</span>
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
                  <h3 className="font-display text-[#F0EBE1] text-sm md:text-base mb-2 group-hover:text-[#FFD700] transition-colors font-bold uppercase leading-none tracking-tight">{course.name}</h3>
                  <p className="text-[#6B6560] text-xs font-bold uppercase tracking-wider mb-6">{course.fullName}</p>
                  <p className="text-[#A8A29C] text-sm leading-relaxed line-clamp-3 mb-8">{course.description}</p>
                  
                  <a href="/courses" className="inline-flex items-center gap-3 text-white text-xs font-bold tracking-[0.2em] uppercase group/btn">
                    Course Details
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-[#FFD700] transition-all duration-500">
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}




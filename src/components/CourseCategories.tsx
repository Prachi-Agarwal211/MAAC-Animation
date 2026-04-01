"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { coursesData } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

interface FlipCardProps {
  course: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    fullDescription: string;
    image: string;
    icon: string;
    careers: string[];
  };
  index: number;
}

function FlipCard({ course, index }: FlipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="flip-card-container relative w-full aspect-[3/4] cursor-pointer perspective-1000 group"
    >
      <div
        className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-x-180"
      >
        {/* Front Side - Dark Theme with Red Box */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl bg-[#0a0a0a] border-2 border-transparent group-hover:border-[#FFD700] transition-border duration-300">
          {/* Dark Image Section with subtle gradient */}
          <div className="relative h-3/5 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-300">{course.icon}</span>
            </div>
            {/* Subtle red glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/30 to-transparent" />
          </div>

          {/* Red Info Box */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-[#8B0000] rounded-b-2xl p-6 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-bold text-[#FFD700] mb-2">
              {course.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>

        {/* Back Side - Flipped Content (Full Red with all details) */}
        <div className="absolute inset-0 backface-hidden rotate-x-180 rounded-2xl overflow-hidden shadow-2xl bg-[#8B0000] p-6 md:p-8 border-2 border-[#FFD700]">
          <div className="h-full flex flex-col justify-center text-center overflow-y-auto">
            <div className="text-5xl mb-4">{course.icon}</div>
            <h3 className="text-xl md:text-2xl font-bold text-[#FFD700] mb-3">
              {course.title}
            </h3>
            <p className="text-[#FFD700] text-xs md:text-sm font-medium mb-4">
              {course.subtitle}
            </p>
            <p className="text-gray-200 text-sm leading-relaxed mb-4">
              {course.fullDescription}
            </p>
            
            {/* Career Options */}
            <div className="mb-4">
              <p className="text-[#FFD700] text-xs font-semibold mb-2 uppercase tracking-wider">Career Options</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {course.careers.map((career, idx) => (
                  <span key={idx} className="text-xs text-gray-300 bg-black/20 px-2 py-1 rounded">
                    {career}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-block py-2 md:py-3 px-6 md:px-8 border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#8B0000] font-semibold rounded-xl text-center transition-all duration-300 text-sm md:text-base"
              onClick={(e) => e.stopPropagation()}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CourseCategories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-black"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -left-48 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-medium tracking-wider uppercase mb-4">
            Our Courses
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Courses at <span className="gradient-text">MAAC</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Step into the world of Animation, VFX, Gaming, Filmmaking, and
            Digital Media. You don&apos;t just learn at MAAC — you create,
            innovate, and become job-ready.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {coursesData.categories.map((course, index) => (
            <FlipCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>

      {/* Custom CSS for flip animations */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-x-180 {
          transform: rotateX(180deg);
        }
      `}</style>
    </section>
  );
}

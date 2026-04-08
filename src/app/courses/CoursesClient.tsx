"use client";

import { useState, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Link from "next/link";
import Footer from "@/components/Footer";
import { siteCoursesData } from "@/data/siteData";
import { getCourseSchema, breadcrumbSchema } from "@/lib/structured-data";

interface FlipCardProps {
  course: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    fullDescription: string;
    icon: string;
    careers: string[];
  };
  index: number;
}

function FlipCard({ course, index }: FlipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped(prev => !prev);
    }
  };

  return (
    <div
      ref={cardRef}
      className="flip-card-container relative w-full aspect-[3/4] cursor-pointer perspective-1000 group"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(prev => !prev)}
      role="button"
      aria-pressed={isFlipped}
      aria-label={`${course.title} - ${course.description}`}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-x-180' : ''}`}
      >
        {/* Front Side - Dark Theme with Red Box */}
        <div className={`absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl bg-[#0a0a0a] border-2 transition-border duration-300 ${isFlipped ? 'border-[#E31837]' : 'border-transparent'}`}>
          {/* Dark Image Section with subtle gradient */}
          <div className="relative h-3/5 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-7xl transition-all duration-300 ${isFlipped ? 'opacity-80 scale-110' : 'opacity-60'}`}>{course.icon}</span>
            </div>
            {/* Subtle red glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#E31837]/30 to-transparent" />
          </div>

          {/* Red Info Box */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-[#E31837] rounded-b-2xl p-6 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
              {course.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>

        {/* Back Side - Flipped Content (Full Red with all details) */}
        <div className="absolute inset-0 backface-hidden rotate-x-180 rounded-2xl overflow-hidden shadow-2xl bg-[#161616] p-6 md:p-8 border-2 border-[#E31837]">
          <div className="h-full flex flex-col justify-center text-center overflow-y-auto">
            <div className="text-5xl mb-4">{course.icon}</div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-[#f5f0e8] mb-3">
              {course.title}
            </h3>
            <p className="text-[#E31837] text-xs md:text-sm font-medium mb-4">
              {course.subtitle}
            </p>
            <p className="text-gray-200 text-sm leading-relaxed mb-4">
              {course.fullDescription}
            </p>

            {/* Career Options */}
            <div className="mb-4">
              <p className="text-[#E31837] text-xs font-semibold mb-2 uppercase tracking-wider">Career Options</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {course.careers.map((career, idx) => (
                  <span key={idx} className="text-xs text-[#6b6b6b] bg-white/5 border border-white/10 px-2 py-1 rounded">
                    {career}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-block py-2 md:py-3 px-6 md:px-8 border-2 border-[#E31837] text-[#E31837] hover:bg-[#E31837] hover:text-white font-semibold rounded-xl text-center transition-all duration-300 text-sm md:text-base"
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

export default function CoursesClient() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".courses-hero-content",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
        }
      );
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Refresh ScrollTrigger after all flip cards mount
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main ref={pageRef} className="overflow-hidden bg-[#080808]">
      {/* Structured Data - Course Schema for each program */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": siteCoursesData.popularCourses.map((course, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": getCourseSchema(course.fullName, course.description, course.duration)
            }))
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: "https://www.maacanimationjaipur.com" },
            { name: "Courses", url: "https://www.maacanimationjaipur.com/courses" },
          ])),
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-[#080808]">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 courses-hero-content">
          <p className="text-[#E31837] text-xs font-inter font-semibold tracking-[0.2em] uppercase mb-4">
            Explore Programs
          </p>
          <h1 className="font-display font-extrabold text-[clamp(2.5rem,5vw,5rem)] text-[#f5f0e8] leading-[1.05] tracking-tight mb-6">
            MAAC Courses
          </h1>
          <h2 className="text-2xl sm:text-3xl text-[#6b6b6b] mb-6">
            Find the Right Fit for Your Future
          </h2>
          <p className="text-[#6b6b6b] text-lg md:text-xl max-w-3xl leading-relaxed hero-subtitle">
            Get globally recognized training through MESC and NSDC - and build
            skills that set you apart.
          </p>
        </div>
      </section>

      {/* Flip Cards Grid */}
      <section className="relative pb-24">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {siteCoursesData.categories.map((course, index) => (
              <FlipCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

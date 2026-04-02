"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { coursesData } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

const courseGradients = [
  "linear-gradient(135deg, #1a0505 0%, #0C0C0C 100%)",
  "linear-gradient(135deg, #0a1a0a 0%, #0C0C0C 100%)",
  "linear-gradient(135deg, #0a0a1a 0%, #0C0C0C 100%)",
  "linear-gradient(135deg, #1a1a05 0%, #0C0C0C 100%)",
  "linear-gradient(135deg, #0a0f1a 0%, #0C0C0C 100%)",
  "linear-gradient(135deg, #1a0a10 0%, #0C0C0C 100%)",
];

export default function PopularCourses() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".pc-heading", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      if (trackRef.current) {
        gsap.fromTo(trackRef.current.children, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "expo.out",
          scrollTrigger: { trigger: trackRef.current, start: "top 80%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const cardWidth = el.firstElementChild?.clientWidth || 0;
    const gap = 24;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, coursesData.popularCourses.length - 1));
  };

  const scrollBy = (dir: number) => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.firstElementChild?.clientWidth || 0;
    trackRef.current.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-[#0C0C0C]">
      <div className="atmosphere-blob blob-red" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", opacity: 0.06 }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="pc-heading text-center mb-16">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase mb-4">Master Your Craft</p>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#F0EBE1] leading-[1.05] tracking-tight mb-4">
            Popular <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-[#A8A29C] text-lg max-w-2xl mx-auto">
            Master industry-standard tools and techniques with our most sought-after programs
          </p>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="relative">
          {/* Prev/Next arrows — desktop */}
          <button
            onClick={() => scrollBy(-1)}
            className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 hscroll-container"
          >
            {coursesData.popularCourses.map((course, index) => (
              <div
                key={course.name}
                className="hscroll-card flex-shrink-0 w-[85vw] sm:w-[360px] lg:w-[340px] snap-start"
              >
                <div className="glass-card rounded-2xl overflow-hidden h-[480px] flex flex-col">
                  {/* Top image section */}
                  <div
                    className="h-[200px] relative flex items-center justify-center"
                    style={{ background: courseGradients[index % courseGradients.length] }}
                  >
                    <div className="text-[#E31837]/30 font-display font-extrabold text-5xl">{course.code || course.name}</div>
                  </div>

                  {/* Bottom content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="inline-block w-fit px-3 py-1 rounded-full bg-[#E31837]/10 text-[#E31837] text-xs font-medium mb-3">
                      {course.duration}
                    </span>
                    <h3 className="font-display font-bold text-xl text-[#F0EBE1] mb-0.5">{course.name}</h3>
                    <p className="text-[#6B6560] text-sm mb-3">{course.fullName}</p>
                    <p className="text-[#A8A29C] text-sm leading-relaxed line-clamp-3 mb-4 flex-1">{course.description}</p>
                    <a href="/contact" className="inline-flex items-center gap-2 text-[#E31837] text-sm font-medium group/link">
                      Learn More
                      <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {coursesData.popularCourses.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-[#E31837] w-6" : "bg-white/20"
                }`}
                onClick={() => {
                  if (trackRef.current) {
                    const cardWidth = trackRef.current.firstElementChild?.clientWidth || 0;
                    trackRef.current.scrollTo({ left: i * (cardWidth + 24), behavior: "smooth" });
                  }
                }}
                aria-label={`Go to course ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

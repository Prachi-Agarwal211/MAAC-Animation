"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { coursesData } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function PopularCourses() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (trackRef.current) {
        gsap.fromTo(
          trackRef.current.children,
          { opacity: 0, y: 60, rotateY: 15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-medium tracking-wider uppercase mb-4">
            Master Your Craft
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Popular <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Master industry-standard tools and techniques with our most
            sought-after programs
          </p>
        </div>

        {/* Courses Grid */}
        <div
          ref={trackRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {coursesData.popularCourses.map((course, index) => (
            <div
              key={course.name}
              className="glass-card rounded-3xl overflow-hidden group"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Image placeholder */}
              <div className="image-placeholder h-48 rounded-none border-0 border-b border-white/5">
                <div className="text-center">
                  <div className="text-4xl mb-2 opacity-50">
                    {index % 3 === 0 ? "🎥" : index % 3 === 1 ? "🎨" : "🎮"}
                  </div>
                  <span className="text-xs">Add {course.name} Course Image</span>
                </div>
              </div>

              <div className="p-6">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {course.duration}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-white mb-1 group-hover:text-primary transition-colors duration-300">
                  {course.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{course.fullName}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {course.description}
                </p>

                <button className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  Learn More
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const workItems = [
  { title: "3D Animation Project", category: "Animation" },
  { title: "VFX Compositing", category: "Visual Effects" },
  { title: "Game Environment", category: "Gaming" },
  { title: "Character Design", category: "Animation" },
  { title: "Motion Graphics", category: "Digital Media" },
  { title: "Short Film", category: "Filmmaking" },
];

export default function StudentWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, scale: 0.85, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: gridRef.current,
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
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-dark to-dark-50"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-medium tracking-wider uppercase mb-4">
            Student Showcase
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Student <span className="gradient-text">Work</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore the incredible creations by our students — from 3D animations
            to stunning VFX sequences
          </p>
        </div>

        {/* Work Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {workItems.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden glass-card"
            >
              {/* Image placeholder */}
              <div
                className="image-placeholder aspect-[4/3] rounded-none border-0"
              >
                <div className="text-center">
                  <div className="text-5xl mb-3 opacity-40">
                    {index % 3 === 0 ? "🎬" : index % 3 === 1 ? "✨" : "🎮"}
                  </div>
                  <span className="text-xs block">Add Student Work Image</span>
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Recommended: 800x600px
                  </span>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-primary text-xs font-medium uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h3 className="text-white font-heading font-semibold text-lg">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

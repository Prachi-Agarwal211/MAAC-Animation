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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sw-heading", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(".sw-card", { opacity: 0, scale: 0.85, y: 40 }, {
        opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "expo.out",
        scrollTrigger: { trigger: ".sw-grid", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sw-heading text-center mb-16">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase mb-4">Student Showcase</p>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#F0EBE1] leading-[1.05] tracking-tight mb-4">
            Student <span className="gradient-text">Work</span>
          </h2>
          <p className="text-[#A8A29C] text-lg max-w-2xl mx-auto">
            Explore the incredible creations by our students
          </p>
        </div>

        <div className="sw-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workItems.map((item, index) => (
            <div key={index} className="sw-card group relative rounded-2xl overflow-hidden glass-card">
              <div className="image-placeholder aspect-[4/3] rounded-none border-0">
                <div className="text-center">
                  <span className="text-xs block text-[#6B6560]">{item.title}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-[#0C0C0C]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-[#E31837] text-xs font-medium uppercase tracking-wider mb-1">{item.category}</span>
                <h3 className="text-[#F0EBE1] font-display font-semibold text-lg">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

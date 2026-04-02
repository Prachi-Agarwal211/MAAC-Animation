"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: "Nilee Games" },
  { name: "Mugafi" },
  { name: "Autodesk" },
  { name: "Canon" },
  { name: "Copperseed Games" },
  { name: "Pixel:Ratio" },
  { name: "Cedge Productions" },
  { name: "Physics Wallah" },
  { name: "Zebu" },
  { name: "Resonance Digital" },
  { name: "Cimpress" },
  { name: "PhantomFX" },
  { name: "Tech Mahindra" },
  { name: "Postify" },
  { name: "LFX" },
];

export default function IndustryPartners() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
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
      className="relative py-16 md:py-20 overflow-hidden bg-[#080808]"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#f5f0e8] mb-2"
        >
          Our Industry <span className="gradient-text">Partners</span>
        </h2>
        <p className="text-center text-[#E31837] text-xs font-ui font-semibold tracking-[0.2em] uppercase mb-8">
          Knowledge Partners
        </p>

        {/* Partners Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4"
        >
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="glass-card rounded-xl p-4 flex items-center justify-center aspect-[4/3] group hover:border-primary/50 hover:scale-105 transition-all duration-300"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs text-gray-500 text-center group-hover:text-primary transition-colors duration-300">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

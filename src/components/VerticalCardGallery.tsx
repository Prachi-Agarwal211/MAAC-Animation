"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardItems = [
  { id: 1, title: "Transformative Educational Events" },
  { id: 2, title: "Learn from Industry Game Changers" },
  { id: 3, title: "Exclusive Industry Exposure" },
  { id: 4, title: "Portfolio that speaks volumes" },
  { id: 5, title: "Industry-Grade Facilities" },
  { id: 6, title: "Courses Built For Future" },
  { id: 7, title: "Creative Careers That Click" },
];

const placeholderImages = [
  "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  "https://images.unsplash.com/photo-1560420025-9e93a405c8b3?w=800&q=80",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
];

export default function VerticalCardGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(3);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".vcg-eyebrow", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".vcg-section", start: "top 75%" },
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".vcg-section", start: "top 75%" },
      });
      tl.fromTo(".vcg-title", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" })
        .fromTo(".vcg-description", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out" }, "-=0.8");

      gsap.fromTo(".vcg-card", { opacity: 0, scaleY: 0, transformOrigin: "bottom" }, {
        opacity: 1, scaleY: 1, duration: 1.2, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".vcg-cards-container", start: "top 80%" },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (imageContainerRef.current) {
      gsap.fromTo(imageContainerRef.current, { opacity: 0, scale: 1.05 }, {
        opacity: 1, scale: 1, duration: 0.5, ease: "expo.out",
      });
    }
  }, [activeIndex]);

  const handleCardClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  return (
    <div ref={containerRef} id="vertical-gallery" className="vcg-section relative bg-[#111111] py-24 md:py-32 overflow-hidden">
      {/* Atmospheric blob */}
      <div className="atmosphere-blob blob-red" style={{ top: "-100px", right: "-100px" }} />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 z-10">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <p className="vcg-eyebrow text-[#E31837] text-xs md:text-sm font-semibold tracking-[0.15em] uppercase mb-6">
            Empower Your Future
          </p>
          <h2 className="vcg-title font-display font-bold text-[clamp(2.5rem,6vw,7rem)] leading-[0.9] tracking-tight mb-2 text-[#F0EBE1]">
            Creative Careers That Click
          </h2>
          <h2 className="vcg-title font-display font-bold text-[clamp(2.5rem,6vw,7rem)] leading-[0.9] tracking-tight mb-6 text-[#E31837]">
            Think MAAC
          </h2>
          <p className="vcg-description text-[#A8A29C] text-base leading-relaxed max-w-3xl">
            Train in animation, VFX, gaming, and digital content creation with expert-led courses that prepare you for real industry success.
          </p>
        </div>

        {/* Gallery — Desktop */}
        <div className="vcg-cards-container hidden md:flex items-center justify-center gap-4 lg:gap-6">
          <div className="flex gap-2 lg:gap-3">
            {cardItems.slice(0, 3).map((item, index) => (
              <div
                key={item.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`vcg-card group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-out ${
                  activeIndex === index ? "w-[260px]" : "w-[112px]"
                } h-[500px] lg:h-[600px]`}
                onClick={() => handleCardClick(index)}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title}`}
              >
                <div className="absolute inset-0 bg-[#E31837] transition-all duration-500 group-hover:bg-[#D42026]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3
                    className="text-white font-display font-bold text-lg text-center uppercase tracking-wide"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                  >
                    {item.title}
                  </h3>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-[#E31837] transform transition-transform duration-500 ${
                  activeIndex === index ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                }`} />
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div className="relative w-[400px] lg:w-[480px] h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <div
              ref={imageContainerRef}
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url(${placeholderImages[activeIndex]})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="inline-block text-[#E31837] text-xs font-semibold tracking-wider uppercase mb-3">
                {cardItems[activeIndex].title}
              </span>
              <div className="h-0.5 w-16 bg-[#E31837]" />
            </div>
          </div>

          <div className="flex gap-2 lg:gap-3">
            {cardItems.slice(3, 7).map((item, index) => {
              const realIndex = index + 3;
              return (
                <div
                  key={item.id}
                  ref={(el) => { cardsRef.current[realIndex] = el; }}
                  className={`vcg-card group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-out ${
                    activeIndex === realIndex ? "w-[260px]" : "w-[112px]"
                  } h-[500px] lg:h-[600px]`}
                  onClick={() => handleCardClick(realIndex)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${item.title}`}
                >
                  <div className="absolute inset-0 bg-[#E31837] transition-all duration-500 group-hover:bg-[#D42026]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3
                      className="text-white font-display font-bold text-lg text-center uppercase tracking-wide"
                      style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-[#E31837] transform transition-transform duration-500 ${
                    activeIndex === realIndex ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                  }`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile — Horizontal Scroll */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide hscroll-container">
            {cardItems.map((item, index) => (
              <div
                key={item.id}
                className={`hscroll-card flex-shrink-0 w-[280px] h-[380px] rounded-2xl overflow-hidden cursor-pointer snap-center transition-all duration-300 ${
                  activeIndex === index ? "ring-2 ring-[#E31837]" : ""
                }`}
                onClick={() => handleCardClick(index)}
              >
                <div className="relative h-full bg-[#E31837]">
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <h3 className="text-white font-display font-bold text-lg text-center uppercase tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[#6B6560] text-sm text-center mt-4 flex items-center justify-center gap-2">
            <span>Swipe</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </p>
        </div>
      </div>
    </div>
  );
}

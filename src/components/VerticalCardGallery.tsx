'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CardItem {
  id: number;
  title: string;
  image: string;
}

const cardItems: CardItem[] = [
  {
    id: 1,
    title: 'Transformative Educational Events',
    image: '/gallery/events.svg',
  },
  {
    id: 2,
    title: 'Learn from Industry Game Changers',
    image: '/gallery/industry.svg',
  },
  {
    id: 3,
    title: 'Exclusive Industry Exposure',
    image: '/gallery/exposure.svg',
  },
  {
    id: 4,
    title: 'Portfolio that speaks volumes',
    image: '/gallery/portfolio.svg',
  },
  {
    id: 5,
    title: 'Industry-Grade Facilities',
    image: '/gallery/facilities.svg',
  },
  {
    id: 6,
    title: 'Courses Build For Future',
    image: '/gallery/future.svg',
  },
  {
    id: 7,
    title: 'Creative Careers That Click',
    image: '/gallery/careers.svg',
  },
];

// Placeholder images - replace with actual paths
const placeholderImages = [
  'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  'https://images.unsplash.com/photo-1560420025-9e93a405c8b3?w=800&q=80',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
];

export default function VerticalCardGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(3); // Default to middle card
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.vcg-eyebrow',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.vcg-section',
            start: 'top 75%',
          },
        }
      );

      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.vcg-section',
          start: 'top 75%',
        },
      });

      headerTl.fromTo(
        '.vcg-title',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
        },
        '-=0.6'
      ).fromTo(
        '.vcg-subtitle',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.8'
      ).fromTo(
        '.vcg-description',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.9'
      );

      // Cards stagger in
      gsap.fromTo(
        '.vcg-card',
        {
          opacity: 0,
          scaleY: 0,
          transformOrigin: 'bottom',
        },
        {
          opacity: 1,
          scaleY: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.vcg-cards-container',
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Image transition animation
  useEffect(() => {
    if (imageContainerRef.current) {
      const tl = gsap.timeline();

      // Fade out current image
      tl.to(imageContainerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.4,
        ease: 'expo.in',
      });

      // Update image source and fade in
      tl.call(() => {
        if (imageContainerRef.current) {
          imageContainerRef.current.style.backgroundImage = `url(${placeholderImages[activeIndex]})`;
        }
      });

      // Fade in new image
      tl.to(imageContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'expo.out',
      });
    }
  }, [activeIndex]);

  const handleCardClick = (index: number) => {
    if (index === activeIndex) return;

    setActiveIndex(index);

    // Card animation
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: 'expo.out',
      });

      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        delay: 0.2,
        ease: 'expo.out',
      });
    }
  };

  return (
    <div ref={containerRef} className="vcg-section relative bg-[#080808] py-24 md:py-32 overflow-hidden">
      {/* Container */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <p className="vcg-eyebrow text-[#E31837] text-xs md:text-sm font-ui font-semibold tracking-[0.2em] uppercase mb-6">
            Empower Your Future
          </p>
          <h2 className="vcg-title font-display font-bold text-[clamp(2.5rem,6vw,7rem)] leading-[0.9] tracking-tight mb-4 text-[#f5f0e8]">
            Creative Careers That Click
          </h2>
          <h2 className="vcg-title font-display font-bold text-[clamp(2.5rem,6vw,7rem)] leading-[0.9] tracking-tight mb-6 text-[#E31837]">
            Think MAAC
          </h2>
          <p className="vcg-description text-gray-400 text-sm md:text-base leading-relaxed max-w-3xl">
            Train in animation, VFX, gaming, and digital content creation with expert-led
            courses that prepare you for real industry success.
          </p>
        </div>

        {/* Gallery Layout */}
        <div className="vcg-cards-container relative flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
          {/* Left Cards (1-3) */}
          <div className="flex gap-2 md:gap-3 lg:gap-4">
            {cardItems.slice(0, 3).map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`vcg-card group relative w-16 sm:w-20 md:w-24 lg:w-28 h-[400px] sm:h-[500px] md:h-[600px] cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-out ${
                  activeIndex === index
                    ? 'ring-2 ring-[#E31837] ring-offset-4 ring-offset-[#080808]'
                    : ''
                }`}
                onClick={() => handleCardClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title}`}
              >
                {/* Red Background */}
                <div className="absolute inset-0 bg-[#C4161C] transition-all duration-500 group-hover:bg-[#D42026]" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3
                    className={`text-white font-display font-bold text-sm sm:text-base md:text-lg lg:text-xl text-center uppercase tracking-wide writing-vertical-rl transform rotate-180 transition-all duration-500 ${
                      activeIndex === index ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                    }`}
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Active Indicator */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-[#E31837] transform transition-transform duration-500 ease-out ${
                    activeIndex === index ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Center Image Display */}
          <div className="relative w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px] h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <div
              ref={imageContainerRef}
              className="vcg-main-image absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ease-out"
              style={{
                backgroundImage: `url(${placeholderImages[activeIndex]})`,
              }}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Active Card Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="inline-block text-[#E31837] text-xs font-ui font-semibold tracking-wider uppercase mb-3">
                {cardItems[activeIndex].title}
              </span>
              <div className="h-0.5 w-16 bg-[#E31837]" />
            </div>
          </div>

          {/* Right Cards (4-6) */}
          <div className="flex gap-2 md:gap-3 lg:gap-4">
            {cardItems.slice(3, 7).map((item, index) => {
              const realIndex = index + 3;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardsRef.current[realIndex] = el;
                  }}
                  className={`vcg-card group relative w-16 sm:w-20 md:w-24 lg:w-28 h-[400px] sm:h-[500px] md:h-[600px] cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-out ${
                    activeIndex === realIndex
                      ? 'ring-2 ring-[#E31837] ring-offset-4 ring-offset-[#080808]'
                      : ''
                  }`}
                  onClick={() => handleCardClick(realIndex)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(realIndex);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${item.title}`}
                >
                  {/* Red Background */}
                  <div className="absolute inset-0 bg-[#C4161C] transition-all duration-500 group-hover:bg-[#D42026]" />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3
                      className={`text-white font-display font-bold text-sm sm:text-base md:text-lg lg:text-xl text-center uppercase tracking-wide transition-all duration-500 ${
                        activeIndex === realIndex ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                      }`}
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Active Indicator */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-[#E31837] transform transition-transform duration-500 ease-out ${
                      activeIndex === realIndex ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Carousel Version */}
      <div className="md:hidden mt-16 px-6">
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
          {cardItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex-shrink-0 w-[280px] h-[400px] rounded-2xl overflow-hidden cursor-pointer snap-center transition-all duration-300 ${
                activeIndex === index ? 'ring-2 ring-[#E31837]' : ''
              }`}
              onClick={() => handleCardClick(index)}
            >
              <div className="absolute inset-0 bg-[#C4161C]" />
              <div className="relative h-full flex items-center justify-center p-6">
                <h3
                  className="text-white font-display font-bold text-lg text-center uppercase tracking-wide"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                  }}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-sm text-center mt-4">Swipe to explore</p>
      </div>
    </div>
  );
}

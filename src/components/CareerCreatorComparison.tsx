'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CareerCreatorComparison() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header content reveal
      gsap.fromTo(
        '.ccc-header-content',
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.ccc-section',
            start: 'top 75%',
          },
        }
      );

      // Header image reveal with timeline
      const headerImageTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.ccc-section',
          start: 'top 75%',
        },
      });

      headerImageTl.fromTo(
        '.ccc-header-image',
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.6'
      );

      // Cards reveal
      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.ccc-cards',
          start: 'top 80%',
        },
      });

      cardsTl.fromTo(
        '.ccc-card-career',
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'expo.out',
        },
        0
      ).fromTo(
        '.ccc-card-creator',
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'expo.out',
        },
        0.2
      );

      // Animate bullet points
      gsap.fromTo(
        '.ccc-bullet',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.ccc-cards',
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="ccc-section relative bg-[#080808] py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0a0a0a] to-[#080808]" />
      
      {/* Container */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header with Image */}
        <div className="mb-8 md:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="ccc-header-content lg:col-span-2">
              {/* Heading */}
              <h2 className="text-white font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6">
                Two Paths, One Goal: <span className="gradient-text">Your Success</span>
              </h2>

              {/* Logos */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-[#E31837] to-[#FF6B35] bg-clip-text text-transparent">
                    CAREER
                  </span>
                  <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] bg-clip-text text-transparent">
                    X
                  </span>
                </h3>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] bg-clip-text text-transparent">
                    CREATOR
                  </span>
                  <span className="text-[#FF8C5A]">
                    X
                  </span>
                </h3>
              </div>

              {/* Description Text */}
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                CareerX and CreatorX are industry-led learning pathways introduced to equip students with future-ready skills in
                creative and digital media fields like animation, VFX, gaming, digital content.
              </p>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                MAAC&apos;s future-ready learning ecosystem prepares you to excel in studios and thrive as an independent creator
                in the digital economy.
              </p>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Become a studio-ready artist and an independent creative force.
              </p>
            </div>

            {/* Right Image */}
            <div className="ccc-header-image relative lg:col-span-1">
              <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl">
                {/* Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80')"
                  }}
                />
                {/* Overlay with text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Decorative Frame */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#E31837]" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#FF6B35]" />
              </div>
            </div>
          </div>
        </div>

        {/* Cards Container */}
        <div className="ccc-cards grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          
          {/* CareerX Card */}
          <div className="ccc-card-career group relative bg-[#0a0a0a] rounded-2xl p-8 md:p-10 lg:p-12 overflow-hidden border border-white/5 hover:border-[#E31837]/30 transition-all duration-500">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E31837]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Logo */}
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-[#E31837] to-[#FF6B35] bg-clip-text text-transparent">
                    CAREER
                  </span>
                  <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] bg-clip-text text-transparent">
                    X
                  </span>
                </h3>
              </div>

              {/* Tagline */}
              <p className="text-gray-300 text-sm md:text-base font-medium mb-8 leading-relaxed">
                A 1st of its kind, industry-led, Studio-aligned Learning program:
              </p>

              {/* Features List */}
              <ul className="space-y-4">
                <li className="ccc-bullet flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E31837] mt-2 flex-shrink-0" />
                  <span className="text-gray-400 text-sm md:text-base leading-relaxed">
                    Industry-academia learning
                  </span>
                </li>
                <li className="ccc-bullet flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E31837] mt-2 flex-shrink-0" />
                  <span className="text-gray-400 text-sm md:text-base leading-relaxed">
                    Studio-led delivery
                  </span>
                </li>
                <li className="ccc-bullet flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E31837] mt-2 flex-shrink-0" />
                  <span className="text-gray-400 text-sm md:text-base leading-relaxed">
                    Live case studies
                  </span>
                </li>
                <li className="ccc-bullet flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E31837] mt-2 flex-shrink-0" />
                  <span className="text-gray-400 text-sm md:text-base leading-relaxed">
                    End-to-end production workflow
                  </span>
                </li>
              </ul>
            </div>

            {/* Border */}
            <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
          </div>

          {/* CreatorX Card */}
          <div className="ccc-card-creator group relative bg-[#0a0a0a] rounded-2xl p-8 md:p-10 lg:p-12 overflow-hidden border border-white/5 hover:border-[#E31837]/30 transition-all duration-500">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E31837]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Content */}
            <div className="relative z-10">
              {/* Logo */}
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] bg-clip-text text-transparent">
                    CREATOR
                  </span>
                  <span className="text-[#FF8C5A]">
                    X
                  </span>
                </h3>
              </div>

              {/* Tagline */}
              <p className="text-gray-300 text-sm md:text-base font-medium mb-8 leading-relaxed">
                Create. Collaborate. Grow.
              </p>

              {/* Features List */}
              <ul className="space-y-4">
                <li className="ccc-bullet flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E31837] mt-2 flex-shrink-0" />
                  <span className="text-gray-400 text-sm md:text-base leading-relaxed">
                    Entrepreneurship readiness
                  </span>
                </li>
                <li className="ccc-bullet flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E31837] mt-2 flex-shrink-0" />
                  <span className="text-gray-400 text-sm md:text-base leading-relaxed">
                    Prep for gig economy & freelance work
                  </span>
                </li>
                <li className="ccc-bullet flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E31837] mt-2 flex-shrink-0" />
                  <span className="text-gray-400 text-sm md:text-base leading-relaxed">
                    Project & client management
                  </span>
                </li>
                <li className="ccc-bullet flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E31837] mt-2 flex-shrink-0" />
                  <span className="text-gray-400 text-sm md:text-base leading-relaxed">
                    IP creation & monetisation
                  </span>
                </li>
                <li className="ccc-bullet flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E31837] mt-2 flex-shrink-0" />
                  <span className="text-gray-400 text-sm md:text-base leading-relaxed">
                    Training directly from industry experts
                  </span>
                </li>
              </ul>
            </div>

            {/* Border */}
            <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="relative mt-16 md:mt-20">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E31837]/50 to-[#FF6B35]/50" />
        </div>
      </div>
    </div>
  );
}

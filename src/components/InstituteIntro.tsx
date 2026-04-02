'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InstituteIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.institute-section',
          start: 'top 75%',
        },
      });

      // Title reveal
      tl.fromTo(
        '.institute-title',
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'expo.out',
        }
      );

      // Description text reveal
      tl.fromTo(
        '.institute-description',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.6'
      );

      // Video container reveal
      tl.fromTo(
        '.institute-video-container',
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.8'
      );

      // Subtitle reveal
      tl.fromTo(
        '.institute-subtitle',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.6'
      );

      // Subtitle description reveal
      tl.fromTo(
        '.institute-subtitle-desc',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="institute-section relative bg-[#0f0f0f] py-12 md:py-16 overflow-hidden">
      {/* Container */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Top Section: Title and Description */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-1 h-12 bg-[#E31837] flex-shrink-0" />
            <h2 className="institute-title font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-tight">
              <span className="bg-gradient-to-r from-[#E31837] to-[#FF6B35] bg-clip-text text-transparent">
                Join The Best Animation Institute in Jaipur
              </span>
            </h2>
          </div>

          <p className="institute-description text-[#6b6b6b] text-sm md:text-base leading-relaxed max-w-5xl">
            Welcome to Maya Academy of Advanced Cinematics popularly known as MAAC. Best Animation Institute In Jaipur when we speak about Best 3D Animation and Visual Effect Training Institute the name that comes in our mind is MAAC. Our centre is well equipped with a high-end experienced training team who expertize in 3D Animation, 2D Animation, VFX, Film Making, Multimedia courses, Gaming, Web Designing, Graphic Designing, Autocad courses and various other long term and short term courses. We are proud to say that we are one of the leading 2D and 3D Animation and VFX Training Institute in Rajasthan.
          </p>
        </div>

        {/* Bottom Section: Video and Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left: Video Container */}
          <div className="institute-video-container relative">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10">
              {/* 
                ================================================================
                VIDEO CONTAINER - Replace the src below with your actual MAAC video
                Option 1: Local video file (current, with placeholder poster)
                Option 2: YouTube embed (uncomment below)
                ================================================================
              */}
              
              {/* Option 1: Local Video File */}
              <video
                className="absolute inset-0 w-full h-full object-cover"
                controls
                preload="metadata"
                poster="/images/institute-poster.jpg"
              >
                <source src="/videos/institute-intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* 
                ================================================================
                Option 2: YouTube Embed (Uncomment to use with real video ID)
                Replace YOUR_ACTUAL_VIDEO_ID with your MAAC YouTube embed ID
                ================================================================
              */}
              {/* <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/YOUR_ACTUAL_VIDEO_ID?autoplay=0&controls=1&rel=0&modestbranding=1"
                title="MAAC Institute Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              /> */}

            </div>
          </div>

          {/* Right: Text Content */}
          <div className="institute-text-content">
            <h3 className="institute-subtitle font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-6">
              <span className="bg-gradient-to-r from-[#E31837] to-[#FF6B35] bg-clip-text text-transparent">
                Unveiling the Marvels of MAAC Animation Institute in Jaipur
              </span>
            </h3>

            <p className="institute-subtitle-desc text-[#6b6b6b] text-sm md:text-base leading-relaxed">
              Welcome to MAAC <strong className="text-[#f5f0e8]">Best Animation Institute In Jaipur</strong>, the premier destination for aspiring animators and visual effects artists in Jaipur. Established with a vision to nurture creative talents and provide them with world-class education, MAAC Animation Institute stands as a beacon of excellence in the field of animation and multimedia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
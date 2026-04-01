'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InstituteIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll animations
  useEffect(() => {
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
    <div ref={containerRef} className="institute-section relative bg-[#080808] py-12 md:py-16 overflow-hidden">
      {/* Container */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Top Section: Title and Description */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-1 h-12 bg-[#c8ff00] flex-shrink-0" />
            <h2 className="institute-title font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-tight">
              <span className="bg-gradient-to-r from-[#c8ff00] to-[#a8e000] bg-clip-text text-transparent">
                Join The Best Animation Institute in Jaipur
              </span>
            </h2>
          </div>
          
          <p className="institute-description text-gray-200 text-sm md:text-base leading-relaxed max-w-5xl">
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
                VIDEO CONTAINER - Replace the src below with your video URL
                You can use:
                1. YouTube embed: Change to iframe with YouTube embed URL
                2. Local video: Use <video> tag with your file path
                3. Vimeo/other: Use their embed code
                ================================================================
              */}
              
              {/* Option 1: YouTube Embed (Currently Active) */}
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0&modestbranding=1"
                title="MAAC Institute Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* 
                ================================================================
                Option 2: Local Video File (Uncomment to use)
                Replace '/videos/your-video.mp4' with your actual video path
                ================================================================
              */}
              {/* <video
                className="absolute inset-0 w-full h-full"
                controls
                preload="metadata"
                poster="/images/video-poster.jpg"
              >
                <source src="/videos/your-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}

              {/* 
                ================================================================
                Option 3: Vimeo Embed (Uncomment to use)
                Replace the video ID with your Vimeo video ID
                ================================================================
              */}
              {/* <iframe
                className="absolute inset-0 w-full h-full"
                src="https://player.vimeo.com/video/YOUR_VIDEO_ID"
                title="MAAC Institute Video"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              /> */}

            </div>
          </div>

          {/* Right: Text Content */}
          <div className="institute-text-content">
            <h3 className="institute-subtitle font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-6">
              <span className="bg-gradient-to-r from-[#00d4ff] to-[#0099ff] bg-clip-text text-transparent">
                Unveiling the Marvels of Maac Animation Institute in Jaipur
              </span>
            </h3>
            
            <p className="institute-subtitle-desc text-gray-200 text-sm md:text-base leading-relaxed">
              Welcome to Maac <strong className="text-white">Best Animation Institute In Jaipur</strong>, the premier destination for aspiring animators and visual effects artists in Jaipur. Established with a vision to nurture creative talents and provide them with world-class education, Maac Animation Institute stands as a beacon of excellence in the field of animation and multimedia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

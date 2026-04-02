"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Preloader from "./Preloader";
import VideoModal from "@/components/VideoModal";

gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEOS: Array<{
  id: number; name: string; mp4: string; webm?: string; poster: string;
}> = [
  { id: 1, name: "Intro",        webm: "/intro.webm", mp4: "/intro.mp4",                                    poster: "/posters/intro.jpg" },
  { id: 2, name: "Aakanksha",    mp4: "/hero-section-compressed/AAKANKSHA.mp4",                             poster: "/posters/hero-default.jpg" },
  { id: 3, name: "Abhilash S",   mp4: "/hero-section-compressed/ABHILASH S.mp4",                           poster: "/posters/hero-default.jpg" },
  { id: 4, name: "Emon Mandal",  mp4: "/hero-section-compressed/EMON MANDAL.mp4",                         poster: "/posters/hero-default.jpg" },
  { id: 5, name: "Nayan",        mp4: "/hero-section-compressed/NAYAN SATYAWAN MESTRY.mp4",               poster: "/posters/hero-default.jpg" },
];

const VIDEO_INTERVAL = 8000; // 8 seconds per video

/**
 * MAACX Hero Component - Clean Professional Design
 *
 * Layout:
 * - Left side: Content (badge, headline, subtitle, program, CTAs) - bottom aligned
 * - Right side: Stats card (desktop only) - bottom aligned
 * - Removed duplicate stats from left side
 * - Professional Inter font throughout
 * - Cleaner, more spacious layout
 */
export default function MAACXHero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const isTransitioningRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState<boolean[]>(
    new Array(HERO_VIDEOS.length).fill(false)
  );

  // Touch swipe support
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Check mount status
  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  const goToNextVideo = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    setTimeout(() => { isTransitioningRef.current = false; }, 800);
  }, []);

  // Video error handler - marks failed videos as loaded to skip loading indicator
  const handleVideoError = (index: number) => {
    console.error(`Video ${HERO_VIDEOS[index].name} failed to load`);
    setLoadedVideos(prev => {
      const updated = [...prev];
      updated[index] = true; // Mark as "loaded" to skip loading indicator
      return updated;
    });
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50; // Minimum swipe distance
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      // Haptic feedback
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
      }

      if (diff > 0) {
        // Swiped left - next video
        goToNextVideo();
      } else {
        // Swiped right - previous video
        setCurrentVideoIndex((prev) => (prev - 1 + HERO_VIDEOS.length) % HERO_VIDEOS.length);
      }
    }
  };

  // Auto-rotate videos (pauses on hover)
  useEffect(() => {
    if (!preloaderDone || isPaused) return;

    const interval = setInterval(goToNextVideo, VIDEO_INTERVAL);
    return () => clearInterval(interval);
  }, [preloaderDone, goToNextVideo, isPaused]);

  // Dynamic preload upgrade when switching to lazy-loaded videos
  useEffect(() => {
    const nextVideo = videoRefs.current[currentVideoIndex];
    if (nextVideo && nextVideo.preload === "none") {
      nextVideo.preload = "auto";
    }
  }, [currentVideoIndex]);

  // IntersectionObserver for lazy loading videos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement;
            if (video.preload === "none") {
              video.preload = "auto";
            }
          }
        });
      },
      { rootMargin: "500px" }
    );
    
    videoRefs.current.forEach((v) => v && observer.observe(v));
    
    return () => observer.disconnect();
  }, []);

  // Handle video play/pause when index changes
  useEffect(() => {
    if (!preloaderDone) return;
    
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (!currentVideo) return;
    
    // Cancel any pending play on previous videos
    videoRefs.current.forEach((v, i) => {
      if (i !== currentVideoIndex && v) v.pause();
    });
    
    currentVideo.currentTime = 0;
    const playPromise = currentVideo.play();
    if (playPromise) {
      playPromise.catch((err) => {
        if (err.name !== 'AbortError' && err.name !== 'NotAllowedError') {
          console.warn('Video play:', err.message);
        }
      });
    }
  }, [currentVideoIndex, preloaderDone]);

  // GSAP animations - simplified fade-up
  useEffect(() => {
    if (!preloaderDone) return;

    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        gsap.to(containerRef.current, { opacity: 1, duration: 0.5 });
        return;
      }

      const tl = gsap.timeline();

      // Initial video fade-in (first video only)
      tl.from(".maacx-video", {
        opacity: 0,
        scale: 1.05,
        duration: 1,
        ease: "expo.out",
      });

      // Badge
      tl.from(".maacx-badge", {
        opacity: 0,
        y: 15,
        duration: 0.4,
        ease: "expo.out",
      }, "-=0.6");

      // Headline - "Big Leaps" - smaller, cleaner
      tl.from(".maacx-headline", {
        opacity: 0,
        y: 15,
        duration: 0.4,
        ease: "expo.out",
      }, "-=0.3");

      // Subtitle - "Begin with the Right Course" - smaller
      tl.from(".maacx-subtitle-text", {
        opacity: 0,
        y: 12,
        duration: 0.35,
        ease: "expo.out",
      }, "-=0.3");

      // Program badge
      tl.from(".maacx-program-badge", {
        opacity: 0,
        y: 15,
        duration: 0.4,
        ease: "expo.out",
      }, "-=0.3");

      // CTA buttons
      tl.from(".maacx-cta-row", {
        opacity: 0,
        y: 15,
        duration: 0.4,
        ease: "expo.out",
      }, "-=0.3");

      // Right side stats card (desktop)
      tl.from(".maacx-content-right", {
        opacity: 0,
        x: 20,
        duration: 0.5,
        ease: "expo.out",
      }, "-=0.3");

      // Scroll indicator
      tl.from(".maacx-scroll", {
        opacity: 0,
        y: 10,
        duration: 0.3,
      }, "-=0.2");

      // Add count-up animation to stats values
      const stats = containerRef.current?.querySelectorAll(".maacx-stat-value");
      stats?.forEach((stat) => {
        const element = stat as HTMLElement;
        // Extract the numeric value and suffix from the element's text
        const textContent = element.textContent?.trim() || "0";
        const match = textContent.match(/(\d+)(.*)/);
        const finalValue = match ? parseInt(match[1], 10) : 0;
        const suffix = match ? match[2] : "+";

        // Use gsap.to() with counter object, not DOM element textContent
        const counter = { val: 0 };
        gsap.to(counter, {
          val: finalValue,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            element.textContent = Math.round(counter.val) + suffix;
          },
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [preloaderDone]);

  return (
    <>
      <div 
        className={`fixed inset-0 z-[9999] transition-opacity duration-700 pointer-events-none ${
          preloaderDone ? "opacity-0" : "opacity-100"
        }`}
      >
        {!mounted ? null : !preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      </div>
      <section
        ref={containerRef}
        className="maacx-hero relative min-h-[100svh] w-full bg-[#080808] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {/* Gradient base */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 50% 50%, rgba(180,20,40,0.25) 0%, transparent 60%),
                linear-gradient(160deg, #0A0A0A 0%, #1a0508 40%, #0A0A0A 100%)
              `,
            }}
          />

          {/* Video carousel - all videos layered */}
          <div className="absolute inset-0 z-[1]">
            {HERO_VIDEOS.map((video, index) => (
              <div
                key={video.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentVideoIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  className={`maacx-video absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    index === currentVideoIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  autoPlay={index === 0}
                  muted
                  loop
                  playsInline
                  preload={index === 0 ? "auto" : "metadata"}
                  poster={video.poster}
                  width={1920}
                  height={1080}
                  onError={() => handleVideoError(index)}
                >
                  {video.webm && <source src={video.webm} type="video/webm" />}
                  <source src={video.mp4} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>

          {/* Uniform overlay */}
          <div className="absolute inset-0 z-[2] bg-black/50" />
          
          {/* Video navigation indicators - desktop only */}
          <div className="absolute bottom-[72px] left-1/2 -translate-x-1/2 z-[3] flex items-center gap-2 hidden lg:block">
            {HERO_VIDEOS.map((video, index) => (
              <button
                key={video.id}
                onClick={() => {
                  if (index === currentVideoIndex) return;
                  setCurrentVideoIndex(index);
                }}
                className={`group relative h-2 rounded-full transition-all duration-500 ${
                  index === currentVideoIndex
                    ? "w-8 bg-[#E31837]"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Show ${video.name} video`}
                disabled={index === currentVideoIndex}
              >
                {/* Progress bar for current video */}
                {index === currentVideoIndex && (
                  <div
                    key={currentVideoIndex}
                    className="absolute inset-0 bg-[#E31837] rounded-full origin-left"
                    style={{
                      animation: `progress ${VIDEO_INTERVAL / 1000}s linear forwards`,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Left Side Content - Bottom Aligned */}
        <div className="maacx-content-left absolute left-0 bottom-0 z-30 w-full max-w-[500px] px-6 md:px-12 lg:px-16 pb-12 md:pb-16">
          {/* Accreditation Badge - Cleaner */}
          <div className="maacx-badge mb-5">
            <span className="inline-block px-3.5 py-1.5 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full text-[#E31837] text-[9px] md:text-xs font-semibold tracking-[0.12em] uppercase">
              NSDC / MESC Partner
            </span>
          </div>

          {/* Headline - Left Aligned, Professional Size */}
          <h1 className="mb-3 text-left">
            <span className="maacx-headline block text-white font-sans font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] tracking-tight">
              Big Leaps
            </span>
          </h1>

          {/* Subtitle - Red, left aligned, smaller */}
          <div className="maacx-subtitle-text mb-5">
            <span className="block text-[#E31837] font-sans font-medium text-[clamp(1rem,2.5vw,1.5rem)] leading-[1.3]">
              Begin with the Right Course
            </span>
          </div>

          {/* Program Badge - Cleaner */}
          <div className="maacx-program-badge mb-6">
            <span className="inline-block px-4 py-2.5 bg-[#E31837] rounded-lg text-white text-sm md:text-base font-semibold shadow-xl">
              B.Voc in 3D Animation & VFX
            </span>
          </div>

          {/* CTA Buttons - Cleaner */}
          <div className="maacx-cta-row flex flex-wrap items-center gap-3 md:gap-4 mb-6">
            {/* Primary CTA */}
            <a
              href="#courses"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary group inline-flex items-center gap-2 px-5 py-2.5"
            >
              <span className="text-xs md:text-sm">Explore Courses</span>
              <svg
                className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            {/* Secondary CTA - Showreel */}
            <button
              className="btn btn-ghost group inline-flex items-center gap-2 px-4 py-2.5"
              onClick={() => setShowVideoModal(true)}
              aria-label="Watch Showreel"
            >
              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-[#E31837]/20 transition-colors">
                <svg
                  className="w-3.5 h-3.5 text-[#E31837] ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-medium">Showreel</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="maacx-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
            <div className="absolute top-0 w-full h-4 bg-white animate-[scrollLine_1.8s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Mobile: Combined stats strip + video dots */}
        <div className="absolute bottom-0 left-0 right-0 z-20 lg:hidden flex items-stretch border-t border-white/10 bg-black/40 backdrop-blur-sm">
          {[{ value: "30+", label: "Years" }, { value: "95%", label: "Placement" }, { value: "100+", label: "Centers" }]
            .map((stat, i) => (
              <div key={i} className={`flex-1 text-center py-2.5 ${i < 2 ? "border-r border-white/10" : ""}`}>
                <div className="text-white font-bold text-sm leading-none">{stat.value}</div>
                <div className="text-white/50 text-[9px] uppercase tracking-widest mt-0.5">{stat.label}</div>
              </div>
            ))}
          <div className="flex items-center gap-1.5 px-4 border-l border-white/10">
            {HERO_VIDEOS.map((_, i) => (
              <button key={i} onClick={() => setCurrentVideoIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentVideoIndex ? "w-4 bg-[#E31837]" : "w-1.5 bg-white/25"
                }`} aria-label={`Video ${i + 1}`} />
            ))}
          </div>
        </div>

        {/* Right Side Stats - Bottom Aligned (Desktop Only) */}
        <div className="maacx-content-right absolute right-0 bottom-0 z-20 hidden lg:block px-12 lg:px-20 pb-12 md:pb-16">
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-6 max-w-[240px]">
            {[
              { value: "30+", label: "Years Legacy" },
              { value: "95%", label: "Placement Rate" },
              { value: "100+", label: "Centers Across India" },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 ${
                  i < 2 ? "pb-4 mb-4 border-b border-white/10" : ""
                }`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#E31837] to-[#FF6B35] flex items-center justify-center">
                  <span className="maacx-stat-value text-white font-bold text-sm">{item.value}</span>
                </div>
                <div>
                  <p className="text-white font-medium text-xs">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videoUrl={HERO_VIDEOS[currentVideoIndex].mp4}
      />
    </>
  );
}

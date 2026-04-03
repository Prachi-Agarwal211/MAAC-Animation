"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const showcaseVideos = [
  { title: "ANANDI", category: "Animation", video: "/student-work/ANANDI.mp4", duration: "2:34" },
  { title: "FAST LIFE", category: "Short Film", video: "/student-work/FAST%20LIFE.mp4", duration: "3:12" },
  { title: "KARMA", category: "Visual Effects", video: "/student-work/KARMA.mp4", duration: "4:05" },
  { title: "THE PLASTIC PLAGUE", category: "Documentary", video: "/student-work/THE%20PLASTIC%20PLAGUE.mp4", duration: "5:20" },
];

const INTERVAL_MS = 8000;

export default function StudentShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressAnimRef = useRef<ReturnType<typeof setInterval>>();

  // Only autoplay when section is in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const advance = useCallback(() => {
    setActive(prev => (prev + 1) % showcaseVideos.length);
    setProgress(0);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (!inView || isPaused) return;

    // Start progress tracking
    const startTime = Date.now();
    progressAnimRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / INTERVAL_MS) * 100, 100));
    }, 50);

    const timer = setTimeout(advance, INTERVAL_MS);

    return () => {
      clearTimeout(timer);
      if (progressAnimRef.current) clearInterval(progressAnimRef.current);
    };
  }, [active, inView, isPaused, advance]);

  // Play/pause video based on active + inView
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && inView) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, inView]);

  // Heading entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ss-heading", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0C0C0C]"
      style={{ minHeight: "100svh" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Header — above the video area */}
      <div className="relative z-10 pt-20 pb-8 text-center px-4">
        <div className="ss-heading">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{ background: "rgba(227,24,55,0.1)", border: "1px solid rgba(227,24,55,0.2)" }}>
            <span className="w-2 h-2 bg-[#E31837] rounded-full animate-pulse" />
            <span className="text-[#E31837] text-xs font-bold tracking-[0.2em] uppercase">Student Showcase</span>
          </span>
          <h2 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] text-[#F0EBE1] leading-[1.05] tracking-tight">
            Student <span className="gradient-text">Work</span>
          </h2>
        </div>
      </div>

      {/* Fullscreen video area */}
      <div className="relative" style={{ height: "75svh" }}>
        {/* Video layers */}
        {showcaseVideos.map((item, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <video
              ref={el => { videoRefs.current[i] = el; }}
              src={item.video}
              className="showcase-video"
              muted
              loop
              playsInline
              preload={i === 0 ? "auto" : "none"}
            />
          </div>
        ))}

        {/* Overlay gradient */}
        <div className="absolute inset-0 z-10" style={{
          background: "linear-gradient(to bottom, rgba(12,12,12,0.3) 0%, transparent 30%, transparent 60%, rgba(12,12,12,0.9) 100%)"
        }} />

        {/* Side gradient */}
        <div className="absolute inset-0 z-10" style={{
          background: "linear-gradient(to right, rgba(12,12,12,0.7) 0%, transparent 40%, transparent 60%, rgba(12,12,12,0.5) 100%)"
        }} />

        {/* Video info overlay — bottom left */}
        <div className="absolute bottom-0 left-0 z-20 p-8 md:p-12">
          {showcaseVideos.map((item, i) => (
            <div
              key={i}
              className="transition-all duration-700"
              style={{ opacity: i === active ? 1 : 0, transform: i === active ? "translateY(0)" : "translateY(20px)", position: i === active ? "relative" : "absolute", pointerEvents: i === active ? "auto" : "none" }}
            >
              <span className="inline-block text-[#E31837] text-xs font-bold uppercase tracking-[0.2em] mb-2">{item.category}</span>
              <h3 className="font-display font-bold text-3xl md:text-5xl text-white mb-1">{item.title}</h3>
              <p className="text-white/50 text-sm">{item.duration}</p>
            </div>
          ))}
        </div>

        {/* Navigation — bottom right */}
        <div className="absolute bottom-0 right-0 z-20 p-8 md:p-12 flex flex-col items-end gap-4">
          {/* Progress dots */}
          <div className="flex gap-2">
            {showcaseVideos.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setProgress(0); }}
                className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
                style={{ width: i === active ? "40px" : "20px", background: "rgba(255,255,255,0.2)" }}
                aria-label={`Show ${showcaseVideos[i].title}`}
              >
                {i === active && (
                  <div
                    className="absolute inset-y-0 left-0 bg-[#E31837] rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={advance}
            className="flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-wider transition-colors group"
          >
            Next
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Pause indicator */}
        {isPaused && (
          <div className="absolute top-6 right-6 z-20 px-3 py-1.5 rounded-full text-white/50 text-xs" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}>
            ⏸ Paused
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import VideoModal from "@/components/VideoModal";

function CountUpStat({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let frame: number;
          const start = performance.now();
          const duration = 1500;
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * number));
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
          frameRef.current = frame;
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [number]);

  return (
    <div ref={ref} className="text-center px-4">
      <div className="font-display font-extrabold text-[clamp(2.5rem,6vw,5rem)] leading-none text-white count-up">
        {count}{suffix}
      </div>
      <div className="text-[#A8A29C] text-sm mt-2 font-inter">{label}</div>
    </div>
  );
}

export default function InstituteIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".institute-section", start: "top 75%" },
      });

      tl.fromTo(".institute-title", { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1, ease: "expo.out" });
      tl.fromTo(".institute-description", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1, ease: "expo.out" }, "-=0.6");
      tl.fromTo(".institute-video-container", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1, ease: "expo.out" }, "-=0.8");
      tl.fromTo(".institute-quote", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out" }, "-=0.6");

      // Add parallax to video container
      gsap.to(".institute-video-container", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: ".institute-video-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="institute-section relative overflow-hidden bg-[#0a0a0a]">
      {/* Dark Theme wrapper */}
      <div
        className="relative py-16 md:py-24 section-fade animated-mesh-bg"
      >
        <div className="atmosphere-blob blob-red top-[-10%] right-[-10%] opacity-20" />
        <div className="grain-overlay" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Stat Bar */}
          <div className="relative z-10 flex flex-wrap md:flex-nowrap items-center justify-between mb-16 md:mb-20 border-b border-white/10 pb-10">
            <CountUpStat number={50} suffix="K+" label="Students Trained" />
            <div className="hidden md:block w-px h-16 bg-white/10" />
            <CountUpStat number={30} suffix="+" label="Years Legacy" />
            <div className="hidden md:block w-px h-16 bg-white/10" />
            <CountUpStat number={95} suffix="%" label="Placement Rate" />
            <div className="hidden md:block w-px h-16 bg-white/10" />
            <CountUpStat number={100} suffix="+" label="Centers" />
          </div>

          {/* Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="flex items-start gap-3 mb-6">
                <div className="w-1 h-12 bg-[#E31837] flex-shrink-0 rounded-full" />
                <h2 className="institute-title font-display font-bold text-[clamp(1.5rem,3vw,2.5rem)] leading-tight text-white">
                  Join the <br className="hidden sm:block"/>
                  <span className="bg-[#E31837] text-white px-2 py-0.5 rounded whitespace-nowrap">
                    Best Animation Institute
                  </span>
                  <br className="hidden sm:block"/>
                  In Jaipur
                </h2>
              </div>

              <div className="institute-description space-y-4 text-[#A8A29C] text-base leading-relaxed">
                <p>
                  Welcome to Maya Academy of Advanced Cinematics — MAAC. Our centre is equipped with an expert training team specializing in 3D Animation, VFX, Film Making, Gaming, Web Design, and more.
                </p>
                <p>
                  We are proud to be one of the leading Animation and VFX Training Institutes in Rajasthan, with state-of-the-art infrastructure and industry-aligned curriculum.
                </p>
              </div>

              {/* Pull Quote */}
              <blockquote className="institute-quote mt-8 pl-5 py-2" style={{ borderLeft: '3px solid #8B7355' }}>
                <p className="text-[#E8DCC8] text-lg italic font-display leading-relaxed">
                  &ldquo;MAAC gave me the skills and confidence to land my dream job at a top VFX studio.&rdquo;
                </p>
                <cite className="text-[#6B6560] text-sm mt-2 block not-italic">— Alumni, VFX Artist at DNEG</cite>
              </blockquote>
            </div>

            {/* Right: Video Player */}
            <div className="institute-video-container relative">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-[#0C0C0C]">
                {/* Custom play button overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer group"
                  onClick={() => setShowModal(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Play showreel video"
                  onKeyDown={(e) => e.key === 'Enter' && setShowModal(true)}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#E31837] flex items-center justify-center shadow-lg shadow-[#E31837]/40 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>
                {/* Thumbnail - using gradient placeholder instead of external image */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0C0C0C]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🎬</div>
                </div>
                <div className="absolute inset-0 bg-black/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <VideoModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          videoUrl="/intro.mp4"
        />
      )}
    </div>
  );
}

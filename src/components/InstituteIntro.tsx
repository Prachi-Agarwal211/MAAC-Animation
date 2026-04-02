"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CountUpStat({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

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
          observer.disconnect();
          return () => cancelAnimationFrame(frame);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [number]);

  return (
    <div ref={ref} className="text-center px-4">
      <div className="font-display font-extrabold text-[clamp(2.5rem,6vw,5rem)] leading-none text-[#0C0C0C] count-up">
        {count}{suffix}
      </div>
      <div className="text-[#7A7570] text-sm mt-2 font-inter">{label}</div>
    </div>
  );
}

export default function InstituteIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="institute-section relative overflow-hidden">
      {/* Cream bg with clip-path divider */}
      <div
        className="relative bg-[#F5F0E8] py-16 md:py-24 section-clip-light"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Stat Bar */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between mb-16 md:mb-20 border-b border-[#0C0C0C]/10 pb-10">
            <CountUpStat number={50} suffix="K+" label="Students Trained" />
            <div className="hidden md:block w-px h-16 bg-[#0C0C0C]/10" />
            <CountUpStat number={30} suffix="+" label="Years Legacy" />
            <div className="hidden md:block w-px h-16 bg-[#0C0C0C]/10" />
            <CountUpStat number={95} suffix="%" label="Placement Rate" />
            <div className="hidden md:block w-px h-16 bg-[#0C0C0C]/10" />
            <CountUpStat number={100} suffix="+" label="Centers" />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="flex items-start gap-3 mb-6">
                <div className="w-1 h-12 bg-[#E31837] flex-shrink-0 rounded-full" />
                <h2 className="institute-title font-display font-bold text-[clamp(1.5rem,3vw,2.5rem)] leading-tight text-[#0C0C0C]">
                  Join <span className="inline-block bg-[#E31837] text-white px-2 py-0.5 rounded">The Best Animation Institute</span> In Jaipur
                </h2>
              </div>

              <div className="institute-description space-y-4 text-[#4A4540] text-base leading-relaxed">
                <p>
                  Welcome to Maya Academy of Advanced Cinematics — MAAC. Our centre is equipped with an expert training team specializing in 3D Animation, VFX, Film Making, Gaming, Web Design, and more.
                </p>
                <p>
                  We are proud to be one of the leading Animation and VFX Training Institutes in Rajasthan, with state-of-the-art infrastructure and industry-aligned curriculum.
                </p>
              </div>

              {/* Pull Quote */}
              <blockquote className="institute-quote mt-8 border-l-3 border-[#E31837] pl-5 py-2">
                <p className="text-[#0C0C0C] text-lg italic font-display leading-relaxed">
                  &ldquo;MAAC gave me the skills and confidence to land my dream job at a top VFX studio.&rdquo;
                </p>
                <cite className="text-[#7A7570] text-sm mt-2 block not-italic">— Alumni, VFX Artist at DNEG</cite>
              </blockquote>
            </div>

            {/* Right: Video Player */}
            <div className="institute-video-container relative">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-[#0C0C0C]">
                {/* Custom play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer group" id="play-overlay">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#E31837] flex items-center justify-center shadow-lg shadow-[#E31837]/40 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>
                {/* Thumbnail */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80')" }}
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

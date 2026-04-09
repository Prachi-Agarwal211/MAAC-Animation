"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

function CountUpStat({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  const countRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: number,
      duration: 2.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: countRef.current,
        start: "top 90%",
      },
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.innerText = Math.round(obj.value).toString();
        }
      },
    });
  }, { scope: countRef });

  return (
    <div className="text-center px-6 group">
      <div className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-white tabular-nums flex items-center justify-center tracking-tighter">
        <span ref={countRef}>0</span>
        <span className="text-[#E31837] ml-1">{suffix}</span>
      </div>
      <div className="text-[#6B6560] text-[10px] mt-4 font-bold tracking-[0.3em] uppercase transition-colors group-hover:text-white">{label}</div>
    </div>
  );
}

export default function InstituteIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(".institute-title", { opacity: 0, y: 30, duration: 1, ease: "expo.out" })
      .from(".institute-description", { opacity: 0, y: 20, duration: 1, ease: "expo.out" }, "-=0.7")
      .from(".institute-badges > span", { opacity: 0, y: 10, stagger: 0.1, duration: 0.8, ease: "expo.out" }, "-=0.6")
      .from(".institute-quote", { opacity: 0, x: -20, duration: 1, ease: "expo.out" }, "-=0.5")
      .from(".institute-video-container", { opacity: 0, scale: 0.95, duration: 1.2, ease: "expo.out" }, "-=0.8");

    // Parallax overlap effect
    gsap.fromTo(
      contentRef.current,
      { y: 100 },
      {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-20 bg-[#0C0C0C] -mt-20 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div
        ref={contentRef}
        className="relative py-24 md:py-32 animated-mesh-bg rounded-t-[40px]"
      >
        <div className="atmosphere-blob blob-red top-[-10%] right-[-10%] opacity-15" />
        <div className="grain-warm" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* ── Stat Bar ── */}
          <div className="relative z-10 flex flex-wrap md:flex-nowrap items-center justify-around md:justify-between mb-20 md:mb-28 pb-12 border-b border-white/8">
            <CountUpStat number={50} suffix="K+" label="Students Trained" />
            <div className="hidden md:block w-px h-14 bg-white/8" />
            <CountUpStat number={30} suffix="+" label="Years Legacy" />
            <div className="hidden md:block w-px h-14 bg-white/8" />
            <CountUpStat number={95} suffix="%" label="Placement Rate" />
            <div className="hidden md:block w-px h-14 bg-white/8" />
            <CountUpStat number={100} suffix="+" label="Centers" />
          </div>

          {/* ── Content Grid ── */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Text */}
            <div className="order-2 lg:order-1">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-1.5 h-16 bg-[#E31837] flex-shrink-0 rounded-full mt-1" />
                <h2 className="institute-title font-display font-bold text-[clamp(1.8rem,4vw,3.2rem)] leading-tight text-white">
                  Join the{" "}
                  <span className="text-[#E31837] italic">Best Animation</span>
                  <br />
                  Institute In Jaipur
                </h2>
              </div>

              <div className="institute-description space-y-6 text-[#A8A29C] text-lg md:text-xl leading-relaxed mb-10">
                <p>
                  Welcome to Maya Academy of Advanced Creativity — MAAC. Our centre is equipped with an expert training team specializing in 3D Animation, VFX, Film Making, Gaming, Web Design, and more.
                </p>
                <p>
                  We are proud to be one of the leading Animation and VFX Training Institutes in Rajasthan, with state-of-the-art infrastructure and industry-aligned curriculum.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="institute-badges flex flex-wrap gap-4 mb-10">
                {["NSDC Partner", "MESC Certified", "Skill India", "B.Voc Degree"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold glass border border-white/10 text-white"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E31837" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>

              {/* Pull Quote */}
              <blockquote className="institute-quote pl-6 py-2 border-l-4 border-[#E31837] bg-white/5 rounded-r-xl">
                <p className="text-[#F0EBE1] text-lg md:text-xl italic font-display leading-relaxed">
                  &ldquo;MAAC gave me the skills and confidence to land my dream job at a top VFX studio.&rdquo;
                </p>
                <cite className="text-[#6B6560] text-sm mt-3 block not-italic font-semibold tracking-wider uppercase">
                  — Alumni, VFX Artist at DNEG
                </cite>
              </blockquote>
            </div>

            {/* Right: Video */}
            <div className="order-1 lg:order-2 institute-video-container relative">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 group">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/_D7gd6bSE0A?autoplay=0&controls=1&rel=0&modestbranding=1&showinfo=0"
                  title="MAAC Animation Showreel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 0 }}
                />
              </div>

              {/* Floating stat card */}
              <div
                className="absolute -bottom-6 -right-6 rounded-2xl px-6 py-5 hidden lg:block glass-card-warm"
              >
                <div className="text-3xl font-display font-extrabold text-[#E31837]">15L+</div>
                <div className="text-[#6B6560] text-xs uppercase tracking-widest mt-1 font-bold">Highest Package</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
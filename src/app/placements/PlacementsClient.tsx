"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { shouldAnimate } from "@/lib/animationUtils";
import Footer from "@/components/Footer";
import { placementCompanies } from "@/data/siteData";

export default function PlacementsClient() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".placements-hero",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".company-card",
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: ".companies-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main ref={pageRef} className="overflow-hidden">

      {/* Hero */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 placements-hero">
          <p className="text-[#E31837] text-xs font-inter font-semibold tracking-[0.2em] uppercase mb-4">
            Career Support
          </p>
          <h1 className="font-display font-extrabold text-[clamp(2.5rem,5vw,5rem)] text-[#f5f0e8] leading-[1.05] tracking-tight mb-2">
            Work With The <span className="gradient-text">Best</span>
          </h1>
          <h2 className="text-[#6b6b6b] text-xl mt-2">
            Animation & VFX Job Placements in Jaipur
          </h2>
          <p className="text-[#6b6b6b] text-lg max-w-2xl mt-4">
            Our students are hired by the world&apos;s best studios. They
            dominate the industry with their exceptional and unusual work.
          </p>
        </div>
      </section>

      {/* Placement Stats */}
      <section className="relative py-16">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: "95%", label: "Placement Rate" },
              { number: "500+", label: "Partner Companies" },
              { number: "50K+", label: "Alumni Network" },
              { number: "15L", label: "Highest Package" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-1">
                  {stat.number}
                </div>
                <div className="text-[#6b6b6b] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Companies Grid */}
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#f5f0e8]">
              Our <span className="gradient-text">Placement Partners</span>
            </h2>
          </div>

          <div className="companies-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {placementCompanies.map((company, index) => (
              <div
                key={index}
                className="company-card glass-card rounded-2xl p-6 text-center group cursor-default"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg font-bold text-primary">
                    {company.charAt(0)}
                  </span>
                </div>
                <span className="text-gray-300 text-xs font-medium">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories placeholder */}
      <section className="relative py-24 bg-[#0f0f0f]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#f5f0e8] mb-4">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-[#6b6b6b] text-lg max-w-2xl mx-auto">
              Hear from our alumni who are now working at top studios worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Hollywood VFX Artist",
                company: "DNEG & MPC",
                emoji: "🎬",
                quote: "From MAAC Jaipur to working on Oscar-winning VFX films — the journey was transformed by world-class training.",
              },
              {
                title: "Lead Game Designer",
                company: "Ubisoft & Nilee Games",
                emoji: "🎮",
                quote: "MAAC's game design curriculum gave me the skills to build AAA titles and lead design teams.",
              },
              {
                title: "Senior Animator",
                company: "Prime Focus Technologies",
                emoji: "🎥",
                quote: "The production workflow training at MAAC prepared me for real studio deadlines and quality standards.",
              },
            ].map((story, index) => (
              <div key={index} className="glass-card rounded-3xl p-6">
                <div className="text-4xl mb-3">{story.emoji}</div>
                <h3 className="font-display font-semibold text-[#f5f0e8] mb-1">
                  {story.title}
                </h3>
                <p className="text-[#E31837] text-xs font-medium mb-3">
                  Placed at {story.company}
                </p>
                <p className="text-[#6b6b6b] text-sm leading-relaxed italic">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

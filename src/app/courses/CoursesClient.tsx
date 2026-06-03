"use client";

import CourseCategories from "@/components/CourseCategories";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import ApplyNow from "@/components/ApplyNow";
import IndustryPartners from "@/components/IndustryPartners";
import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";

export default function CoursesClient() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".animate-in"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <main className="bg-[#0C0C0C] min-h-screen">
      {/* Hero Section for Courses */}
      <section 
        ref={heroRef}
        className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#080808] z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/hero-video-compressed.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 text-center px-6">
          <p className="animate-in metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] metallic-gold-accent" />
            Master Your Craft
            <span className="w-8 h-[1px] metallic-gold-accent" />
          </p>
          <h1 className="animate-in font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.85] text-white mb-6 font-light uppercase leading-[1.1] tracking-[0.1em]">
            Our <span className="metallic-gold-text italic text-[1.1em]">Programs</span>
          </h1>
          <p className="animate-in text-[#A8A29C] text-lg max-w-2xl mx-auto leading-relaxed">
            From foundation to advanced mastery, discover Rajasthan&apos;s most comprehensive curriculum in Animation, VFX, and Game Design.
          </p>
        </div>
      </section>

      <CourseCategories mode="courses-page" />
      
      <div className="border-t border-white/5">
        <IndustryPartners />
      </div>

      <div className="border-t border-white/5">
        <ApplyNow />
      </div>

      <div className="border-t border-white/5">
        <FAQSection />
      </div>

      <Footer />
    </main>
  );
}

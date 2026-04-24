"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { shouldAnimate } from "@/lib/animationUtils";
import Footer from "@/components/Footer";
import IndustryPartners from "@/components/IndustryPartners";
import ApplyNow from "@/components/ApplyNow";
import Image from "next/image";
import { portfolioEntries } from "@/data/portfolio";

// Select a diverse set of representative images for the gallery
const galleryImages = portfolioEntries.slice(0, 12).map((entry) => ({
  id: entry.id,
  src: entry.featuredImage,
  alt: `${entry.studentName} - ${entry.course}`,
  category: entry.category,
  studentName: entry.studentName,
  course: entry.course,
}));

// Category emoji mapping
const categoryEmojis: Record<string, string> = {
  "3d-game-asset": "🎮",
  "architectural-design": "🏛️",
  "character-modeling": "🎭",
  "digital-painting": "🎨",
  "environment-modeling": "🌍",
  "matte-painting": "🖼️",
  featured: "⭐",
};

export default function GalleryClient() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-hero",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, scale: 0.85, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".gallery-grid",
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
      {/* Structured Data - ImageGallery */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "MAAC Animation Jaipur - Student Work Gallery",
            "description": "Student projects and work from MAAC Animation Jaipur across 3D modeling, animation, VFX, digital painting, and more.",
            "url": "https://www.maacanimationjaipur.com/gallery",
            "author": {
              "@type": "EducationalOrganization",
              "name": "MAAC Animation Jaipur"
            }
          })
        }}
      />

      {/* Hero */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gallery-hero">
          <p className="text-[#FFD700] text-xs font-inter font-semibold tracking-[0.2em] uppercase mb-4">
            Showcase
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] text-[#f5f0e8] leading-[1.05] mb-6 font-light uppercase leading-[1.1] tracking-[0.1em]">
            Student <span className="metallic-gold-text">Gallery</span>
          </h1>
          <p className="text-[#6b6b6b] text-lg max-w-2xl">
            Explore the incredible work created by our talented students across
            animation, VFX, gaming, and design programs.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="relative py-16">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((item) => (
              <div
                key={item.id}
                className="gallery-item group relative glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-[#FFD700]/30 transition-all duration-300"
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#FFD700]/90 text-white text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wider">
                      {categoryEmojis[item.category] || "🎓"} {item.category.replace(/-/g, " ")}
                    </span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                  <span className="text-[#FFD700] text-xs font-medium uppercase tracking-wider">
                    {item.category.replace(/-/g, " ")}
                  </span>
                  <h3 className="text-[#f5f0e8] font-display font-light uppercase leading-[1.1] tracking-[0.1em]">
                    {item.studentName}
                  </h3>
                  <p className="text-[#6b6b6b] text-xs mt-1">{item.course}</p>
                </div>
              </div>
            ))}
          </div>

          {/* View All Student Work CTA */}
          <div className="text-center mt-12">
            <a
              href="/student-work"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] font-semibold hover:bg-[#FFD700]/20 transition-colors"
            >
              View Full Portfolio Gallery
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <div className="border-t border-white/5">
        <IndustryPartners />
      </div>

      <div className="border-t border-white/5">
        <ApplyNow />
      </div>

      <Footer />
    </main>
  );
}

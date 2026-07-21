"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldAnimate } from "@/lib/animationUtils";
import IndustryPartners from "@/components/IndustryPartners";
import ApplyNow from "@/components/ApplyNow";
import Image from "next/image";
import { portfolioEntries, categories } from "@/data/portfolio";
import ImageLightbox from "@/components/ui/ImageLightbox";

gsap.registerPlugin(ScrollTrigger);

// Select ALL portfolio entries for the gallery
const galleryImages = portfolioEntries.map((entry) => ({
  id: entry.id,
  src: entry.featuredImage,
  alt: `${entry.studentName} - ${entry.course}`,
  category: entry.category,
  studentName: entry.studentName,
  course: entry.course,
  description: entry.description,
  tags: entry.tags,
  images: entry.images,
}));

// Category icon mapping (SVG-based, no emojis)
function CategoryIcon({ category }: { category: string }) {
  const color = "#C4A882";
  const size = 10;
  switch (category) {
    case "3d-game-asset":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
    case "architectural-design":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="10"/><line x1="15" y1="6" x2="15" y2="10"/><line x1="9" y1="14" x2="15" y2="14"/><line x1="9" y1="18" x2="15" y2="18"/></svg>;
    case "character-modeling":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    case "digital-painting":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
    case "environment-modeling":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case "matte-painting":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>;
    default:
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  }
}

// Varying aspect ratios for masonry effect (organic, non-uniform)
function getAspectRatio(index: number): string {
  const ratios = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]", "aspect-[1/1]", "aspect-[4/6]", "aspect-[3/5]", "aspect-[5/7]", "aspect-[4/5]"];
  return ratios[index % ratios.length];
}

export default function GalleryClient() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    entry: (typeof galleryImages)[number] | null;
    imageIndex: number;
  }>({ isOpen: false, entry: null, imageIndex: 0 });

  /* ── GSAP masonry stagger reveal ── */
  useEffect(() => {
    if (!shouldAnimate()) return;

    const ctx = gsap.context(() => {
      const container = pageRef.current;
      if (!container) return;

      const items = container.querySelectorAll<HTMLElement>(".masonry-item");
      if (!items.length) return;

      // Set initial hidden state
      items.forEach((el) => el.classList.add("masonry-hidden"));

      // Hero fade-in
      const heroEl = container.querySelector(".gallery-hero");
      if (heroEl) {
        gsap.fromTo(
          heroEl,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
      }

      // Masonry stagger with clip-path reveal
      const masonryGrid = container.querySelector(".masonry-grid");
      if (!masonryGrid) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: masonryGrid,
          start: "top 88%",
          once: true,
        },
      });

      tl.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.04,
        ease: "expo.out",
        onComplete: () => {
          items.forEach((el) => el.classList.remove("masonry-hidden"));
        },
      });
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const openLightbox = useCallback((entry: (typeof galleryImages)[number], imageIndex: number) => {
    setLightboxState({ isOpen: true, entry, imageIndex });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxState({ isOpen: false, entry: null, imageIndex: 0 });
  }, []);

  const categoryLabel = (catId: string) =>
    categories.find((c) => c.id === catId)?.label || catId.replace(/-/g, " ");

  return (
    <main ref={pageRef} className="overflow-hidden">
      {/* Structured Data - ImageGallery */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "MAAC Animation Jaipur - Student Work Gallery",
            description: "Student projects and work from MAAC Animation Jaipur across 3D modeling, animation, VFX, digital painting, and more.",
            url: "https://www.maacanimationjaipur.com/gallery",
            author: {
              "@type": "EducationalOrganization",
              name: "MAAC Animation Jaipur",
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0" />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8 gallery-hero">
          <p className="metallic-gold-text-sm text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
            Creative Vault
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] text-[#f5f0e8] leading-[1.05] mb-6 font-light uppercase tracking-[0.1em]">
            <span className="title-layer">
              <span className="title-layer-glow" aria-hidden="true">Student</span>
              <span className="relative z-10">Student</span>
            </span>{" "}
            <span className="title-layer">
              <span className="title-layer-glow" aria-hidden="true">Gallery</span>
              <span className="relative z-10 metallic-gold-text">Gallery</span>
            </span>
          </h1>
          <p className="text-white/60 text-base max-w-2xl leading-relaxed">
            Explore {galleryImages.length} student projects across Animation, VFX, 3D Modeling, Digital Painting, and Game Design.
          </p>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="relative py-8 md:py-16">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BF953F]/30 to-transparent" />
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="masonry-grid">
            {galleryImages.map((item, index) => (
              <div
                key={item.id}
                className={`masonry-item ${getAspectRatio(index)}`}
                onClick={() => openLightbox(item, 0)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(item, 0);
                  }
                }}
                aria-label={`View ${item.studentName}'s ${item.course} portfolio`}
              >
                {/* Image */}
                <div className="masonry-media h-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    loading={index < 8 ? undefined : "lazy"}
                    priority={index < 8}
                  />
                </div>

                {/* Always-visible gradient */}
                <div className="masonry-gradient" />
                {/* Hover gradient (red tint) */}
                <div className="masonry-hover-gradient" />

                {/* Category badge */}
                <div className="masonry-badge">
                  <CategoryIcon category={item.category} />
                  {categoryLabel(item.category)}
                </div>

                {/* Always-visible content */}
                <div className="masonry-content">
                  <h3 className="masonry-name">{item.studentName}</h3>
                  <p className="masonry-course">{item.course}</p>
                </div>

                {/* Hover-reveal content */}
                <div className="masonry-hover">
                  {item.tags.length > 0 && (
                    <div className="masonry-tags">
                      {item.tags.slice(0, 3).map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <p className="masonry-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <a
              href="/student-work"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#C4A882]/30 text-[#C4A882] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C4A882]/10 hover:border-[#C4A882]/50 transition-all duration-300"
            >
              View Full Portfolio Gallery
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxState.entry && (
        <ImageLightbox
          images={lightboxState.entry.images}
          alt={`${lightboxState.entry.studentName} - ${lightboxState.entry.course}`}
          initialIndex={lightboxState.imageIndex}
          isOpen={lightboxState.isOpen}
          onClose={closeLightbox}
        />
      )}

      <IndustryPartners />
      <ApplyNow />
    </main>
  );
}

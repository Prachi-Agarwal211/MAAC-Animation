"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import ImageLightbox from "@/components/ui/ImageLightbox";
import ErrorBoundary from "@/components/ErrorBoundary";

const tripImages = [
  { title: "Annual Trip Moment 01", src: "/annual-trip/event-002.jpeg" },
  { title: "Annual Trip Moment 02", src: "/annual-trip/event-003.jpeg" },
  { title: "Annual Trip Moment 03", src: "/annual-trip/event-004.jpeg" },
  { title: "Annual Trip Moment 04", src: "/annual-trip/event-005.jpeg" },
  { title: "Annual Trip Moment 05", src: "/annual-trip/event-006.jpeg" },
  { title: "Annual Trip Moment 06", src: "/annual-trip/event-007.jpeg" },
  { title: "Annual Trip Moment 07", src: "/annual-trip/event-008.jpeg" },
  { title: "Annual Trip Moment 08", src: "/annual-trip/event-009.jpeg" },
  { title: "Annual Trip Moment 09", src: "/annual-trip/event-010.jpeg" },
  { title: "Annual Trip Moment 10", src: "/annual-trip/event-011.jpeg" },
  { title: "Annual Trip Moment 11", src: "/annual-trip/event-012.jpeg" },
  { title: "Annual Trip Moment 12", src: "/annual-trip/event-013.jpeg" },
  { title: "Annual Trip Moment 13", src: "/annual-trip/event-014.jpeg" },
  { title: "Annual Trip Moment 14", src: "/annual-trip/event-015.jpeg" },
  { title: "Annual Trip Moment 15", src: "/annual-trip/event-016.jpeg" },
  { title: "Annual Trip Moment 16", src: "/annual-trip/event-017.jpeg" },
  { title: "Annual Trip Moment 17", src: "/annual-trip/event-018.jpeg" },
  { title: "Annual Trip Moment 18", src: "/annual-trip/event-019.jpeg" },
  { title: "Annual Trip Moment 19", src: "/annual-trip/event-020.jpeg" },
  { title: "Annual Trip Moment 20", src: "/annual-trip/event-021.jpeg" },
  { title: "Annual Trip Moment 21", src: "/annual-trip/event-022.jpeg" },
  { title: "Annual Trip Moment 22", src: "/annual-trip/event-023.jpeg" },
  { title: "Annual Trip Moment 23", src: "/annual-trip/event-024.jpeg" },
  { title: "Annual Trip Moment 24", src: "/annual-trip/event-025.jpeg" },
  { title: "Annual Trip Moment 25", src: "/annual-trip/event-027.jpeg" },
  { title: "Annual Trip Moment 26", src: "/annual-trip/event-028.jpeg" },
  { title: "Annual Trip Moment 27", src: "/annual-trip/event-029.jpeg" },
  { title: "Annual Trip Moment 28", src: "/annual-trip/event-030.jpeg" },
  { title: "Annual Trip Moment 29", src: "/annual-trip/event-031.jpeg" },
  { title: "Annual Trip Moment 30", src: "/annual-trip/event-032.jpeg" },
  { title: "Annual Trip Moment 31", src: "/annual-trip/event-033.jpeg" },
  { title: "Annual Trip Moment 32", src: "/annual-trip/event-034.jpeg" },
  { title: "Annual Trip Moment 33", src: "/annual-trip/event-035.jpeg" },
  { title: "Annual Trip Moment 34", src: "/annual-trip/event-036.jpeg" },
  { title: "Annual Trip Moment 35", src: "/annual-trip/event-037.jpeg" },
  { title: "Annual Trip Moment 36", src: "/annual-trip/event-040.jpeg" },
  { title: "Annual Trip Moment 37", src: "/annual-trip/event-065.jpeg" },
];

function AnnualTripPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const reducedMotionRef = useRef(false);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mainViewerRef = useRef<HTMLDivElement>(null);

  const currentImage = tripImages[currentIndex];

  useEffect(() => {
    if (typeof window !== "undefined") {
      reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (reducedMotionRef.current) return;

    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % tripImages.length);
    }, 4200);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPlaying && !reducedMotionRef.current) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return stopAutoPlay;
  }, [isPlaying, currentIndex, startAutoPlay, stopAutoPlay]);

  const scrollActiveThumbnail = useCallback((index: number) => {
    const thumb = thumbnailRefs.current[index];
    if (thumb) {
      thumb.scrollIntoView({
        behavior: reducedMotionRef.current ? "auto" : "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  const goToSlide = useCallback((index: number) => {
    const newIndex = (index + tripImages.length) % tripImages.length;
    setCurrentIndex(newIndex);
    scrollActiveThumbnail(newIndex);
  }, [scrollActiveThumbnail]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const openLightbox = useCallback((index?: number) => {
    const target = index ?? currentIndex;
    setLightboxIndex(target);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
    setIsPlaying(false);
  }, [currentIndex]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
    setCurrentIndex(lightboxIndex);
    setIsPlaying(true);
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) return;

      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          goToNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToPrev();
          break;
        case "Enter":
        case "f":
        case "F":
          openLightbox();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, goToNext, goToPrev, openLightbox]);

  const lightboxImages = tripImages.map((img) => img.src);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "MAAC Annual Trip",
    description: "Moments from MAAC Animation Jaipur's annual student trip — creativity, adventure, and camaraderie captured on the road.",
    url: "https://www.maacanimationjaipur.com/annual-trip",
    image: tripImages.map((img) => `https://www.maacanimationjaipur.com${img.src}`),
    author: {
      "@type": "Organization",
      name: "MAAC Animation Jaipur",
    },
    numberOfItems: tripImages.length,
  };

  return (
    <ErrorBoundary>
    <div className="bg-transparent min-h-screen pt-24 sm:pt-32 relative flex flex-col">
      <div className="w-full flex-grow">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <link rel="preload" as="image" href="/annual-trip/event-002.jpeg" />
        <link rel="preload" as="image" href="/annual-trip/event-003.jpeg" />
        <link rel="preload" as="image" href="/annual-trip/event-004.jpeg" />
        <link rel="preload" as="image" href="/annual-trip/event-005.jpeg" />

        <div className="text-center mb-10 md:mb-14 relative z-10 px-6">
          <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] metallic-gold-accent" />
            Dalhousie &amp; Khajjiar
            <span className="w-8 h-[1px] metallic-gold-accent" />
          </p>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[0.82] text-white font-bold uppercase tracking-wide">
            ANNUAL <span className="metallic-gold-text italic tracking-wider">TRIP</span>
          </h1>
          <p className="text-[#A8A29C] text-sm md:text-base mt-5 max-w-xl mx-auto">
            A journey of creativity and camaraderie.<br className="hidden sm:block" /> Moments from our annual student trip.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-8 pb-16">
          <div className="flex items-center justify-between mb-4 px-1">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#FFD700]/80">The Visual Story</span>
              <h2 className="text-white text-xl md:text-2xl font-display tracking-wide mt-1">Annual Trip Highlights</h2>
            </div>
            <button
              onClick={() => openLightbox()}
              className="hidden md:flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors border border-white/10 hover:border-white/20 px-4 h-9 rounded-full"
            >
              <span>Open Full Gallery</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
          </div>

          <div
            ref={mainViewerRef}
            className="group relative w-full rounded-3xl overflow-hidden glass-card border border-white/5 shadow-2xl bg-[#0A0A0A]"
            style={{ aspectRatio: '16/9' }}
          >
            <div className="absolute inset-0">
              <Image
                key={currentIndex}
                src={currentImage.src}
                alt={currentImage.title}
                fill
                className="object-cover transition-all duration-700 ease-out opacity-100 scale-100"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
                priority={currentIndex < 3}
                placeholder="empty"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 via-black/35 to-transparent pointer-events-none" />

            <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
              <button
                onClick={() => openLightbox()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-widest bg-black/60 text-white/90 border border-white/20 hover:bg-white/10 hover:text-white backdrop-blur-md transition-all"
                aria-label="Open full screen lightbox"
              >
                <span className="hidden sm:inline">FULLSCREEN</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>
            </div>

            <button
              onClick={goToPrev}
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full glass border border-white/25 flex items-center justify-center text-white/70 hover:text-white hover:border-[#FFD700]/60 hover:bg-white/5 active:scale-95 transition-all"
              aria-label="Previous photo"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full glass border border-white/25 flex items-center justify-center text-white/70 hover:text-white hover:border-[#FFD700]/60 hover:bg-white/5 active:scale-95 transition-all"
              aria-label="Next photo"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-7 flex justify-end">
              <div className="text-right text-white/60 text-sm font-mono tracking-widest tabular-nums shrink-0 drop-shadow-md">
                {currentIndex + 1} <span className="text-white/40">/ {tripImages.length}</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between px-1 mb-2.5">
              <p className="text-[#A8A29C] text-xs tracking-widest uppercase">Browse the full story</p>
              <p className="text-[#A8A29C] text-[10px] hidden md:block">Click any frame • Use ← → keys • Press F for fullscreen</p>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10 rounded-l-2xl" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10 rounded-r-2xl" />

              <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory no-scrollbar px-1">
                {tripImages.map((img, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      ref={(el) => { thumbnailRefs.current[idx] = el; }}
                      onClick={() => goToSlide(idx)}
                      className={`group relative flex-shrink-0 w-24 h-16 md:w-28 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 snap-start outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/70 ${isActive
                          ? "border-[#FFD700] scale-[1.03] shadow-lg shadow-black/50 z-10"
                          : "border-white/5 hover:border-white/20 opacity-80 hover:opacity-100"
                        }`}
                      aria-label={`Go to ${img.title}`}
                      aria-current={isActive ? "true" : "false"}
                    >
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:-translate-y-1"
                        sizes="110px"
                        loading={idx < 6 ? "eager" : "lazy"}
                      />
                      <div className={`absolute inset-0 transition-opacity ${isActive ? "bg-black/10" : "bg-black/40 group-hover:bg-black/20"}`} />
                      {isActive && (
                        <div className="absolute bottom-1.5 right-1.5 px-1.5 py-px text-[9px] font-bold tracking-wider bg-black/70 text-[#FFD700] rounded">
                          NOW
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 px-1 text-sm">
            <button
              onClick={() => openLightbox()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/15 hover:border-[#FFD700]/40 px-6 h-11 text-white/90 hover:text-white transition-all active:scale-[0.985]"
            >
              View all images in fullscreen gallery
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
            </button>

            <div className="text-[#A8A29C] text-xs text-center sm:text-right max-w-[260px]">
              Use ← → keys to navigate
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto w-full">
      </div>

      <ImageLightbox
        images={lightboxImages}
        alt="MAAC Annual Trip — Dalhousie & Khajjiar"
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </div>
    </ErrorBoundary>
  );
}

export default function AnnualTripPageWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <AnnualTripPage />
    </ErrorBoundary>
  );
}

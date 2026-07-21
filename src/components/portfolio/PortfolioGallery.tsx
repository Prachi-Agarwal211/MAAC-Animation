"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  categories,
  portfolioEntries,
  getEntriesByCategory,
  type PortfolioEntry,
} from "@/data/portfolio";
import ImageLightbox from "@/components/ui/ImageLightbox";

gsap.registerPlugin(ScrollTrigger);

/* ── Category SVG Icons (matching MAAC gold aesthetic) ── */
function CategoryIcon({ id }: { id: string }) {
  const props = { className: "w-3 h-3" };
  switch (id) {
    case "featured":
      return <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
    case "3d-game-asset":
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>;
    case "architectural-design":
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008z" /></svg>;
    case "character-modeling":
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
    case "digital-painting":
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>;
    case "environment-modeling":
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>;
    case "matte-painting":
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    default:
      return <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" /></svg>;
  }
}

export default function PortfolioGallery() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    entry: PortfolioEntry | null;
    imageIndex: number;
  }>({ isOpen: false, entry: null, imageIndex: 0 });

  const filteredEntries = useMemo(() => {
    return getEntriesByCategory(activeFilter);
  }, [activeFilter]);

  /* ── GSAP ScrollTrigger stagger reveal ── */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || filteredEntries.length === 0) return;

    const cards = grid.querySelectorAll<HTMLElement>(".vault-card");
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top 92%",
          once: true,
        },
      });

      tl.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power2.out",
      });
    }, grid);

    return () => ctx.revert();
  }, [filteredEntries]);

  const openLightbox = useCallback((entry: PortfolioEntry, imageIndex: number) => {
    setLightboxState({ isOpen: true, entry, imageIndex });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxState({ isOpen: false, entry: null, imageIndex: 0 });
  }, []);

  return (
    <>
      {/* ── Category Filter Bar — From Another inspired ── */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((cat) => {
          const count = cat.id === "all"
            ? portfolioEntries.length
            : portfolioEntries.filter((e) => e.category === cat.id).length;

          if (count === 0 && cat.id !== "all") return null;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`group relative px-4 py-2 rounded-full border text-xs font-bold transition-all duration-300 ${
                activeFilter === cat.id
                  ? "border-[#C4A882] text-[#C4A882] bg-[#C4A882]/10 shadow-[0_0_15px_rgba(196,168,130,0.15)]"
                  : "border-white/8 text-white/70 hover:border-[#C4A882]/40 hover:text-[#C4A882] bg-white/[0.02]"
              }`}
            >
              {cat.label}
              <span className={`ml-1 text-[10px] ${
                activeFilter === cat.id ? "text-[#C4A882]/60" : "text-white/40"
              }`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Result count ── */}
      {filteredEntries.length > 0 && (
        <div className="text-center mb-8">
          <p className="text-white/60 text-xs font-bold uppercase tracking-[0.15em]">
            <span className="text-[#F0EBE1]">{filteredEntries.length}</span> Student{" "}
            {filteredEntries.length === 1 ? "Portfolio" : "Portfolios"}
          </p>
        </div>
      )}

      {/* ── Clean 2-Column Grid — From Another inspired, no bento ── */}
      {filteredEntries.length > 0 ? (
        <div ref={gridRef} className="vault-grid">
          {filteredEntries.map((entry, index) => (
            <article
              key={entry.id}
              className="vault-card"
              onClick={() => openLightbox(entry, 0)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(entry, 0);
                }
              }}
              aria-label={`View ${entry.studentName}'s portfolio - ${entry.course}`}
            >
              {/* ── Media ── */}
              <div className="vault-media">
                <Image
                  src={entry.featuredImage}
                  alt={`${entry.studentName} - ${entry.description}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  loading={index < 4 ? undefined : "lazy"}
                  priority={index < 4}
                />

                {/* Always-visible bottom gradient */}
                <div className="vault-gradient" />

                {/* Hover red-tint gradient */}
                <div className="vault-hover-gradient" />

                {/* Van Morrison play button overlay — appears on hover */}
                <div className="vault-play">
                  <svg fill="none" height="80" viewBox="0 0 80 80" width="80" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" fill="black" fillOpacity="0.7" r="39.5" stroke="white" />
                    <path d="M51.3203 39.6227L34.3392 27.531V51.7144L51.3203 39.6227Z" fill="white" />
                  </svg>
                </div>

                {/* Category badge — top left */}
                <div className="vault-badge">
                  <CategoryIcon id={entry.category} />
                  {categories.find((c) => c.id === entry.category)?.label || entry.category}
                </div>

                {/* Image count — top right */}
                {entry.images.length > 1 && (
                  <div className="vault-count">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {entry.images.length}
                  </div>
                )}

                {/* ── Always-Visible Content ── */}
                <div className="vault-content">
                  <h3 className="vault-student">{entry.studentName}</h3>
                  <p className="vault-course">{entry.course}</p>
                </div>

                {/* ── Hover Content — tags + CTA slide up ── */}
                <div className="vault-hover">
                  {entry.tags.length > 0 && (
                    <div className="vault-tags">
                      {entry.tags.slice(0, 4).map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <span className="vault-cta">
                    View Portfolio
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-white/60 text-lg">No portfolios found in this category.</p>
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightboxState.entry && (
        <ImageLightbox
          images={lightboxState.entry.images}
          alt={`${lightboxState.entry.studentName} - ${lightboxState.entry.course}`}
          initialIndex={lightboxState.imageIndex}
          isOpen={lightboxState.isOpen}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

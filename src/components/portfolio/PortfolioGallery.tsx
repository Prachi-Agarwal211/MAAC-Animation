"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  categories,
  portfolioEntries,
  getEntriesByCategory,
  type PortfolioEntry,
} from "@/data/portfolio";
import ImageLightbox from "@/components/ui/ImageLightbox";

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    entry: PortfolioEntry | null;
    imageIndex: number;
  }>({ isOpen: false, entry: null, imageIndex: 0 });

  const filteredEntries = useMemo(() => {
    return getEntriesByCategory(activeFilter);
  }, [activeFilter]);

  const openLightbox = useCallback((entry: PortfolioEntry, imageIndex: number) => {
    setLightboxState({ isOpen: true, entry, imageIndex });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxState({ isOpen: false, entry: null, imageIndex: 0 });
  }, []);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center">
        {categories.map((cat) => {
          // Count entries for this category
          const count = cat.id === "all" 
            ? portfolioEntries.length 
            : portfolioEntries.filter((e) => e.category === cat.id).length;
          
          if (count === 0 && cat.id !== "all") return null;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${
                activeFilter === cat.id
                  ? "border-[#FFD700] text-[#FFD700] bg-[#FFD700]/10 shadow-[0_0_15px_rgba(227,24,55,0.2)]"
                  : "border-white/10 text-[#A8A29C] hover:border-[#FFD700]/50 hover:text-[#FFD700] bg-[#161616]"
              }`}
            >
              {cat.label}
              <span className={`ml-1.5 text-xs ${activeFilter === cat.id ? "text-[#FFD700]/70" : "text-[#6B6560]"}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Student Count */}
      <div className="text-center mb-8">
        <p className="text-[#6B6560] text-sm">
          Showing <span className="text-[#F0EBE1] font-semibold">{filteredEntries.length}</span> student {filteredEntries.length === 1 ? "portfolio" : "portfolios"}
        </p>
      </div>

      {/* Portfolio Grid */}
      {filteredEntries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEntries.map((entry) => (
            <PortfolioCard
              key={entry.id}
              entry={entry}
              onClick={(index) => openLightbox(entry, index)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#A8A29C] text-lg">No portfolios found for this category.</p>
        </div>
      )}

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
    </>
  );
}

// Individual portfolio card component
function PortfolioCard({
  entry,
  onClick,
}: {
  entry: PortfolioEntry;
  onClick: (imageIndex: number) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group relative bg-[#161616] rounded-xl overflow-hidden border border-white/5 hover:border-[#FFD700]/30 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(227,24,55,0.15)] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(0)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(0);
        }
      }}
      aria-label={`View ${entry.studentName}'s portfolio - ${entry.course}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
        <Image
          src={entry.featuredImage}
          alt={`${entry.studentName} - ${entry.description}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          loading="lazy"
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#FFD700]/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {categories.find((c) => c.id === entry.category)?.label || entry.category}
          </span>
        </div>

        {/* Image count badge */}
        {entry.images.length > 1 && (
          <div className="absolute top-3 right-3">
            <span className="bg-black/70 text-white text-[10px] font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {entry.images.length}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4">
            <span className="text-white/80 text-xs font-medium">Click to view portfolio</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-[#F0EBE1] text-base mb-1.5 group-hover:text-[#FFD700] transition-colors line-clamp-1 font-light uppercase leading-[1.1] tracking-[0.1em]">
          {entry.studentName}
        </h3>
        <p className="text-[#6B6560] text-xs mb-2">
          {entry.course}
        </p>
        <p className="text-[#A8A29C] text-sm leading-relaxed mb-3 line-clamp-2">
          {entry.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {entry.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] bg-white/5 text-[#6B6560] px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
          {entry.tags.length > 3 && (
            <span className="text-[10px] text-[#6B6560]">+{entry.tags.length - 3}</span>
          )}
        </div>
      </div>
    </article>
  );
}

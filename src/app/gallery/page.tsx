"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  category: ["Animation", "VFX", "Gaming", "Design"][i % 4],
}));

export default function GalleryPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gallery-hero">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-medium tracking-wider uppercase mb-4">
            Showcase
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            Student <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
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
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="gallery-item group relative glass-card rounded-2xl overflow-hidden"
              >
                <div className="image-placeholder aspect-square rounded-none border-0">
                  <div className="text-center">
                    <div className="text-4xl mb-2 opacity-40">
                      {item.category === "Animation"
                        ? "🎬"
                        : item.category === "VFX"
                        ? "✨"
                        : item.category === "Gaming"
                        ? "🎮"
                        : "🎨"}
                    </div>
                    <span className="text-xs">
                      Add Image {item.id}
                    </span>
                    <span className="text-[10px] text-gray-500 block mt-1">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                  <span className="text-primary text-xs font-medium uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-white font-heading font-semibold">
                    Student Project #{item.id}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";

// Map course slugs to relevant portfolio images
const coursePortfolioImages: Record<string, string> = {
  // Animation courses
  "3d-animation": "/portfolio/character-modeling/aarush-kumar-page1.jpg",
  "ad3d": "/portfolio/character-modeling/arfat-aziz-khan-page1.jpg",
  "d3d": "/portfolio/character-modeling/abhay-suryavanshi.jpg",
  // VFX courses
  "advfx": "/portfolio/matte-painting/akshat-asolkar.jpg",
  "vfx-plus": "/portfolio/matte-painting/biswabrata-dutta-page1.jpg",
  // Gaming courses
  "gaming-design": "/portfolio/3d-game-asset/archita-roy-page1.jpg",
  "dgdi": "/portfolio/3d-game-asset/bijoy-mech-page1.jpg",
  // Architectural Design
  "architectural-design": "/portfolio/architectural-design/krutika-vikram-rane-page1.jpg",
  "design-viz-pro": "/portfolio/architectural-design/mohhamad-kaif-karamat-shaikh-page1.jpg",
  // Digital Media / Digital Painting
  "apdmd": "/portfolio/digital-painting/deshna-shah.jpg",
  "graphic-design": "/portfolio/digital-painting/rudrani-samajpati-page1.jpg",
  // Filmmaking
  "dafm": "/portfolio/environment-modeling/sayan-chowdhury-page1.jpg",
  // Environment
  "environment-modeling": "/portfolio/environment-modeling/anindita-naskar-page1.jpg",
};

interface Course {
  slug: string;
  title: string;
  fullName: string;
  description: string;
  fullDescription: string;
  duration: string;
  code: string;
  tools: string[];
  careers: string[];
  eligibility: string;
  highlights: string[];
  oldUrls: string[];
}

export default function CourseHero({ course }: { course: Course }) {
  const portfolioImage = coursePortfolioImages[course.slug];

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #1A0508 0%, #0C0C0C 50%, #0C0C0C 100%)" }}
      />

      {/* Portfolio image background */}
      {portfolioImage && (
        <div className="absolute inset-0 opacity-[0.08]">
          <Image
            src={portfolioImage}
            alt={`${course.title} student work example`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #BF953F 0%, transparent 70%)" }} />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #BF953F 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-[#6B6560]">
              <li><Link href="/" className="hover:metallic-gold-text transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/courses" className="hover:metallic-gold-text transition-colors">Courses</Link></li>
              <li>/</li>
              <li className="text-[#A8A29C]">{course.title}</li>
            </ol>
          </nav>

          {/* Course badge */}
          <div className="inline-flex items-center gap-2 bg-[#BF953F]/10 border border-[#BF953F]/30 rounded-full px-4 py-2 mb-6">
            <span className="metallic-gold-text text-xs font-semibold tracking-wider uppercase">{course.code}</span>
            <span className="text-[#6B6560]">•</span>
            <span className="text-[#A8A29C] text-sm">{course.duration}</span>
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[#F0EBE1] leading-[1.1] mb-6">
            {course.fullName}
          </h1>

          {/* Description */}
          <p className="text-[#A8A29C] text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
            {course.fullDescription}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="btn btn-primary bg-gradient-to-r from-[#BF953F] to-[#C4132D] text-white hover:opacity-90 border border-[#BF953F]/50 shadow-[0_0_20px_rgba(227,24,55,0.3)] px-8 py-4 rounded-lg font-semibold text-center uppercase tracking-widest text-[10px]"
            >
              Book Free Demo Class
            </Link>
            <a
              href="https://wa.me/917300001589"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-4 rounded-lg font-semibold text-center"
            >
              WhatsApp Us
            </a>
          </div>

          {/* Quick info */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-[#6B6560] text-xs uppercase tracking-wider mb-1">Duration</p>
              <p className="text-[#F0EBE1] font-semibold">{course.duration}</p>
            </div>
            <div>
              <p className="text-[#6B6560] text-xs uppercase tracking-wider mb-1">Eligibility</p>
              <p className="text-[#F0EBE1] font-semibold">{course.eligibility}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-[#6B6560] text-xs uppercase tracking-wider mb-1">Tools You&apos;ll Learn</p>
              <p className="text-[#F0EBE1] font-semibold text-sm">{course.tools.slice(0, 3).join(", ")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

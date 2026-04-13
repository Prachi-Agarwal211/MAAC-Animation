"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import Footer from "@/components/Footer";
import { siteCoursesData } from "@/data/siteData";
import Image from "next/image";
import { getCourseSchema, breadcrumbSchema } from "@/lib/structured-data";
import { ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";

function CoursePanel({ course, index }: { course: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="course-panel group relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#111111] border border-white/5 transition-all duration-700 hover:border-[#E31837]/40 hover:shadow-2xl hover:shadow-[#E31837]/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {course.image && (
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-1000"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-10">
        <div className="mb-6 transform transition-transform duration-700 group-hover:-translate-y-3">
          <span className="text-[#E31837] text-[9px] font-bold uppercase tracking-wider mb-3 block">0{index + 1} · {course.subtitle}</span>
          <h3 className="text-white font-display font-black text-2xl md:text-3xl leading-none tracking-tighter mb-3">{course.title}</h3>
          <p className="text-[#A8A29C] text-xs md:text-sm line-clamp-2 group-hover:opacity-0 transition-opacity duration-500">{course.description}</p>
        </div>

        {/* Hover Reveal */}
        <div
          className="absolute inset-0 bg-[#0C0C0C]/95 p-8 md:p-10 flex flex-col justify-center transition-all duration-1000 ease-expo-out z-30"
          style={{ clipPath: isHovered ? 'circle(150% at 100% 100%)' : 'circle(0% at 100% 100%)' }}
        >
           <div className="w-12 h-[1px] bg-[#E31837] mb-6" />
           <p className="text-white/80 text-sm leading-relaxed mb-6">
             {course.fullDescription}
           </p>
           <div className="flex flex-wrap gap-2 mb-8">
             {course.careers.map((c: string) => (
               <span key={c} className="text-[8px] font-bold uppercase tracking-wider text-white/40 border border-white/10 px-2 py-1 rounded-full hover:text-white hover:border-[#E31837]/50 transition-colors">
                 {c}
               </span>
             ))}
           </div>
           <Link href="/contact" className="inline-flex items-center gap-3 text-white text-[9px] font-bold tracking-wider uppercase group/link">
             SECURE ADMISSION
             <div className="w-10 h-10 rounded-full bg-[#E31837] flex items-center justify-center transition-transform group-hover/link:scale-110">
               <ArrowUpRight size={16} />
             </div>
           </Link>
        </div>
      </div>
    </div>
  );
}

export default function CoursesClient() {
  const [filter, setFilter] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCourses = siteCoursesData.categories.filter(c =>
    c.title.toLowerCase().includes(filter.toLowerCase()) ||
    c.description.toLowerCase().includes(filter.toLowerCase())
  );

  useGSAP(() => {
    gsap.fromTo(".course-panel",
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.1, ease: "expo.out", delay: 0.5 }
    );
  }, { dependencies: [filter], scope: containerRef });

  return (
    <main ref={containerRef} className="bg-[#080808] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ItemList",
                "itemListElement": siteCoursesData.popularCourses.map((course, i) => ({
                  "@type": "ListItem",
                  "position": i + 1,
                  "item": getCourseSchema(course.fullName, course.description, course.duration)
                }))
              },
              breadcrumbSchema([
                { name: "Home", url: "https://www.maacanimationjaipur.com" },
                { name: "Courses", url: "https://www.maacanimationjaipur.com/courses" }
              ])
            ]
          }),
        }}
      />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-28 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 border-b border-white/5 pb-16">
            <div className="max-w-3xl">
              <span className="inline-block text-[#E31837] text-[10px] font-bold tracking-[0.4em] uppercase mb-6">Professional Programs</span>
              <h1 className="font-display font-black text-[clamp(2.5rem,7vw,5rem)] text-white leading-[0.9] tracking-tighter mb-6">
                MASTER YOUR <br /> <span className="gradient-text">LEGACY</span>
              </h1>
              <p className="text-[#A8A29C] text-base md:text-lg font-medium leading-relaxed italic border-l-2 border-[#E31837] pl-6">
                Explore our elite selection of VFX, Animation, and Game Design courses engineered for the next generation of visual storytellers.
              </p>
            </div>

            {/* Filter UI */}
            <div className="relative w-full lg:w-80 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-[#E31837] transition-colors" size={18} />
              <input
                type="text"
                placeholder="SEARCH PROGRAMS..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-[#111111] border border-white/5 rounded-full py-5 pl-14 pr-6 text-[10px] font-bold tracking-wider text-white focus:outline-none focus:border-[#E31837]/50 transition-all uppercase placeholder:text-white/10"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-32">
            {filteredCourses.map((course, i) => (
              <CoursePanel key={course.id} course={course} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import Footer from "@/components/Footer";
import { siteCoursesData } from "@/data/siteData";
import { getCourseSchema, breadcrumbSchema } from "@/lib/structured-data";
import { ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";

function CoursePanel({ course, index }: { course: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="course-panel group relative aspect-[3/4] rounded-[48px] overflow-hidden bg-[#111111] border border-white/5 transition-all duration-700 hover:border-[#E31837]/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center text-[15rem] font-display font-black text-white/[0.02] group-hover:text-white/[0.05] transition-all duration-1000 group-hover:scale-110">{course.id[0].toUpperCase()}</div>
      </div>

      <div className="relative z-20 h-full flex flex-col justify-end p-10 md:p-12">
        <div className="mb-8 transform transition-transform duration-700 group-hover:-translate-y-4">
          <span className="text-[#E31837] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">0{index + 1} · {course.subtitle}</span>
          <h3 className="text-white font-display font-black text-3xl md:text-4xl leading-none tracking-tighter mb-4">{course.title}</h3>
          <p className="text-[#A8A29C] text-sm md:text-base line-clamp-2 group-hover:opacity-0 transition-opacity duration-500">{course.description}</p>
        </div>

        {/* Cinematic Reveal */}
        <div 
          className="absolute inset-0 bg-[#0C0C0C]/95 p-10 md:p-12 flex flex-col justify-center transition-all duration-1000 ease-expo-out z-30"
          style={{ clipPath: isHovered ? 'circle(150% at 100% 100%)' : 'circle(0% at 100% 100%)' }}
        >
           <div className="w-16 h-[1px] bg-[#E31837] mb-8" />
           <p className="text-white/80 text-lg leading-relaxed mb-8">
             {course.fullDescription}
           </p>
           <div className="flex flex-wrap gap-2 mb-12">
             {course.careers.map((c: string) => (
               <span key={c} className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 border border-white/10 px-3 py-1.5 rounded-full hover:text-white hover:border-[#E31837]/50 transition-colors">
                 {c}
               </span>
             ))}
           </div>
           <Link href="/contact" className="inline-flex items-center gap-4 text-white text-[10px] font-bold tracking-[0.4em] uppercase group/link">
             SECURE ADMISSION
             <div className="w-12 h-12 rounded-full bg-[#E31837] flex items-center justify-center transition-transform group-hover/link:scale-110 shadow-2xl shadow-[#E31837]/20">
               <ArrowUpRight size={20} />
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
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 border-b border-white/5 pb-20">
            <div className="max-w-4xl">
              <span className="inline-block text-[#E31837] text-xs font-bold tracking-[0.4em] uppercase mb-8">Professional Programs</span>
              <h1 className="font-display font-black text-[clamp(3.5rem,10vw,8.5rem)] text-white leading-[0.85] tracking-tighter mb-8">
                MASTER YOUR <br /> <span className="gradient-text">LEGACY</span>
              </h1>
              <p className="text-[#A8A29C] text-lg md:text-2xl font-medium leading-relaxed italic border-l-2 border-[#E31837] pl-8">
                Explore our elite selection of VFX, Animation, and Game Design courses engineered for the next generation of visual storytellers.
              </p>
            </div>

            {/* Filter UI */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-[#E31837] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="SEARCH PROGRAMS..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-[#111111] border border-white/5 rounded-full py-6 pl-16 pr-8 text-xs font-bold tracking-[0.2em] text-white focus:outline-none focus:border-[#E31837]/50 transition-all uppercase placeholder:text-white/10"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pb-40">
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

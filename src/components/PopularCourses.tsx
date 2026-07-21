import { coursesData } from "@/data/courses";
import SplitTextReveal from "@/components/ui/SplitTextReveal";
import PopularCoursesScroll from "@/components/ui/PopularCoursesScroll";

// Central source of truth: use the same ogImages defined for courses in /courses page
// This ensures landing page popular courses show the proper defined course images, not old portfolio ones.
const popularCodes = ["ADVFX", "AD3D", "DGDI", "APDMD", "D3D", "VFXP"];

const displayCourses = popularCodes
  .map((code) => {
    const course = coursesData.find((c) => c.code === code);
    if (!course) return null;
    return {
      name: course.name,
      fullName: course.fullName,
      duration: course.duration,
      description: course.shortDescription,
      code: course.code,
    };
  })
  .filter(Boolean) as Array<{
    name: string;
    fullName: string;
    duration: string;
    description: string;
    code: string;
  }>;

const courseImages: Record<string, string> = Object.fromEntries(
  popularCodes.map((code) => {
    const course = coursesData.find((c) => c.code === code);
    return [code, course?.ogImage || ""];
  })
);

export default function PopularCourses() {
  return (
    <section className="relative bg-transparent py-16 md:py-24 overflow-hidden">
      <div className="atmosphere-blob blob-red top-1/2 left-0 opacity-10" />
      
      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] metallic-gold-accent" />
              The Academy Portfolio
            </p>

            <h2 className="font-display text-[clamp(1rem,4vw,1.75rem)] leading-[0.85] text-white font-bold uppercase tracking-wide">
              <SplitTextReveal>EXPERTLY CRAFTED</SplitTextReveal>{' '}
              <span className="title-layer">
                <span className="title-layer-glow" aria-hidden="true">CURRICULUM</span>
                <SplitTextReveal delay={0.2} className="metallic-gold-text italic tracking-wider relative z-10">CURRICULUM</SplitTextReveal>
              </span>
            </h2>
          </div>
        </div>
        
        {/* Track (Client Island for scroll buttons + swipe) */}
        <PopularCoursesScroll 
          courses={displayCourses} 
          courseImages={courseImages} 
        />
      </div>
    </section>
  );
}



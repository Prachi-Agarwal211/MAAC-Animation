import { siteCoursesData } from "@/data/siteData";
import FadeIn from "@/components/animations/FadeIn";
import PopularCoursesScroll from "@/components/ui/PopularCoursesScroll";

const coursePortfolioImages: Record<string, string> = {
  "ADVFX": "/portfolio/matte-painting/akshat-asolkar.jpg",
  "AD3D": "/portfolio/character-modeling/aarush-kumar-page1.jpg",
  "DGDI": "/portfolio/3d-game-asset/archita-roy-page1.jpg",
  "APDMD": "/portfolio/digital-painting/deshna-shah.jpg",
  "D3D": "/portfolio/character-modeling/abhay-suryavanshi.jpg",
  "VFXP": "/portfolio/matte-painting/biswabrata-dutta-page1.jpg",
};

export default function PopularCourses() {
  return (
    <section className="relative bg-transparent py-16 md:py-24 overflow-hidden">
      <div className="atmosphere-blob blob-red top-1/2 left-0 opacity-10" />
      
      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <FadeIn className="max-w-2xl">
            <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] metallic-gold-accent" />
              The Academy Portfolio
            </p>

            <h2 className="font-display text-[clamp(1rem,4vw,1.75rem)] leading-[0.85] text-white font-bold uppercase tracking-wide">
              EXPERTLY CRAFTED <span className="metallic-gold-text italic tracking-wider">CURRICULUM</span>
            </h2>
          </FadeIn>
        </div>
        
        {/* Track (Client Island for scroll buttons + swipe) */}
        <PopularCoursesScroll 
          courses={siteCoursesData.popularCourses} 
          coursePortfolioImages={coursePortfolioImages} 
        />
      </div>
    </section>
  );
}



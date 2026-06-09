import { awardsData } from "@/data/siteData";
import { Trophy } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import KineticAwardsRows from "@/components/ui/KineticAwardsRows";

export default function Awards() {
  return (
    <section className="relative py-24 md:py-40 bg-transparent overflow-hidden">
      <div className="atmosphere-blob blob-orange top-1/2 -left-20 opacity-5" />
      
      <div className="relative z-10 max-w-content mx-auto px-6 mb-32">
        <FadeIn className="aw-header text-left">
          <p className="metallic-gold-text text-sm font-bold tracking-[0.3em] uppercase mb-6">Excellence Recognized</p>
          <h2 className="font-display text-[clamp(1.5rem,5vw,3rem)] text-white leading-[0.9] font-bold uppercase leading-[1.1] tracking-[0.1em]">
            Our Legacy of <br /> <span className="metallic-gold-text">Winning</span>
          </h2>
        </FadeIn>
      </div>

      {/* Kinetic Rows (Desktop - Client Island) */}
      <KineticAwardsRows awards={awardsData} />

      {/* Mobile: Elegant Staggered List (Static RSC) */}
      <div className="lg:hidden px-6">
        <FadeIn stagger={0.1} className="space-y-6">
          {awardsData.map((award, i) => (
            <div key={i} className="p-8 rounded-[32px] glass border border-white/5 flex items-start justify-between group">
              <div>
                <div className="text-[10px] font-bold metallic-gold-text uppercase tracking-[0.2em] mb-2">{award.year}</div>
                <h3 className="text-white text-xl font-display mb-1 font-bold uppercase leading-[1.1] tracking-[0.1em]">{award.name}</h3>
                <p className="text-[#A8A29C] text-xs font-bold uppercase tracking-widest">{award.org}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center metallic-gold-text">
                <Trophy size={18} />
              </div>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

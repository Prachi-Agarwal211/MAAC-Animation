import FadeIn from "@/components/animations/FadeIn";
import TrustBadgesScroll from "@/components/ui/TrustBadgesScroll";

const certifications = [
  {
    name: "SKILL INDIA",
    logo: "/govt/skillIndia.jpg",
    sub: "कौशल भारत - कुशल भारत",
  },
  {
    name: "MESC",
    logo: "/govt/mesc.png",
    sub: "Media & Entertainment\nSkills Council",
  },
  {
    name: "NSDC",
    logo: "/govt/nsdc.png",
    sub: "RE IMAGINE FUTURE",
  },
  {
    name: "SKILL INDIA",
    logo: "/govt/skillIndia.jpg",
    sub: "कौशल भारत - कुशल भारत",
  },
  {
    name: "MESC",
    logo: "/govt/mesc.png",
    sub: "Media & Entertainment\nSkills Council",
  },
];

export default function TrustBadges() {
  return (
    <section className="relative py-10 md:py-16 bg-transparent border-t border-white/5 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-5 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-4">
          
          {/* Left Content */}
          <FadeIn className="w-full lg:w-[45%] flex flex-col items-start z-10 shrink-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-6 h-[1px] metallic-gold-accent" />
              <span className="metallic-gold-text text-[11px] font-bold tracking-[0.25em] uppercase">
                Govt Affiliated & Recognized
              </span>
            </div>
            
            <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.2rem)] leading-[1.1] uppercase mb-8">
              <span className="block text-white/90 tracking-[0.15em]">RECOGNIZED</span>
              <span className="block metallic-gold-text italic tracking-normal">EXCELLENCE</span>
            </h2>
            
            <div className="flex flex-row items-center gap-4">
              <div className="w-[1px] h-6 metallic-gold-accent" />
              <p className="text-white text-lg md:text-xl font-bold tracking-wide">
                Industry aligned. Future focused.
              </p>
            </div>
          </FadeIn>

          {/* Right Content - Cards setup (Client Island) */}
          <TrustBadgesScroll certifications={certifications} />

        </div>
      </div>
    </section>
  );
}

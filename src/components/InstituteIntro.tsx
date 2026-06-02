import VideoFacade from "@/components/ui/VideoFacade";
import FadeIn from "@/components/animations/FadeIn";
import CountUpStat from "@/components/ui/CountUpStat";

export default function InstituteIntro() {
  return (
    <div className="relative z-20 bg-transparent py-16 md:py-24">
      <div className="max-w-content mx-auto px-5 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center">
          
          {/* Left: Video */}
          <FadeIn className="lg:col-span-7 institute-video-container">
            <VideoFacade youtubeId="jO4xZJe_ql8" title="MAAC Animation Showreel" className="aspect-video" />
          </FadeIn>

          {/* Right: Text */}
          <div className="lg:col-span-5">
            <FadeIn>
              <div className="mb-10">
                <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
                  <span className="w-8 h-[1px] metallic-gold-accent" />
                  Jaipur&apos;s Creative Authority
                </p>
                <h2 className="font-display text-[clamp(1.4rem,4.5vw,2.8rem)] leading-[0.9] text-white font-bold uppercase leading-[1.1] tracking-[0.1em]">
                  ELITE <span className="metallic-gold-text italic">POWERHOUSE</span>
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="institute-description text-[#A8A29C] md:text-lg leading-relaxed mb-10">
                <p>
                  As Rajasthan&apos;s leading Animation and VFX institute, MAAC Jaipur provides industry-aligned training engineered for the global production pipeline.
                </p>
              </div>
            </FadeIn>

            {/* Trust Badges */}
            <FadeIn delay={0.4} stagger={0.1} className="institute-badges flex flex-wrap gap-3 mb-12">
              {["NSDC Partner", "MESC Certified", "B.Voc Degree"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase glass border border-white/20 text-white hover:border-[#BF953F]/40 transition-colors cursor-default"
                >
                  <div className="w-1.5 h-1.5 rounded-full metallic-gold-accent" />
                  {badge}
                </span>
              ))}
            </FadeIn>

            {/* Stats row inside content */}
            <FadeIn delay={0.6} className="grid grid-cols-3 gap-4 pt-10 border-t border-white/5">
              <CountUpStat number={30} suffix="+" label="Years" />
              <CountUpStat number={95} suffix="%" label="Placement" />
              <CountUpStat number={50} suffix="K+" label="Alumni" />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

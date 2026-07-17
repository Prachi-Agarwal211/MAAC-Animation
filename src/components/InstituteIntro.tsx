import VideoFacade from "@/components/ui/VideoFacade";
import FadeIn from "@/components/animations/FadeIn";
import CountUpStat from "@/components/ui/CountUpStat";
import LiquidReveal from "@/components/ui/LiquidReveal";
import SplitTextReveal from "@/components/ui/SplitTextReveal";

export default function InstituteIntro() {
  return (
    <div className="relative z-20 bg-transparent py-16 md:py-24">
      <div className="max-w-content mx-auto px-5 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center">
          
          {/* Left: Video */}
          <LiquidReveal className="lg:col-span-7 institute-video-container">
            <VideoFacade youtubeId="jO4xZJe_ql8" title="MAAC Animation Showreel" className="aspect-video" />
          </LiquidReveal>

          {/* Right: Text */}
          <div className="lg:col-span-5">
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-[2px] bg-gradient-to-r from-[#BF953F] to-transparent" />
                <span className="text-white/40 text-[9px] font-bold tracking-[0.3em] uppercase">Since 1986</span>
              </div>
              <h2 className="font-display text-[clamp(1.6rem,4.5vw,3rem)] leading-[0.9] text-white font-bold uppercase tracking-[0.02em]">
                <SplitTextReveal>JAIPUR&apos;S PREMIER</SplitTextReveal><br />
                <SplitTextReveal delay={0.2} className="metallic-gold-text">ANIMATION INSTITUTE</SplitTextReveal>
              </h2>
            </div>

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

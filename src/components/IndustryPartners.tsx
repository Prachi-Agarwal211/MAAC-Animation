import FadeIn from "@/components/animations/FadeIn";

const partners = [
  "NILEE GAMES",
  "MUGAFI",
  "AUTODESK",
  "CANON",
  "COPPERSEED",
  "PIXEL RATIO",
  "CEDGE",
  "PHYSICS WALLAH",
  "ZEBU",
  "RESONANCE",
  "CIMPRESS",
  "PHANTOMFX",
  "TECH MAHINDRA",
  "POSTIFY",
  "LFX STUDIOS",
];

// Create 4 copies for seamless loop
const extendedPartners = [...partners, ...partners, ...partners, ...partners];
const reversedPartners = [...extendedPartners].reverse();

export default function IndustryPartners() {
  return (
    <section
      className="relative bg-transparent py-12 md:py-20 overflow-hidden border-y border-white/5"
    >
      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-16 md:mb-20">
          <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] metallic-gold-accent" />
            Powering the Studio Network
            <span className="w-8 h-[1px] metallic-gold-accent" />
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-[0.8] text-white font-bold uppercase leading-[1.1] tracking-[0.1em]">
            HIRING <span className="metallic-gold-text italic">ECOSYSTEM</span>
          </h2>
        </FadeIn>

        <div className="relative space-y-6">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none" />

          {/* Row 1 - Scrolls Left */}
          <div className="flex items-center gap-8 w-max animate-marquee">
            {extendedPartners.map((partner, i) => (
              <div key={`${partner}-${i}`} className="shrink-0 group">
                <div className="w-48 h-20 md:w-56 md:h-24 glass-card border border-white/10 flex items-center justify-center px-6 transition-all duration-300 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,215,0,0.1)]">
                  <span className="text-xs md:text-sm text-white font-bold uppercase tracking-wider text-center group-hover:text-[#FFD700] transition-colors">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 - Scrolls Right */}
          <div className="flex items-center gap-8 w-max animate-marquee-reverse">
            {reversedPartners.map((partner, i) => (
              <div key={`${partner}-${i}`} className="shrink-0 group">
                <div className="w-48 h-20 md:w-56 md:h-24 glass-card border border-white/10 flex items-center justify-center px-6 transition-all duration-300 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,215,0,0.1)]">
                  <span className="text-xs md:text-sm text-white font-bold uppercase tracking-wider text-center group-hover:text-[#FFD700] transition-colors">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

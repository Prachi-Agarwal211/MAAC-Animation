import SplitTextReveal from "@/components/ui/SplitTextReveal";

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

const extendedPartners = [...partners, ...partners, ...partners, ...partners];
const reversedPartners = [...extendedPartners].reverse();

export default function IndustryPartners() {
  return (
    <section className="relative bg-transparent py-12 md:py-20 overflow-hidden">
      <div className="relative z-10 max-w-[1800px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] metallic-gold-accent" />
            Powering the Studio Network
            <span className="w-8 h-[1px] metallic-gold-accent" />
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[0.8] text-white font-bold uppercase leading-[1.1] tracking-[0.1em]">
            <SplitTextReveal>HIRING</SplitTextReveal>{' '}
            <SplitTextReveal delay={0.2} className="metallic-gold-text italic">ECOSYSTEM</SplitTextReveal>
          </h2>
        </div>

        <div className="relative space-y-4 md:space-y-5">
          {/* Softer edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

          {/* Row 1 */}
          <div className="flex items-center gap-5 md:gap-6 w-max animate-marquee">
            {extendedPartners.map((partner, i) => (
              <div key={`${partner}-${i}`} className="shrink-0 group">
                <div className="w-40 h-16 md:w-48 md:h-20 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center px-5 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5">
                  <span className="text-[11px] md:text-xs text-white/70 font-bold uppercase tracking-wider text-center group-hover:text-white transition-colors">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex items-center gap-5 md:gap-6 w-max animate-marquee-reverse">
            {reversedPartners.map((partner, i) => (
              <div key={`${partner}-${i}`} className="shrink-0 group">
                <div className="w-40 h-16 md:w-48 md:h-20 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center px-5 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5">
                  <span className="text-[11px] md:text-xs text-white/70 font-bold uppercase tracking-wider text-center group-hover:text-white transition-colors">
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

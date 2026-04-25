import Link from "next/link";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function CareerCreatorComparison() {
  return (
    <div className="relative overflow-hidden bg-transparent py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 text-center">
        <FadeIn>
          <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] metallic-gold-accent" />
            Custom Engineered Career Tracks
            <span className="w-8 h-[1px] metallic-gold-accent" />
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.8] text-white font-bold uppercase leading-[1.1] tracking-[0.1em]">
            CHOOSE YOUR <span className="metallic-gold-text italic">PATHWAY</span>
          </h2>
        </FadeIn>
      </div>

      <FadeIn stagger={0.2} y={50} className="flex flex-col lg:flex-row min-h-[70svh]">

        {/* LEFT: CAREER X */}
        <div className="ccc-panel group relative flex-1 overflow-hidden transition-all duration-700 ease-expo-out lg:hover:flex-[1.5]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0000]/80 to-transparent" />
          <div className="absolute inset-0 bg-[#FFD700]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 flex items-center justify-center border border-[#FFD700]/30">
                  <Rocket size={18} className="text-[#FFD700]" />
                </div>
                <span className="text-[#FFD700] text-[10px] font-bold tracking-[0.3em] uppercase">Pathway 01</span>
              </div>

              <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] text-white leading-[0.85] mb-6 font-bold uppercase leading-[1.1] tracking-[0.1em]">
                CAREER <span className="metallic-gold-text italic">X</span>
              </h2>

              <p className="text-[#A8A29C] md:text-lg font-bold max-w-md leading-relaxed mb-8 border-l-2 border-[#FFD700] pl-4">
                Studio-aligned programs designed for those seeking high-impact careers in global production houses.
              </p>

              <ul className="space-y-4 mb-8">
                {["Industry-academia learning", "Studio-led delivery", "Live case studies", "End-to-end production workflow"].map((item) => (
                  <li key={item} className="text-white text-sm font-bold uppercase tracking-wider pl-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {["DNEG", "MPC", "Framestore", "Prime Focus"].map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-full glass border border-white/5 text-[9px] font-bold tracking-widest text-white">{s}</span>
                ))}
              </div>
              <Link href="/courses" className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 hover:bg-white hover:text-black transition-colors duration-500 rounded-full text-white bg-transparent text-xs font-bold tracking-[0.3em] uppercase group/btn">
                Explore Career X
                <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:text-black" />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT: CREATOR X */}
        <div className="ccc-panel group relative flex-1 overflow-hidden transition-all duration-700 ease-expo-out lg:hover:flex-[1.5] border-t lg:border-t-0 lg:border-l border-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c0805]/80 to-transparent" />
          <div className="absolute inset-0 bg-[#FF6B35]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center border border-[#FF6B35]/30">
                  <Sparkles size={18} className="text-[#FF6B35]" />
                </div>
                <span className="text-[#FF6B35] text-[10px] font-bold tracking-[0.3em] uppercase">Pathway 02</span>
              </div>

              <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] text-white leading-[0.85] mb-6 font-bold uppercase leading-[1.1] tracking-[0.1em]">
                CREATOR <span className="text-[#FF6B35] italic">X</span>
              </h2>

              <p className="text-[#A8A29C] md:text-lg font-bold max-w-md leading-relaxed mb-8 border-l-2 border-[#FF6B35] pl-4">
                Empowering independent artists to build their own brand, manage clients, and master the gig economy.
              </p>

              <ul className="space-y-4 mb-8">
                {["Entrepreneurship readiness", "Freelance strategy", "IP creation & growth", "Client management", "Monetization"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white text-sm font-bold uppercase tracking-wider">
                    <div className="w-1 h-1 rounded-full bg-[#FF6B35] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-[#6B6560] text-[9px] font-bold uppercase tracking-[0.2em]">Ideal for Independent Creators & Freelancers</p>
              <Link href="/courses" className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#FF6B35]/40 hover:bg-[#FF6B35] hover:text-white transition-colors duration-500 rounded-full text-white bg-transparent text-xs font-bold tracking-[0.3em] uppercase group/btn">
                Launch Creator X
                <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

      </FadeIn>
    </div>
  );
}

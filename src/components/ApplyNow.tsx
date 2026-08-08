import { contactInfo } from "@/data/siteData";
import MagneticButton from "@/components/ui/MagneticButton";
import { Phone, MessageSquare, ShieldCheck, Sparkles, GraduationCap } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import ApplyNowForm from "@/components/ui/ApplyNowForm";

export default function ApplyNow() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      {/* Atmosphere glow */}
      <div className="atmosphere-blob blob-red top-0 left-0 opacity-10" />
      <div className="atmosphere-blob blob-gold bottom-0 right-0 opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">
          {/* ─── Left: Content ─── */}
          <div className="space-y-10">
            <FadeIn>
              {/* Section label */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-8 bg-gradient-to-r from-[#BF953F] to-transparent" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#C4A882]">Admissions Open</span>
                <span className="px-2 py-0.5 rounded-full bg-[#BF953F]/10 border border-[#BF953F]/20 text-[8px] font-bold tracking-wider text-[#C4A882] uppercase">Apply Now</span>
              </div>

              {/* Heading */}
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] text-white font-bold">
                START YOUR<br />
                <span className="metallic-gold-text italic">CREATIVE</span>{" "}
                <span className="relative inline-block">
                  LEGACY
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#BF953F] to-transparent rounded-full" />
                </span>
              </h2>
              
              <p className="text-white/85 text-base md:text-lg leading-relaxed mt-6 max-w-lg">
                Book a free counseling session or demo class with our industry experts today. Take the first step toward a career in animation, VFX, gaming, and design.
              </p>
            </FadeIn>

            {/* Badges */}
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: ShieldCheck, label: "NSDC Partner", desc: "Govt. recognized" },
                  { icon: GraduationCap, label: "MESC Certified", desc: "Industry approved" },
                  { icon: Sparkles, label: "Skill India", desc: "National initiative" },
                  { icon: ShieldCheck, label: "B.Voc Degree", desc: "UGC recognized" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#BF953F]/5 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-[#C4A882]/70" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-white/80">{label}</p>
                      <p className="text-[9px] text-white/60 tracking-wide">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Direct Contact */}
            <FadeIn delay={0.2}>
              <div className="pt-6 border-t border-white/[0.06]">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-4">Contact Us Directly</p>
                <div className="flex flex-wrap gap-3">
                  <MagneticButton>
                    <a href={contactInfo.whatsapp ? `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}` : "#"} className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#25D366]/5 border border-[#25D366]/15 text-[#25D366] text-[11px] font-bold uppercase tracking-widest hover:bg-[#25D366]/15 hover:border-[#25D366]/30 transition-all duration-300">
                      <MessageSquare size={14} /> WhatsApp
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#BF953F]/5 border border-[#BF953F]/15 text-[#C4A882] text-[11px] font-bold uppercase tracking-widest hover:bg-[#BF953F]/15 hover:border-[#BF953F]/30 transition-all duration-300">
                      <Phone size={14} /> Call Now
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ─── Right: Form ─── */}
          <FadeIn delay={0.15} y={20}>
            <div className="relative">
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#BF953F]/10 via-transparent to-transparent opacity-50 pointer-events-none" />
              <ApplyNowForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}



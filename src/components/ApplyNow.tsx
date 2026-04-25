import { contactInfo } from "@/data/siteData";
import MagneticButton from "@/components/ui/MagneticButton";
import { Phone, MessageSquare, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import ApplyNowForm from "@/components/ui/ApplyNowForm";

export default function ApplyNow() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden bg-transparent">
      <div className="atmosphere-blob blob-red top-0 left-0 opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div className="space-y-10">
            <FadeIn>
              <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] metallic-gold-accent" />
                Admissions Open
              </p>
              <h2 className="font-display text-[clamp(1.8rem,6vw,3.5rem)] leading-[0.8] text-white font-bold uppercase leading-[1.1] tracking-[0.1em]">
                START YOUR CREATIVE <span className="metallic-gold-text italic">LEGACY</span>
              </h2>
              <p className="text-[#A8A29C] text-lg md:text-xl font-bold leading-relaxed mt-8 max-w-lg">
                Book a free counseling session or demo class with our industry experts today.
              </p>
            </FadeIn>


            <FadeIn delay={0.2} stagger={0.1} className="grid grid-cols-2 gap-4">
              {["NSDC Partner", "MESC Certified", "Skill India", "B.Voc Degree"].map((badge) => (
                <div key={badge} className="flex items-center gap-3 p-4 rounded-2xl glass border border-white/5 text-white text-xs font-bold uppercase tracking-wider">
                  <div className="w-6 h-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
                    <ShieldCheck size={14} className="text-[#FFD700]" />
                  </div>
                  {badge}
                </div>
              ))}
            </FadeIn>

            <FadeIn delay={0.4} className="space-y-6 pt-6 border-t border-white/5">
              <p className="text-[#6B6560] text-xs font-bold uppercase tracking-[0.2em]">Contact Us Directly</p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton>
                  <a href={contactInfo.whatsapp ? `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}` : "#"} className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-xs font-bold uppercase tracking-widest hover:bg-[#25D366]/20 transition-all">
                    <MessageSquare size={16} /> WhatsApp
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#BF953F]/10 border border-[#BF953F]/20 text-[#BF953F] text-xs font-bold uppercase tracking-widest hover:bg-[#BF953F]/20 transition-all">
                    <Phone size={16} /> Call Now
                  </a>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>

          {/* Right — Form (Client Island) */}
          <FadeIn delay={0.2} x={30}>
            <ApplyNowForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

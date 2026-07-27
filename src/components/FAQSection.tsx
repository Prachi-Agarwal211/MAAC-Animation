import { faqSchema } from "@/lib/structured-data";
import { MessageSquare } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import SplitTextReveal from "@/components/ui/SplitTextReveal";
import FAQAccordion from "@/components/ui/FAQAccordion";

const faqs = faqSchema.mainEntity.slice(0, 10);

export default function FAQSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-transparent">
      <div className="atmosphere-blob blob-orange bottom-0 right-0 opacity-5" />
      
      <div className="max-w-content mx-auto px-6 lg:px-20 grid lg:grid-cols-12 gap-16 md:gap-24">
        
        {/* Left: Content */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="metallic-gold-text-sm text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] metallic-gold-accent" />
              Support Hub
            </p>
            <h2 className="font-display text-[clamp(1.8rem,6vw,3.5rem)] leading-[0.8] text-white font-bold uppercase leading-[1.1] tracking-[0.1em]">
              <SplitTextReveal>ANSWERING YOUR</SplitTextReveal>{' '}
              <span className="title-layer">
                <span className="title-layer-glow" aria-hidden="true">AMBITIONS</span>
                <SplitTextReveal delay={0.2} className="metallic-gold-text font-bold italic relative z-10">AMBITIONS</SplitTextReveal>
              </span>
            </h2>
          </div>
          
          <FadeIn delay={0.2}>
            <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-md">
              Everything you need to know about embarking on your creative journey with MAAC Jaipur.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} className="pt-8 border-t border-white/5 space-y-6">
            <p className="text-white/85 text-xs font-bold uppercase tracking-[0.2em]">Still have questions?</p>
            <a href="/contact" className="inline-flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-[#BF953F]/10 flex items-center justify-center border border-white/20 group-hover:bg-[#BF953F] group-hover:border-[#BF953F] transition-all duration-500 shadow-lg">
                <MessageSquare size={20} className="text-[#C4A882] group-hover:text-white" />
              </div>
              <span className="text-white text-sm font-bold tracking-widest uppercase border-b border-white/10 pb-1 group-hover:border-[#C4A882] transition-all">Talk to Admissions</span>
            </a>
          </FadeIn>
        </div>

        {/* Right: Accordion (Client Island) */}
        <FAQAccordion faqs={faqs} />

      </div>
    </section>
  );
}

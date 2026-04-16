"use client";

import { useRef, useState, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { faqSchema } from "@/lib/structured-data";
import { Plus, Minus, MessageSquare } from "lucide-react";

const faqs = faqSchema.mainEntity.slice(0, 6);

function FAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".faq-header > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" })
      .fromTo(".faq-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "expo.out" }, "-=0.6");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-24 md:py-40 overflow-hidden bg-transparent">
      <div className="atmosphere-blob blob-orange bottom-0 right-0 opacity-5" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 grid lg:grid-cols-12 gap-16 md:gap-24">
        
        {/* Left: Content */}
        <div className="faq-header lg:col-span-5 space-y-8">
          <div>
            <p className="text-[#E31837] text-sm font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#E31837]" />
              Support Hub
            </p>
            <h2 className="font-display font-bold text-[clamp(1.8rem,4.5vw,3rem)] text-[#F0EBE1] leading-[0.95] tracking-tight">
              Answering Your <span className="gradient-text">Ambitions</span>
            </h2>
          </div>
          
          <p className="text-[#A8A29C] text-lg md:text-xl leading-relaxed max-w-md">
            Everything you need to know about embarking on your creative journey with MAAC Jaipur.
          </p>

          <div className="pt-8 border-t border-white/5 space-y-6">
            <p className="text-[#6B6560] text-xs font-bold uppercase tracking-[0.2em]">Still have questions?</p>
            <a href="/contact" className="inline-flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-[#E31837]/10 flex items-center justify-center border border-[#E31837]/20 group-hover:bg-[#E31837] transition-all duration-500">
                <MessageSquare size={20} className="text-[#E31837] group-hover:text-white" />
              </div>
              <span className="text-white text-sm font-bold tracking-widest uppercase border-b border-white/10 pb-1 group-hover:border-[#E31837] transition-all">Talk to Admissions</span>
            </a>
          </div>
        </div>

        {/* Right: Accordion */}
        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq: any, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-item group rounded-3xl border transition-all duration-500 ${isOpen ? 'bg-white/[0.05] border-[#E31837]/30 shadow-2xl backdrop-blur-xl' : 'bg-white/[0.02] border-white/5 hover:border-white/10 backdrop-blur-md'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-8 py-8 flex items-center justify-between gap-6 text-left"
                >
                  <span className={`font-display font-bold text-lg md:text-xl transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#A8A29C] group-hover:text-white'}`}>
                    {faq.name}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[#E31837] text-white rotate-180' : 'bg-white/5 text-[#6B6560]'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-expo-out ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-8 pb-8 pt-0">
                    <p className="text-[#A8A29C] text-base md:text-lg leading-relaxed border-t border-white/5 pt-6">
                      {faq.acceptedAnswer.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default memo(FAQSection);

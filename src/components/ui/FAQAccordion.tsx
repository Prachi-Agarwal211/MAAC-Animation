"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface FAQItem {
  name: string;
  acceptedAnswer: {
    text: string;
  };
}

export default function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = index < faqs.length - 1 ? index + 1 : 0;
      document.getElementById(`faq-btn-${next}`)?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = index > 0 ? index - 1 : faqs.length - 1;
      document.getElementById(`faq-btn-${prev}`)?.focus();
    }
  };

  return (
    <div className="lg:col-span-7 space-y-4" role="group" aria-label="Frequently asked questions">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`faq-item group rounded-3xl border transition-all duration-500 ${isOpen ? 'bg-white/[0.05] border-[#FFD700]/40 shadow-2xl backdrop-blur-xl' : 'bg-white/[0.02] border-white/20 hover:border-white/30 backdrop-blur-md'}`}
          >
            <button
              id={`faq-btn-${index}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full px-8 py-8 flex items-center justify-between gap-6 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
            >
              <span className={`font-display text-lg md:text-xl transition-colors duration-300 ${isOpen ? 'font-bold uppercase leading-[1.1] tracking-[0.1em] text-white' : 'text-[#A8A29C] group-hover:text-white'}`}>
                {faq.name}
              </span>
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[#FFD700] border-[#FFD700] rotate-45' : 'bg-white/5 border-white/10'}`}>
                <Plus size={18} aria-hidden="true" className={isOpen ? "text-white" : "text-[#A8A29C]"} />
              </div>
            </button>

            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-btn-${index}`}
              className={`overflow-hidden transition-all duration-500 ease-expo-out ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="px-8 pb-8 pt-0">
                <p className="text-[#A8A29C] text-white/80 md:text-lg leading-relaxed border-t border-white/5 pt-6">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useState, memo } from "react";
import { faqSchema } from "@/lib/structured-data";

const faqs = faqSchema.mainEntity.slice(0, 6); // Show top 6 FAQs

interface FAQ {
  name: string;
  acceptedAnswer: {
    text: string;
  };
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24" style={{ background: "linear-gradient(180deg, #0C0C0C 0%, #120E0A 50%, #0C0C0C 100%)" }}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Common Questions
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F0EBE1] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#6b6b6b] text-lg max-w-2xl mx-auto">
            Get quick answers to common questions about our courses, admissions, and placements.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {(faqs as FAQ[]).map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-[#F0EBE1] text-base md:text-lg pr-8">
                    {faq.name}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#E31837] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-[#A8A29C] text-sm md:text-base leading-relaxed">
                      {faq.acceptedAnswer.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-[#6b6b6b] text-sm mb-4">
            Have more questions?
          </p>
          <a
            href="/contact"
            className="btn btn-outline inline-flex"
          >
            Contact Admissions Team
          </a>
        </div>
      </div>
    </section>
  );
}

export default memo(FAQSection);

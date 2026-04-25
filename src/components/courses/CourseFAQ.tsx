"use client";

import { useState } from "react";

interface Course {
  slug: string;
  title: string;
  fullName: string;
  description: string;
  fullDescription: string;
  duration: string;
  code: string;
  tools: string[];
  careers: string[];
  eligibility: string;
  highlights: string[];
  oldUrls: string[];
}

export default function CourseFAQ({ course }: { course: Course }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: `What is the duration of the ${course.fullName}?`,
      a: `The ${course.fullName} has a duration of ${course.duration}.`,
    },
    {
      q: `What is the eligibility for this course?`,
      a: `The eligibility for this course is ${course.eligibility}.`,
    },
    {
      q: `What career options are available after completing this course?`,
      a: `After completing this course, you can pursue careers as ${course.careers.join(", ")}.`,
    },
    {
      q: `Which tools will I learn in this course?`,
      a: `You will learn ${course.tools.join(", ")} and more.`,
    },
    {
      q: `Is this course certified?`,
      a: `Yes, this course is NSDC certified and comes with a B.Voc degree option.`,
    },
    {
      q: `Does MAAC Jaipur provide placement assistance?`,
      a: `Yes, MAAC Jaipur has a dedicated placement cell with a 95% placement rate. We provide interview preparation, portfolio development, and connections with 500+ partner companies.`,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#0C0C0C]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl text-[#F0EBE1] mb-12 text-center font-black uppercase leading-[1.1] tracking-[0.1em]">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#161616] rounded-xl border border-white/5 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-[#F0EBE1] font-bold pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-[#6B6560] flex-shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-[#A8A29C] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

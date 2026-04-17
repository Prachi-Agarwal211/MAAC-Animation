"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

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

export default function CourseOverview({ course }: { course: Course }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".overview-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#0C0C0C]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overview-content">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F0EBE1] mb-8">
            About This Course
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <p className="text-[#A8A29C] text-lg leading-relaxed mb-6">
                {course.fullDescription}
              </p>
            </div>

            {/* Course Info Card */}
            <div className="bg-[#161616] rounded-xl p-6 border border-white/5 h-fit">
              <h3 className="font-display font-semibold text-[#F0EBE1] mb-4">Course Details</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-[#6B6560] text-xs uppercase tracking-wider mb-1">Course Code</dt>
                  <dd className="text-[#F0EBE1] font-mono">{course.code}</dd>
                </div>
                <div>
                  <dt className="text-[#6B6560] text-xs uppercase tracking-wider mb-1">Duration</dt>
                  <dd className="text-[#F0EBE1]">{course.duration}</dd>
                </div>
                <div>
                  <dt className="text-[#6B6560] text-xs uppercase tracking-wider mb-1">Eligibility</dt>
                  <dd className="text-[#F0EBE1]">{course.eligibility}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-display font-semibold text-[#F0EBE1] text-xl mb-6">Course Highlights</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {course.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#FFD700] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#A8A29C]">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

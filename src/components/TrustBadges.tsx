"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { CheckCircle2 } from "lucide-react";

const certifications = [
  {
    name: "MESC",
    fullName: "Media & Entertainment Skills Council",
    description: "Govt-recognized certification focused on job-ready creative skills.",
    logo: "/govt/mesc.png",
  },
  {
    name: "NSDC",
    fullName: "National Skill Development Corporation",
    description: "Government initiative that promotes national skilling and certification.",
    logo: "/govt/nsdc.png",
  },
  {
    name: "Skill India",
    fullName: "Skill India Mission",
    description: "National mission empowering youth with industry-ready digital skills.",
    logo: "/govt/skillIndia.jpg",
  },
];

export default function TrustBadges() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".trust-badge",
      { opacity: 0, y: 20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: "expo.out" }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-10 md:py-12 bg-transparent border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-[#E31837] text-[11px] font-bold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-3">
            <span className="w-5 h-[1px] bg-[#E31837]" />
            Recognized & Certified
            <span className="w-5 h-[1px] bg-[#E31837]" />
          </p>
          <h2 className="font-display font-bold text-[clamp(1.25rem,2.8vw,1.8rem)] text-[#F0EBE1] leading-tight tracking-tight">
            Government Recognized Certifications
          </h2>
          <p className="text-[#A8A29C] text-sm md:text-base mt-2.5 max-w-3xl mx-auto">
            MAAC is aligned with national skill development initiatives, so your certification is valued across India and globally.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="trust-badge rounded-2xl p-6 md:p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#E31837]/30 transition-all duration-300"
            >
              <div className="h-20 md:h-24 rounded-xl bg-white/5 flex items-center justify-center p-4">
                <Image 
                  src={cert.logo} 
                  alt={cert.name}
                  width={140}
                  height={70}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <h3 className="text-white font-bold text-lg">{cert.name}</h3>
                  <p className="text-[#E31837] text-[11px] font-semibold uppercase tracking-[0.12em] mt-1">{cert.fullName}</p>
                </div>
                <CheckCircle2 size={18} className="text-[#E31837] shrink-0" />
              </div>
              <p className="text-[#A8A29C] text-sm leading-relaxed mt-3">{cert.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
          {[
            "NSDC Certified Programs",
            "Skill India Partner",
            "30+ Years of Excellence",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-white/80"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

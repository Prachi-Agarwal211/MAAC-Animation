"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { Shield, Award, Building2, CheckCircle } from "lucide-react";

const certifications = [
  {
    name: "MESC",
    fullName: "Media & Entertainment Skills Council",
    description: "Government-recognized certification ensuring industry-relevant skills and employability standards for creative professionals.",
    icon: Shield,
    verified: true,
  },
  {
    name: "NSDC",
    fullName: "National Skill Development Corporation",
    description: "Initiative by the Government of India to promote skill development and certify professionals across industries.",
    icon: Award,
    verified: true,
  },
  {
    name: "Skill India",
    fullName: "Skill India Mission",
    description: "National campaign empowering youth with industry-ready skills for the creative and digital media sector.",
    icon: Building2,
    verified: true,
  },
  {
    name: "B.Voc Degree",
    fullName: "Bachelor of Vocation (UGC Recognized)",
    description: "UGC-recognized degree program offering academic credibility alongside practical industry skills in Animation & VFX.",
    icon: CheckCircle,
    verified: true,
  },
];

export default function TrustBadges() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".trust-badge", 
      { opacity: 0, y: 30, scale: 0.95 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "expo.out" }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-[#0A0A0A] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[#E31837] text-sm font-bold tracking-[0.2em] uppercase mb-6 flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#E31837]" />
            Recognized & Certified
            <span className="w-6 h-[1px] bg-[#E31837]" />
          </p>
          <h2 className="font-display font-bold text-[clamp(1.4rem,3vw,2.2rem)] text-[#F0EBE1] leading-[0.95] tracking-tight">
            Government <span className="gradient-text">Recognized</span> Certifications
          </h2>
          <p className="text-[#A8A29C] text-lg mt-4 max-w-2xl mx-auto">
            MAAC is aligned with national skill development initiatives, ensuring your certification is recognized by employers across India and globally.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div
                key={index}
                className="trust-badge group relative rounded-[20px] p-8 bg-[#111111] border border-white/5 hover:border-[#E31837]/30 transition-all duration-500 text-center"
              >
                {/* Verified Badge */}
                {cert.verified && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#E31837]/20 flex items-center justify-center">
                    <CheckCircle size={14} className="text-[#E31837]" />
                  </div>
                )}

                {/* Icon */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#E31837]/10 to-transparent flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <Icon size={36} className="text-[#E31837]" />
                </div>

                {/* Content */}
                <h3 className="text-white font-bold text-xl mb-2">{cert.name}</h3>
                <p className="text-[#E31837] text-xs font-bold uppercase tracking-[0.15em] mb-4">{cert.fullName}</p>
                <p className="text-[#A8A29C] text-sm leading-relaxed">{cert.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Line */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-[#E31837]" />
            <span className="text-white/80 text-sm font-medium">NSDC Certified Programs</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-3">
            <Award size={20} className="text-[#E31837]" />
            <span className="text-white/80 text-sm font-medium">UGC Recognized B.Voc Degree</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-3">
            <Building2 size={20} className="text-[#E31837]" />
            <span className="text-white/80 text-sm font-medium">Skill India Partner</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-[#E31837]" />
            <span className="text-white/80 text-sm font-medium">30+ Years of Excellence</span>
          </div>
        </div>
      </div>
    </section>
  );
}

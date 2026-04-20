"use client";

import Script from "next/script";
import Footer from "@/components/Footer";
import IndustryPartners from "@/components/IndustryPartners";
import ApplyNow from "@/components/ApplyNow";
import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";

export default function AnimationInstituteJaipurPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".animate-in"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <>
      <Script
        type="application/ld+json"
        id="aij-schema"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "MAAC Animation Institute Jaipur",
            description: "Best Animation Institute in Jaipur offering 3D Animation, VFX, Game Design, and Digital Filmmaking courses",
            url: "https://www.maacanimationjaipur.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "711-712, Ambition Tower, 7th Floor, Subhash Marg",
              addressLocality: "Jaipur",
              addressRegion: "Rajasthan",
              postalCode: "302001",
              addressCountry: "IN",
            },
            telephone: "+91-7300001589",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "487",
              bestRating: "5",
            },
          }),
        }}
      />

      <main className="bg-[#080808] min-h-screen">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#080808] z-10" />
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-40"
            >
              <source src="/hero-video-compressed.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative z-20 text-center px-6 pt-20">
            <p className="animate-in metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] metallic-gold-accent" />
              Rajasthan&apos;s Number One
              <span className="w-8 h-[1px] metallic-gold-accent" />
            </p>
            <h1 className="animate-in font-display font-black text-[clamp(2.5rem,8vw,5rem)] leading-[0.85] tracking-tighter text-white uppercase mb-6">
              Animation Institute <span className="metallic-gold-text italic text-[1.1em]">Jaipur</span>
            </h1>
            <p className="animate-in text-[#A8A29C] text-lg max-w-2xl mx-auto leading-relaxed">
              Maya Academy of Advanced Creativity (MAAC) — Jaipur&apos;s most trusted hub for VFX, Animation, and Game Design excellence for over 25 years.
            </p>
          </div>
        </section>

        {/* Why MAAC Jaipur */}
        <section className="py-24 md:py-32 bg-transparent relative border-b border-white/5">
          <div className="atmosphere-blob blob-orange top-0 left-0 opacity-5" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-[#F0EBE1] mb-12">Why Choose MAAC in Jaipur?</h2>
            <div className="prose prose-lg text-[#A8A29C] max-w-none prose-invert">
              <p>
                Jaipur is rapidly emerging as a hub for creative education in Rajasthan, and MAAC stands at the forefront of this transformation. As the city&apos;s most established animation institute, MAAC Jaipur has trained thousands of students who are now working at top studios including DNEG, Prime Focus, MPC, Redchillies VFX, and Ubisoft.
              </p>
              <p>
                Located at Ambition Tower on Subhash Marg in C-Scheme — the heart of Jaipur&apos;s education district — our institute is easily accessible from all parts of the city. We offer flexible batch timings including morning, afternoon, and weekend batches to accommodate students from across Jaipur.
              </p>
              
              <div className="grid md:grid-cols-2 gap-12 mt-16 not-prose">
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-[#F0EBE1] text-2xl font-display font-bold mb-4">Fees and Duration</h3>
                  <p className="text-[#A8A29C]">
                    Animation course fees at MAAC Jaipur range from ₹60,000 for short-term certificate courses to ₹2,50,000 for our comprehensive B.Voc programs. We offer easy EMI options, education loans, and merit scholarships.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-[#F0EBE1] text-2xl font-display font-bold mb-4">Placement Record</h3>
                  <p className="text-[#A8A29C]">
                    MAAC Jaipur maintains a 95% placement record. Our dedicated placement cell connects students with 500+ hiring partners across India and abroad. The average starting package for our graduates is ₹3-6 LPA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24 md:py-32 bg-transparent relative border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-[#F0EBE1] mb-16 text-center">
              The MAAC <span className="metallic-gold-text italic">Advantage</span>
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full border-collapse text-sm md:text-base">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-[#F0EBE1] p-6 text-left font-bold uppercase tracking-wider">Feature</th>
                    <th className="text-[#FFD700] p-6 text-center font-bold uppercase tracking-wider bg-white/5">MAAC Jaipur</th>
                    <th className="text-[#A8A29C] p-6 text-center font-bold uppercase tracking-wider">Other Institutes</th>
                  </tr>
                </thead>
                <tbody className="text-[#A8A29C]">
                  {[
                    ["B.Voc Degree", "✅ Available", "❌ Limited"],
                    ["NSDC Certified", "✅ Yes", "❌ Varies"],
                    ["Placement Rate", "95% Targeted", "70-80%"],
                    ["Studio Partnerships", "DNEG, MPC, Prime Focus", "Minimal"],
                    ["Demo Class", "✅ Free", "❌ Varies"],
                    ["EMI Options", "✅ Yes", "✅ Yes"],
                  ].map(([feature, maac, other], i) => (
                    <tr key={i} className={`border-t border-white/10 ${i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"}`}>
                      <td className="p-6 text-[#F0EBE1] font-medium">{feature}</td>
                      <td className="p-6 text-center text-[#FFD700] font-semibold bg-white/[0.02]">{maac}</td>
                      <td className="p-6 text-center">{other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="border-b border-white/5">
          <IndustryPartners />
        </div>

        <div className="border-b border-white/5">
          <ApplyNow />
        </div>

        <Footer />
      </main>
    </>
  );
}

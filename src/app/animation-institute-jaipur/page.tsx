import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Animation Institute in Jaipur | MAAC — #1 Rated Since 1998",
  description: "MAAC is Jaipur's #1 Animation institute offering B.Voc degrees, diplomas in 3D Animation, VFX, Game Design. NSDC certified. 95% placement. Free demo class. Call +91-7300001589.",
  alternates: { canonical: "https://www.maacanimationjaipur.com/animation-institute-jaipur" },
  openGraph: {
    title: "Best Animation Institute in Jaipur | MAAC",
    url: "https://www.maacanimationjaipur.com/animation-institute-jaipur",
    type: "website",
  },
};

export default function AnimationInstituteJaipurPage() {
  return (
    <main className="min-h-screen bg-[#0C0C0C]">
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

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-[#6B6560]">
            <Link href="/" className="hover:text-[#E31837]">Home</Link>
            <span className="ml-1 text-[#A8A29C]">/ Animation Institute Jaipur</span>
          </nav>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-[#F0EBE1] mb-6 leading-tight">
            Best Animation Institute in Jaipur
          </h1>
          <p className="text-[#A8A29C] text-xl max-w-3xl mb-8 leading-relaxed">
            Welcome to MAAC (Maya Academy of Advanced Creativity) — Jaipur&apos;s most trusted animation institute with 25+ years of excellence. We offer B.Voc degrees, diplomas, and certificate programs in 3D Animation, Visual Effects, Game Design, Digital Filmmaking, and Graphic Design.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/contact" className="btn btn-primary px-8 py-4">Book Free Demo Class</Link>
            <a href="tel:+917300001589" className="btn bg-white/10 text-white border border-white/20 px-8 py-4">Call: +91-7300001589</a>
          </div>
        </div>
      </section>

      {/* Why MAAC Jaipur */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-[#F0EBE1] mb-8">Why Choose MAAC as Your Animation Institute in Jaipur?</h2>
          <div className="prose prose-lg text-[#A8A29C] max-w-none">
            <p>
              Jaipur is rapidly emerging as a hub for creative education in Rajasthan, and MAAC stands at the forefront of this transformation. As the city&apos;s most established animation institute, MAAC Jaipur has trained thousands of students who are now working at top studios including DNEG, Prime Focus, MPC, Redchillies VFX, and Ubisoft.
            </p>
            <p>
              Located at Ambition Tower on Subhash Marg in C-Scheme — the heart of Jaipur&apos;s education district — our institute is easily accessible from all parts of the city including Malviya Nagar, Vaishali Nagar, Mansarovar, and C-Scheme. We offer flexible batch timings including morning, afternoon, and weekend batches to accommodate students from across Jaipur.
            </p>
            <h3 className="text-[#F0EBE1] text-2xl font-display font-bold mt-8 mb-4">Courses We Offer</h3>
            <p>
              Our animation courses in Jaipur cover the full spectrum of creative careers: 3D Animation using Autodesk Maya, Visual Effects (VFX) with Nuke and Houdini, Game Design with Unity and Unreal Engine, Digital Filmmaking with Premiere Pro and DaVinci Resolve, Graphic Design, and Architectural Visualization.
            </p>
            <h3 className="text-[#F0EBE1] text-2xl font-display font-bold mt-8 mb-4">Fees and Duration</h3>
            <p>
              Animation course fees at MAAC Jaipur range from ₹60,000 for short-term certificate courses to ₹2,50,000 for our comprehensive B.Voc programs. We offer easy EMI options, education loans, and merit scholarships. Programs range from 6 months to 3 years depending on your career goals.
            </p>
            <h3 className="text-[#F0EBE1] text-2xl font-display font-bold mt-8 mb-4">Placement Record</h3>
            <p>
              MAAC Jaipur maintains a 95% placement record. Our dedicated placement cell connects students with 500+ hiring partners across India and abroad. The average starting package for our graduates is ₹3-6 LPA, with top performers securing packages up to ₹15 LPA.
            </p>
            <h3 className="text-[#F0EBE1] text-2xl font-display font-bold mt-8 mb-4">Eligibility</h3>
            <p>
              Most MAAC courses require completion of 10+2 from any stream. No prior art or animation experience is needed — our foundation modules cover everything from scratch. Age limit: 17 to 30 years for most programs.
            </p>
            <h3 className="text-[#F0EBE1] text-2xl font-display font-bold mt-8 mb-4">Certifications</h3>
            <p>
              All MAAC courses are NSDC and MESC certified, meaning your diploma is recognized by the Government of India and valued by employers across the country. The B.Voc degree is UGC approved.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-[#F0EBE1] mb-8 text-center">
            How MAAC Compares to Other Animation Institutes in Jaipur
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#E31837]">
                  <th className="text-white p-4 text-left">Feature</th>
                  <th className="text-white p-4 text-center">MAAC Jaipur</th>
                  <th className="text-white p-4 text-center">Arena Animation</th>
                  <th className="text-white p-4 text-center">Frameboxx</th>
                </tr>
              </thead>
              <tbody className="text-[#A8A29C]">
                {[
                  ["B.Voc Degree", "✅ Available", "✅ Available", "✅ Available"],
                  ["NSDC Certified", "✅ Yes", "✅ Yes", "✅ Yes"],
                  ["Placement Rate", "95%", "85%+", "90%+"],
                  ["Studio Partnerships", "DNEG, MPC, Prime Focus", "Multiple", "Multiple"],
                  ["Demo Class", "✅ Free", "✅ Free", "✅ Free"],
                  ["EMI Options", "✅ Yes", "✅ Yes", "✅ Yes"],
                  ["Location", "C-Scheme (Central)", "Multiple Locations", "Jaipur"],
                  ["Course Range", "19 Programs", "Multiple", "Multiple"],
                ].map(([feature, maac, arena, frame], i) => (
                  <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-[#161616]" : "bg-[#0f0f0f]"}`}>
                    <td className="p-4 text-[#F0EBE1] font-medium">{feature}</td>
                    <td className="p-4 text-center text-[#E31837] font-semibold">{maac}</td>
                    <td className="p-4 text-center">{arena}</td>
                    <td className="p-4 text-center">{frame}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-[#F0EBE1] mb-8 text-center">
            Frequently Asked Questions — Animation Institute Jaipur
          </h2>
          {[
            {
              q: "Which is the best animation institute in Jaipur?",
              a: "MAAC (Maya Academy of Advanced Creativity) is consistently rated as Jaipur&apos;s best animation institute with a 95% placement rate, NSDC certification, B.Voc degree option, and 25+ years of excellence.",
            },
            {
              q: "What is the fee for animation courses in Jaipur?",
              a: "Animation course fees in Jaipur at MAAC range from ₹60,000 for 6-month certificate programs to ₹2,50,000 for the 3-year B.Voc degree. EMI and scholarship options are available.",
            },
            {
              q: "Can I get a job after animation course in Jaipur?",
              a: "Yes. MAAC Jaipur has a 95% placement rate with 500+ partner companies including DNEG, Prime Focus, Ubisoft, EA Games, and hundreds of local and national studios.",
            },
            {
              q: "Is there a free demo class for animation courses in Jaipur?",
              a: "Yes. MAAC Jaipur offers free demo classes with no commitment required. Call +91-7300001589 or visit our center at Ambition Tower, Subhash Marg to book your demo.",
            },
            {
              q: "What is the eligibility for animation courses in Jaipur?",
              a: "Most animation courses at MAAC Jaipur require 10+2 completion from any stream. No prior art experience is needed. Age should be between 17-30 years.",
            },
          ].map((item, i) => (
            <div key={i} className="border border-white/10 rounded-xl p-6 mb-4 bg-[#161616]">
              <h3 className="font-display font-semibold text-[#F0EBE1] text-lg mb-2">{item.q}</h3>
              <p className="text-[#A8A29C]">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #2A080C, #170406)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl text-[#F0EBE1] mb-4">
            Ready to Start at Jaipur&apos;s Best Animation Institute?
          </h2>
          <p className="text-[#A8A29C] text-lg mb-8">
            Book a free demo class today. No commitment, no fees — just experience the MAAC difference.
          </p>
          <Link href="/contact" className="btn btn-primary px-10 py-4 text-lg">
            Book Free Demo Class
          </Link>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import MagneticButton from "@/components/ui/MagneticButton";
import StudentWorkGallery from "./StudentWorkGallery";

export const metadata: Metadata = {
  title: "Student Work - maacanimationjaipur.com",
  description:
    "At MAAC Animation Institute, we're committed to empowering aspiring artists and filmmakers to unleash their creative potential, hone their skills,",
  keywords: [
    "student work animation jaipur",
    "maac student projects",
    "animation student portfolio",
    "vfx student work jaipur",
    "gaming design student projects",
  ],
  openGraph: {
    type: "website",
    title: "Student Work - maacanimationjaipur.com",
    description:
      "At MAAC Animation Institute, we're committed to empowering aspiring artists and filmmakers to unleash their creative potential, hone their skills,",
    url: "https://www.maacanimationjaipur.com/student-work",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/07/Screenshot-2025-07-04-163930-400x89.png",
        width: 1200,
        height: 630,
        alt: "MAAC Animation Jaipur Student Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Work - maacanimationjaipur.com",
    description:
      "At MAAC Animation Institute, we're committed to empowering aspiring artists and filmmakers to unleash their creative potential, hone their skills,",
    images: [
      "https://www.maacanimationjaipur.com/wp-content/uploads/2025/07/Screenshot-2025-07-04-163930-400x89.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/student-work",
  },
};

export default function StudentWorkPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="student-work-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Student Work - MAAC Animation Jaipur",
            description:
              "At MAAC Animation Institute, we're committed to empowering aspiring artists and filmmakers to unleash their creative potential, hone their skills,",
            url: "https://www.maacanimationjaipur.com/student-work",
            image:
              "https://www.maacanimationjaipur.com/wp-content/uploads/2025/07/Screenshot-2025-07-04-163930-400x89.png",
            publisher: {
              "@type": "Organization",
              name: "MAAC Animation Jaipur",
              sameAs: "https://www.maacanimationjaipur.com",
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1A0508 0%, #0C0C0C 50%, #0C0C0C 100%)" }}
        />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #E31837 0%, transparent 70%)" }} />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #C4A882 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-[#6B6560]">
                <li><Link href="/" className="hover:text-[#E31837] transition-colors">Home</Link></li>
                <li>/</li>
                <li className="text-[#A8A29C]">Student Work</li>
              </ol>
            </nav>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[#F0EBE1] leading-[1.1] mb-6">
              Student Work
            </h1>
            <p className="text-[#A8A29C] text-lg md:text-xl leading-relaxed max-w-2xl">
              At MAAC Animation Institute, we&apos;re committed to empowering aspiring artists and filmmakers to unleash their creative potential, hone their skills, and build professional portfolios that open doors to the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 md:py-28 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StudentWorkGallery />
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 md:py-28"
        style={{ background: "linear-gradient(135deg, #2A080C 0%, #170406 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F0EBE1] mb-6">
            Ready to Create Your Own Masterpiece?
          </h2>
          <p className="text-[#A8A29C] text-lg mb-10 max-w-2xl mx-auto">
            Join MAAC Jaipur and build a professional portfolio that gets you hired. Book a free demo class today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton>
              <Link
                href="/contact"
                className="btn bg-gradient-to-r from-[#E31837] to-[#C4132D] text-white hover:opacity-90 border border-[#E31837]/50 px-8 py-4 rounded-lg font-semibold shadow-[0_0_20px_rgba(227,24,55,0.3)]"
              >
                Book Free Demo Class
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/courses"
                className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-4 rounded-lg font-semibold"
              >
                Explore Courses
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}

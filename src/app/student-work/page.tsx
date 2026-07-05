import Script from "next/script";
import IndustryPartners from "@/components/IndustryPartners";
import ApplyNow from "@/components/ApplyNow";
import StudentWorkGallery from "./StudentWorkGallery";
import StudentWorkHeroClient from "./StudentWorkHeroClient";
import ErrorBoundary from "@/components/ErrorBoundary";

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
              "Explore incredible projects from MAAC Jaipur students. Portfolio-ready work in 3D Animation, VFX, and Game Design.",
            url: "https://www.maacanimationjaipur.com/student-work",
            publisher: {
              "@type": "Organization",
              name: "MAAC Animation Jaipur",
              sameAs: "https://www.maacanimationjaipur.com",
            },
          }),
        }}
      />

      <main className="bg-transparent min-h-screen">
        {/* Hero Section */}
        <StudentWorkHeroClient>
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#080808] z-10" />
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              poster="/hero-poster.jpg"
              className="w-full h-full object-cover opacity-40"
            >
              <source src="/hero-video-compressed.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative z-20 text-center px-6 pt-20">
            <p className="animate-in metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] metallic-gold-accent" />
              Excellence in Motion
              <span className="w-8 h-[1px] metallic-gold-accent" />
            </p>
            <h1 className="animate-in font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.85] text-white mb-6 font-light uppercase leading-[1.1] tracking-[0.1em]">
              Student <span className="metallic-gold-text italic text-[1.1em]">Work</span>
            </h1>
            <p className="animate-in text-[#A8A29C] text-lg max-w-2xl mx-auto leading-relaxed">
              At MAAC Animation Institute, we&apos;re committed to empowering aspiring artists to unleash their creative potential and build professional portfolios.
            </p>
          </div>
        </StudentWorkHeroClient>

        {/* Gallery Section */}
        <section className="py-24 md:py-32 bg-transparent relative">
          <div className="atmosphere-blob blob-orange top-0 left-0 opacity-5" />
          <div className="max-w-content mx-auto px-6 lg:px-8">
            <ErrorBoundary>
              <StudentWorkGallery />
            </ErrorBoundary>
          </div>
        </section>

        <div className="border-t border-white/5">
          <IndustryPartners />
        </div>

        <div className="border-t border-white/5">
          <ApplyNow />
        </div>
      </main>
    </>
  );
}

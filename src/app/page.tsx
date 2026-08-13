import { Suspense } from "react";
import dynamic from "next/dynamic";
import { localBusinessSchema, videoSchema, faqSchema, breadcrumbSchema } from "@/lib/structured-data";

// Server Components
import PopularCourses from "@/components/PopularCourses";
import InstituteIntro from "@/components/InstituteIntro";
import CareerCreatorComparison from "@/components/CareerCreatorComparison";
import IndustryPartners from "@/components/IndustryPartners";
import StudentSuccessStories from "@/components/StudentSuccessStories";
import ApplyNow from "@/components/ApplyNow";
import FAQSection from "@/components/FAQSection";
import ErrorBoundary from "@/components/ErrorBoundary";
import Placements from "@/components/Placements";

// Client Components (Complex animations/state)
import MAACXHero from "@/components/hero/MAACXHero";
import HeroTrustTransition from "@/components/HeroTrustTransition";
import ScrollNarrative from "@/components/ui/ScrollNarrative";

const VerticalCardGallery = dynamic(() => import("@/components/VerticalCardGallery"), { ssr: true });
const StudentShowcase = dynamic(() => import("@/components/StudentShowcase"), { ssr: true });


export const revalidate = 3600;

export default function Home() {
  const homeBreadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://www.maacanimationjaipur.com" }
  ]);

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessSchema,
      videoSchema,
      faqSchema,
      homeBreadcrumbs
    ]
  };

  return (
    <div className="relative">
      <section className="seo-answer-block speakable-summary">
        MAAC Animation Jaipur is an animation and VFX institute in C-Scheme, Jaipur (est. 1998). The centre offers B.Voc, diploma and short courses in 3D Animation, Visual Effects, Game Design and Digital Filmmaking, with NSDC and MESC certification and dedicated placement support. Graduates work at studios including DNEG, MPC, Prime Focus and Ubisoft. Call +91-7300001589 for admissions.
      </section>
      <ScrollNarrative />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData),
        }}
      />
      {/* Hero video morph transition to TrustBadges */}
      <ErrorBoundary>
        <HeroTrustTransition hero={<MAACXHero />} />
      </ErrorBoundary>

      <div className="relative z-10 bg-transparent">
        <ErrorBoundary>

          <div id="features" className="relative z-10 bg-transparent">
            <Suspense fallback={<div className="h-[100vh] bg-black/20 animate-pulse" />}>
              <VerticalCardGallery />
            </Suspense>
          </div>

          <div id="placements" className="bg-transparent">
            <Placements />
          </div>

          <div id="courses" className="bg-transparent">
            <PopularCourses />
          </div>

          <div id="intro" className="relative z-20 bg-transparent">
            <InstituteIntro />
          </div>

          <div id="pathways" className="bg-transparent">
            <CareerCreatorComparison />
          </div>

          <div id="partners" className="bg-transparent">
            <IndustryPartners />
          </div>

          <div id="showcase" className="bg-transparent">
            <Suspense fallback={<div className="h-[60vh] bg-black/20 animate-pulse" />}>
              <StudentShowcase />
            </Suspense>
          </div>

          <div id="success-stories" className="bg-transparent">
            <StudentSuccessStories />
          </div>

          <div id="apply" className="relative z-20 bg-transparent">
            <ApplyNow />
          </div>

          <div id="faq" className="relative z-20 bg-transparent">
            <FAQSection />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
}

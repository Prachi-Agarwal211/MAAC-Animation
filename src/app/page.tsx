import { Suspense } from "react";
import dynamic from "next/dynamic";
import { localBusinessSchema, videoSchema, faqSchema, breadcrumbSchema } from "@/lib/structured-data";

// Server Components
import TrustBadges from "@/components/TrustBadges";
import PopularCourses from "@/components/PopularCourses";
import InstituteIntro from "@/components/InstituteIntro";
import CareerCreatorComparison from "@/components/CareerCreatorComparison";
import IndustryPartners from "@/components/IndustryPartners";
import StudentSuccessStories from "@/components/StudentSuccessStories";
import ApplyNow from "@/components/ApplyNow";
import FAQSection from "@/components/FAQSection";
import ErrorBoundary from "@/components/ErrorBoundary";

// Client Components (Complex animations/state)
import MAACXHero from "@/components/hero/MAACXHero";
import HeroTrustTransition from "@/components/HeroTrustTransition";

const VerticalCardGallery = dynamic(() => import("@/components/VerticalCardGallery"), { ssr: true });
const StudentShowcase = dynamic(() => import("@/components/StudentShowcase"), { ssr: true });


export const revalidate = 3600;

export default function Home() {
  const homeBreadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://www.maacanimationjaipur.com" }
  ]);

  return (
    <div className="overflow-hidden relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { ...localBusinessSchema },
              { ...videoSchema },
              { ...faqSchema },
              { ...homeBreadcrumbs }
            ],
          }),
        }}
      />
      {/* Hero video morph transition to TrustBadges */}
      <ErrorBoundary>
        <HeroTrustTransition 
          hero={<MAACXHero />}
          badges={<TrustBadges />}
        />
      </ErrorBoundary>

      <div className="relative z-10 bg-transparent">
        <ErrorBoundary>

          <div id="features" className="relative z-10 bg-transparent">
            <Suspense fallback={<div className="h-[100vh] bg-black/20 animate-pulse" />}>
              <VerticalCardGallery />
            </Suspense>
          </div>

          <div className="bg-transparent">
            <PopularCourses />
          </div>

          <div id="intro" className="relative z-20 bg-transparent">
            <InstituteIntro />
          </div>

          <div className="bg-transparent">
            <CareerCreatorComparison />
          </div>

          <div className="bg-transparent">
            <IndustryPartners />
          </div>

          <div className="bg-transparent">
            <Suspense fallback={<div className="h-[60vh] bg-black/20 animate-pulse" />}>
              <StudentShowcase />
            </Suspense>
          </div>

          <div className="bg-transparent">
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

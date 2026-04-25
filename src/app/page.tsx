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
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

// Client Components (Complex animations/state)
import MAACXHero from "@/components/hero/MAACXHero";

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
      
      {/* 
        The Hero handles its own intro overlay. 
        The rest of the page renders as HTML immediately under it.
      */}
      <ErrorBoundary>
        <MAACXHero />
      </ErrorBoundary>

      <main className="relative z-10 bg-transparent">
        <ErrorBoundary>
          <TrustBadges />
        </ErrorBoundary>

        <div id="features" className="relative z-10 bg-transparent">
          <ErrorBoundary>
            <Suspense fallback={<div className="h-[100vh] bg-black/20 animate-pulse" />}>
              <VerticalCardGallery />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="bg-transparent">
          <ErrorBoundary>
            <PopularCourses />
          </ErrorBoundary>
        </div>

        <div id="intro" className="relative z-20 bg-transparent">
          <InstituteIntro />
        </div>

        <div className="bg-transparent">
          <ErrorBoundary>
            <CareerCreatorComparison />
          </ErrorBoundary>
        </div>

        <div className="bg-transparent">
          <ErrorBoundary>
            <IndustryPartners />
          </ErrorBoundary>
        </div>

        <div className="bg-transparent">
          <ErrorBoundary>
            <Suspense fallback={<div className="h-[60vh] bg-black/20 animate-pulse" />}>
              <StudentShowcase />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="bg-transparent">
          <ErrorBoundary>
            <StudentSuccessStories />
          </ErrorBoundary>
        </div>

        <div id="apply" className="relative z-20 bg-transparent">
          <ErrorBoundary>
            <ApplyNow />
          </ErrorBoundary>
        </div>

        <div id="faq" className="relative z-20 bg-transparent">
          <ErrorBoundary>
            <FAQSection />
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </main>
    </div>
  );
}

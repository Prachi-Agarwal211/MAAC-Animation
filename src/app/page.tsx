import dynamic from "next/dynamic";
import MAACXHero from "@/components/hero/MAACXHero";
import InstituteIntro from "@/components/InstituteIntro";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

// Restore dynamic imports for performance optimization
const VerticalCardGallery = dynamic(() => import("@/components/VerticalCardGallery"), { ssr: true });
const CourseCategories = dynamic(() => import("@/components/CourseCategories"), { ssr: true });
const IndustryPartners = dynamic(() => import("@/components/IndustryPartners"), { ssr: true });
const PopularCourses = dynamic(() => import("@/components/PopularCourses"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const Awards = dynamic(() => import("@/components/Awards"), { ssr: true });
const Placements = dynamic(() => import("@/components/Placements"), { ssr: true });
const ApplyNow = dynamic(() => import("@/components/ApplyNow"), { ssr: true });
const FAQSection = dynamic(() => import("@/components/FAQSection"), { ssr: true });
const CareerCreatorComparison = dynamic(() => import("@/components/CareerCreatorComparison"), { ssr: true });
const BentoGallery = dynamic(() => import("@/components/BentoGallery"), { ssr: true });
const LiquidReveal = dynamic(() => import("@/components/ui/LiquidReveal"), { ssr: true });

// Heavy Three.js / purely client-side components
const BeyondReality = dynamic(() => import("@/components/BeyondReality"), { ssr: false });
const StudentShowcase = dynamic(() => import("@/components/StudentShowcase"), { ssr: false });

import { localBusinessSchema, videoSchema, faqSchema, breadcrumbSchema } from "@/lib/structured-data";

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
      <ErrorBoundary>
        <MAACXHero />
      </ErrorBoundary>
      
      <div id="features" className="relative z-10">
        <ErrorBoundary>
          <VerticalCardGallery />
        </ErrorBoundary>
      </div>

      <LiquidReveal>
        <ErrorBoundary>
          <BeyondReality />
        </ErrorBoundary>
      </LiquidReveal>

      <div id="intro" className="relative z-20">
        <InstituteIntro />
      </div>

      <LiquidReveal>
        <ErrorBoundary>
          <CareerCreatorComparison />
        </ErrorBoundary>
      </LiquidReveal>

      <ErrorBoundary>
        <BentoGallery />
      </ErrorBoundary>

      <section id="courses" className="relative z-10">
        <ErrorBoundary>
          <CourseCategories />
        </ErrorBoundary>
      </section>

      <ErrorBoundary>
        <IndustryPartners />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <PopularCourses />
      </ErrorBoundary>

      <ErrorBoundary>
        <StudentShowcase />
      </ErrorBoundary>

      <ErrorBoundary>
        <Testimonials />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Awards />
      </ErrorBoundary>

      <ErrorBoundary>
        <section id="placements" className="relative z-10">
          <Placements />
        </section>
      </ErrorBoundary>

      <ErrorBoundary>
        <div id="apply" className="relative z-20">
          <ApplyNow />
        </div>
      </ErrorBoundary>

      <ErrorBoundary>
        <FAQSection />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

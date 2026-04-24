"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import MAACXHero from "@/components/hero/MAACXHero";
import InstituteIntro from "@/components/InstituteIntro";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import TrustBadges from "@/components/TrustBadges";

const VerticalCardGallery = dynamic(() => import("@/components/VerticalCardGallery"), { ssr: true });
const IndustryPartners = dynamic(() => import("@/components/IndustryPartners"), { ssr: true });
const PopularCourses = dynamic(() => import("@/components/PopularCourses"), { ssr: true });
const ApplyNow = dynamic(() => import("@/components/ApplyNow"), { ssr: true });
const FAQSection = dynamic(() => import("@/components/FAQSection"), { ssr: true });
const CareerCreatorComparison = dynamic(() => import("@/components/CareerCreatorComparison"), { ssr: true });
const LiquidReveal = dynamic(() => import("@/components/ui/LiquidReveal"), { ssr: true });
const StudentSuccessStories = dynamic(() => import("@/components/StudentSuccessStories"), { ssr: true });
const StudentShowcase = dynamic(() => import("@/components/StudentShowcase"), { ssr: false });

export default function HomePageClient() {
  const [landingReady, setLandingReady] = useState(false);

  useEffect(() => {
    const isDone = window.localStorage.getItem("maac_intro_done") === "1" || 
                   document.documentElement.dataset.maacIntroDone === "1";
    if (isDone) {
      setLandingReady(true);
    }
  }, []);

  return (
    <>
      <ErrorBoundary>
        <MAACXHero onIntroReveal={() => setLandingReady(true)} />
      </ErrorBoundary>

      {landingReady && (
        <>
          <ErrorBoundary>
            <TrustBadges />
          </ErrorBoundary>

          <div id="features" className="relative z-10">
            <ErrorBoundary>
              <VerticalCardGallery />
            </ErrorBoundary>
          </div>

          <ErrorBoundary>
            <PopularCourses />
          </ErrorBoundary>

          <div id="intro" className="relative z-20">
            <InstituteIntro />
          </div>

          <LiquidReveal>
            <ErrorBoundary>
              <CareerCreatorComparison />
            </ErrorBoundary>
          </LiquidReveal>

          <ErrorBoundary>
            <IndustryPartners />
          </ErrorBoundary>

          <ErrorBoundary>
            <StudentShowcase />
          </ErrorBoundary>

          <ErrorBoundary>
            <StudentSuccessStories />
          </ErrorBoundary>

          <ErrorBoundary>
            <div id="apply" className="relative z-20">
              <ApplyNow />
            </div>
          </ErrorBoundary>

          <ErrorBoundary>
            <div id="faq" className="relative z-20">
              <FAQSection />
            </div>
          </ErrorBoundary>

          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        </>
      )}
    </>
  );
}

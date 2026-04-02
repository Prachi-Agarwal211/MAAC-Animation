import MAACXHero from "@/components/hero/MAACXHero";
import VerticalCardGallery from "@/components/VerticalCardGallery";
import InstituteIntro from "@/components/InstituteIntro";
import CareerCreatorComparison from "@/components/CareerCreatorComparison";
import CourseCategories from "@/components/CourseCategories";
import IndustryPartners from "@/components/IndustryPartners";
import PopularCourses from "@/components/PopularCourses";
import StudentWork from "@/components/StudentWork";
import Testimonials from "@/components/Testimonials";
import Awards from "@/components/Awards";
import Placements from "@/components/Placements";
import ApplyNow from "@/components/ApplyNow";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { localBusinessSchema, videoSchema, breadcrumbSchema, faqSchema } from "@/lib/structured-data";

// ISR: Revalidate every hour
export const revalidate = 3600;

// Step 11: Gradient section dividers between dark↔cream transitions
const DarkToCream = () => (
  <div style={{ height: "60px", background: "linear-gradient(to bottom, #0C0C0C, #F5F0E8)", margin: 0 }} />
);
const CreamToDark = () => (
  <div style={{ height: "60px", background: "linear-gradient(to bottom, #F5F0E8, #0C0C0C)", margin: 0 }} />
);

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Structured Data for SEO/GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...localBusinessSchema,
            video: videoSchema,
            breadcrumb: breadcrumbSchema([
              { name: "Home", url: "https://maacjaipur.com" },
            ]),
            faq: faqSchema,
          }),
        }}
      />

      <MAACXHero />
      <VerticalCardGallery />
      <DarkToCream />
      <InstituteIntro />
      <CreamToDark />
      <CareerCreatorComparison />
      <section id="courses">
        <CourseCategories />
      </section>
      <DarkToCream />
      <IndustryPartners />
      <CreamToDark />
      <PopularCourses />
      <StudentWork />
      <Testimonials />
      <DarkToCream />
      <Awards />
      <CreamToDark />
      <section id="placements">
        <Placements />
      </section>
      <ApplyNow />
      <FAQSection />
      <Footer />
    </div>
  );
}

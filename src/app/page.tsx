import MAACXHero from "@/components/hero/MAACXHero";
import VerticalCardGallery from "@/components/VerticalCardGallery";
import InstituteIntro from "@/components/InstituteIntro";
import CareerCreatorComparison from "@/components/CareerCreatorComparison";
import CourseCategories from "@/components/CourseCategories";
import IndustryPartners from "@/components/IndustryPartners";
import PopularCourses from "@/components/PopularCourses";
import StudentShowcase from "@/components/StudentShowcase";
import Testimonials from "@/components/Testimonials";
import Awards from "@/components/Awards";
import Placements from "@/components/Placements";
import ApplyNow from "@/components/ApplyNow";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { localBusinessSchema, videoSchema, breadcrumbSchema, faqSchema } from "@/lib/structured-data";

// ISR: Revalidate every hour
export const revalidate = 3600;

export default function Home() {
  return (
    <div className="overflow-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...localBusinessSchema, video: videoSchema, breadcrumb: breadcrumbSchema([{ name: "Home", url: "https://maacjaipur.com" }]), faq: faqSchema }) }} />
      <MAACXHero />
      <VerticalCardGallery />
      <InstituteIntro />
      <CareerCreatorComparison />
      <section id="courses"><CourseCategories /></section>
      <IndustryPartners />
      <PopularCourses />
      <StudentShowcase />
      <Testimonials />
      <Awards />
      <section id="placements"><Placements /></section>
      <ApplyNow />
      <FAQSection />
      <Footer />
    </div>
  );
}

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

// Force dynamic rendering to avoid SSR issues with client-side components
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <MAACXHero />
      <VerticalCardGallery />
      <InstituteIntro />
      <CareerCreatorComparison />
      <section id="courses">
        <CourseCategories />
      </section>
      <IndustryPartners />
      <PopularCourses />
      <StudentWork />
      <Testimonials />
      <Awards />
      <section id="placements">
        <Placements />
      </section>
      <ApplyNow />
      <Footer />
    </div>
  );
}

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

export const dynamic = "force-dynamic";

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
      <Footer />
    </div>
  );
}

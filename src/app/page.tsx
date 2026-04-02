import Navbar from "@/components/Navbar";
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
    <main className="overflow-hidden">
      <Navbar />
      <MAACXHero />
      <VerticalCardGallery />
      <InstituteIntro />
      <CareerCreatorComparison />
      <CourseCategories />
      <IndustryPartners />
      <PopularCourses />
      <StudentWork />
      <Testimonials />
      <Awards />
      <Placements />
      <ApplyNow />
      <Footer />
    </main>
  );
}
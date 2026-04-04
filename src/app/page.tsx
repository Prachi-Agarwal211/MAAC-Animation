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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://www.maacanimationjaipur.com/",
                "url": "https://www.maacanimationjaipur.com/",
                "name": "Home animation institute in jaipur",
                "isPartOf": { "@id": "https://www.maacanimationjaipur.com/#website" },
                "primaryImageOfPage": { "@id": "https://www.maacanimationjaipur.com/#primaryimage" },
                "image": { "@id": "https://www.maacanimationjaipur.com/#primaryimage" },
                "thumbnailUrl": "https://www.maacanimationjaipur.com/wp-content/uploads/2021/09/v-toy-sl-3.png",
                "datePublished": "2021-09-10T11:01:23+00:00",
                "dateModified": "2025-07-03T10:38:30+00:00",
                "description":
                  "MAAC is the high-end 3D Animation & VFX education brand of Aptech. Through its wide network of centres, MAAC has prepared thousands students",
                "breadcrumb": { "@id": "https://www.maacanimationjaipur.com/#breadcrumb" },
                "inLanguage": "en-US",
                "potentialAction": [{ "@type": "ReadAction", "target": ["https://www.maacanimationjaipur.com/"] }],
              },
              {
                "@type": "ImageObject",
                "inLanguage": "en-US",
                "@id": "https://www.maacanimationjaipur.com/#primaryimage",
                "url": "https://www.maacanimationjaipur.com/wp-content/uploads/2021/09/v-toy-sl-3.png",
                "contentUrl": "https://www.maacanimationjaipur.com/wp-content/uploads/2021/09/v-toy-sl-3.png",
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.maacanimationjaipur.com/#breadcrumb",
                "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home" }],
              },
              {
                "@type": "WebSite",
                "@id": "https://www.maacanimationjaipur.com/#website",
                "url": "https://www.maacanimationjaipur.com/",
                "name": "maacanimationjaipur.com",
                "description": "maacanimationjaipur.com",
                "potentialAction": [
                  {
                    "@type": "SearchAction",
                    "target": { "@type": "EntryPoint", "urlTemplate": "https://www.maacanimationjaipur.com/?s={search_term_string}" },
                    "query-input": { "@type": "PropertyValueSpecification", "valueRequired": true, "valueName": "search_term_string" },
                  },
                ],
                "inLanguage": "en-US",
              },
              { ...localBusinessSchema },
              { ...videoSchema },
              { ...faqSchema },
            ],
          }),
        }}
      />
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

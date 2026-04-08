import dynamic from "next/dynamic";
import MAACXHero from "@/components/hero/MAACXHero"; // Keep eager — above fold
import InstituteIntro from "@/components/InstituteIntro"; // Keep eager
import Footer from "@/components/Footer";

// Everything else: lazy load for smaller initial bundle
const VerticalCardGallery = dynamic(() => import("@/components/VerticalCardGallery"), { ssr: true });
const CareerCreatorComparison = dynamic(() => import("@/components/CareerCreatorComparison"), { ssr: true });
const CourseCategories = dynamic(() => import("@/components/CourseCategories"), { ssr: true });
const IndustryPartners = dynamic(() => import("@/components/IndustryPartners"), { ssr: true });
const PopularCourses = dynamic(() => import("@/components/PopularCourses"), { ssr: true });
const StudentShowcase = dynamic(() => import("@/components/StudentShowcase"), { ssr: false }); // Videos: no SSR
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const Awards = dynamic(() => import("@/components/Awards"), { ssr: true });
const Placements = dynamic(() => import("@/components/Placements"), { ssr: true });
const ApplyNow = dynamic(() => import("@/components/ApplyNow"), { ssr: true });
const FAQSection = dynamic(() => import("@/components/FAQSection"), { ssr: true });
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
                "name": "MAAC Animation Institute Jaipur | Best Animation & VFX Courses",
                "isPartOf": { "@id": "https://www.maacanimationjaipur.com/#website" },
                "primaryImageOfPage": { "@id": "https://www.maacanimationjaipur.com/#primaryimage" },
                "image": { "@id": "https://www.maacanimationjaipur.com/#primaryimage" },
                "thumbnailUrl": "https://www.maacanimationjaipur.com/wp-content/uploads/2021/09/v-toy-sl-3.png",
                "datePublished": "2021-09-10T11:01:23+00:00",
                "dateModified": "2025-07-03T10:38:30+00:00",
                "description":
                  "MAAC Jaipur — Rajasthan's #1 Animation Institute. B.Voc Degree in 3D Animation, VFX & Game Design. 95% Placements. NSDC Certified.",
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
                "description": "MAAC Animation Institute Jaipur — Best Animation & VFX Courses in Rajasthan",
                "potentialAction": [
                  {
                    "@type": "SearchAction",
                    "target": { "@type": "EntryPoint", "urlTemplate": "https://www.maacanimationjaipur.com/?s={search_term_string}" },
                    "query-input": { "@type": "PropertyValueSpecification", "valueRequired": true, "valueName": "search_term_string" },
                  },
                ],
                "inLanguage": "en-US",
              },
              {
                "@type": "LocalBusiness",
                "@id": "https://www.maacanimationjaipur.com/#localbusiness",
                "name": "MAAC Jaipur — Animation Institute",
                "image": "https://www.maacanimationjaipur.com/wp-content/uploads/2021/09/v-toy-sl-3.png",
                "telephone": "+917300001589",
                "additionalTelephone": ["+919829294037", "+919929059559"],
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "711-712 Ambition Tower 7th Floor, D-46B, Malan Ka Chauraha, Agrasain Circle, Subhash Marg, C Scheme",
                  "addressLocality": "Jaipur",
                  "addressRegion": "Rajasthan",
                  "postalCode": "302001",
                  "addressCountry": "IN"
                },
                "geo": { "@type": "GeoCoordinates", "latitude": 26.9124, "longitude": 75.7873 },
                "url": "https://www.maacanimationjaipur.com",
                "priceRange": "₹₹",
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "09:00",
                    "closes": "19:00"
                  }
                ],
                "hasMap": "https://maps.google.com/?q=MAAC+Jaipur+Subhash+Marg",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "487",
                  "bestRating": "5"
                }
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

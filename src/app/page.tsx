import HomePageClient from "./HomePageClient";
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
      <HomePageClient />
    </div>
  );
}

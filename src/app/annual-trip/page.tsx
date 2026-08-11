import AnnualTripClient from "./client-page";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.maacanimationjaipur.com" },
    { "@type": "ListItem", "position": 2, "name": "Annual Trip", "item": "https://www.maacanimationjaipur.com/annual-trip" },
  ],
}
export { metadata } from "./metadata";

export default function AnnualTripPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 className="sr-only">Annual Trips at MAAC Animation Jaipur - Student Adventures</h1>
      <AnnualTripClient />
    </>
  );
}

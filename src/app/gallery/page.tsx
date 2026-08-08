import GalleryClient from "./GalleryClient";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.maacanimationjaipur.com" },
    { "@type": "ListItem", "position": 2, "name": "Gallery", "item": "https://www.maacanimationjaipur.com/gallery" },
  ],
}

export { metadata } from "./metadata";

export default function GalleryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <GalleryClient />
    </>
  );
}

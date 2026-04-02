import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://maacindia.com";
  return [
    { url: base,                 lastModified: new Date(), changeFrequency: "weekly" as const,  priority: 1.0 },
    { url: `${base}/about`,      lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/courses`,    lastModified: new Date(), changeFrequency: "weekly" as const,  priority: 0.9 },
    { url: `${base}/placements`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/gallery`,    lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/contact`,    lastModified: new Date(), changeFrequency: "yearly" as const,  priority: 0.7 },
  ];
}
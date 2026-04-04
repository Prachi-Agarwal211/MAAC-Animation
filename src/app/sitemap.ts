import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.maacanimationjaipur.com";
  const now = new Date();

  return [
    // Core Pages (Next.js routes, not WordPress URLs)
    {
      url: base,
      lastModified: new Date("2025-07-03"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/courses`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date("2025-06-26"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/about`,
      lastModified: new Date("2025-07-09"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/placements`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/student-work`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/gallery`,
      lastModified: new Date("2025-07-09"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/demo-class`,
      lastModified: new Date("2025-06-26"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/locations/malviya-nagar`,
      lastModified: new Date("2025-06-24"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/locations/c-scheme`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/locations/vaishali-nagar`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/locations/mansarovar`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Course Pages (19 courses)
    {
      url: `${base}/courses/3d-animation`,
      lastModified: new Date("2025-07-04"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/ad3d`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/d3d`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/dafm`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/graphic-design`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/apdmd`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/architectural-design`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/design-viz-pro`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/gaming-design`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/dgdi`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/vfx`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/advfx`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/vfx-plus`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/media`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/ipvad`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/skill-enhancement`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/ce-pro`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/dfm`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/courses/max-pro`,
      lastModified: new Date("2025-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Blog Pages
    {
      url: `${base}/blog`,
      lastModified: new Date("2025-06-24"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/blog/transitions-in-ux-design`,
      lastModified: new Date("2025-06-24"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/blog/career-in-animation`,
      lastModified: new Date("2025-06-24"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/blog/animation-courses-jaipur`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/blog/vfx-career-india`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/blog/game-design-course-jaipur`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
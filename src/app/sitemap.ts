import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { coursesData } from "@/data/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.maacanimationjaipur.com";
  const now = new Date();

  // Auto-generate course URLs
  const courseUrls = coursesData.map(course => ({
    url: `${base}/courses/${course.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Auto-generate blog post URLs
  const blogUrls = blogPosts.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

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

    // Blog Pages (manual entries)
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
    
    // Auto-generated course pages (from coursesData)
    ...courseUrls,
    // Auto-generated blog posts (from blogPosts)
    ...blogUrls,
  ];
}
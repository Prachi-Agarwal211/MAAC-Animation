import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { getAllCourseSlugs } from "@/data/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.maacanimationjaipur.com";
  const reviewed = new Date("2026-08-11T00:00:00.000Z");

  // Auto-generate blog post URLs
  const blogUrls = blogPosts.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Auto-generate individual course detail page URLs
  const courseUrls = getAllCourseSlugs().map(slug => ({
    url: `${base}/courses/${slug}`,
    lastModified: reviewed,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    // Core Pages
    {
      url: base,
      lastModified: reviewed,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/courses`,
      lastModified: reviewed,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Individual course category pages
    ...courseUrls,
    {
      url: `${base}/contact`,
      lastModified: reviewed,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/about`,
      lastModified: reviewed,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/student-work`,
      lastModified: reviewed,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/gallery`,
      lastModified: reviewed,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/annual-trip`,
      lastModified: reviewed,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/events`,
      lastModified: reviewed,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/animation-institute-jaipur`,
      lastModified: reviewed,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/creative-career-assessment`,
      lastModified: reviewed,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    // Blog Pages
    {
      url: `${base}/blog`,
      lastModified: reviewed,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { getAllCourseSlugs } from "@/data/courseDetails";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.maacanimationjaipur.com";
  const now = new Date();

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
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    // Core Pages
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/courses`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Individual course category pages
    ...courseUrls,
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/student-work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/annual-trip`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/events`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/animation-institute-jaipur`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/creative-career-assessment`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    // Blog Pages
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
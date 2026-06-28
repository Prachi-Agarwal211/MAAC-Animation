import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Main crawler rules
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
        ],
      },
      // Google & Bing specific rules
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // AI Crawler rules
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: "https://www.maacanimationjaipur.com/sitemap.xml",
  };
}
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
          "/metrics/",
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
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Meta-ExternalAgent",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Grokbot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: "https://www.maacanimationjaipur.com/sitemap.xml",
  };
}
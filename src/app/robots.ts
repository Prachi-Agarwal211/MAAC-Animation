import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Main crawler rules
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cart/",
          "/checkout/",
          "/my-account/",
          "/shop/",
          "/wishlist/",
          "/portfolio/",
          "/project-cat/",
          "/author/",
          "/wp-admin/",
          "/wp-login.php",
          "/wp-content/",
          "/wp-includes/",
          "/xmlrpc.php",
          "/feed/",
          "/trackback/",
          "/api/",
        ],
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
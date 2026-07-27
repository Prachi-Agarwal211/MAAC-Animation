/** @type {import('next').NextConfig} */

import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Enforce no trailing slashes everywhere (canonical URL consistency)
  trailingSlash: false,
  // Image optimization configuration
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.maacanimationjaipur.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  // 301 Redirects from WordPress URLs to Next.js routes
  async redirects() {
    return [
      // Core page redirects (WordPress slugs → Next.js clean URLs)
      {
        source: "/work/",
        destination: "/courses",
        permanent: true,
      },
      {
        source: "/animation-institute-in-jaipur/",
        destination: "/animation-institute-jaipur",
        permanent: true,
      },
      {
        source: "/best-animation-institute-jaipur/",
        destination: "/animation-institute-jaipur",
        permanent: true,
      },
      {
        source: "/contact-us/",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/about-us-3/",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/apply-for-demo-class/",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/apply-now-for-demo-class/",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/dfm-digital-film-making/",
        destination: "/courses/dfm",
        permanent: true,
      },

      // Course redirects (WordPress → Next.js /courses/[slug])
      {
        source: "/3d-animation-course-in-jaipur/",
        destination: "/courses/3d-animation",
        permanent: true,
      },
      {
        source: "/ad3d-course-in-jaipur/",
        destination: "/courses/ad3d",
        permanent: true,
      },
      {
        source: "/d3d-course/",
        destination: "/courses/d3d",
        permanent: true,
      },
      {
        source: "/dafm-course-in-jaipur/",
        destination: "/courses/dafm",
        permanent: true,
      },
      {
        source: "/graphic-design-course-in-jaipur/",
        destination: "/courses/graphic-design",
        permanent: true,
      },
      {
        source: "/apdmd-course-in-jaipur/",
        destination: "/courses/apdmd",
        permanent: true,
      },
      {
        source: "/architectural-design/",
        destination: "/courses/architectural-design",
        permanent: true,
      },
      {
        source: "/design-viz-pro-course-in-jaipur/",
        destination: "/courses/design-viz-pro",
        permanent: true,
      },
      {
        source: "/gaming-design-course-in-jaipur/",
        destination: "/courses/gaming-design",
        permanent: true,
      },
      {
        source: "/dgdi-course-in-jaipur/",
        destination: "/courses/dgdi",
        permanent: true,
      },
      {
        source: "/vfx-course-in-jaipur/",
        destination: "/courses/vfx",
        permanent: true,
      },
      {
        source: "/advfx-course-in-jaipur/",
        destination: "/courses/advfx",
        permanent: true,
      },
      {
        source: "/vfx-plus-course-in-jaipur/",
        destination: "/courses/vfx-plus",
        permanent: true,
      },
      {
        source: "/media-course-in-jaipur/",
        destination: "/courses/media",
        permanent: true,
      },
      {
        source: "/ipvad-course-in-jaipur/",
        destination: "/courses/ipvad",
        permanent: true,
      },
      {
        source: "/skill-enhancement-courses/",
        destination: "/courses/skill-enhancement",
        permanent: true,
      },
      {
        source: "/ce-pro-course-in-jaipur/",
        destination: "/courses/ce-pro",
        permanent: true,
      },
      {
        source: "/dfm-course-in-jaipur/",
        destination: "/courses/dfm",
        permanent: true,
      },
      {
        source: "/max-pro-course-in-jaipur/",
        destination: "/courses/max-pro",
        permanent: true,
      },

      // Blog redirects
      {
        source: "/transitions-in-ux-design/",
        destination: "/blog/transitions-in-ux-design",
        permanent: true,
      },
      {
        source: "/career-in-animation/",
        destination: "/blog/career-in-animation",
        permanent: true,
      },

      // Note: Portfolio image files (/portfolio/*/*.jpg) are served directly from public/portfolio/
      // Old WordPress portfolio page redirects handled via middleware if needed

      // WooCommerce → Homepage (noindex pages)
      {
        source: "/cart/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/checkout/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/my-account/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/shop/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wishlist/",
        destination: "/",
        permanent: true,
      },

      // WordPress taxonomy/demo content → Homepage
      {
        source: "/category/:path*",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/project-cat/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/author/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/woodmart_slider/:path*",
        destination: "/",
        permanent: true,
      },

      // WordPress system paths → Homepage
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-login.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-content/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-includes/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/xmlrpc.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/feed/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/trackback/",
        destination: "/",
        permanent: true,
      },

      // Non-www to www redirect (consolidate domain authority)
      {
        source: "/:path*",
        has: [{ type: "host", value: "maacanimationjaipur.com" }],
        destination: "https://www.maacanimationjaipur.com/:path*",
        permanent: true,
      },
    ];
  },
  // Video caching headers for better performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net https://www.google-analytics.com https://www.googleadservices.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://www.maacanimationjaipur.com https://img.youtube.com https://i.ytimg.com https://www.facebook.com",
              "media-src 'self' blob:",
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://www.googleadservices.com https://www.facebook.com https://graph.facebook.com",
              "frame-src 'self' https://www.googletagmanager.com https://www.youtube.com https://player.vimeo.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
      {
        // Cache videos for 1 year (immutable)
        source: "/:path*.mp4",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Cache WebM videos for 1 year (immutable)
        source: "/:path*.webm",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Cache images for 1 year
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Cache student work videos (fixed path with hyphen)
        source: "/student-work/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Cache hero section videos (fixed path with hyphen)
        source: "/hero-section/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Cache portfolio images for 1 year
        source: "/portfolio/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

// Wrap with bundle analyzer (only enabled when ANALYZE=true)
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withAnalyzer(nextConfig);

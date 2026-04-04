# 🚀 MAAC Animation Jaipur — WordPress → Next.js SEO Migration Master Plan

> **Domain:** maacanimationjaipur.com (stays the same)
> **From:** WordPress + WooCommerce + Yoast SEO (Unified Layer hosting)
> **To:** Next.js 14 (deployed on Vercel/Railway)
> **Goal:** Zero SEO loss, preserve all rankings, improve Core Web Vitals

---

## 📋 COMPLETE URL MAPPING TABLE (55+ URLs)

### LEGEND
- ✅ = Page exists in Next.js (needs redirect)
- 🔨 = Page needs to be built in Next.js
- 🗑️ = Redirect to another page (orphan/junk)
- 🛒 = WooCommerce page → redirect to homepage

### Core Pages

| # | Old WordPress URL | New Next.js URL | Redirect Type | Status |
|---|-------------------|-----------------|---------------|--------|
| 1 | `/` | `/` | N/A | ✅ Exists |
| 2 | `/work/` | `/courses` | 301 | ✅ Exists |
| 3 | `/contact-us/` | `/contact` | 301 | ✅ Exists |
| 4 | `/about-us-3/` | `/about` | 301 | ✅ Exists |
| 5 | `/placements/` | `/placements` | N/A | ✅ Exists |
| 6 | `/student-work/` | `/student-work` | N/A | 🔨 Must build |
| 7 | `/gallery/` | `/gallery` | N/A | ✅ Exists |
| 8 | `/apply-now-for-demo-class/` | `/demo-class` | 301 | 🔨 Must build |
| 9 | `/apply-for-demo-class/` | `/demo-class` | 301 → #8 | 🔨 Redirect chain |
| 10 | `/blog/` | `/blog` | N/A | 🔨 Must build |
| 11 | `/transitions-in-ux-design/` | `/blog/transitions-in-ux-design` | 301 | 🔨 Must build |
| 12 | `/career-in-animation/` | `/career-in-animation` | N/A | 🔨 Must build |
| 13 | `/dfm-digital-film-making/` | `/courses/dfm` | 301 | 🔨 Must build |

### Course Pages (20+ high-SEO-value pages)

| # | Old WordPress URL | New Next.js URL | Redirect Type | Status |
|---|-------------------|-----------------|---------------|--------|
| 14 | `/3d-animation-course-in-jaipur/` | `/courses/3d-animation` | 301 | 🔨 Must build |
| 15 | `/ad3d-course-in-jaipur/` | `/courses/ad3d-edge` | 301 | 🔨 Must build |
| 16 | `/d3d-course/` | `/courses/d3d` | 301 | 🔨 Must build |
| 17 | `/dafm-course-in-jaipur/` | `/courses/dafm` | 301 | 🔨 Must build |
| 18 | `/graphic-design-course-in-jaipur/` | `/courses/graphic-design` | 301 | 🔨 Must build |
| 19 | `/apdmd-course-in-jaipur/` | `/courses/apdmd` | 301 | 🔨 Must build |
| 20 | `/architectural-design/` | `/courses/architectural-design` | 301 | 🔨 Must build |
| 21 | `/design-viz-pro-course-in-jaipur/` | `/courses/design-viz-pro` | 301 | 🔨 Must build |
| 22 | `/gaming-design-course-in-jaipur/` | `/courses/gaming-design` | 301 | 🔨 Must build |
| 23 | `/dgdi-course-in-jaipur/` | `/courses/dgdi` | 301 | 🔨 Must build |
| 24 | `/vfx-course-in-jaipur/` | `/courses/vfx` | 301 | 🔨 Must build |
| 25 | `/advfx-course-in-jaipur/` | `/courses/advfx` | 301 | 🔨 Must build |
| 26 | `/vfx-plus-course-in-jaipur/` | `/courses/vfx-plus` | 301 | 🔨 Must build |
| 27 | `/media-course-in-jaipur/` | `/courses/media` | 301 | 🔨 Must build |
| 28 | `/ipvad-course-in-jaipur/` | `/courses/ipvad` | 301 | 🔨 Must build |
| 29 | `/skill-enhancement-courses/` | `/courses/skill-enhancement` | 301 | 🔨 Must build |
| 30 | `/ce-pro-course-in-jaipur/` | `/courses/ce-pro` | 301 | 🔨 Must build |
| 31 | `/dfm-course-in-jaipur/` | `/courses/dfm` | 301 | 🔨 Must build (duplicate of #13) |
| 32 | `/max-pro-course-in-jaipur/` | `/courses/max-pro` | 301 | 🔨 Must build |

### Portfolio Pages (orphan/legacy → redirect to /gallery)

| # | Old WordPress URL | New Next.js URL | Redirect Type | Notes |
|---|-------------------|-----------------|---------------|-------|
| 33 | `/portfolio/` | `/gallery` | 301 | Latin placeholder content |
| 34 | `/portfolio/max-pro/` | `/gallery` | 301 | |
| 35 | `/portfolio/ad3d-edge/` | `/gallery` | 301 | |
| 36 | `/portfolio/ipvad/` | `/gallery` | 301 | |
| 37 | `/portfolio/apdmd/` | `/gallery` | 301 | |
| 38 | `/portfolio/design-viz-pro/` | `/gallery` | 301 | |
| 39 | `/portfolio/ad3d-edge/` | `/gallery` | 301 | |
| 40 | `/portfolio/da-fm/` | `/gallery` | 301 | |
| 41 | `/portfolio/d3d/` | `/gallery` | 301 | |
| 42 | `/portfolio/game-design-dgdi/` | `/gallery` | 301 | |
| 43 | `/portfolio/maya-pro/` | `/gallery` | 301 | |
| 34-43 | `/portfolio_page-*/` (all 10 sub-pages) | `/gallery` | 301 | All portfolio sub-pages |

### WooCommerce Pages (noindex → redirect to homepage)

| # | Old WordPress URL | New Next.js URL | Redirect Type | Notes |
|---|-------------------|-----------------|---------------|-------|
| 44 | `/cart/` | `/` | 301 | No longer needed |
| 45 | `/checkout/` | `/` | 301 | No longer needed |
| 46 | `/my-account/` | `/` | 301 | No longer needed |
| 47 | `/shop/` | `/` | 301 | No longer needed |
| 48 | `/wishlist/` | `/` | 301 | No longer needed |

### Taxonomy/Category Pages (orphan demo content → redirect to /)

| # | Old WordPress URL | New Next.js URL | Redirect Type | Notes |
|---|-------------------|-----------------|---------------|-------|
| 49 | `/category/maac-animation-jaipur/` | `/` | 301 | Orphan demo content |
| 50 | `/project-cat/accessories/` | `/` | 301 | Orphan demo content |
| 51 | `/project-cat/decor/` | `/` | 301 | Orphan demo content |
| 52 | `/project-cat/furniture/` | `/` | 301 | Orphan demo content |
| 53 | `/project-cat/kitchen/` | `/` | 301 | Orphan demo content |
| 54 | `/project-cat/lighting/` | `/` | 301 | Orphan demo content |

### Author Pages (noindex → redirect to /)

| # | Old WordPress URL | New Next.js URL | Redirect Type | Notes |
|---|-------------------|-----------------|---------------|-------|
| 55 | `/author/admin13082007/` | `/` | 301 | WordPress author archive |

### Additional WordPress System Paths (catch-all)

| Pattern | Redirect To | Notes |
|---------|-------------|-------|
| `/wp-admin/*` | `/` | Block admin paths |
| `/wp-login.php` | `/` | Block login |
| `/wp-content/*` | `/` | Block old assets |
| `/wp-includes/*` | `/` | Block includes |
| `/feed/` | `/` | RSS feed |
| `/comments/feed/` | `/` | Comments feed |
| `/*.xml` | `/` | Sitemap XML (old) |
| `/index.php/*` | `/{path}` | Strip index.php prefix |
| `/page/2/`, `/page/3/`, etc. | `/` | Pagination |
| `/tag/*/` | `/` | WordPress tags |
| `/attachment/*/` | `/` | Attachment pages |

---

## PHASE 1: Foundation Fixes

> **Goal:** Fix domain, config, and sitemap before building anything else
> **Estimated time:** 2-3 hours

### Step 1.1: Update Domain Everywhere

**Files to modify:**

#### `src/app/layout.tsx`
```diff
- metadataBase: new URL("https://maacjaipur.com"),
+ metadataBase: new URL("https://maacanimationjaipur.com"),
```

#### `src/app/robots.ts`
```diff
- sitemap: "https://maacjaipur.com/sitemap.xml",
+ sitemap: "https://maacanimationjaipur.com/sitemap.xml",
```

#### `src/app/sitemap.ts`
```diff
- const base = "https://maacjaipur.com";
+ const base = "https://maacanimationjaipur.com";
```

#### `.env.example`
```diff
- NEXT_PUBLIC_SITE_URL=https://maacjaipur.com
+ NEXT_PUBLIC_SITE_URL=https://maacanimationjaipur.com
```

### Step 1.2: Create `.env.local` with Real Values

```bash
# Copy .env.example to .env.local
cp .env.example .env.local

# Then edit .env.local with real values:
NEXT_PUBLIC_SITE_URL=https://maacanimationjaipur.com
NEXT_PUBLIC_SITE_NAME="MAAC Animation Jaipur"
NEXT_PUBLIC_PHONE="+917300001589"
NEXT_PUBLIC_EMAIL="maacanimationjaipur@gmail.com"
NEXT_PUBLIC_WHATSAPP="+917300001589"
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Replace with real GA4 ID
NEXT_PUBLIC_GSC_VERIFICATION=your-code-here
```

### Step 1.3: Fix robots.ts — Block WordPress Junk

Replace the entire `src/app/robots.ts`:

```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // WordPress remnants (should never be crawled)
          "/wp-admin/",
          "/wp-login.php",
          "/wp-content/",
          "/wp-includes/",
          "/wp-json/",
          // WooCommerce remnants
          "/cart/",
          "/checkout/",
          "/my-account/",
          "/wishlist/",
          "/shop/",
          // WordPress taxonomy junk
          "/author/",
          "/category/",
          "/tag/",
          "/project-cat/",
          "/feed/",
          "/comments/feed/",
          "/page/",
          // System paths
          "/api/",
          "/_next/",
          // Portfolio orphan pages (redirected, but block anyway)
          "/portfolio/",
          "/portfolio_page-",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://maacanimationjaipur.com/sitemap.xml",
  };
}
```

### Step 1.4: Fix Sitemap — Remove Phantom URL, Add All Real URLs

Replace `src/app/sitemap.ts`:

```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://maacanimationjaipur.com";
  const now = new Date();

  // Core pages
  const corePages = [
    { url: base, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${base}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/courses`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/placements`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/gallery`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "yearly" as const, priority: 0.7 },
    { url: `${base}/student-work`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/demo-class`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/career-in-animation`, changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${base}/blog`, changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  // Course detail pages (will grow as we build them)
  const courseSlugs = [
    "3d-animation", "ad3d-edge", "d3d", "dafm", "graphic-design",
    "apdmd", "architectural-design", "design-viz-pro", "gaming-design",
    "dgdi", "vfx", "advfx", "vfx-plus", "media", "ipvad",
    "skill-enhancement", "ce-pro", "dfm", "max-pro",
  ];

  const coursePages = courseSlugs.map((slug) => ({
    url: `${base}/courses/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Location pages (ONLY existing ones — no vaishali-nagar phantom!)
  const locationPages = [
    { url: `${base}/locations/malviya-nagar`, changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  return [
    ...corePages.map((p) => ({ ...p, lastModified: now })),
    ...coursePages,
    ...locationPages,
  ];
}
```

### Step 1.5: Fix Footer Dead Links

In `src/components/Footer.tsx`, update the "Our Courses" section to point to valid routes:

```diff
- { label: "3D Animation", href: "/courses/animation" },
- { label: "Visual Effects", href: "/courses/vfx" },
- { label: "Game Design", href: "/courses/gaming" },
- { label: "Digital Filmmaking", href: "/courses/filmmaking" },
- { label: "Digital Media", href: "/courses/digital-media" },
- { label: "Architectural Design", href: "/courses/architectural" },
+ { label: "3D Animation", href: "/courses/3d-animation" },
+ { label: "Visual Effects", href: "/courses/vfx" },
+ { label: "Game Design", href: "/courses/gaming-design" },
+ { label: "Digital Filmmaking", href: "/courses/dfm" },
+ { label: "Digital Media", href: "/courses/apdmd" },
+ { label: "Architectural Design", href: "/courses/architectural-design" },
```

Also remove the Vaishali Nagar phantom link:

```diff
- { label: "Vaishali Nagar", href: "/locations/vaishali-nagar" },
```

### ✅ Phase 1 Checklist

- [ ] Domain updated in `layout.tsx` (metadataBase)
- [ ] Domain updated in `robots.ts`
- [ ] Domain updated in `sitemap.ts`
- [ ] Domain updated in `.env.example` and `.env.local` created
- [ ] `robots.ts` blocks all WordPress junk paths
- [ ] `sitemap.ts` has correct URLs (no vaishali-nagar phantom)
- [ ] Footer dead links fixed (course sub-pages, vaishali-nagar removed)
- [ ] `npm run build` succeeds with no errors

### ⚠️ Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Build fails after domain change | Run `npm run build` after each file change |
| Old OG images still referenced | Verify all og:image URLs in layout.tsx use HTTPS |
| Missing env vars break runtime | Create `.env.local` with all required vars before build |

---

## PHASE 2: URL Mapping & Redirect Strategy

> **Goal:** Zero broken links. Every old WordPress URL either redirects 301 to its new location or returns a helpful 404.
> **Estimated time:** 2-4 hours

### Step 2.1: Add Redirects to next.config.mjs

Replace the entire `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [
      {
        source: "/:path*.mp4",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.webm",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/student-work/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/hero-section/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // ========================================
      // CORE PAGES
      // ========================================
      {
        source: "/work",
        destination: "/courses",
        permanent: true,
      },
      {
        source: "/work/",
        destination: "/courses",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact-us/",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/about-us-3",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-us-3/",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/apply-for-demo-class",
        destination: "/demo-class",
        permanent: true,
      },
      {
        source: "/apply-for-demo-class/",
        destination: "/demo-class",
        permanent: true,
      },
      {
        source: "/apply-now-for-demo-class",
        destination: "/demo-class",
        permanent: true,
      },
      {
        source: "/apply-now-for-demo-class/",
        destination: "/demo-class",
        permanent: true,
      },
      {
        source: "/dfm-digital-film-making",
        destination: "/courses/dfm",
        permanent: true,
      },
      {
        source: "/dfm-digital-film-making/",
        destination: "/courses/dfm",
        permanent: true,
      },

      // ========================================
      // COURSE PAGES (WordPress → Next.js slugs)
      // ========================================
      {
        source: "/3d-animation-course-in-jaipur",
        destination: "/courses/3d-animation",
        permanent: true,
      },
      {
        source: "/3d-animation-course-in-jaipur/",
        destination: "/courses/3d-animation",
        permanent: true,
      },
      {
        source: "/ad3d-course-in-jaipur",
        destination: "/courses/ad3d-edge",
        permanent: true,
      },
      {
        source: "/ad3d-course-in-jaipur/",
        destination: "/courses/ad3d-edge",
        permanent: true,
      },
      {
        source: "/d3d-course",
        destination: "/courses/d3d",
        permanent: true,
      },
      {
        source: "/d3d-course/",
        destination: "/courses/d3d",
        permanent: true,
      },
      {
        source: "/dafm-course-in-jaipur",
        destination: "/courses/dafm",
        permanent: true,
      },
      {
        source: "/dafm-course-in-jaipur/",
        destination: "/courses/dafm",
        permanent: true,
      },
      {
        source: "/dfm-course-in-jaipur",
        destination: "/courses/dfm",
        permanent: true,
      },
      {
        source: "/dfm-course-in-jaipur/",
        destination: "/courses/dfm",
        permanent: true,
      },
      {
        source: "/graphic-design-course-in-jaipur",
        destination: "/courses/graphic-design",
        permanent: true,
      },
      {
        source: "/graphic-design-course-in-jaipur/",
        destination: "/courses/graphic-design",
        permanent: true,
      },
      {
        source: "/apdmd-course-in-jaipur",
        destination: "/courses/apdmd",
        permanent: true,
      },
      {
        source: "/apdmd-course-in-jaipur/",
        destination: "/courses/apdmd",
        permanent: true,
      },
      {
        source: "/architectural-design",
        destination: "/courses/architectural-design",
        permanent: true,
      },
      {
        source: "/architectural-design/",
        destination: "/courses/architectural-design",
        permanent: true,
      },
      {
        source: "/design-viz-pro-course-in-jaipur",
        destination: "/courses/design-viz-pro",
        permanent: true,
      },
      {
        source: "/design-viz-pro-course-in-jaipur/",
        destination: "/courses/design-viz-pro",
        permanent: true,
      },
      {
        source: "/gaming-design-course-in-jaipur",
        destination: "/courses/gaming-design",
        permanent: true,
      },
      {
        source: "/gaming-design-course-in-jaipur/",
        destination: "/courses/gaming-design",
        permanent: true,
      },
      {
        source: "/dgdi-course-in-jaipur",
        destination: "/courses/dgdi",
        permanent: true,
      },
      {
        source: "/dgdi-course-in-jaipur/",
        destination: "/courses/dgdi",
        permanent: true,
      },
      {
        source: "/vfx-course-in-jaipur",
        destination: "/courses/vfx",
        permanent: true,
      },
      {
        source: "/vfx-course-in-jaipur/",
        destination: "/courses/vfx",
        permanent: true,
      },
      {
        source: "/advfx-course-in-jaipur",
        destination: "/courses/advfx",
        permanent: true,
      },
      {
        source: "/advfx-course-in-jaipur/",
        destination: "/courses/advfx",
        permanent: true,
      },
      {
        source: "/vfx-plus-course-in-jaipur",
        destination: "/courses/vfx-plus",
        permanent: true,
      },
      {
        source: "/vfx-plus-course-in-jaipur/",
        destination: "/courses/vfx-plus",
        permanent: true,
      },
      {
        source: "/media-course-in-jaipur",
        destination: "/courses/media",
        permanent: true,
      },
      {
        source: "/media-course-in-jaipur/",
        destination: "/courses/media",
        permanent: true,
      },
      {
        source: "/ipvad-course-in-jaipur",
        destination: "/courses/ipvad",
        permanent: true,
      },
      {
        source: "/ipvad-course-in-jaipur/",
        destination: "/courses/ipvad",
        permanent: true,
      },
      {
        source: "/skill-enhancement-courses",
        destination: "/courses/skill-enhancement",
        permanent: true,
      },
      {
        source: "/skill-enhancement-courses/",
        destination: "/courses/skill-enhancement",
        permanent: true,
      },
      {
        source: "/ce-pro-course-in-jaipur",
        destination: "/courses/ce-pro",
        permanent: true,
      },
      {
        source: "/ce-pro-course-in-jaipur/",
        destination: "/courses/ce-pro",
        permanent: true,
      },
      {
        source: "/max-pro-course-in-jaipur",
        destination: "/courses/max-pro",
        permanent: true,
      },
      {
        source: "/max-pro-course-in-jaipur/",
        destination: "/courses/max-pro",
        permanent: true,
      },

      // ========================================
      // BLOG POSTS
      // ========================================
      {
        source: "/transitions-in-ux-design",
        destination: "/blog/transitions-in-ux-design",
        permanent: true,
      },
      {
        source: "/transitions-in-ux-design/",
        destination: "/blog/transitions-in-ux-design",
        permanent: true,
      },

      // ========================================
      // PORTFOLIO → /gallery (all orphan pages)
      // ========================================
      {
        source: "/portfolio",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/portfolio/",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/portfolio/:path*",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/portfolio_page-:path*",
        destination: "/gallery",
        permanent: true,
      },

      // ========================================
      // WOOCOMMERCE → homepage
      // ========================================
      {
        source: "/cart",
        destination: "/",
        permanent: true,
      },
      {
        source: "/cart/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/checkout",
        destination: "/",
        permanent: true,
      },
      {
        source: "/checkout/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/my-account",
        destination: "/",
        permanent: true,
      },
      {
        source: "/my-account/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/",
        permanent: true,
      },
      {
        source: "/shop/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wishlist",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wishlist/",
        destination: "/",
        permanent: true,
      },

      // ========================================
      // TAXONOMY / CATEGORY → homepage
      // ========================================
      {
        source: "/category/:path*",
        destination: "/",
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
        source: "/tag/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/feed",
        destination: "/",
        permanent: true,
      },
      {
        source: "/feed/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/comments/feed",
        destination: "/",
        permanent: true,
      },
      {
        source: "/comments/feed/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/page/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/attachment/:path*",
        destination: "/",
        permanent: true,
      },

      // ========================================
      // WORDPRESS SYSTEM PATHS → homepage
      // ========================================
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
        source: "/wp-json/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.php/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

### Step 2.2: (Alternative) Middleware-Based Redirects

If next.config.mjs redirects become too large, create `src/middleware.ts`:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REDIRECTS: Record<string, string> = {
  // Core pages
  "/work": "/courses",
  "/work/": "/courses",
  "/contact-us": "/contact",
  "/contact-us/": "/contact",
  "/about-us-3": "/about",
  "/about-us-3/": "/about",
  "/apply-for-demo-class": "/demo-class",
  "/apply-for-demo-class/": "/demo-class",
  "/apply-now-for-demo-class": "/demo-class",
  "/apply-now-for-demo-class/": "/demo-class",
  "/dfm-digital-film-making": "/courses/dfm",
  "/dfm-digital-film-making/": "/courses/dfm",

  // Course pages
  "/3d-animation-course-in-jaipur": "/courses/3d-animation",
  "/3d-animation-course-in-jaipur/": "/courses/3d-animation",
  "/ad3d-course-in-jaipur": "/courses/ad3d-edge",
  "/ad3d-course-in-jaipur/": "/courses/ad3d-edge",
  "/d3d-course": "/courses/d3d",
  "/d3d-course/": "/courses/d3d",
  "/dafm-course-in-jaipur": "/courses/dafm",
  "/dafm-course-in-jaipur/": "/courses/dafm",
  "/dfm-course-in-jaipur": "/courses/dfm",
  "/dfm-course-in-jaipur/": "/courses/dfm",
  "/graphic-design-course-in-jaipur": "/courses/graphic-design",
  "/graphic-design-course-in-jaipur/": "/courses/graphic-design",
  "/apdmd-course-in-jaipur": "/courses/apdmd",
  "/apdmd-course-in-jaipur/": "/courses/apdmd",
  "/architectural-design": "/courses/architectural-design",
  "/architectural-design/": "/courses/architectural-design",
  "/design-viz-pro-course-in-jaipur": "/courses/design-viz-pro",
  "/design-viz-pro-course-in-jaipur/": "/courses/design-viz-pro",
  "/gaming-design-course-in-jaipur": "/courses/gaming-design",
  "/gaming-design-course-in-jaipur/": "/courses/gaming-design",
  "/dgdi-course-in-jaipur": "/courses/dgdi",
  "/dgdi-course-in-jaipur/": "/courses/dgdi",
  "/vfx-course-in-jaipur": "/courses/vfx",
  "/vfx-course-in-jaipur/": "/courses/vfx",
  "/advfx-course-in-jaipur": "/courses/advfx",
  "/advfx-course-in-jaipur/": "/courses/advfx",
  "/vfx-plus-course-in-jaipur": "/courses/vfx-plus",
  "/vfx-plus-course-in-jaipur/": "/courses/vfx-plus",
  "/media-course-in-jaipur": "/courses/media",
  "/media-course-in-jaipur/": "/courses/media",
  "/ipvad-course-in-jaipur": "/courses/ipvad",
  "/ipvad-course-in-jaipur/": "/courses/ipvad",
  "/skill-enhancement-courses": "/courses/skill-enhancement",
  "/skill-enhancement-courses/": "/courses/skill-enhancement",
  "/ce-pro-course-in-jaipur": "/courses/ce-pro",
  "/ce-pro-course-in-jaipur/": "/courses/ce-pro",
  "/max-pro-course-in-jaipur": "/courses/max-pro",
  "/max-pro-course-in-jaipur/": "/courses/max-pro",

  // Blog
  "/transitions-in-ux-design": "/blog/transitions-in-ux-design",
  "/transitions-in-ux-design/": "/blog/transitions-in-ux-design",

  // Portfolio → gallery
  "/portfolio": "/gallery",
  "/portfolio/": "/gallery",

  // WooCommerce → homepage
  "/cart": "/",
  "/cart/": "/",
  "/checkout": "/",
  "/checkout/": "/",
  "/my-account": "/",
  "/my-account/": "/",
  "/shop": "/",
  "/shop/": "/",
  "/wishlist": "/",
  "/wishlist/": "/",

  // Taxonomy → homepage
  "/category/maac-animation-jaipur": "/",
  "/project-cat/accessories": "/",
  "/project-cat/decor": "/",
  "/project-cat/furniture": "/",
  "/project-cat/kitchen": "/",
  "/project-cat/lighting": "/",
  "/author/admin13082007": "/",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check exact match
  if (REDIRECTS[pathname]) {
    const url = new URL(REDIRECTS[pathname], request.url);
    return NextResponse.redirect(url, 301);
  }

  // Wildcard: portfolio sub-pages
  if (pathname.startsWith("/portfolio/")) {
    const url = new URL("/gallery", request.url);
    return NextResponse.redirect(url, 301);
  }

  // Wildcard: portfolio_page-* sub-pages
  if (pathname.startsWith("/portfolio_page-")) {
    const url = new URL("/gallery", request.url);
    return NextResponse.redirect(url, 301);
  }

  // Wildcard: WordPress paths
  if (
    pathname.startsWith("/wp-admin") ||
    pathname.startsWith("/wp-content") ||
    pathname.startsWith("/wp-includes") ||
    pathname.startsWith("/wp-json") ||
    pathname.startsWith("/feed") ||
    pathname.startsWith("/comments/feed") ||
    pathname.startsWith("/tag/") ||
    pathname.startsWith("/attachment/") ||
    pathname.startsWith("/page/")
  ) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
```

### ✅ Phase 2 Checklist

- [ ] All 55+ redirects configured in next.config.mjs OR middleware.ts
- [ ] Wildcard patterns cover WordPress system paths
- [ ] Portfolio sub-pages redirect to /gallery
- [ ] WooCommerce pages redirect to homepage
- [ ] Taxonomy/author pages redirect to homepage
- [ ] `npm run build` succeeds
- [ ] Test 10+ old URLs locally to verify redirect behavior

### ⚠️ Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Too many redirects slow build | Use middleware.ts instead (edge-level, faster) |
| Trailing slash mismatch | Include both with and without trailing slash |
| Redirect loop | Test every redirect with `curl -I` |

---

## PHASE 3: Build Missing Course Pages

> **Goal:** Create dynamic `[slug]` route for 20+ course pages, each with unique SEO metadata, structured data, and content.
> **Estimated time:** 6-10 hours

### Step 3.1: Create Course Data File

Create `src/data/courses.ts`:

```typescript
export interface Course {
  slug: string;
  title: string;
  fullName: string;
  description: string;
  fullDescription: string;
  duration: string;
  code: string;
  tools: string[];
  careers: string[];
  eligibility: string;
  highlights: string[];
  oldUrls: string[]; // WordPress URLs that redirect here (for SEO tracking)
}

export const courses: Course[] = [
  {
    slug: "3d-animation",
    title: "3D Animation",
    fullName: "Program in 3D Animation",
    description: "Master 3D animation techniques with Autodesk Maya and industry-standard workflows.",
    fullDescription: "Comprehensive 3D animation program covering the complete production pipeline — from storyboarding and modeling to rigging, animation, lighting, and rendering. Students learn Autodesk Maya, ZBrush, and Arnold renderer through hands-on studio projects. Graduate-ready for roles in feature animation, TV series, and advertising.",
    duration: "18 Months",
    code: "D3D-18",
    tools: ["Autodesk Maya", "ZBrush", "Arnold Renderer", "Substance Painter", "Marmoset Toolbag"],
    careers: ["3D Animator", "Character Animator", "Lighting Artist", "Rendering Artist", "Storyboard Artist"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Industry-standard Autodesk Maya training",
      "Character animation and rigging mastery",
      "Real studio project workflows",
      "Portfolio development with 5+ showreel pieces",
      "NSDC certified with B.Voc degree option",
    ],
    oldUrls: ["/3d-animation-course-in-jaipur/"],
  },
  {
    slug: "ad3d-edge",
    title: "AD3D Edge",
    fullName: "Advanced Program in 3D Animation (Edge)",
    description: "Advanced 3D animation with specialization in character animation and VFX integration.",
    fullDescription: "An advanced program that takes 3D animation skills to the professional level. Covers advanced character animation, dynamics, VFX integration, and real-time rendering. Students work on complex studio-level projects and develop a professional showreel.",
    duration: "24 Months",
    code: "AD3D-24",
    tools: ["Autodesk Maya", "ZBrush", "Houdini", "Arnold", "Substance Painter", "Marvelous Designer"],
    careers: ["Senior 3D Animator", "Character TD", "Rigging Artist", "Dynamics Artist"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Advanced character animation techniques",
      "VFX integration and dynamics",
      "Professional showreel development",
      "Industry mentorship program",
    ],
    oldUrls: ["/ad3d-course-in-jaipur/"],
  },
  {
    slug: "d3d",
    title: "D3D",
    fullName: "Program in 3D Animation",
    description: "Foundation to intermediate 3D animation covering the complete production pipeline.",
    fullDescription: "A comprehensive foundation-to-intermediate program in 3D animation. Students learn modeling, texturing, lighting, animation, and rendering using industry-standard tools. Perfect for beginners looking to enter the animation industry.",
    duration: "18 Months",
    code: "D3D-18",
    tools: ["Autodesk Maya", "3ds Max", "V-Ray", "Photoshop"],
    careers: ["3D Modeler", "Junior Animator", "Texturing Artist", "Lighting Artist"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Complete 3D production pipeline",
      "Foundation to intermediate level",
      "Industry-standard software training",
      "Hands-on project-based learning",
    ],
    oldUrls: ["/d3d-course/"],
  },
  {
    slug: "dafm",
    title: "DAFM",
    fullName: "Advanced Program in Digital Animation & Filmmaking",
    description: "Combine digital animation with filmmaking skills for a complete creative toolkit.",
    fullDescription: "A unique program that blends digital animation with filmmaking. Students learn 3D animation, cinematography, editing, VFX, and post-production. Ideal for aspiring filmmakers who want to combine animation with live-action techniques.",
    duration: "24 Months",
    code: "DAFM-24",
    tools: ["Autodesk Maya", "Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Cinema 4D"],
    careers: ["Digital Filmmaker", "Animation Director", "Post-Production Supervisor", "Editor"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Animation + filmmaking combined",
      "Cinematography and editing training",
      "Short film production projects",
      "Industry mentorship",
    ],
    oldUrls: ["/dafm-course-in-jaipur/"],
  },
  {
    slug: "dfm",
    title: "DFM",
    fullName: "Program in Digital Film Making",
    description: "Learn the art and science of digital filmmaking from pre-production to post.",
    fullDescription: "Comprehensive filmmaking program covering screenwriting, directing, cinematography, editing, sound design, and post-production. Students create short films and documentaries using professional equipment and software.",
    duration: "18 Months",
    code: "DFM-18",
    tools: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Final Cut Pro", "Avid Media Composer"],
    careers: ["Film Director", "Cinematographer", "Film Editor", "Sound Designer", "Producer"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Complete filmmaking pipeline",
      "Hands-on short film production",
      "Professional equipment training",
      "Industry screenings and festivals",
    ],
    oldUrls: ["/dfm-course-in-jaipur/", "/dfm-digital-film-making/"],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    fullName: "Program in Graphic Design",
    description: "Master visual communication, branding, and digital design for the modern creative industry.",
    fullDescription: "Comprehensive graphic design program covering typography, branding, UI/UX, print design, and digital media. Students master Adobe Creative Suite and develop a professional portfolio.",
    duration: "18 Months",
    code: "GD-18",
    tools: ["Adobe Photoshop", "Illustrator", "InDesign", "Figma", "After Effects"],
    careers: ["Graphic Designer", "UI/UX Designer", "Brand Designer", "Art Director"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Adobe Creative Suite mastery",
      "UI/UX design fundamentals",
      "Brand identity development",
      "Professional portfolio creation",
    ],
    oldUrls: ["/graphic-design-course-in-jaipur/"],
  },
  {
    slug: "apdmd",
    title: "APDMD",
    fullName: "Advanced Program in Digital Media & Design",
    description: "Advanced digital media program covering graphic design, web design, UI/UX, and motion graphics.",
    fullDescription: "An advanced program that covers the full spectrum of digital media — from graphic design and web design to UI/UX, motion graphics, and digital marketing. Students graduate as versatile digital creators.",
    duration: "24 Months",
    code: "APDMD-24",
    tools: ["Adobe Creative Suite", "Figma", "After Effects", "Cinema 4D", "WordPress"],
    careers: ["Digital Media Specialist", "UI/UX Designer", "Motion Graphics Artist", "Web Designer"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Complete digital media toolkit",
      "UI/UX and web design",
      "Motion graphics training",
      "Digital marketing fundamentals",
    ],
    oldUrls: ["/apdmd-course-in-jaipur/"],
  },
  {
    slug: "architectural-design",
    title: "Architectural Design",
    fullName: "Program in Architectural Visualization",
    description: "Create stunning architectural visualizations using 3D modeling and rendering tools.",
    fullDescription: "Specialized program in architectural visualization. Students learn 3D modeling, texturing, lighting, and rendering for architectural projects. Master AutoCAD, SketchUp, 3ds Max, and V-Ray for photorealistic renders.",
    duration: "18 Months",
    code: "ARCH-18",
    tools: ["AutoCAD", "SketchUp", "3ds Max", "V-Ray", "Lumion", "Photoshop"],
    careers: ["Architectural Visualizer", "3D Architectural Modeler", "Interior Designer", "CAD Technician"],
    eligibility: "10+2 (Any Stream) / Diploma in Architecture",
    highlights: [
      "Photorealistic rendering techniques",
      "Interior and exterior visualization",
      "Walkthrough animation creation",
      "Industry project collaborations",
    ],
    oldUrls: ["/architectural-design/"],
  },
  {
    slug: "design-viz-pro",
    title: "Design Viz Pro",
    fullName: "Professional Program in Design Visualization",
    description: "Professional design visualization for product, interior, and architectural design.",
    fullDescription: "Professional-level design visualization program covering product design, interior design, and architectural visualization. Students learn advanced 3D modeling, texturing, and rendering for design presentations.",
    duration: "18 Months",
    code: "DVP-18",
    tools: ["3ds Max", "V-Ray", "Corona Renderer", "Photoshop", "SketchUp"],
    careers: ["Design Visualizer", "Product Renderer", "Interior Visualizer"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Multi-discipline visualization",
      "Photorealistic rendering",
      "Client presentation skills",
      "Real project experience",
    ],
    oldUrls: ["/design-viz-pro-course-in-jaipur/"],
  },
  {
    slug: "gaming-design",
    title: "Game Design",
    fullName: "Program in Game Design & Development",
    description: "Design and develop games for mobile, PC, and console with industry-standard tools.",
    fullDescription: "Comprehensive game design program covering game mechanics, level design, character creation, environment art, and game engine integration. Students learn Unity and Unreal Engine while building a professional game portfolio.",
    duration: "24 Months",
    code: "DGDI-24",
    tools: ["Unity", "Unreal Engine", "Maya", "ZBrush", "Substance Painter", "Photoshop"],
    careers: ["Game Designer", "Level Designer", "Game Artist", "3D Game Modeler", "Unity Developer"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Unity and Unreal Engine training",
      "Game mechanics and level design",
      "Character and environment art",
      "Published game project in portfolio",
    ],
    oldUrls: ["/gaming-design-course-in-jaipur/", "/dgdi-course-in-jaipur/"],
  },
  {
    slug: "dgdi",
    title: "DGDI",
    fullName: "Program in Game Design & Integration",
    description: "Learn game art, design, and engine integration for next-gen gaming platforms.",
    fullDescription: "Focused game design and integration program. Students master game art pipelines, from concept art to final engine integration. Covers character modeling, environment design, texturing, and real-time rendering in Unity and Unreal.",
    duration: "24 Months",
    code: "DGDI-24",
    tools: ["Unreal Engine", "Unity", "Maya", "Substance Painter", "Marvelous Designer", "ZBrush"],
    careers: ["Game Artist", "Environment Artist", "Character Artist", "Technical Artist"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Next-gen game art pipelines",
      "Real-time rendering mastery",
      "Industry-standard game engines",
      "Team-based game development projects",
    ],
    oldUrls: ["/dgdi-course-in-jaipur/"],
  },
  {
    slug: "vfx",
    title: "VFX",
    fullName: "Program in Visual Effects",
    description: "Create stunning visual effects for film, television, and OTT platforms.",
    fullDescription: "Comprehensive VFX program covering compositing, rotoscopy, paint prep, matchmoving, and CG integration. Students learn Nuke, After Effects, and Mocha while working on real film footage and studio-level projects.",
    duration: "18 Months",
    code: "VFX-18",
    tools: ["Nuke", "After Effects", "Mocha Pro", "Maya", "Houdini", "Flame"],
    careers: ["VFX Compositor", "Roto Artist", "Paint Artist", "Matchmove Artist", "VFX Coordinator"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Industry-standard Nuke training",
      "Real film footage projects",
      "Compositing and rotoscopy mastery",
      "Studio-ready skill set",
    ],
    oldUrls: ["/vfx-course-in-jaipur/"],
  },
  {
    slug: "advfx",
    title: "ADVFX",
    fullName: "Advanced Program in Visual Effects",
    description: "Advanced VFX training with specialization in compositing and CG integration.",
    fullDescription: "Advanced VFX program that takes compositing and CG integration skills to the professional level. Students work on complex VFX shots, master 3D compositing, and develop expertise in particle effects and dynamics.",
    duration: "24 Months",
    code: "ADVFX-24",
    tools: ["Nuke", "Houdini", "Maya", "After Effects", "Mari", "Katana"],
    careers: ["Senior Compositor", "VFX Supervisor", "CG Integration Artist", "FX Artist"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Advanced compositing techniques",
      "3D compositing and CG integration",
      "Particle effects and dynamics",
      "Professional showreel development",
    ],
    oldUrls: ["/advfx-course-in-jaipur/"],
  },
  {
    slug: "vfx-plus",
    title: "VFX Plus",
    fullName: "Program in Visual Effects Plus",
    description: "Comprehensive VFX training with additional motion graphics and editing skills.",
    fullDescription: "Extended VFX program that adds motion graphics, editing, and color grading to core VFX skills. Students graduate with a versatile skill set suitable for film, television, advertising, and digital media.",
    duration: "18 Months",
    code: "VFXP-18",
    tools: ["After Effects", "Nuke", "Premiere Pro", "DaVinci Resolve", "Cinema 4D"],
    careers: ["VFX Artist", "Motion Graphics Designer", "Video Editor", "Colorist"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "VFX + motion graphics combo",
      "Editing and color grading",
      "Multi-industry skill set",
      "Versatile career options",
    ],
    oldUrls: ["/vfx-plus-course-in-jaipur/"],
  },
  {
    slug: "media",
    title: "Media",
    fullName: "Program in Media & Communication",
    description: "Master digital media production for broadcasting, advertising, and online platforms.",
    fullDescription: "Comprehensive media production program covering video production, audio editing, motion graphics, and digital distribution. Students learn to create content for television, advertising, and online platforms.",
    duration: "18 Months",
    code: "MEDIA-18",
    tools: ["Premiere Pro", "After Effects", "Audition", "DaVinci Resolve", "Cinema 4D"],
    careers: ["Media Producer", "Video Editor", "Motion Graphics Artist", "Content Creator"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Multi-platform content creation",
      "Audio and video production",
      "Motion graphics training",
      "Digital distribution strategies",
    ],
    oldUrls: ["/media-course-in-jaipur/"],
  },
  {
    slug: "ipvad",
    title: "IPVAD",
    fullName: "Integrated Program in VFX, Animation & Digital Art",
    description: "Integrated program combining VFX, animation, and digital art for a complete skill set.",
    fullDescription: "An integrated program that combines the best of VFX, animation, and digital art. Students get a well-rounded education across multiple disciplines, making them versatile creative professionals ready for any role in the industry.",
    duration: "24 Months",
    code: "IPVAD-24",
    tools: ["Maya", "Nuke", "After Effects", "Photoshop", "ZBrush", "Substance Painter"],
    careers: ["VFX Generalist", "Animation Generalist", "Digital Artist", "Creative Director"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Multi-discipline training",
      "VFX + animation + digital art",
      "Versatile career preparation",
      "Comprehensive portfolio",
    ],
    oldUrls: ["/ipvad-course-in-jaipur/"],
  },
  {
    slug: "skill-enhancement",
    title: "Skill Enhancement",
    fullName: "Skill Enhancement Courses",
    description: "Short-term specialized courses to upskill in specific areas of animation and VFX.",
    fullDescription: "Short-term, focused courses designed for working professionals and students who want to upskill in specific areas. Covers specialized topics like advanced rigging, creature animation, environment design, and more.",
    duration: "3-6 Months",
    code: "SEC-6",
    tools: ["Varies by course"],
    careers: ["Specialized Artist", "Freelancer", "Consultant"],
    eligibility: "Varies by course",
    highlights: [
      "Short-term focused learning",
      "Specific skill development",
      "Perfect for working professionals",
      "Flexible scheduling",
    ],
    oldUrls: ["/skill-enhancement-courses/"],
  },
  {
    slug: "ce-pro",
    title: "CE Pro",
    fullName: "Certificate Program in Content Editing",
    description: "Professional content editing for film, television, and digital media.",
    fullDescription: "Professional editing program covering film editing, color grading, sound design, and post-production workflows. Students master Premiere Pro, DaVinci Resolve, and Avid Media Composer.",
    duration: "12 Months",
    code: "CEP-12",
    tools: ["Premiere Pro", "DaVinci Resolve", "Avid Media Composer", "After Effects", "Audition"],
    careers: ["Film Editor", "Colorist", "Sound Designer", "Post-Production Supervisor"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "Professional editing workflows",
      "Color grading mastery",
      "Sound design fundamentals",
      "Industry-standard software",
    ],
    oldUrls: ["/ce-pro-course-in-jaipur/"],
  },
  {
    slug: "max-pro",
    title: "Max Pro",
    fullName: "Professional Program in 3ds Max",
    description: "Master 3ds Max for architectural visualization, game art, and product design.",
    fullDescription: "Intensive 3ds Max program focused on professional applications in architectural visualization, game art, and product design. Students learn advanced modeling, texturing, lighting, and rendering techniques.",
    duration: "12 Months",
    code: "MAXP-12",
    tools: ["3ds Max", "V-Ray", "Corona Renderer", "Photoshop", "Forest Pack"],
    careers: ["3ds Max Artist", "Architectural Visualizer", "Game Environment Artist"],
    eligibility: "10+2 (Any Stream)",
    highlights: [
      "3ds Max mastery",
      "Architectural visualization focus",
      "Advanced rendering techniques",
      "Industry project experience",
    ],
    oldUrls: ["/max-pro-course-in-jaipur/"],
  },
];
```

### Step 3.2: Create Dynamic Course Page Route

Create directory structure:
```
src/app/courses/[slug]/
├── page.tsx
└── not-found.tsx
```

`src/app/courses/[slug]/page.tsx`:

```typescript
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import { BreadcrumbList, Course as CourseSchema, FAQPage } from "@/lib/schema";
import CourseHero from "@/components/courses/CourseHero";
import CourseOverview from "@/components/courses/CourseOverview";
import CourseCurriculum from "@/components/courses/CourseCurriculum";
import CourseCareer from "@/components/courses/CourseCareer";
import CourseTools from "@/components/courses/CourseTools";
import CourseFAQ from "@/components/courses/CourseFAQ";
import CourseCTA from "@/components/courses/CourseCTA";

interface CoursePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = courses.find((c) => c.slug === params.slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: `${course.fullName} in Jaipur | MAAC Animation Jaipur`,
    description: course.description,
    keywords: [
      `${course.title.toLowerCase()} course jaipur`,
      `${course.title.toLowerCase()} institute jaipur`,
      `best ${course.title.toLowerCase()} course rajasthan`,
      "maac jaipur",
      `maac animation jaipur ${course.title.toLowerCase()}`,
    ],
    openGraph: {
      title: `${course.fullName} in Jaipur`,
      description: course.description,
      type: "article",
      url: `https://maacanimationjaipur.com/courses/${course.slug}`,
      images: [{ url: `/images/courses/${course.slug}-og.jpg`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://maacanimationjaipur.com/courses/${course.slug}`,
    },
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = courses.find((c) => c.slug === params.slug);
  if (!course) notFound();

  const baseUrl = "https://maacanimationjaipur.com";
  const courseUrl = `${baseUrl}/courses/${course.slug}`;

  // JSON-LD: Course Schema
  const courseSchema: CourseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.fullName,
    description: course.fullDescription,
    provider: {
      "@type": "Organization",
      name: "MAAC Animation Jaipur",
      sameAs: baseUrl,
    },
    educationalLevel: "Undergraduate / Professional",
    inLanguage: "en",
    url: courseUrl,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      location: {
        "@type": "Place",
        name: "MAAC Animation Jaipur",
        address: {
          "@type": "PostalAddress",
          streetAddress: "711-712, Ambition Tower, 7th Floor, D-46B, Malan Ka Chauraha, Agrasain Circle, Subhash Marg",
          addressLocality: "Jaipur",
          addressRegion: "Rajasthan",
          postalCode: "302001",
          addressCountry: "IN",
        },
      },
    },
  };

  // JSON-LD: FAQ Schema
  const faqSchema: FAQPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the duration of the ${course.fullName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${course.fullName} has a duration of ${course.duration}.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the eligibility for ${course.fullName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The eligibility for ${course.fullName} is ${course.eligibility}.`,
        },
      },
      {
        "@type": "Question",
        name: `What career options are available after completing ${course.fullName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `After completing ${course.fullName}, you can pursue careers as ${course.careers.join(", ")}.`,
        },
      },
      {
        "@type": "Question",
        name: `Which tools will I learn in ${course.fullName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `You will learn ${course.tools.join(", ")} and more.`,
        },
      },
    ],
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbSchema: BreadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Courses", item: `${baseUrl}/courses` },
      { "@type": "ListItem", position: 3, name: course.title, item: courseUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <CourseHero course={course} />
      <CourseOverview course={course} />
      <CourseCurriculum course={course} />
      <CourseTools course={course} />
      <CourseCareer course={course} />
      <CourseFAQ course={course} />
      <CourseCTA />
    </>
  );
}
```

### Step 3.3: Create Schema Types

Create `src/lib/schema.ts`:

```typescript
export interface BreadcrumbList {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface Course {
  "@context": "https://schema.org";
  "@type": "Course";
  name: string;
  description: string;
  provider: {
    "@type": "Organization";
    name: string;
    sameAs: string;
  };
  educationalLevel: string;
  inLanguage: string;
  url: string;
  hasCourseInstance: {
    "@type": "CourseInstance";
    courseMode: string;
    location: {
      "@type": "Place";
      name: string;
      address: {
        "@type": "PostalAddress";
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
      };
    };
  };
}

export interface FAQPage {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}
```

### Step 3.4: Create Course Components

Create directory: `src/components/courses/`

Each component file:
- `CourseHero.tsx` — Hero section with course name, duration, CTA
- `CourseOverview.tsx` — Full description + highlights
- `CourseCurriculum.tsx` — Curriculum/modules breakdown
- `CourseTools.tsx` — Tools/software taught
- `CourseCareer.tsx` — Career options after completion
- `CourseFAQ.tsx` — FAQ accordion with schema
- `CourseCTA.tsx` — Bottom CTA (Demo class + Contact)

### ✅ Phase 3 Checklist

- [ ] `src/data/courses.ts` has all 19 courses with complete data
- [ ] `src/app/courses/[slug]/page.tsx` dynamic route works
- [ ] `generateStaticParams()` generates all course paths
- [ ] Each course page has unique title/description/keywords
- [ ] JSON-LD structured data on every course page (Course + FAQ + BreadcrumbList)
- [ ] OG image placeholder per course
- [ ] Canonical URL set per course
- [ ] `npm run build` generates all course pages
- [ ] All old WordPress course URLs redirect correctly

### ⚠️ Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Course content is incomplete | Use WordPress content as source — scrape/export all body copy |
| OG images missing per course | Create fallback OG template with course name overlay |
| 404 on unknown slug | Custom not-found.tsx with course suggestions |

---

## PHASE 4: Build Missing Core Pages

> **Goal:** Build all missing pages that the WordPress site currently has
> **Estimated time:** 6-8 hours

### Step 4.1: /student-work Page

Create `src/app/student-work/page.tsx`:

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Work Gallery | MAAC Animation Jaipur",
  description: "Explore stunning animation, VFX, and game design projects created by MAAC Jaipur students. See real student portfolios and showreels.",
  openGraph: {
    title: "Student Work Gallery | MAAC Animation Jaipur",
    description: "Explore stunning animation, VFX, and game design projects created by MAAC Jaipur students.",
    url: "https://maacanimationjaipur.com/student-work",
  },
};

export default function StudentWorkPage() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
            Student Showcase
          </p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[#F0EBE1] mb-4">
            Student Work
          </h1>
          <p className="text-[#A8A29C] text-lg max-w-2xl mx-auto">
            Discover the incredible projects created by our talented students. From 3D animations to VFX shots, see what our graduates are capable of.
          </p>
        </div>

        {/* Grid of student projects — reuse existing gallery patterns */}
        {/* Include video/image embeds, student names, course completed */}
      </div>
    </div>
  );
}
```

### Step 4.2: /demo-class Page (Free Demo Class Booking)

Create `src/app/demo-class/page.tsx`:

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Free Demo Class | MAAC Animation Jaipur",
  description: "Experience MAAC Jaipur firsthand. Book a free demo class in 3D Animation, VFX, Game Design, or Digital Media. No commitment required.",
  openGraph: {
    title: "Book Free Demo Class | MAAC Animation Jaipur",
    description: "Experience MAAC Jaipur firsthand. Book a free demo class today.",
    url: "https://maacanimationjaipur.com/demo-class",
  },
};

export default function DemoClassPage() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
            Free Demo Class
          </p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[#F0EBE1] mb-4">
            Book Your Free Demo Class
          </h1>
          <p className="text-[#A8A29C] text-lg">
            Experience our teaching methodology firsthand. Choose your course of interest and book a complimentary demo session.
          </p>
        </div>

        {/* Demo class booking form */}
        {/* Fields: Name, Phone, Email, Course Interest, Preferred Date/Time */}
        {/* Submit → WhatsApp / Email / CRM */}
      </div>
    </div>
  );
}
```

### Step 4.3: /career-in-animation Page

Create `src/app/career-in-animation/page.tsx`:

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career in Animation & VFX | MAAC Animation Jaipur",
  description: "Explore rewarding careers in animation, VFX, gaming, and digital media. Learn about salaries, job roles, and how to get started with MAAC Jaipur.",
  openGraph: {
    title: "Career in Animation & VFX | MAAC Animation Jaipur",
    description: "Explore rewarding careers in animation, VFX, gaming, and digital media.",
    url: "https://maacanimationjaipur.com/career-in-animation",
  },
};

export default function CareerInAnimationPage() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
            Career Guide
          </p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[#F0EBE1] mb-4">
            Career in Animation & VFX
          </h1>
          <p className="text-[#A8A29C] text-lg max-w-3xl mx-auto">
            The Indian animation and VFX industry is growing at 15-20% annually. Discover the exciting career paths available to you and how MAAC Jaipur can help you get there.
          </p>
        </div>

        {/* Career paths, salary ranges, industry overview */}
        {/* Include JobPosting structured data for openings */}
      </div>
    </div>
  );
}
```

### Step 4.4: Blog System (/blog + /blog/[slug])

Create `src/app/blog/page.tsx` (listing):

```typescript
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Animation Industry Insights | MAAC Jaipur",
  description: "Read the latest insights on animation, VFX, gaming, and digital media careers. Tips, tutorials, and industry news from MAAC Jaipur.",
  openGraph: {
    title: "Blog — Animation Industry Insights",
    description: "Latest insights on animation, VFX, gaming, and digital media.",
    url: "https://maacanimationjaipur.com/blog",
  },
};

const blogPosts = [
  {
    slug: "transitions-in-ux-design",
    title: "Transitions in UX Design",
    excerpt: "How smooth transitions enhance user experience in digital products",
    date: "2024-01-15",
    category: "UX Design",
  },
  // Add more posts as content is migrated from WordPress
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#E31837] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
            MAAC Blog
          </p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[#F0EBE1] mb-4">
            Animation Industry Insights
          </h1>
          <p className="text-[#A8A29C] text-lg max-w-2xl mx-auto">
            Expert articles on animation, VFX, gaming, and digital media careers.
          </p>
        </div>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-[#161616] rounded-xl p-8 border border-white/5">
              <p className="text-[#E31837] text-xs font-semibold tracking-wider uppercase mb-2">
                {post.category}
              </p>
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="font-display font-bold text-2xl text-[#F0EBE1] mb-2 hover:text-[#E31837] transition-colors">
                  {post.title}
                </h2>
              </Link>
              <p className="text-[#A8A29C] mb-4">{post.excerpt}</p>
              <time className="text-[#6B6560] text-sm">{post.date}</time>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
```

Create `src/app/blog/[slug]/page.tsx`:

```typescript
import { Metadata } from "next";
import { notFound } from "next/navigation";

// This would be replaced with a CMS or MDX files
const blogPosts: Record<string, { title: string; content: string; date: string; category: string }> = {
  "transitions-in-ux-design": {
    title: "Transitions in UX Design",
    content: "<p>Full blog post content goes here...</p>",
    date: "2024-01-15",
    category: "UX Design",
  },
};

interface BlogPostProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const post = blogPosts[params.slug];
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | MAAC Jaipur Blog`,
    description: post.content.replace(/<[^>]*>/g, "").slice(0, 160),
    openGraph: {
      title: post.title,
      type: "article",
      url: `https://maacanimationjaipur.com/blog/${params.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostProps) {
  const post = blogPosts[params.slug];
  if (!post) notFound();

  return (
    <article className="min-h-screen bg-[#0C0C0C] py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[#E31837] text-xs font-semibold tracking-wider uppercase mb-4">{post.category}</p>
        <h1 className="font-display font-bold text-4xl text-[#F0EBE1] mb-4">{post.title}</h1>
        <time className="text-[#6B6560] text-sm block mb-8">{post.date}</time>
        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
```

### ✅ Phase 4 Checklist

- [ ] `/student-work` page built
- [ ] `/demo-class` page built (with booking form)
- [ ] `/career-in-animation` page built
- [ ] `/blog` listing page built
- [ ] `/blog/[slug]` dynamic page built
- [ ] "Transitions in UX Design" content migrated
- [ ] All new pages have unique metadata
- [ ] `npm run build` succeeds

---

## PHASE 5: SEO Hardening

> **Goal:** Every SEO element verified and optimized before launch
> **Estimated time:** 3-5 hours

### Step 5.1: Verify All Structured Data

Every page must have appropriate JSON-LD:

| Page Type | Schema Types Required |
|-----------|----------------------|
| Homepage | LocalBusiness + EducationalOrganization + Review + BreadcrumbList |
| Course detail | Course + FAQPage + BreadcrumbList |
| About | Organization + EducationalOrganization |
| Placements | Organization + JobPosting |
| Contact | LocalBusiness + BreadcrumbList |
| Blog post | Article + BreadcrumbList |
| Gallery | ImageObject + BreadcrumbList |

### Step 5.2: Verify Open Graph Tags

Every page must have:
- `og:title` (unique per page)
- `og:description` (unique per page, 120-160 chars)
- `og:url` (canonical URL)
- `og:image` (1200x630 minimum)
- `og:type` (website or article)
- `og:locale` (en_IN)

### Step 5.3: Canonical Tags

Every page must have `<link rel="canonical">` pointing to its HTTPS URL.

### Step 5.4: Single H1 Per Page

Audit every page — ensure exactly ONE `<h1>` element. The WordPress site had dual H1s (a known issue).

### Step 5.5: Internal Linking Audit

Ensure all internal links point to valid Next.js routes. Update:
- Navbar links
- Footer links
- Any in-content links
- Floating CTA buttons

### ✅ Phase 5 Checklist

- [ ] All pages have correct JSON-LD structured data
- [ ] All pages have unique OG tags
- [ ] All pages have canonical URLs
- [ ] Every page has exactly one H1
- [ ] All internal links are valid (no 404s)
- [ ] robots.txt blocks WordPress junk
- [ ] sitemap.xml includes all valid URLs only

---

## PHASE 6: Pre-Launch Testing

> **Goal:** Test every URL, meta tag, and performance metric before going live
> **Estimated time:** 4-6 hours

### Step 6.1: Build and Test Locally

```bash
npm run build
npm start
```

### Step 6.2: URL Testing Script

Create `scripts/test-urls.mjs`:

```javascript
const urls = [
  // Core pages
  { url: "http://localhost:3000/", expected: 200 },
  { url: "http://localhost:3000/about", expected: 200 },
  { url: "http://localhost:3000/courses", expected: 200 },
  { url: "http://localhost:3000/placements", expected: 200 },
  { url: "http://localhost:3000/gallery", expected: 200 },
  { url: "http://localhost:3000/contact", expected: 200 },
  { url: "http://localhost:3000/student-work", expected: 200 },
  { url: "http://localhost:3000/demo-class", expected: 200 },
  { url: "http://localhost:3000/career-in-animation", expected: 200 },
  { url: "http://localhost:3000/blog", expected: 200 },
  // Course pages
  { url: "http://localhost:3000/courses/3d-animation", expected: 200 },
  { url: "http://localhost:3000/courses/vfx", expected: 200 },
  { url: "http://localhost:3000/courses/dfm", expected: 200 },
  // Old WordPress redirects
  { url: "http://localhost:3000/work", expected: 307 }, // Next.js dev mode uses 307
  { url: "http://localhost:3000/contact-us", expected: 307 },
  { url: "http://localhost:3000/3d-animation-course-in-jaipur", expected: 307 },
  { url: "http://localhost:3000/portfolio", expected: 307 },
  { url: "http://localhost:3000/cart", expected: 307 },
  { url: "http://localhost:3000/wp-admin", expected: 307 },
];

for (const { url, expected } of urls) {
  const res = await fetch(url, { redirect: "manual" });
  const status = res.status;
  const ok = status === expected || (expected === 307 && (status === 301 || status === 307));
  console.log(`${ok ? "✅" : "❌"} ${url} → ${status} (expected ${expected})`);
}
```

Run: `node scripts/test-urls.mjs`

### Step 6.3: Meta Tag Verification

Use browser dev tools or create a script to verify:
- `<title>` on every page
- `<meta name="description">` on every page
- `<meta property="og:*">` tags
- `<link rel="canonical">`
- `<script type="application/ld+json">` structured data

### Step 6.4: Core Web Vitals

Run Lighthouse on every page type:
- Homepage
- Course detail page
- Blog post
- Contact page
- Gallery

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Step 6.5: Mobile Testing

Test on:
- iPhone (Safari) — 375px, 414px
- Android (Chrome) — 360px, 412px
- iPad — 768px, 1024px
- Desktop — 1280px, 1920px

### ✅ Phase 6 Checklist

- [ ] All URLs return correct status codes
- [ ] All redirects work (old WordPress → new Next.js)
- [ ] All meta tags present and unique
- [ ] Lighthouse scores: Performance 90+, SEO 100
- [ ] Mobile responsive on all breakpoints
- [ ] No console errors in browser
- [ ] No 404s on any internal links
- [ ] Structured data validates (use Google Rich Results Test)

---

## PHASE 7: DNS Switch & Go-Live

> **Goal:** Switch from WordPress to Next.js with zero downtime
> **Estimated time:** 1-2 hours (during low-traffic hours)

### Step 7.1: Deploy Next.js to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

Or via GitHub:
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Step 7.2: Configure Custom Domain on Vercel

1. Go to Vercel → Project Settings → Domains
2. Add `maacanimationjaipur.com`
3. Add `www.maacanimationjaipur.com` (redirect to non-www)
4. Vercel will provide DNS records to configure

### Step 7.3: DNS Changes at GoDaddy

**Current DNS (WordPress on Unified Layer):**
```
Type: A      Name: @        Value: (Unified Layer IP)
Type: CNAME  Name: www      Value: maacanimationjaipur.com
Type: MX     Name: @        Value: (email MX records)
Type: TXT    Name: @        Value: (SPF/DKIM records)
```

**New DNS (Vercel):**
```
Type: A      Name: @        Value: 76.76.21.21          (Vercel)
Type: CNAME  Name: www      Value: cname.vercel-dns.com  (Vercel)
Type: TXT    Name: @        Value: (KEEP existing SPF/DKIM for email)
Type: MX     Name: @        Value: (KEEP existing MX for email)
```

**GoDaddy DNS Change Steps:**
1. Login to GoDaddy → My Products → DNS Management
2. Edit the A record for @ → change to `76.76.21.21`
3. Edit the CNAME for www → change to `cname.vercel-dns.com`
4. DO NOT change MX or TXT records (email must keep working)
5. Save changes

**DNS Propagation:** 1-48 hours (usually 1-4 hours)

### Step 7.4: SSL Certificate

Vercel automatically provisions SSL via Let's Encrypt. No action needed — it will activate once DNS propagates.

### Step 7.5: Force HTTPS

Vercel automatically redirects HTTP → HTTPS. No configuration needed.

### Step 7.6: Pre-Switch WordPress Backup

Before switching DNS:
1. Export WordPress database (phpMyAdmin → Export)
2. Download wp-content/uploads folder via FTP
3. Export Yoast SEO settings (for reference)
4. Take full cPanel backup

### ✅ Phase 7 Checklist

- [ ] Next.js deployed to Vercel production
- [ ] Custom domain configured on Vercel
- [ ] DNS records updated at GoDaddy
- [ ] MX/TXT records preserved (email working)
- [ ] SSL certificate active on Vercel
- [ ] WordPress backup created
- [ ] HTTP → HTTPS redirect working (via Vercel)
- [ ] Site loads on both www and non-www

### ⚠️ Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| DNS propagation slow | Lower TTL to 300 before change |
| Email breaks | DO NOT change MX records |
| SSL not ready | Vercel auto-provisions, wait up to 24hrs |
| Site breaks after switch | Keep WordPress hosting active for 30 days as rollback |
| Old bookmarks with HTTP | Vercel forces HTTPS redirect |

---

## PHASE 8: Post-Launch Monitoring

> **Goal:** Monitor SEO health, fix issues immediately, preserve rankings
> **Estimated time:** Ongoing (first week: 2-3 hours/day)

### Step 8.1: Google Search Console Actions

1. **Verify new property** (if not already verified):
   - Go to GSC → Add Property → `maacanimationjaipur.com`
   - Verify via DNS record (TXT) or HTML file

2. **Submit new sitemap:**
   - GSC → Sitemaps → Enter `sitemap.xml` → Submit

3. **Request indexing for key pages:**
   - GSC → URL Inspection → Enter URL → Request Indexing
   - Do this for ALL core pages:
     - `/`
     - `/about`
     - `/courses`
     - `/courses/3d-animation` (and all course pages)
     - `/placements`
     - `/gallery`
     - `/contact`
     - `/student-work`
     - `/demo-class`
     - `/career-in-animation`
     - `/blog`

4. **Monitor for errors daily (first 2 weeks):**
   - GSC → Pages → Check for "Not Found" errors
   - GSC → Pages → Check for "Submitted URL marked 'noindex'"
   - GSC → Sitemaps → Check for errors

### Step 8.2: 404 Monitoring

Create a custom 404 page (`src/app/not-found.tsx`):

```typescript
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center py-20">
      <div className="text-center max-w-lg px-4">
        <h1 className="font-display font-bold text-8xl text-[#E31837] mb-4">404</h1>
        <h2 className="font-display font-bold text-2xl text-[#F0EBE1] mb-4">Page Not Found</h2>
        <p className="text-[#A8A29C] mb-8">
          The page you&apos;re looking for may have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link href="/courses" className="btn border border-[#E31837]/30 text-[#E31837]">
            Browse Courses
          </Link>
          <a href="https://wa.me/917300001589" className="btn border border-white/20">
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
```

### Step 8.3: Google Analytics 4

1. Verify GA4 tracking code is firing on all pages
2. Set up conversion events:
   - Demo class form submission
   - Phone click
   - WhatsApp click
   - Email click

### Step 8.4: Rank Monitoring

Compare rankings 2 weeks before and 4 weeks after migration for:
- "animation institute in jaipur"
- "animation courses in jaipur"
- "vfx course in jaipur"
- "3d animation course jaipur"
- "gaming design course jaipur"
- "digital filmmaking course jaipur"
- "graphic design course jaipur"
- "maac jaipur"

### ✅ Phase 8 Checklist

- [ ] Google Search Console property verified
- [ ] New sitemap submitted
- [ ] All core pages indexed (URL Inspection → Request Indexing)
- [ ] Custom 404 page live
- [ ] GA4 tracking confirmed on all pages
- [ ] Conversion events set up in GA4
- [ ] GSC monitoring for 404s enabled
- [ ] Rank tracking baseline established

---

## PHASE 9: Cleanup

> **Goal:** Decommission WordPress, clean up hosting, finalize migration
> **Estimated time:** 1-2 hours (30 days after launch)

### Step 9.1: Wait 30 Days

Keep WordPress hosting active for 30 days after DNS switch to:
- Ensure all redirects still work (WordPress would catch any missed ones)
- Monitor GSC for any crawl errors
- Confirm all backlinks are preserved

### Step 9.2: Cancel WordPress Hosting

After 30 days of stable operation:
1. Login to Unified Layer / Newfold dashboard
2. Cancel hosting plan
3. Request confirmation of cancellation

### Step 9.3: Domain Management

1. **Renew domain** at GoDaddy (expires Feb 22, 2026 — set auto-renew)
2. **Enable domain privacy** if not already enabled
3. **Verify WHOIS info** is correct

### Step 9.4: WooCommerce Cleanup

WooCommerce pages are now 301-redirected to homepage. No further action needed.

### Step 9.5: Final GSC Audit

30 days post-launch:
1. Check GSC → Pages → Ensure 0 errors
2. Check GSC → Performance → Compare impressions/clicks with pre-migration
3. Check GSC → Sitemaps → Ensure all URLs indexed
4. Check GSC → Links → Ensure backlinks are preserved

### ✅ Phase 9 Checklist

- [ ] 30 days passed with no issues
- [ ] WordPress hosting cancelled
- [ ] Domain auto-renew enabled at GoDaddy
- [ ] Domain WHOIS info verified
- [ ] GSC audit complete — 0 errors
- [ ] Rankings stable or improved vs. pre-migration
- [ ] All backlinks preserved (check GSC → Links)

---

## 🚨 COMMON FAILURE SCENARIOS & RECOVERY

### Scenario 1: Rankings Drop After Migration

**Symptoms:** GSC shows drop in impressions/clicks within 1-2 weeks.

**Root Cause:** Usually caused by missing redirects or changed metadata.

**Recovery:**
1. Check GSC → Pages → look for 404 errors
2. For each 404, trace back to old WordPress URL
3. Add missing redirect
4. Request re-indexing in GSC
5. Rankings typically recover in 2-4 weeks

### Scenario 2: Pages Not Getting Indexed

**Symptoms:** New pages don't appear in Google after 2+ weeks.

**Root Cause:** robots.txt blocking, noindex tag, or sitemap issues.

**Recovery:**
1. GSC → URL Inspection → Enter URL → Check indexability status
2. Verify robots.txt allows the path
3. Verify no `noindex` meta tag
4. Verify canonical URL is correct
5. Click "Request Indexing"

### Scenario 3: Redirect Chain / Loop

**Symptoms:** Old URL redirects multiple times or loops.

**Root Cause:** Conflicting redirect rules.

**Recovery:**
1. `curl -I https://maacanimationjaipur.com/old-url` to trace chain
2. Remove conflicting rules from next.config.mjs or middleware.ts
3. Ensure each old URL has exactly ONE redirect destination
4. Test again with curl

### Scenario 4: SSL Certificate Issues

**Symptoms:** Browser shows "Not Secure" warning.

**Root Cause:** DNS not fully propagated or Vercel SSL provisioning failed.

**Recovery:**
1. Check Vercel → Project Settings → Domains → SSL status
2. If pending, wait up to 24 hours
3. If failed, remove and re-add domain
4. Ensure DNS A record points to correct Vercel IP

### Scenario 5: Email Stops Working After DNS Switch

**Symptoms:** Can't send/receive emails at domain.

**Root Cause:** MX records were accidentally changed.

**Recovery:**
1. Login to GoDaddy → DNS Management
2. Verify MX records point to email provider
3. If changed, restore original MX records
4. Email should resume within 1-4 hours

### Scenario 6: Build Fails in Production

**Symptoms:** `npm run build` fails on Vercel.

**Root Cause:** Environment variables not set or TypeScript errors.

**Recovery:**
1. Check Vercel deployment logs
2. Set missing environment variables in Vercel dashboard
3. Fix TypeScript errors locally
4. Push fix and redeploy

---

## 📅 MIGRATION TIMELINE

| Week | Phase | Activities |
|------|-------|-----------|
| Week 1 | Phase 1-2 | Domain fixes, redirects, config cleanup |
| Week 2 | Phase 3 | Build all course detail pages |
| Week 3 | Phase 4 | Build missing core pages (student-work, demo, blog, career) |
| Week 4 | Phase 5-6 | SEO hardening, pre-launch testing |
| Week 4 (end) | Phase 7 | DNS switch, go live |
| Week 5-6 | Phase 8 | Post-launch monitoring, GSC actions |
| Week 8+ | Phase 9 | Cleanup, WordPress shutdown |

---

## 📋 FINAL PRE-Launch CHECKLIST

```
[ ] Domain updated everywhere (maacanimationjaipur.com)
[ ] All 55+ redirects configured
[ ] robots.txt blocks WordPress junk
[ ] sitemap.xml includes only valid URLs
[ ] All course detail pages built
[ ] All missing core pages built
[ ] JSON-LD structured data on every page
[ ] OG tags unique per page
[ ] Canonical URLs set
[ ] Single H1 per page
[ ] Footer links all valid
[ ] Custom 404 page built
[ ] Lighthouse scores: Performance 90+, SEO 100
[ ] Mobile responsive on all breakpoints
[ ] No console errors
[ ] WordPress backup created
[ ] Next.js deployed to Vercel
[ ] DNS updated at GoDaddy
[ ] SSL active
[ ] GSC sitemap submitted
[ ] Key pages submitted for indexing
[ ] GA4 tracking confirmed
```

---

*This document is the master migration plan. Any changes during execution should be documented here for future reference.*
*Last updated: April 4, 2026*

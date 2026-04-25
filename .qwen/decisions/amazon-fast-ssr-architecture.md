# Amazon-Fast SSR/CDN-First Architecture Plan

**Date:** April 25, 2026
**Target:** MAAC Animation Jaipur Website (`maacanimationjaipur.com`)
**Goal:** Achieve sub-500ms load times, perfect Core Web Vitals, and maximum SEO crawlability by shifting from a heavy Client-Side Rendering (CSR) model to a Vercel-optimized Server-Side Rendering (SSR) and CDN-first architecture.

---

## 1. Executive Summary

Currently, the MAAC Jaipur Next.js 14 project is operating like a legacy React Single Page Application (SPA). An analysis reveals that **nearly 100% of the components in `src/components/` and `src/app/` are prefixed with `"use client"`**. 

This means the browser must download the HTML, download the massive JavaScript bundle (including React, Next.js client runtime, GSAP, Three.js, Lucide, and all content components), parse it, and execute it *before* the user can interact with the page or see content like the Footer, FAQs, or Course descriptions.

To make this site "Amazon-fast" (load instantly regardless of device or network), we must adopt a **"Server-First, Client-Second"** architecture. We will leverage React Server Components (RSC) to render the HTML instantly from the Vercel Edge CDN, and only hydrate tiny "islands" of interactivity (like the Three.js background or GSAP scroll triggers) on the client.

## 2. Current Architecture Bottlenecks

1. **Pervasive `"use client"` Usage:** Components like `Footer.tsx`, `FAQSection.tsx`, `IndustryPartners.tsx`, and `TrustBadges.tsx` have zero need for browser state but are wrapped in `"use client"`. This inflates the initial JS payload drastically.
2. **Monolithic Page Hydration:** `src/app/page.tsx` immediately imports `HomePageClient.tsx`, which dynamically loads all other client components. This blocks the main thread.
3. **Heavy Render-Blocking Assets:** GSAP animations and the WebGL (Three.js) `DynamicBackground.tsx` initialize immediately, fighting with core content for CPU resources.
4. **Static Content as JS Code:** Data from `src/data/siteData.ts` is imported into client components, meaning the actual text content of the site is being shipped as JavaScript code rather than raw, instantly-parseable HTML.

---

## 3. The "Amazon-Fast" Vercel Architecture (The Solution)

### A. React Server Components (RSC) by Default
We will strip `"use client"` from 80-90% of the codebase. 
*   **Server Components:** Layouts, Headers, Footers, Typography, Grids, and static text content (e.g., Course details, Blog posts, FAQs, Partner logos).
*   **Client Components (The "Islands"):** Only components that require `useState`, `useEffect`, `onClick`, or `window/document` access.

### B. The "Animation Wrapper" Pattern (Decoupling GSAP)
Instead of making an entire section (like `PopularCourses.tsx`) a client component just to use `gsap.from()`, we will extract the animation logic into generic, reusable wrapper components.

**Before (Slow):**
```tsx
"use client";
import { useGSAP } from "@gsap/react";
export default function PopularCourses() {
  useGSAP(() => { /* animate */ });
  return <div>{/* 100 lines of static course data */}</div>;
}
```

**After (Amazon-Fast):**
```tsx
// Server Component (RSC)
import ScrollFadeIn from "@/components/ui/animations/ScrollFadeIn";
export default function PopularCourses() {
  return (
    <ScrollFadeIn>
      <div>{/* 100 lines of static course data shipped as pure HTML */}</div>
    </ScrollFadeIn>
  );
}
```

### C. Vercel CDN Edge Caching & Static Generation
*   **`generateStaticParams`:** Ensure all `/courses/[slug]` and `/blog/[slug]` routes use `generateStaticParams` so they are pre-built as static HTML (`.html`) files at build time, instantly served from Vercel's Global Edge Network.
*   **Incremental Static Regeneration (ISR):** Use `export const revalidate = 3600;` (already present in some files but blocked by client boundaries) so Vercel caches the HTML and rebuilds it in the background without making the user wait.

### D. Asset Streaming & Suspense boundaries
We will leverage React `<Suspense>` to stream heavy assets *after* the First Contentful Paint (FCP).
*   The text, navigation, and static images should load in `< 500ms`.
*   The heavy `DynamicBackground` (Three.js) and the Hero Video should be wrapped in `<Suspense fallback={<StaticGradient />}>` so they don't delay the main content rendering.

---

## 4. Step-by-Step Implementation Plan

### Phase 1: The Great "De-Clienting"
1. Remove `"use client"` from `src/app/page.tsx` (if present) and `src/app/layout.tsx` wrappers.
2. Remove `"use client"` from purely static presentational components:
   *   `Footer.tsx`
   *   `IndustryPartners.tsx`
   *   `CourseCategories.tsx`
   *   `PopularCourses.tsx`
   *   `FAQSection.tsx` (convert accordions to use HTML `<details>`/`<summary>` or isolate the click state to a tiny Client Component `<AccordionItem>`).
   *   `TrustBadges.tsx`
   *   `Awards.tsx`

### Phase 2: Implementing the Island Architecture
1. Create `src/components/animations/` folder.
2. Create reusable client components: `<FadeInUp>`, `<StaggerChildren>`, `<ScrollReveal>`.
3. Wrap the static Server Components from Phase 1 with these new animation islands.

### Phase 3: Data & Media Optimization
1. **Next/Image Optimization:** Ensure all images use `next/image` with `sizes` attributes properly defined (already mostly done, but verify across all new Server Components).
2. **Video Streaming:** The hero videos (`hero-video-compressed.mp4` and `intro.mp4`) are large. Move the `MAACXHero` video into a lazy-loaded client component wrapper so the rest of the HTML isn't waiting on it.
3. **Third-Party Scripts:** Move Google Analytics and Speed Insights to use the `@next/third-parties/google` package to ensure they load off the main thread.

### Phase 4: Vercel Infrastructure Alignment
1. **Edge Runtime:** For simple API routes (like the contact form), consider switching to the `edge` runtime for lower latency (`export const runtime = 'edge'`).
2. **Caching Headers:** Verify the `next.config.mjs` caching headers are successfully being applied on Vercel deployments. The current config has aggressive 1-year caching for images and videos, which is excellent.

## Conclusion

By adopting this Server-First architecture, the MAAC Jaipur website will experience a dramatic reduction in Time to First Byte (TTFB) and First Contentful Paint (FCP). The Vercel CDN will be able to serve the entire site as pre-rendered, lightweight HTML documents, achieving the "Amazon-fast" responsiveness required for high-conversion performance, while preserving the premium "Awwwards-style" animations via selective client-side hydration.
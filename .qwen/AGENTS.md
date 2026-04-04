# AGENTS.md — Project Context & Configuration

## Project: MAAC Animation Jaipur Website
- **Type:** Next.js 14 (App Router)
- **Domain:** maacanimationjaipur.com
- **Deployment:** Vercel (planned)
- **Migration:** WordPress → Next.js

## Current State

### Built Pages (7)
- `/` — Homepage
- `/about` — About page
- `/courses` — Courses listing
- `/placements` — Placements page
- `/gallery` — Gallery page
- `/contact` — Contact page
- `/locations/malviya-nagar` — Location page

### Missing Pages (Need to Build)
- `/student-work` — Student work showcase
- `/demo-class` — Free demo class booking
- `/career-in-animation` — Career guide
- `/blog` — Blog listing
- `/blog/[slug]` — Blog post detail
- `/courses/[slug]` — 19 individual course detail pages
- `/privacy-policy` — Privacy policy
- `/terms-of-service` — Terms of service

### Critical Issues
1. Domain is `maacjaipur.com` everywhere — must be `maacanimationjaipur.com`
2. Zero redirects configured
3. Phantom URL in sitemap (`/locations/vaishali-nagar`)
4. Footer has dead links to non-existent routes

## Tech Stack
- Next.js 14.2.35
- React 18
- TypeScript
- Tailwind CSS
- GSAP (animations)
- Lenis (smooth scroll)
- Zustand (state management)
- TanStack React Query

## Data Files
- `src/data/siteData.ts` — Site-wide data (contact info, testimonials, etc.)
- `src/data/courses.ts` — Course data (created as part of migration)

## Key Components
- `src/components/Footer.tsx` — Has dead links (needs fix)
- `src/components/Navbar.tsx` — Navigation
- `src/components/FloatingCTA.tsx` — WhatsApp/phone CTA
- `src/components/courses/*` — Course detail components (created as part of migration)

## Migration Plan
See `.qwen/migration-plan.md` for the complete 9-phase migration plan.

## Session Continuity
Last session: April 4, 2026 — Created comprehensive migration plan, course components, and .qwen/ brain structure.

Next steps: Begin Phase 1 (Foundation Fixes) — update domain, fix sitemap, fix robots.ts, fix footer.

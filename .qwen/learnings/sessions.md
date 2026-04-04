# Session Learnings — SEO Migration Planning

## Session: April 4, 2026
### Topic: WordPress → Next.js SEO Migration Plan for maacanimationjaipur.com

### Key Findings
1. **Domain mismatch**: Current Next.js project uses `maacjaipur.com` everywhere — must change to `maacanimationjaipur.com` in 4 files
2. **Zero redirects**: No `async redirects()` in next.config.mjs, no middleware.ts — all 55+ WordPress URLs would 404
3. **Phantom URL**: sitemap.ts lists `/locations/vaishali-nagar` which doesn't exist
4. **Footer dead links**: Footer links to `/courses/animation`, `/courses/vfx`, etc. → all 404
5. **Missing pages**: No student-work, demo-class, blog, career-in-animation, or individual course detail pages
6. **No middleware.ts**: No request interception for wildcard WordPress path patterns

### Decisions Made
1. Use `next.config.mjs` `async redirects()` for all explicit redirects (more maintainable than middleware for this use case)
2. Build dynamic `[slug]` route for course pages with `generateStaticParams()` for SSG
3. Create comprehensive course data file (`src/data/courses.ts`) as single source of truth
4. Keep WordPress hosting active for 30 days post-launch as safety net
5. Use middleware.ts as alternative if redirects array becomes too large

### Next Steps
- Start with Phase 1 (foundation fixes)
- Build course data file first, then dynamic route
- Test all redirects locally before DNS switch

### Risks Identified
- WordPress content needs to be scraped/exported for course page body copy
- OG images need to be created per course page (or use template)
- Blog content migration from WordPress needs manual effort

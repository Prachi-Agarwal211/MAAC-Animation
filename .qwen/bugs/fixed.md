# Fixed Bugs & Known Issues

## Bug: Domain Mismatch — maacjaipur.com vs maacanimationjaipur.com
**Date Found:** April 4, 2026
**Severity:** Critical
**Status:** 🟡 Identified, pending fix

**Description:**
The Next.js project uses `maacjaipur.com` as the domain in 4 locations:
- `src/app/layout.tsx` (metadataBase)
- `src/app/robots.ts` (sitemap URL)
- `src/app/sitemap.ts` (base URL)
- `.env.example` (NEXT_PUBLIC_SITE_URL)

The correct domain is `maacanimationjaipur.com`.

**Root Cause:**
Project was initially scaffolded with the wrong domain.

**Solution:**
Update all 4 references to `maacanimationjaipur.com`.

**Prevention:**
Always verify domain against live production site before scaffolding.

---

## Bug: Zero 301 Redirects
**Date Found:** April 4, 2026
**Severity:** Critical
**Status:** 🟡 Identified, pending fix

**Description:**
No redirects configured in next.config.mjs or middleware.ts. All 55+ WordPress URLs would return 404.

**Root Cause:**
Redirects were never implemented during initial Next.js development.

**Solution:**
Add comprehensive redirect rules to next.config.mjs `async redirects()` or create middleware.ts.

**Prevention:**
Always audit old CMS URLs before launching new site.

---

## Bug: Phantom URL in Sitemap
**Date Found:** April 4, 2026
**Severity:** High
**Status:** 🟡 Identified, pending fix

**Description:**
sitemap.ts lists `/locations/vaishali-nagar` which doesn't exist as a page. This would cause 404 for crawlers.

**Root Cause:**
Sitemap was generated assuming both location pages would exist.

**Solution:**
Remove vaishali-nagar entry from sitemap.ts until page is built.

**Prevention:**
Audit sitemap URLs against actual existing pages before deploy.

---

## Bug: Footer Dead Links
**Date Found:** April 4, 2026
**Severity:** High
**Status:** 🟡 Identified, pending fix

**Description:**
Footer "Our Courses" section links to `/courses/animation`, `/courses/vfx`, `/courses/gaming`, `/courses/filmmaking`, `/courses/digital-media`, `/courses/architectural` — none of which exist.

Also, "Quick Links" includes `/locations/vaishali-nagar` which doesn't exist.

**Root Cause:**
Footer was built with placeholder routes that were never created.

**Solution:**
Update footer links to point to actual course detail routes (e.g., `/courses/3d-animation`).

**Prevention:**
Run link checker on every build.

---

## Bug: WordPress SEO Issues (Pre-Migration)
**Date Found:** April 4, 2026
**Severity:** Medium
**Status:** 🟢 Will be resolved by migration

**Description:**
Live WordPress site has multiple SEO issues:
- Weak page titles (e.g., "Home animation institute in jaipur")
- Empty meta descriptions (e.g., /contact-us/ has NO meta description)
- Duplicate H1 tags on multiple pages
- Orphan content with Latin placeholder text
- HTTP URLs in sitemap instead of HTTPS
- OG images using HTTP URLs
- WooCommerce pages are indexable

**Root Cause:**
Poor Yoast SEO configuration and abandoned demo content.

**Solution:**
Next.js migration fixes all of these with proper metadata, structured data, and HTTPS.

---

## Bug: No HTTP-to-HTTPS Redirect on WordPress
**Date Found:** April 4, 2026
**Severity:** Medium
**Status:** 🟢 Will be resolved by migration

**Description:**
HTTP serves content directly without redirecting to HTTPS. Mixed content warnings.

**Root Cause:**
Unified Layer hosting doesn't enforce HTTPS by default.

**Solution:**
Vercel automatically forces HTTPS redirect.

---

## Bug: 180+ Console Errors Per Page (WordPress)
**Date Found:** April 4, 2026
**Severity:** Low
**Status:** 🟢 Will be resolved by migration

**Description:**
Live WordPress site generates 180+ console errors per page load.

**Root Cause:**
Plugin conflicts, deprecated scripts, mixed content.

**Solution:**
Next.js build has clean console output.

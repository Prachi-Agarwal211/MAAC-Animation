# MAAC Jaipur — Full Responsive + Container Layout Fix Plan (Deep Audit)

**Date:** April 2026 (current session)  
**Scope:** Complete audit of every page + all layout-heavy components for container inconsistency, tablet grid failures, large-desktop scaling, touch/hover bugs, and crude device detection.  
**Goal:** Make the site look excellent and consistent on **phones, tablets (iPad etc.), laptops, and true large desktops (1920px / 2K / 4K+)** without breaking anything.

---

## Executive Summary of Problems Found

After reading **every page** and **26+ files** with container/grid logic, the issues are systemic:

### 1. Inconsistent Container Widths (Biggest Desktop Problem)
The site has **no single source of truth**. Content "jumps" between narrow and wide on large monitors.

**Current chaos:**
- `max-w-7xl` (1280px) — used by Navbar, most homepage sections, gallery, events, courses, about, student-work, awards, placements header, etc. (too narrow on 1920px+)
- `max-w-[1400px]` — InstituteIntro, FAQSection
- `max-w-[1600px]` — StudentShowcase main, BentoGallery, About faculty grid
- `max-w-[1700px]` — VerticalCardGallery
- `max-w-[1800px]` — Hero, Footer, TrustBadges, IndustryPartners, Contact hero/grid
- Special cases: events uses `max-w-5xl` + `max-w-[1280px]`, privacy uses `max-w-3xl` (correct for text)

**Result on "proper desktop":** Sections misalign, some look cramped, others have huge wasted side space. Navbar especially fights the wider hero/footer.

### 2. VerticalCardGallery — Multiple Hard Breakages
File: `src/components/VerticalCardGallery.tsx`

- **Math error (lines 218 + 348):** `lg:w-[48%]` + `lg:w-[55%]` (with gap) = >100%. `xl:w-[50%]` + `xl:w-[50%]` still tight.
- Complex sticky + absolute SVG labels + timeline (lines 304-340) use hardcoded px + viewBox % math → labels misalign on large/ultra-wide screens.
- `min-h-[100vh]` + `calc(100vh-...)` + sticky fights Lenis on large viewports.

### 3. Tablet Grid Cramping (768px–1024px / iPad range)
- BentoGallery: `md:grid-cols-4` → ~180-200px cards on tablet (text/images die).
- StudentSuccessStories stats: `md:grid-cols-4`.
- Placements: `lg:grid-cols-7` (second row capped at 1100px).
- Many other grids jump awkwardly (no proper tablet handling).

### 4. Broken Touch / Hover on Tablets
- CourseCategories (`SlideUpCard`): `isTouchDevice` check runs directly in render body using `window.matchMedia` (not reactive). `clipPath` circle reveal never shows full content on touch devices.
- Many glass-card hovers, kinetic effects, etc. have zero touch equivalent.

### 5. Crude Device Detection (768/1024px walls)
- DynamicBackground: `< 1024` disables Three.js entirely.
- ContactModal, ClientShell, SplitTextReveal, MagneticButton, animationConfig, lenis.ts, CustomCursor all have similar hard cuts.
- Affects tablets + some laptops + behavior on large desktops.

### 6. Large Desktop Scaling Disasters
- Awards (KineticAwardsRows): `text-[10vw]` → 256px tall text on 2560px monitors.
- Navbar logo: up to `w-56 h-56` (224px) non-scrolled.
- Dozens of `text-[8px]`–`text-[11px]` labels that stay microscopic.
- No `2xl:` or `3xl:` handling anywhere (Tailwind stops at 1536px).

### 7. Other Pages (Full Sweep Completed)
- **/events**: Uses `max-w-5xl` + `max-w-[1280px]` (inconsistent with homepage).
- **/gallery**: `max-w-7xl` + `xl:grid-cols-4` (grid is actually decent).
- **/about**: Mix of `max-w-7xl` + `max-w-[1600px]` for faculty.
- **/contact**: Heavy use of `max-w-[1800px]`.
- **/student-work**: `max-w-7xl` wrapper around PortfolioGallery (`xl:grid-cols-4` — good).
- **/courses + [slug]**: Delegates to shared components (inherits problems).
- **/annual-trip**: Full-screen slideshow (different pattern, mostly okay but needs container review for controls).
- **/blog + [slug]**, legal pages: Mostly fine (text content uses sensible `max-w-3xl` or similar).
- **Course detail pages** (inside CoursesClient / Course* components): Mix of `max-w-7xl`, `max-w-5xl`, `max-w-4xl`.

Phone works (lots of explicit mobile fallbacks). Laptop (1366-1600px) is the accidental "sweet spot". Everything else is broken or lucky.

---

## Recommended Solution Strategy

### Canonical Container Decision (Critical First Step)
**Proposal: Standardize on `max-w-[1600px]` everywhere it makes sense for wide content.**

**Rationale (after full audit):**
- Already used successfully in StudentShowcase, BentoGallery, About faculty.
- Gives proper breathing room on 1920px+ desktops.
- Not as aggressive as 1800px (which can feel stretched on 1920px monitors).
- Navbar can stay slightly narrower or match (we'll decide during implementation).

**Better long-term:** Add to Tailwind + CSS var for single source of truth.

In `tailwind.config.ts`:
```ts
theme: {
  extend: {
    maxWidth: {
      'content': '1600px',
    }
  }
}
```

In `globals.css`:
```css
:root {
  --content-max-width: 1600px;
}
```

Then use `max-w-content` (or keep `max-w-[1600px]` for now to minimize diff).

**Padding consistency rule:** Standardize to `px-6 md:px-8 lg:px-12 xl:px-16` (or similar) across wide sections.

### Safety Rules (To Not Fuck Anything Up)
1. Never change layout of legal/blog text pages (they use correct narrow containers).
2. Annual-trip slideshow is mostly self-contained — only touch container on its chrome if needed.
3. For complex components (VerticalCardGallery especially): small, reviewable diffs only.
4. Introduce the new container token **first**, then mechanical normalization, then tricky component fixes.
5. After every phase: `npm run build` must pass cleanly.
6. Prioritize visual regression safety over "perfect" on first pass.

---

## Phased Implementation Plan (Safest → Complete)

### Phase 0: Foundation (Do This First — Low Risk)
- Add `max-w-content` (1600px) to Tailwind + `--content-max-width` CSS var in globals.css.
- Add a couple of 2xl utility improvements in globals.css (optional large-screen breathing).
- Update Navbar logo sizing logic (make it respect container + cap the huge non-scrolled size).
- **Files touched:** `tailwind.config.ts`, `src/app/globals.css`, `src/components/Navbar.tsx`

### Phase 1: Core Homepage Components (Highest Impact)
Fix the things users see immediately on landing.

1. **VerticalCardGallery** (highest priority)
   - Fix percentage widths (make left/right add to <100% with proper gap handling, or switch to flex with max-widths).
   - Make absolute label + timeline positioning more robust (use `clamp` or container queries or simpler flex layout on ultra-wide).
   - Add `2xl:` tweaks for very large screens.

2. **BentoGallery**
   - Change `md:grid-cols-4` → `md:grid-cols-3 xl:grid-cols-4` (or `lg:grid-cols-3 xl:grid-cols-4`).

3. **StudentSuccessStories**
   - Stats bar: `md:grid-cols-4` → `md:grid-cols-2 lg:grid-cols-4`.

4. **Placements**
   - Cap the 7-col grid earlier: `lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7`.
   - Fix the second row max-width inconsistency.

5. **CourseCategories**
   - Fix `isTouchDevice` properly: move to `useState` + `useEffect` + listen to resize.
   - Provide a touch-friendly fallback (tap to reveal full description instead of relying on hover clipPath).

6. **Other homepage sections** (InstituteIntro, FAQ, CareerCreatorComparison, Awards, etc.)
   - Normalize all to `max-w-content` (1600px).
   - Fix Awards `text-[10vw]` → `text-[clamp(2.5rem,6vw,6rem)]` or similar.

**Files:** All the components listed above + homepage if needed.

### Phase 2: Shared + High-Traffic Components
- TrustBadges, IndustryPartners, Footer, ApplyNow, Testimonials, PopularCourses, MAACEvents → normalize containers.
- Fix any remaining hover/touch or grid issues.

### Phase 3: Full Page Sweep (All Other Routes)
- `/events` — normalize its 1280px/5xl containers to the new standard where appropriate.
- `/gallery` — mostly good, just align hero/container.
- `/about` — normalize + faculty grid.
- `/contact` — normalize 1800px areas (or keep slightly wider if intentional).
- `/student-work` + PortfolioGallery — align wrapper.
- `/courses` (CoursesClient + all Course* subcomponents) — sweep for consistency.
- `/annual-trip` — light review of any fixed containers around the slideshow.
- Blog + legal pages — **leave alone** (they are intentionally narrower for readability).

### Phase 4: Device Detection & Behavior Cleanup (Important for Tablets + Large Desktops)
- Create a small centralized `useBreakpoint` hook (or constants in `lib/utils`).
- Update:
  - DynamicBackground (1024px wall)
  - ContactModal
  - ClientShell modal delay
  - Any others using raw `innerWidth < 768/1024`
- Make CourseCategories touch detection use the new hook.

### Phase 5: Large Desktop Polish + 2xl+ Rules
- Add targeted `2xl:` classes where content currently looks too tight or too loose.
- Ensure no text or elements explode or stay microscopic.
- Test navbar + floating actions on 2560px+.

### Phase 6: Verification & Documentation
- Full `npm run build`.
- Manual checklist (phone, iPad portrait/landscape, 1366px laptop, 1920px desktop, 2560px).
- Update `DESIGN-AUDIT-REPORT.md` or create a "Fixes Applied" note.
- Optional: add a small comment in globals.css documenting the new container system.

---

## Exact File Change Inventory (Post-Audit)

**High Priority (must fix for "proper desktop + tablet"):**
- `src/components/VerticalCardGallery.tsx`
- `src/components/BentoGallery.tsx`
- `src/components/StudentSuccessStories.tsx`
- `src/components/Placements.tsx`
- `src/components/CourseCategories.tsx` (SlideUpCard)
- `src/components/Awards.tsx` + `src/components/ui/KineticAwardsRows.tsx`
- `src/components/Navbar.tsx` (container + logo)
- `tailwind.config.ts` + `src/app/globals.css` (token)

**Medium (normalization sweep):**
- `src/components/hero/MAACXHero.tsx`
- `src/components/Footer.tsx`
- `src/components/TrustBadges.tsx`
- `src/components/IndustryPartners.tsx`
- `src/components/InstituteIntro.tsx`
- `src/components/FAQSection.tsx`
- `src/components/StudentShowcase.tsx`
- `src/components/PopularCourses.tsx`
- `src/components/ApplyNow.tsx`
- `src/components/Testimonials.tsx`
- `src/components/CareerCreatorComparison.tsx`
- `src/components/MAACEvents.tsx`
- `src/components/Course*` (various in `components/courses/`)

**Pages:**
- `src/app/events/page.tsx`
- `src/app/gallery/GalleryClient.tsx`
- `src/app/about/AboutClient.tsx`
- `src/app/contact/ContactClient.tsx`
- `src/app/courses/CoursesClient.tsx` + course subcomponents
- `src/app/student-work/page.tsx`
- `annual_trip_page.tsx` (light touch)
- `src/app/animation-institute-jaipur/page.tsx`

**Leave mostly alone:**
- Blog pages, privacy-policy, terms-of-service (text content).

**Device logic files to touch in Phase 4:**
- `src/components/ui/DynamicBackground.tsx`
- `src/components/ContactModal.tsx`
- `src/components/ClientShell.tsx`
- `src/lib/animationConfig.ts`, `src/lib/lenis.ts`, etc. (review only)

---

## Testing & Safety Checklist (Mandatory)

Before any merge:
- [ ] `npm run build` succeeds with zero errors/warnings.
- [ ] No horizontal scroll introduced on any breakpoint.
- [ ] Visual check matrix:
  - iPhone SE / modern phone (portrait + landscape)
  - iPad (9.7", 11", 12.9") portrait + landscape
  - 1366px laptop
  - 1920px desktop
  - 2560px+ (if possible)
- [ ] Touch interactions work on real or simulated tablet (CourseCategories reveals, all cards).
- [ ] Sticky/pinned sections (VerticalCardGallery) still work on desktop.
- [ ] Large text (awards, hero) does not explode or clip.
- [ ] Navbar logo + links remain usable on all sizes.
- [ ] No regression in existing mobile experience.

---

## Recommended First Action (After You Approve)

1. Implement Phase 0 (token + Navbar logo safety).
2. Then Phase 1 (the 6 critical homepage components) — one or two at a time with build checks.
3. You review after each mini-phase.

This plan was created only after reading the full current state of **every page and component** in the project as of this session. Nothing was assumed from old reports.

---

**Status:** Ready for your approval / adjustments on container width + execution order before any code changes are made.

Let me know the go-ahead (and any preferences on 1600px vs another value) and we will execute carefully and completely.
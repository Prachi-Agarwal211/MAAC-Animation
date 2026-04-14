# MAAC Jaipur Website - Deep UI/UX Structure Analysis & Issues Report

**Date:** April 9, 2026  
**Scope:** Complete frontend architecture, performance, and UX analysis  
**Files Analyzed:** 40+ components, styles, and configuration files

---

## Executive Summary

The website has **significant structural issues** across all sections. Code is dispersed, inconsistently organized, and lacks proper optimization strategies. The most critical problems are:

1. **Loading screen doesn't prioritize video** - intro video loads sequentially, not instantly
2. **Header has UI issues** - Apply Now button is too large, MAAC Jaipur text needs removal
3. **Hero video has no guaranteed loading** - no preload, no connection-aware strategy
4. **All sections have structural problems** - scattered z-indices, inconsistent error handling, duplicate logic

---

## 1. LOADING SCREEN ANALYSIS

### Current Implementation

**Files Involved:**
- `src/app/loading.tsx` - Next.js route loading spinner
- `src/components/hero/MAACXHero.tsx` - Cinematic intro overlay

**How It Works Now:**

1. **Route Loading (`loading.tsx`):**
   - Bare spinning ring with red animated border
   - No branding, no context, no progress indication
   - Only shows during route transitions (page navigation)

2. **Cinematic Intro Overlay (`MAACXHero.tsx`):**
   - Fullscreen video overlay (`z-[9999]`) plays `/intro.webm` or `/intro.mp4`
   - 8-second GSAP progress bar animation
   - Auto-skips on: mobile (<1024px), returning visitors, prefers-reduced-motion
   - "Skip Experience" button appears after 2.5 seconds
   - On error, falls back to spinner with "Initialising Vision" text
   - Dispatches `maac:intro_revealed` event when done

### Critical Issues

| Issue | Severity | Impact |
|-------|----------|--------|
| **No instant video loading** | HIGH | Video loads sequentially with page, not prioritized |
| **No preload tags** | HIGH | Browser doesn't discover video until component mounts |
| **No connection detection** | HIGH | Documented as "fixed" but code is missing |
| **Intro video blocks hero video** | MEDIUM | Two videos compete for bandwidth |
| **No loading progress feedback** | MEDIUM | Users don't know what's loading |

### What You Want vs. What Exists

**Current Flow:**
```
Page Request → Basic Spinner → Component Mount → Intro Video Download → Intro Play → Hero Video Download → Hero Play
```

**Desired Flow:**
```
Page Request → Instant Video Load (Hero) → Page Interactive → Other Sections Load in Background
```

### Recommended Solution

1. **Add preload tags in `<head>`:**
   ```html
   <link rel="preload" as="video" href="/hero-video-compressed.mp4" type="video/mp4" />
   <link rel="preload" as="video" href="/hero-video.webm" type="video/webm" />
   ```

2. **Implement connection-aware loading:**
   ```javascript
   const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
   if (connection.saveData || connection.effectiveType === 'slow-2g') {
     // Skip intro, load poster only
   }
   ```

3. **Prioritize hero video with `fetchpriority="high"`:**
   ```jsx
   <video preload="auto" fetchPriority="high" />
   ```

4. **Lazy-load other sections after hero is visible**

---

## 2. HEADER / NAVBAR ANALYSIS

### Current Structure

**File:** `src/components/Navbar.tsx`

**Layout:**
```
[Logo Container] [Nav Links - Center] [Apply Now Button - Right]
```

### Issues Found

#### Issue 1: Apply Now Button Too Big

**Current Code:**
```tsx
<Link href="/demo-class" 
  className="hidden md:flex btn btn-primary px-8 py-3 rounded-full 
             text-[11px] font-bold tracking-[0.2em]">
  Apply Now
</Link>
```

**Problems:**
- `px-8 py-3` creates a large button
- `text-[11px]` with wide tracking makes it look disproportionate
- Button stands out too much, doesn't match design system proportions

**Recommended Fix:**
```tsx
<Link href="/demo-class" 
  className="hidden md:flex btn btn-primary px-6 py-2 rounded-full 
             text-[10px] font-bold tracking-[0.15em]">
  Apply Now
</Link>
```

#### Issue 2: MAAC Jaipur Text Should Be Removed

**Current Code:**
```tsx
<span className="block text-white font-display font-black text-xl leading-none tracking-tighter">MAAC</span>
<span className="block text-[#E31837] text-[10px] font-bold tracking-[0.3em] uppercase mt-1">JAIPUR</span>
```

**Location:** Lines ~100-101 in Navbar.tsx  
**Visibility:** Hidden on mobile (`hidden lg:block`), visible on desktop

**Recommended Fix:**
Simply remove these two span elements. Keep only the logo image (`/image.png`).

#### Issue 3: Logo Files Are Messy

**Files in `/public/`:**
- `/image.png` - Currently used (40x40)
- `/maac-logo.png` - Unused
- `/images/maac-logo.jpg` - Unused

**Impact:** Wasted bandwidth, confusion

**Recommended Fix:**
- Delete unused logo files
- Optimize `/image.png` if possible

---

## 3. HERO SECTION & VIDEO LOADING

### Current Implementation

**File:** `src/components/hero/MAACXHero.tsx`

**Video Setup:**
```tsx
<video
  loop
  playsInline
  muted={isMuted}
  poster="/hero-poster.jpg"
  ref={videoRef}
>
  <source src="/hero-video.webm" type="video/webm" />
  <source src="/hero-video-compressed.mp4" type="video/mp4" />
</video>
```

### Critical Issues

| Issue | Severity | Description |
|-------|----------|-------------|
| **No `preload` attribute** | HIGH | Browser decides buffering strategy |
| **No `<link rel="preload">` in head** | HIGH | Video discovered late |
| **Three videos compete** | HIGH | Intro + Hero WebM + Hero MP4 all download |
| **No connection detection** | HIGH | Slow connections still try to load everything |
| **Silent play errors** | MEDIUM | `catch(() => {})` swallows autoplay policy errors |

### Recommended Solution (Compulsory Video Loading)

```tsx
// In layout.tsx or hero component
<head>
  <link rel="preload" as="video" href="/hero-video-compressed.mp4" type="video/mp4" />
  <link rel="preload" as="image" href="/hero-poster.jpg" />
</head>

// In MAACXHero.tsx
<video
  preload="auto"
  loop
  playsInline
  muted={isMuted}
  poster="/hero-poster.jpg"
  ref={videoRef}
  fetchPriority="high"
>
  <source src="/hero-video.webm" type="video/webm" />
  <source src="/hero-video-compressed.mp4" type="video/mp4" />
</video>
```

**Connection-Aware Strategy:**
```tsx
useEffect(() => {
  const connection = navigator.connection;
  if (connection) {
    if (connection.saveData || connection.effectiveType === 'slow-2g') {
      // Skip intro, show poster only
      setSkipIntro(true);
      setLowBandwidth(true);
    }
  }
}, []);
```

---

## 4. ALL SECTIONS - STRUCTURAL ISSUES

### Homepage Section Order

```
1. MAACXHero (with ErrorBoundary)
2. VerticalCardGallery (with ErrorBoundary)
3. BeyondReality (with ErrorBoundary, no SSR)
4. InstituteIntro (with ErrorBoundary)
5. CareerCreatorComparison (with ErrorBoundary)
6. BentoGallery
7. CourseCategories
8. IndustryPartners
9. PopularCourses
10. StudentShowcase (no SSR)
11. Testimonials
12. Awards
13. Placements
14. ApplyNow
15. FAQSection
16. Footer
```

### Issue 1: Inconsistent Error Boundary Usage

**Sections WITH ErrorBoundary:**
- Hero, VerticalCardGallery, BeyondReality, InstituteIntro, CareerCreatorComparison, StudentShowcase

**Sections WITHOUT ErrorBoundary:**
- BentoGallery, CourseCategories, IndustryPartners, PopularCourses, Testimonials, Awards, Placements, ApplyNow, FAQSection, Footer

**Impact:** If any unprotected section crashes, it takes down the entire page tree below it.

**Recommended Fix:** Wrap ALL sections in ErrorBoundary or create a higher-order wrapper.

---

### Issue 2: Scattered Z-Index Layering

| Section | Z-Index | Special Properties |
|---------|---------|-------------------|
| Hero Content | `z-10` | - |
| VerticalCardGallery | `z-10` | - |
| InstituteIntro | `z-20` | `-mt-20`, `rounded-t-[40px]` |
| CourseCategories | `z-10` | - |
| Placements | `z-10` | - |
| ApplyNow | `z-20` | - |

**Problem:** Negative margins and overlapping z-indices create:
- Click-through issues
- Scroll synchronization problems
- Unpredictable stacking

**Recommended Fix:** Create a centralized z-index scale in `globals.css`:
```css
:root {
  --z-base: 1;
  --z-section: 10;
  --z-overlap: 20;
  --z-header: 1000;
  --z-overlay: 9999;
  --z-toast: 10000;
}
```

---

### Issue 3: GSAP ScrollTrigger Proliferation

**Problem:** Almost EVERY component creates its own ScrollTrigger instances:

| Component | Approx ScrollTriggers |
|-----------|----------------------|
| InstituteIntro | 5+ |
| PopularCourses | 7+ |
| CourseCategories | 7+ |
| VerticalCardGallery | 3+ |
| BeyondReality | 2+ |
| StudentShowcase | 2+ |
| **TOTAL** | **50-100+** |

**Impact:**
- Performance degradation
- Memory leaks if not cleaned up
- Conflicting scroll behaviors

**Recommended Fix:** Create a centralized scroll manager:
```tsx
// lib/scrollManager.ts
export const useScrollAnimations = (config) => {
  // Single ScrollTrigger master
  // Register all animations here
}
```

---

### Issue 4: Multiple Scroll Listeners

**Current State:**
- `Navbar.tsx` - scroll listener for progress
- `ClientShell.tsx` - scroll listener for `setScroll`
- `MobileBottomNav.tsx` - scroll listener for hide/show

**Impact:** 3+ separate scroll event listeners fire on EVERY scroll event.

**Recommended Fix:** Single Zustand-based scroll broadcaster:
```tsx
// hooks/useScroll.ts
export const useScroll = () => {
  // Single listener, broadcasts to Zustand
}
```

---

### Issue 5: Student Showcase - All Videos Load Simultaneously

**Current Code:**
```tsx
{videos.map((video, i) => (
  <video
    key={i}
    src={video.src}
    autoPlay={i === active}
    // ALL 4 videos are in DOM with src set
  />
))}
```

**Problem:** All 4 videos download in parallel, wasting bandwidth.

**Recommended Fix:**
```tsx
{videos.map((video, i) => (
  <video
    key={i}
    src={i === active || i === active - 1 || i === active + 1 ? video.src : undefined}
    autoPlay={i === active}
  />
))}
```

---

### Issue 6: Duplicate Form Logic

**Files:**
- `ContactModal.tsx`
- `ApplyNow.tsx`

**Problem:** Both have nearly identical:
- Form validation logic
- State management
- Submission handling
- Error handling

**Recommended Fix:** Create a shared `useContactForm` hook:
```tsx
// hooks/useContactForm.ts
export const useContactForm = () => {
  // Shared validation, submission, error handling
}
```

---

### Issue 7: Waveform Component Uses Math.random() in Render

**Current Code:**
```tsx
// Testimonials.tsx
style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}
```

**Problem:** Waveform changes on every re-render, causing visual jitter.

**Recommended Fix:**
```tsx
const heights = useMemo(() => 
  Array.from({ length: 40 }, () => Math.random() * 100), []
);
```

---

### Issue 8: Dead Code in Store

**File:** `lib/store.ts`

**Problem:** `useFormStore` is defined but never imported anywhere.

**Recommended Fix:** Remove it or implement it properly.

---

## 5. CODE ORGANIZATION ISSUES

### Problem 1: Massive globals.css (500+ lines)

**Contains:**
- Design tokens (CSS variables)
- Component styles (`.btn`, `.glass-card`)
- Animations
- Section backgrounds
- Modal styles
- Accordion styles
- Responsive overrides

**Recommended Split:**
```
styles/
├── globals.css (tokens, base, utilities)
├── components/
│   ├── button.css
│   ├── card.css
│   ├── modal.css
│   └── accordion.css
├── animations.css
└── responsive.css
```

---

### Problem 2: Multiple Floating CTAs

**Current State:**
- `FloatingCTA.tsx` - WhatsApp + Call (desktop, right)
- `MobileBottomNav.tsx` - WhatsApp + Demo + Call (mobile, bottom)
- `DemoBar.tsx` - Announcement bar (top, 40px height)

**Problems:**
- DemoBar takes 40px persistent screen space
- No coordination between elements
- MobileBottomNav hardcodes phone number instead of using `contactInfo`

**Recommended Fix:** Single `FloatingActions` component with desktop/mobile variants.

---

### Problem 3: Custom Cursor Re-Queries DOM

**File:** `CustomCursor.tsx`

**Problem:**
```tsx
useGSAP(() => {
  document.querySelectorAll("a, button, .cursor-hover").forEach(el => {
    // attach listeners
  });
});
```

If new interactive elements are added after mount (modals, dynamic content), they won't have cursor effects.

**Recommended Fix:** Use event delegation:
```tsx
document.addEventListener('mouseover', (e) => {
  if (e.target.matches('a, button, .cursor-hover')) {
    // show cursor effect
  }
});
```

---

## 6. PERFORMANCE ISSUES SUMMARY

| Issue | Severity | File | Impact |
|-------|----------|------|--------|
| All 4 showcase videos mount simultaneously | HIGH | StudentShowcase.tsx | Wasted bandwidth, slow load |
| No connection detection for intro | HIGH | MAACXHero.tsx | Slow connections struggle |
| No preload tags for hero videos | HIGH | MAACXHero.tsx / layout.tsx | Late video discovery |
| 50-100+ ScrollTrigger instances | MEDIUM | All components | Performance degradation |
| 3+ scroll event listeners | MEDIUM | Navbar, ClientShell, MobileBottomNav | Scroll jank |
| No ErrorBoundary on many sections | MEDIUM | page.tsx | Crash cascade risk |
| Math.random() in render | LOW | Testimonials.tsx | Visual jitter |
| Dead code: useFormStore | LOW | lib/store.ts | Bundle size |
| Unused logo files | LOW | public/ | Wasted bandwidth |

---

## 7. PRIORITIZED ACTION PLAN

### Phase 1: Critical (Do First)

1. **Add preload tags for hero video**
   - Add `<link rel="preload">` in layout/head
   - Add `preload="auto"` and `fetchPriority="high"` to video
   - Estimated impact: Instant hero video loading

2. **Fix header issues**
   - Remove MAAC Jaipur text spans
   - Resize Apply Now button (smaller padding, font)
   - Clean up unused logo files

3. **Implement connection-aware loading**
   - Add `navigator.connection` check
   - Skip intro on slow connections
   - Show poster-only hero if needed

### Phase 2: High Priority

4. **Lazy-load showcase videos**
   - Only render active + adjacent videos
   - Swap src dynamically

5. **Standardize ErrorBoundary**
   - Wrap all sections
   - Create higher-order wrapper

6. **Consolidate scroll handling**
   - Single scroll broadcaster via Zustand
   - Centralized ScrollTrigger management

### Phase 3: Medium Priority

7. **Split globals.css**
   - Separate component styles
   - Extract animations

8. **Remove dead code**
   - Delete useFormStore
   - Remove unused logos

9. **Fix hardcoded values**
   - MobileBottomNav should use contactInfo props

### Phase 4: Optimization

10. **Centralize CTA logic**
    - Single FloatingActions component

11. **Fix waveform jitter**
    - Memoize random values

12. **Improve custom cursor**
    - Use event delegation

---

## 8. FILES REQUIRING CHANGES

| File | Changes Needed | Priority |
|------|----------------|----------|
| `src/app/layout.tsx` | Add preload tags | Critical |
| `src/components/hero/MAACXHero.tsx` | Connection detection, preload, priority | Critical |
| `src/components/Navbar.tsx` | Remove text, resize button | Critical |
| `src/components/StudentShowcase.tsx` | Lazy video loading | High |
| `src/app/page.tsx` | ErrorBoundary wrapper | High |
| `src/components/Testimonials.tsx` | Memoize waveform | Medium |
| `src/lib/store.ts` | Remove dead code | Medium |
| `src/styles/globals.css` | Split into modules | Medium |
| `src/components/MobileBottomNav.tsx` | Use props, not hardcoded | Medium |
| `src/components/CustomCursor.tsx` | Event delegation | Low |

---

## 9. RECOMMENDED ARCHITECTURE IMPROVEMENTS

### Centralized Scroll Management
```
hooks/
└── useScroll.ts (single listener, Zustand broadcaster)
```

### Centralized Animation Management
```
lib/
└── animationManager.ts (registers all ScrollTriggers)
```

### Shared Form Logic
```
hooks/
└── useContactForm.ts (validation, submission, errors)
```

### Unified Floating Actions
```
components/
└── FloatingActions/
    ├── DesktopCTA.tsx
    ├── MobileBottomNav.tsx
    └── index.tsx
```

---

## Conclusion

The website has **significant structural debt** that affects performance, maintainability, and user experience. The most critical issues are:

1. **Video loading is not prioritized** - needs preload tags and connection detection
2. **Header has UI inconsistencies** - oversized button, unnecessary text
3. **Sections are dispersed** - no consistent error handling, z-index management, or scroll coordination
4. **Code organization needs work** - massive CSS file, dead code, duplicate logic

Following the phased action plan above will systematically address these issues from most critical to optimization-level improvements.

---

**Next Steps:**
1. Review this report
2. Confirm which issues to tackle first
3. Begin implementation with Phase 1 (Critical fixes)

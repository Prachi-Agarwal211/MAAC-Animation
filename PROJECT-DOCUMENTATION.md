# MAAC Animation Jaipur — Project Documentation

## Session Record: July 4, 2026

---

## 1. Project Overview

### Original Goal (Reverbex Technologies)
- Build a portfolio/work showcase website
- Video backgrounds, recreated hero sections, cool transitions
- React component libraries: react-bits, Aceternity UI, Magic UI
- Stack: Next.js 16 + React 19 + TypeScript + Tailwind + GSAP + Framer Motion

### Current Focus: MAAC Animation Jaipur Website
- Fix and improve existing website at `C:\Users\15anu\OneDrive\文档\code\maac prachi`
- Stack: Next.js 14 + React 18 + Tailwind + GSAP + Three.js + Lenis
- Goal: Make it a "pure magical" website that showcases animation expertise
- Content exists — need better representation/presentation

---

## 2. Rules & Constraints Set by User

### Design Philosophy
- **"Really cool and better designed from what we had"** — must surpass current quality
- **"Really pure magical type of website"** — Awwwards-level, not generic
- **"We have content things and all now we need the way to represent them"** — content is done, presentation is the focus
- Dark theme with gold accent (#D4AF37) — Reverbex
- MAAC branding: Red (#E31837) + Orange (#FF6B35) + dark bg (#0C0C0C) + cream text (#F0EBE1)

### Technical Rules
- Must respect `prefers-reduced-motion` for accessibility
- WebGL components need dynamic imports with `ssr: false`
- All `'use client'` directives needed for Next.js App Router
- Performance first — loading time should reduce not increase
- Optimized for all devices (mobile, tablet, desktop)

### What NOT to Remove
- **WebGL effects** — user explicitly said "we cannot remove webgl thing we need something like that"
- **Videos** — keep video content, just optimize loading
- **GSAP** — main animation library, used in 25+ files
- **Lenis** — smooth scroll (disabled on touch already)

---

## 3. Competitor Analysis Summary

### MAAC Jaipur Competitors in Jaipur

| Institute | Est. | Fees | Key Strength | Key Weakness |
|-----------|------|------|--------------|--------------|
| **MAAC C-Scheme** | 2005 | ₹1.29L–₹3.1L | Brand, Anurag sir mentorship | Website performance, scattered reviews |
| **Arena C-Scheme** | 2000 | ₹42K–₹4.9L | B.Voc degree, 3 locations, named placements | Generic website |
| **IRAA Academy** | 2017 | ₹12K+ | Cheap, online+offline | Weak online presence |
| **TGC Jaipur** | 2000s | Hidden | 100+ courses, M.Voc | Outdated website |
| **Skill Waala** | 2024 | Free online | Free courses as lead gen | Brand new, no track record |

### MAAC's Key Differentiator
- **Anurag sir** — personal brand driving referrals
- Almost every Google review mentions him by name
- 4.9/5 rating with 422+ reviews on Google

### What Competitors Do Better
1. **Arena** — publishes fees publicly, shows named placements, has B.Voc degree
2. **Skill Waala** — free online courses as lead generation
3. **TGC** — broader course range (100+ courses)
4. **IRAA** — lower price point (₹12K vs ₹38K+)

---

## 4. Technical Audit Findings

### Critical Issues
| Issue | File | Severity |
|-------|------|----------|
| Hardcoded Google Spreadsheet ID | `src/lib/googleSheets.ts` | CRITICAL |
| HTML injection in email function | `src/lib/email.ts` | HIGH |
| Hero video 6.45MB preloaded | `layout.tsx` + `page.tsx` | HIGH |
| Three.js WebGL running at 60fps always | `DynamicBackground.tsx` | MEDIUM |
| Framer Motion used in 1 file only | `CareerAssessmentClient.tsx` | MEDIUM |

### Dead Code (Removed)
| File | Why |
|------|-----|
| `SmokyButton.tsx` | Never imported, 283 lines of unused WebGL |
| `FloatingCTA.tsx` | Never imported |
| `useModalStore` | Never used anywhere |

### SEO Issues
- Homepage ranks #10 for "animation course Jaipur"
- Zero blog content
- No FAQ schema markup
- Fees not published on website
- No "MAAC vs Arena" comparison content

---

## 5. Completed Optimizations

### Hero Video Loading (MAACXHero.tsx)
- Removed `<link rel="preload" as="video">` from layout
- Poster image shows instantly (0.34MB)
- Video loads lazily via `data-src` after page idle
- Uses `requestIdleCallback` with 1.5s fallback
- Video element uses `preload="none"`

### Dead Code Removal
- Deleted `SmokyButton.tsx`
- Deleted `FloatingCTA.tsx`
- Removed `useModalStore` from `store.ts`

### Framer Motion Replacement (CareerAssessmentClient.tsx)
- Replaced `AnimatePresence` + `motion.div` with CSS transitions
- Progress bar uses CSS `transition-[width]`
- Removed `framer-motion` from `package.json` (~40KB saved)

### GSAP Import Fix (VerticalCardGallery.tsx)
- Changed `import { ScrollTrigger } from "gsap/ScrollTrigger"` to `import gsap, { ScrollTrigger } from "@/lib/gsap"`

### DynamicBackground
- Kept as-is — `frameloop="always"` is correct for continuous fluid animation
- Mobile already shows CSS gradient fallback (no WebGL)

---

## 6. Component Library Research

### React Bits (130+ components)
- **Installation**: `npx reactbits-installer --output ./src/components/reactbits`
- **Dependencies**: Many have ZERO dependencies (pure CSS + React)
- **Best for MAAC**: Zero-dependency components, no framer-motion needed
- **Key components**: SplashCursor, Aurora, GradientText, RotatingText, TiltedCard, SpotlightCard, CircularGallery, StarBorder, CountUp

### Aceternity UI (109 free components)
- **Installation**: `npx aceternity-ui add [component]`
- **Dependencies**: Requires framer-motion
- **Best for MAAC**: Aurora Background, Background Beams, 3D Card Effect, Typewriter Effect, Flip Words, Meteors

### Magic UI (150+ components)
- **Installation**: `npx shadcn@latest add @magicui/<component>`
- **Dependencies**: Requires motion (framer-motion)
- **Best for MAAC**: Meteors, Text Animate, Magic Card, Shimmer Button, Animated Gradient Text

### Recommendation
**React Bits only** — no new dependencies, many zero-dep components, faster load times, simpler maintenance.

---

## 7. Content Strategy

### Blog Posts Needed (Priority Order)
1. "Animation Course Fees in Jaipur 2026: MAAC vs Arena vs Frameboxx — Complete Comparison"
2. "Best Animation Institute in Jaipur 2026: Why MAAC Leads in Placements"
3. "VFX Course After 12th in Jaipur: Eligibility, Fees, Career Scope (2026 Guide)"
4. "MAAC Jaipur Reviews: What 422 Students Say (2026 Honest Review)"
5. "Animation Course After 12th: Complete Guide for Jaipur Students (2026)"

### Content Gaps to Fill
- Student testimonial videos
- Placement statistics with company names
- Faculty profiles (Anurag sir)
- Fee transparency (competitors publish fees)
- FAQ section with schema markup
- "MAAC vs Competitors" comparison page

### Review Strategy
- MAAC has 4.9/5 Google rating with 422+ reviews
- Reviews are scattered across platforms (JustDial, Sulekha, UrbanPro)
- Need to consolidate and display on website
- Leverage "Anurag sir" mentions as social proof

---

## 8. Next Steps

### Immediate (Next Session)
1. Install React Bits components
2. Add hero section effects (SplashCursor or Aurora)
3. Add text animations (GradientText, RotatingText)
4. Add card effects (TiltedCard, SpotlightCard)
5. Add portfolio gallery (CircularGallery)

### Short-term
6. Add FAQ schema to homepage + course pages
7. Publish fees on website
8. Create comparison page (MAAC vs Arena)
9. Add student testimonials with photos
10. Add faculty profiles

### Medium-term
11. Launch blog with 5 Tier 1 posts
12. Create "Animation Course After 12th" guide
13. Add video testimonials from placed students
14. Build "Animation Career in Jaipur" resource page

---

## 9. File Reference

### MAAC Project Location
`C:\Users\15anu\OneDrive\文档\code\maac prachi`

### Key Files Modified This Session
| File | Change |
|------|--------|
| `src/app/layout.tsx` | Removed video preload, removed poster preload |
| `src/app/page.tsx` | Removed video preload link |
| `src/components/hero/MAACXHero.tsx` | Poster-first lazy loading strategy |
| `src/components/ui/SmokyButton.tsx` | DELETED |
| `src/components/FloatingCTA.tsx` | DELETED |
| `src/lib/store.ts` | Removed useModalStore |
| `src/components/VerticalCardGallery.tsx` | Fixed GSAP import |
| `src/app/creative-career-assessment/CareerAssessmentClient.tsx` | Replaced framer-motion with CSS |
| `package.json` | Removed framer-motion |

### Files to Create/Modify Next Session
| File | Purpose |
|------|---------|
| `src/components/reactbits/` | React Bits components directory |
| `src/app/blog/` | Blog content |
| `src/components/FAQSchema.tsx` | FAQ structured data |
| `src/data/fees.ts` | Fee structure data |
| `src/data/comparisons.ts` | MAAC vs competitor data |

---

## 10. Research Documentation Files

### Created This Session (Reverbex project)
| File | Content |
|------|---------|
| `docs/RESEARCH.md` | Master research document |
| `docs/COMPONENTS.md` | React Bits component reference |
| `docs/LIBRARIES.md` | Aceternity, Magic UI, Volt reference |
| `docs/PERFORMANCE.md` | Animation performance guide |
| `docs/MODERN-CSS.md` | New browser APIs |
| `docs/REACT-19.md` | React 19 hooks and features |
| `docs/NEXTJS-16.md` | Next.js 16 breaking changes |
| `docs/RESEARCH-2026.md` | AI slop research, trends |

### MAAC Research (This Session)
- Competitor analysis (Arena, IRAA, TGC, Skill Waala)
- Student psychology and decision journey
- Review sentiment analysis
- SEO content gaps
- Market data (India animation market ₹12,000–15,000 crore)

---

## 11. Statistics Reference

### India Animation Market
- Market size: ₹12,000–15,000 crore
- Growth: 17-20% annually
- New jobs: 160,000/year
- India: 3rd largest VFX outsourcing destination
- Gaming market: $3.8 billion, growing 28%/year

### MAAC Jaipur
- Google rating: 4.9/5 (422+ reviews)
- JustDial: 4.4/5 (48 reviews)
- Established: 2005 (20+ years)
- Location: Ambition Tower, C-Scheme

### AI Slop Statistics (2026)
- 70%+ new commercial pages carry AI-slop signatures
- Average AI site scores 61.4/100 (Grade D)
- 78.3% use Inter font
- 72.1% use blue primary
- Average Lighthouse: 38/100

---

## 12. User Preferences Summary

### What User Wants
- "Really cool and better designed"
- "Pure magical type of website"
- Better content representation
- Optimized for all devices
- Fast loading times
- WebGL effects kept
- Videos kept (optimized)

### What User Doesn't Want
- Generic AI-slop design
- Slow loading
- Bloat
- Over-engineering
- Removing WebGL/video

### Session Flow
1. Started with Reverbex portfolio research
2. Pivoted to MAAC Animation Jaipur fixes
3. Deep competitor analysis
4. Technical audit
5. Performance optimizations completed
6. Component library research
7. Continue tomorrow with React Bits implementation

---

*Document created: July 4, 2026*
*Session status: Paused — continuing tomorrow*
*Next action: Install React Bits, add hero effects*

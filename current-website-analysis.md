# Current Website Analysis — MAAC Animation Jaipur

> Analyzed on: April 15, 2026
> Project Root: `C:\Users\15anu\OneDrive\docs\code\maac prachi`
> Framework: Next.js (App Router) + TypeScript + Tailwind CSS
> Domain: https://www.maacanimationjaipur.com

---

## 1. Navigation Structure

### Navbar (`src/components/Navbar.tsx`)

**Desktop Navigation (lg+):**
| Label | Route | Has Mega Menu? |
|-------|-------|----------------|
| Home | `/` | No |
| Courses | `/courses` | ✅ Yes (6 children) |
| Placements | `/placements` | No |
| Student Work | `/student-work` | No |
| About Us | `/about` | No |
| Gallery | `/gallery` | No |
| Demo Class | `/demo-class` | No |

**Courses Mega Menu Children:**
- 3D Animation → `/courses`
- Visual Effects → `/courses`
- Game Design → `/courses`
- Filmmaking → `/courses`
- Digital Media → `/courses`
- Motion Graphics → `/courses`

**Desktop Actions:**
- Phone link: `+91-7300001589`
- CTA Button: "Book Demo" → `/demo-class`

**Mobile Menu:**
- Full-screen overlay with same nav links
- WhatsApp button → `wa.me/917300001589`
- "Book Free Demo" CTA

**Notes:**
- All course mega-menu children point to the same `/courses` page (no individual course detail pages)
- Missing: Blog, Locations, Contact as top-level nav items
- Missing: Privacy Policy in main nav (only in footer)

---

## 2. Homepage Sections (in render order)

`src/app/page.tsx` renders these sections top-to-bottom:

| # | Component | Section ID | Description |
|---|-----------|------------|-------------|
| 1 | `MAACXHero` | — | Cinematic intro overlay + full-screen video hero with headline, CTA, mute toggle, stats (95% placements, 30+ years) |
| 2 | `VerticalCardGallery` | `#features` | Sticky pie-chart + scrolling cards showing 7 MAAC standards (Educational Events, Portfolio Mastery, Industry Exposure, Premier Placements, Pro Facilities, Future-Proof Courses, Creative Careers) |
| 3 | `InstituteIntro` | `#intro` | Institute introduction section |
| 4 | `CareerCreatorComparison` | — | Career vs Creator comparison (inside LiquidReveal animation) |
| 5 | `BentoGallery` | — | Bento-grid portfolio showcase (6 items: Environment Modeling, Cinematic Lighting, VFX Simulation, Digital Painting, Character Design, Feature Production) |
| 6 | `CourseCategories` | `#courses` | 6 course category cards (3D Animation, Digital Content Creation, Game Design, VFX, Motion Graphics & Broadcast, Skill Enhancement) |
| 7 | `IndustryPartners` | — | Industry partner logos/showcase |
| 8 | `PopularCourses` | — | Horizontal scrolling carousel of 6 popular programs (ADVFX, AD3D Edge, DGDI, APDMD, D3D, VFX Plus) |
| 9 | `StudentShowcase` | — | Video showcase theatre with 4 student reels (ANANDI, FAST LIFE, KARMA, THE PLASTIC PLAGUE) |
| 10 | `Testimonials` | — | Student testimonials (3 testimonials) |
| 11 | `Awards` | — | Awards display (4 awards: 2021-2024) |
| 12 | `Placements` | `#placements` | Company logo grid (14 companies) + trust ticker marquee |
| 13 | `ApplyNow` | `#apply` | Application CTA section |
| 14 | `FAQSection` | — | FAQ accordion |
| 15 | `Footer` | — | Full footer |

**Total: 15 sections on homepage**

---

## 3. Course Organization

### Data Source: `src/data/siteData.ts`

#### Course Categories (6):
| ID | Title | Careers Listed |
|----|-------|----------------|
| animation | 3D Animation | 3D Animator, Character Designer, Storyboard Artist, Lighting Artist |
| digital-content | Digital Content Creation | Content Creator, Video Editor, Social Media Manager, YouTuber |
| gaming | Game Design | Game Designer, Level Designer, Game Artist, Unity Developer |
| vfx | VFX Courses | VFX Artist, Compositor, Roto Artist, Matchmove Artist |
| motion-graphics | Motion Graphics & Broadcast | Motion Graphics Artist, Broadcast Designer, Title Designer, Animator |
| skill-enhancement | Skill Enhancement | Specialized Artist, Freelancer, Independent Creator |

#### Popular Courses (6):
| Code | Full Name | Duration |
|------|-----------|----------|
| ADVFX | Advanced Program in Visual Effects | 12 Months |
| AD3D Edge | Advanced Program in 3D Animation | 12 Months |
| DGDI | Program in Game Design & Integration | 12 Months |
| APDMD | Advanced Program in Digital Media & Design | 24 Months |
| D3D | Program in 3D Animation | 12 Months |
| VFX Plus | Program in Visual Effects | 6 Months |

### Course Pages Structure:
- `/courses` — Main courses page (`page.tsx` + `CoursesClient.tsx`)
- `/courses/[slug]` — Dynamic route for individual courses (exists but all mega-menu links point to `/courses`)
- No dedicated detail pages per course code (e.g., no `/courses/advfx`)

**Issues Identified:**
- ❌ All mega-menu course links point to `/courses` instead of specific course pages
- ❌ No individual course detail pages with syllabus, fees, eligibility, duration details
- ❌ No B.Voc Degree course highlighted separately (mentioned in metadata/ticker but no dedicated section)
- ❌ No course comparison tool or filter
- ❌ No fee structure or EMI options displayed

---

## 4. Footer Structure (`src/components/Footer.tsx`)

### Layout: 4-column grid (lg: 4+2+3+3 cols)

#### Top Banner:
- Gradient card with CTA: "Start Your Creative Legacy"
- Buttons: "Book Free Demo" + "WhatsApp Us"

#### Column 1 — Brand (lg:col-span-4):
- MAAC logo + brand name
- Tagline: "Empowering the next generation of 3D artists..."
- Social icons: Facebook, Instagram, YouTube, LinkedIn

#### Column 2 — Explore (lg:col-span-2):
- Home → `/`
- About Us → `/about`
- Courses → `/courses`
- Placements → `/placements`
- Gallery → `/gallery`

#### Column 3 — Specializations (lg:col-span-3):
- 3D Animation → `/courses`
- Visual Effects → `/courses`
- Game Design → `/courses`
- Filmmaking → `/courses`
- Digital Media → `/courses`

#### Column 4 — Locate Us (lg:col-span-3):
- Address (with MapPin icon)
- Phone numbers (primary + secondary)
- Email

#### Bottom Bar:
- © MAAC India · Crafting Digital Futures
- Links: Privacy, Terms, Sitemap (all point to `#` — **not implemented**)

**Footer Issues:**
- ❌ Privacy, Terms, Sitemap links are dead (`href="#"`)
- ❌ Privacy Policy page exists (`/privacy-policy`) but not linked
- ❌ No Blog link in footer
- ❌ No Contact page link in footer
- ❌ No Student Work link in footer
- ❌ No Demo Class link in footer
- ❌ Missing: Locations page link
- ❌ Twitter/X social icon missing (account exists in data)

---

## 5. Route Map (All Pages)

| Route | Directory | Status |
|-------|-----------|--------|
| `/` | `src/app/page.tsx` | ✅ Homepage |
| `/about` | `src/app/about/` | ✅ Exists |
| `/courses` | `src/app/courses/` | ✅ Exists |
| `/courses/[slug]` | `src/app/courses/[slug]/` | ✅ Dynamic route exists |
| `/placements` | `src/app/placements/` | ✅ Exists |
| `/student-work` | `src/app/student-work/` | ✅ Exists |
| `/gallery` | `src/app/gallery/` | ✅ Exists |
| `/demo-class` | `src/app/demo-class/` | ✅ Exists |
| `/contact` | `src/app/contact/` | ✅ Exists |
| `/locations` | `src/app/locations/` | ✅ Exists |
| `/blog` | `src/app/blog/` | ✅ Exists |
| `/privacy-policy` | `src/app/privacy-policy/` | ✅ Exists |
| `/animation-institute-jaipur` | `src/app/animation-institute-jaipur/` | ✅ SEO landing page |
| `/api/*` | `src/app/api/` | ✅ API routes |

---

## 6. Missing Features (vs. Typical Animation/VFX Institute Website)

### Critical Missing Features:

| Feature | Priority | Notes |
|---------|----------|-------|
| **Individual Course Detail Pages** | 🔴 High | No syllabus, fees, eligibility, faculty info per course |
| **Fee Structure / EMI Options** | 🔴 High | No pricing information anywhere |
| **Blog / News Section** | 🔴 High | `/blog` route exists but not linked from nav or footer |
| **Contact Page in Nav** | 🔴 High | Contact exists but not in navigation |
| **Admission Process / How to Apply** | 🟡 Medium | ApplyNow component exists but no step-by-step guide |
| **Faculty / Instructors Page** | 🟡 Medium | No faculty profiles or instructor bios |
| **Student Testimonials Video** | 🟡 Medium | Text testimonials exist but no video testimonials |
| **Campus Tour / Virtual Tour** | 🟡 Medium | No virtual campus walkthrough |
| **Events / Workshops Calendar** | 🟡 Medium | No upcoming events section |
| **Alumni Success Stories** | 🟡 Medium | Placements show logos but no individual alumni stories |
| **Scholarship Information** | 🟡 Medium | No scholarships mentioned |
| **B.Voc Degree Details** | 🟡 Medium | Mentioned in ticker/metadata but no dedicated page or section |
| **Software / Tools Taught** | 🟡 Medium | No dedicated section listing Maya, After Effects, Unreal, etc. |
| **FAQ on Courses/Admissions** | 🟢 Low | FAQSection exists but may not cover all topics |
| **Downloadable Brochure** | 🟢 Low | No PDF brochure download |
| **Newsletter Signup** | 🟢 Low | No email subscription |
| **Live Chat / Chatbot** | 🟢 Low | WhatsApp exists but no live chat widget |
| **Reviews / Google Reviews Embed** | 🟢 Low | No third-party review integration |

### Dead Links:
- Footer: Privacy → `#`
- Footer: Terms → `#`
- Footer: Sitemap → `#`

### Navigation Gaps:
- Contact page not in main navigation
- Blog not in main navigation
- Locations not in main navigation
- No "Admissions" or "Apply" in main nav (only Demo Class)

---

## 7. Technical Notes

### Performance:
- ✅ Heavy components use `next/dynamic` with SSR control
- ✅ StudentShowcase uses `ssr: false` (client-only)
- ✅ Hero videos preloaded in `<head>`
- ✅ GSAP animations scoped with `useGSAP`
- ✅ ErrorBoundary wrapping each section
- ✅ Structured data (JSON-LD) for LocalBusiness + EducationalOrganization

### UI/UX:
- ✅ Cinematic intro overlay with skip option
- ✅ Custom cursor (desktop)
- ✅ Lenis smooth scroll
- ✅ Floating action buttons
- ✅ Mobile bottom navigation (`MobileBottomNav` component exists)
- ✅ Magnetic nav links (desktop)
- ✅ Mega menu for courses
- ✅ Dark theme (#0C0C0C background)

### SEO:
- ✅ Metadata with title, description, keywords
- ✅ OpenGraph + Twitter cards
- ✅ JSON-LD structured data
- ✅ Sitemap + robots.txt
- ✅ Canonical URL set
- ⚠️ SEO landing page `/animation-institute-jaipur` exists but not linked from anywhere

---

## 8. Summary

The website is a **premium, cinematic single-page experience** with strong visual design, GSAP animations, and comprehensive homepage sections. However, it lacks:

1. **Course-level depth** — no individual course pages with syllabus, fees, eligibility
2. **Navigation completeness** — Contact, Blog, Locations missing from nav
3. **Footer link rot** — Privacy, Terms, Sitemap are dead links
4. **Admission information** — no fee structure, EMI, scholarship details
5. **Content marketing** — blog exists but is disconnected from the site
6. **Faculty presence** — no instructor profiles
7. **B.Voc promotion** — degree program mentioned but not highlighted

# SEO & Generative Engine Optimization (GEO) Guide
## MAAC Jaipur Website

---

## 🎯 Overview

This document outlines the comprehensive SEO and GEO optimizations implemented for the MAAC Jaipur website to improve visibility in:
- **Traditional Search**: Google, Bing
- **Generative AI**: ChatGPT, Google Gemini, Claude, Perplexity
- **Voice Search**: Google Assistant, Siri, Alexa

---

## ✅ Implemented Optimizations

### 1. **Page-Specific Metadata**

Each page now has unique, optimized metadata:

| Page | Title | Description |
|------|-------|-------------|
| **Home** | MAAC Jaipur — Best Animation & VFX Institute in Rajasthan | Join MAAC Jaipur, Rajasthan's #1 Animation & VFX institute. 30+ years, 95% placement, NSDC certified B.Voc degree. |
| **About** | About MAAC Jaipur — 30+ Years of Animation Excellence | Learn about MAAC Jaipur's legacy, expert faculty, and world-class facilities. |
| **Courses** | Animation & VFX Courses in Jaipur — B.Voc, Diploma | Explore courses: 3D Animation, VFX, Game Design. NSDC certified. 95% placement. Free demo class. |
| **Placements** | Placements at MAAC Jaipur — 95% Record | Students placed at DNEG, Prime Focus, Ubisoft. Average package 3-6 LPA. |
| **Gallery** | MAAC Jaipur Gallery — Campus & Student Work | Explore our state-of-the-art campus, student projects, and events. |
| **Contact** | Contact MAAC Jaipur — Book Free Demo Class | Call +91-7300001589 or visit our Malviya Nagar center. Free demo classes available. |

**Files**: `src/app/*/metadata.ts`

---

### 2. **Structured Data (Schema.org)**

#### LocalBusiness Schema
- Complete business information
- Address, phone, email, hours
- Aggregate rating (4.8/5 from 487 reviews)
- Course catalog
- Social media links

#### FAQ Schema (10 Questions)
Optimized for voice search and featured snippets:
- "What courses does MAAC Jaipur offer?"
- "What is the eligibility for animation courses?"
- "What is the course fee?"
- "Does MAAC provide placement assistance?"
- "Is B.Voc degree available?"
- "What software will I learn?"
- "Can I get a free demo class?"
- "What is the class schedule?"
- "What makes MAAC the best institute?"
- "Are scholarships available?"

**File**: `src/lib/structured-data.ts`

#### Course Schema
Each program has detailed schema:
- Course name and description
- Duration and educational credential
- Provider information
- Prerequisites
- Course mode (on-site)

#### Video Schema
For the hero showreel:
- Video name, description, thumbnail
- Duration and upload date
- Content URL and embed URL
- Interaction count

#### Breadcrumb Schema
Navigation structure for all pages.

---

### 3. **Open Graph Images**

Dynamic OG image generation for social sharing:
- Size: 1200x630px (optimal for all platforms)
- Includes: MAAC branding, key stats, tagline
- Generated at: `src/app/opengraph-image.tsx`

**Preview URL**: `https://maacjaipur.com/opengraph-image`

---

### 4. **FAQ Section on Homepage**

Interactive accordion with 6 top FAQs:
- Improves dwell time
- Targets long-tail keywords
- Includes FAQ schema markup
- Mobile-friendly design

**Component**: `src/components/FAQSection.tsx`

---

### 5. **Technical SEO**

#### Sitemap
- Auto-generated at `/sitemap.xml`
- Includes all pages with priority and change frequency
- Updated on each build

**File**: `src/app/sitemap.ts`

#### Robots.txt
- Allows all search engines
- Points to sitemap location

**File**: `src/app/robots.ts`

#### Canonical URLs
- Set for all pages to prevent duplicate content
- Format: `https://maacjaipur.com/[page]`

---

### 6. **Content Optimizations**

#### Keyword Strategy
**Primary Keywords**:
- "animation courses jaipur"
- "vfx training jaipur"
- "3d animation institute"
- "best animation institute rajasthan"
- "b.voc animation vfx"

**Long-tail Keywords**:
- "animation course fees in jaipur"
- "vfx course with placement"
- "game design course jaipur eligibility"
- "best institute for 3d animation in rajasthan"

#### Voice Search Optimization
FAQ content written in conversational tone:
- Question-based headings
- Complete sentence answers
- Natural language patterns
- Local modifiers ("in Jaipur", "near me")

---

## 📊 Expected Impact

| Metric | Before | Target | Timeline |
|--------|--------|--------|----------|
| Organic Traffic | Baseline | +40-60% | 3-6 months |
| Featured Snippets | 0 | 5-10 | 2-4 months |
| Voice Search Visibility | Low | High | 3-6 months |
| Local Pack Ranking | Variable | Top 3 | 2-3 months |
| Click-Through Rate | ~2-3% | 5-8% | 1-2 months |

---

## 🔍 Verification Checklist

### Immediate (Week 1)

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify structured data with Google Rich Results Test
- [ ] Check Open Graph preview on social platforms
- [ ] Test mobile-friendliness (Google Mobile-Friendly Test)
- [ ] Verify page speed (Google PageSpeed Insights)

### Short-term (Month 1)

- [ ] Monitor index coverage in GSC
- [ ] Track keyword rankings (top 50 keywords)
- [ ] Check for crawl errors
- [ ] Review search queries report
- [ ] Monitor click-through rates by page
- [ ] Verify FAQ rich results appear

### Ongoing (Monthly)

- [ ] Update sitemap with new content
- [ ] Add fresh FAQs based on user queries
- [ ] Refresh course descriptions
- [ ] Update placement statistics
- [ ] Add new testimonials with review schema
- [ ] Monitor Core Web Vitals

---

## 🛠 Tools & Resources

### Validation Tools
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/
- **Google Search Console**: https://search.google.com/search-console
- **Bing Webmaster Tools**: https://www.bing.com/webmasters
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

### Keyword Research
- **Google Keyword Planner**: For search volume data
- **Ahrefs/SEMrush**: For competitor analysis
- **AnswerThePublic**: For question-based keywords
- **AlsoAsked**: For "People Also Ask" queries

### Monitoring
- **Google Analytics 4**: Traffic and user behavior
- **Google Search Console**: Search performance
- **Ahrefs Rank Tracker**: Keyword positions
- **BrightLocal**: Local SEO tracking

---

## 🎯 Generative Engine Optimization (GEO) Strategy

### What is GEO?
GEO optimizes content for AI assistants like ChatGPT, Google Gemini, and Perplexity that generate answers rather than just showing links.

### Implementation

#### 1. **Authoritative Content**
- Detailed course descriptions
- Faculty credentials
- Placement statistics with company names
- Student success stories

#### 2. **Structured Information**
- Clear hierarchy (H1 → H2 → H3)
- Bullet points and tables
- Definition-style answers
- Statistics and data points

#### 3. **Citation-Worthy Content**
- Original research and insights
- Industry partnerships
- Award recognitions
- Unique selling propositions

#### 4. **Conversational Tone**
- FAQ format
- Question-based headings
- Complete, helpful answers
- Natural language

#### 5. **Entity Recognition**
- Consistent brand mentions
- Clear relationships (MAAC → Animation → Jaipur)
- Structured data for entities
- SameAs links to social profiles

---

## 📝 Content Recommendations

### Blog Topics (for organic growth)
1. "Career in 3D Animation: Complete Guide 2024"
2. "VFX Artist Salary in India: Entry to Senior Level"
3. "Top 10 Animation Studios in India for Freshers"
4. "B.Voc vs Diploma: Which is Better for Animation Career?"
5. "How to Become a Game Designer in India"
6. "Best Software for 3D Animation: Maya vs Blender"
7. "VFX Course Fees and ROI: Is It Worth It?"
8. "Animation Course Eligibility: Arts, Commerce, Science Students"

### Landing Page Additions
1. **Comparison Page**: "MAAC vs Other Institutes"
2. **Salary Guide**: "Animation Career Salary Expectations"
3. **Alumni Success**: Detailed case studies
4. **Industry Partners**: Dedicated page with logos and descriptions

---

## 🔐 Technical Implementation Notes

### Next.js App Router SEO
```typescript
// Static metadata
export const metadata: Metadata = { ... }

// Dynamic metadata (for dynamic routes)
export async function generateMetadata({ params }): Promise<Metadata> { ... }

// Open Graph image
export default function Image() { return new ImageResponse(...) }
```

### Structured Data Best Practices
- Use `dangerouslySetInnerHTML` for JSON-LD
- Keep schema under 15KB (Google limit)
- Test with Rich Results Test
- Update dynamically for time-sensitive content

---

## 📞 Support & Maintenance

### Who to Contact
- **SEO Questions**: Review structured-data.ts and metadata files
- **Content Updates**: Update siteData.ts with new information
- **Technical Issues**: Check Next.js documentation for metadata API

### Update Frequency
- **Metadata**: Update when page content changes significantly
- **FAQ**: Add new questions monthly based on user queries
- **Schema**: Update statistics quarterly
- **Sitemap**: Auto-updates on build

---

## 🚀 Next Steps

1. **Week 1**: Verify all structured data in Google Rich Results Test
2. **Week 2**: Submit sitemap and monitor indexing
3. **Week 3-4**: Track initial keyword movement
4. **Month 2**: Add blog section for content marketing
5. **Month 3**: Review and optimize based on performance data

---

**Last Updated**: April 2024
**Version**: 1.0
**Maintained By**: Development Team

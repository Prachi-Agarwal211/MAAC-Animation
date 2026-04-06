# Decision: Portfolio System Architecture

## Date: 2026-04-07

## Context
The MAAC website had placeholder gallery pages with emoji icons and hardcoded WordPress image URLs. Student portfolio PDFs existed in the data folder but were not converted or integrated into the website.

## Decision
Created a data-driven portfolio system with the following architecture:

### 1. PDF-to-Image Conversion Pipeline
- **Chose PyMuPDF over pdf2image** — PyMuPDF doesn't require external poppler dependency, simpler setup on Windows
- **3x zoom factor** — Balances quality (~300 DPI) with file size
- **JPEG at 95% quality** — Good quality/size ratio for photographic content

### 2. Data Layer (`src/data/portfolio.ts`)
- **Typed data structure** — TypeScript interfaces for PortfolioEntry, PortfolioCategory
- **Centralized data** — Single source of truth for all portfolio metadata
- **Category-based filtering** — Matches existing website filter pattern
- **Auto-generated from manifest.json** — Can be regenerated if PDFs are re-converted

### 3. Component Architecture
- **PortfolioGallery** — Main grid component with category filtering
- **ImageLightbox** — Reusable lightbox/modal with keyboard navigation
- **PortfolioCard** — Individual card with hover effects, image count badge, tags

### 4. Integration Strategy
- **`/student-work`** — Full portfolio gallery (replaced placeholder data)
- **`/gallery`** — Curated 12-image showcase with CTA to full portfolio
- **Homepage StudentShowcase** — Kept as video showcase (different purpose)

## Alternatives Considered

### A. Direct PDF serving
- Rejected: Browsers handle PDFs inconsistently, poor mobile experience, no optimization

### B. Manual image upload
- Rejected: Tedious, error-prone, not scalable for 30+ students with multi-page portfolios

### C. External image hosting (Cloudinary, etc.)
- Rejected: Unnecessary cost, local images work fine with Next.js Image optimization

## Trade-offs

### Pros
- Zero external dependencies for image hosting
- Full control over image quality and optimization
- Type-safe portfolio data
- Reusable components (lightbox can be used elsewhere)
- SEO-friendly with proper alt text and structured data

### Cons
- ~153 images add to repository size (mitigated by .gitignore for portfolio/*.jpg)
- Manual data entry in portfolio.ts (could be automated in future)
- Empty categories (cg-lighting, character-animation) have no content yet

## Future Improvements
1. Auto-generate `portfolio.ts` from `manifest.json` + PDF metadata
2. Add student video showreels alongside image portfolios
3. Implement image lazy loading with blur-up placeholders
4. Add search/filter by student name
5. Create individual portfolio detail pages (`/student-work/[slug]`)

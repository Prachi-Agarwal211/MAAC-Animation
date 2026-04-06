# Portfolio PDF-to-Image Conversion & Integration

## Overview
Process for converting student portfolio PDFs into optimized web images and integrating them into the Next.js gallery system.

## Conversion Script
**Location:** `scripts/convert-pdfs-to-jpg.py`
**Dependencies:** PyMuPDF (`pip install PyMuPDF`)
**Quality:** 3x zoom (~300 DPI equivalent), JPEG quality 95

### Usage
```bash
python scripts/convert-pdfs-to-jpg.py
```

### Output Structure
```
public/portfolio/
├── manifest.json              # Auto-generated image inventory
├── featured/                  # Nancy Verma, Prerit Mehan
├── 3d-game-asset/            # 4 students, 23 images
├── architectural-design/     # 3 students, 21 images
├── character-modeling/       # 3 students, 41 images
├── digital-painting/         # 5 students, 9 images
├── environment-modeling/     # 4 students, 35 images
├── matte-painting/           # 4 students, 7 images
├── cg-lighting/              # Empty (no PDFs found)
├── character-animation/      # Empty (no PDFs found)
├── unic-animated-short-film/ # Empty (no PDFs found)
└── unreal-cinematic/         # Empty (no PDFs found)
```

## Portfolio Data System
**Location:** `src/data/portfolio.ts`

### Types
- `PortfolioEntry` — Student portfolio with name, category, course, images, tags
- `PortfolioCategory` — Category with id, label, description, slug

### Key Functions
- `getEntriesByCategory(categoryId)` — Filter entries by category
- `getCategoryById(id)` — Get category metadata
- `getAllTags()` — Get all unique tags across portfolios

## Components Created

### PortfolioGallery
**Location:** `src/components/portfolio/PortfolioGallery.tsx`
- Category-filtered grid with count badges
- Responsive 1-4 column layout (Tailwind: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`)
- Click-to-open lightbox integration
- Hover effects with scale transform and category badges

### ImageLightbox
**Location:** `src/components/ui/ImageLightbox.tsx`
- Full-screen modal with backdrop blur
- Arrow key navigation (left/right)
- Escape to close
- Thumbnail strip for multi-image portfolios
- Image counter (e.g., "3 / 12")
- `createPortal` for proper z-index layering

## Integration Points
1. `/student-work` page — Full portfolio gallery with filtering
2. `/gallery` page — Featured 12-image grid with link to full portfolio
3. `StudentShowcase` component (homepage) — Video showcase (unchanged, separate system)

## Next.js Config Updates
- Added `Cache-Control: public, max-age=31536000, immutable` for `/portfolio/:path*`
- Added image security settings (CSP, content disposition)

## SEO Considerations
- Every image has descriptive `alt` text with student name and course
- Category labels use proper capitalization
- JSON-LD structured data on gallery pages (ImageGallery schema)
- Canonical URLs preserved

## Performance
- Next.js Image component with `fill`, `sizes`, and `loading="lazy"`
- Image optimization (AVIF/WebP formats enabled in next.config.mjs)
- 1-year cache headers for portfolio images
- Lightbox uses `unoptimized` for full-size view (avoids double-optimization)

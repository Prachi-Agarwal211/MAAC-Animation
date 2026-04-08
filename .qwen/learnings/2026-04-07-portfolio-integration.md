# Session Learnings — April 7, 2026

## Portfolio PDF Conversion & Integration

### What Worked Well
- PyMuPDF is significantly easier to set up than pdf2image (no poppler needed)
- Multi-page PDFs converted cleanly with sequential naming
- Manifest JSON approach provides good inventory tracking
- Category-based data structure maps cleanly to UI filters

### Issues Encountered
1. **pdf2image pip install timeout** — Switched to PyMuPDF which installed without issues
2. **Unicode path handling** — Windows paths with Chinese characters (文档) work fine with Python's Path
3. **Some PDFs have MuPDF format errors** — Non-critical warnings, images still generated (e.g., biswabrata-dutta.pdf)
4. **Empty categories** — CG LIGHTING, CHARACTER ANIMATION, UNIC Animated Short Film, UNREAL CINEMATIC had no PDFs

### Key Insights
- **153 images from 30 student PDFs** — Average 5+ pages per student
- **Character modeling has most images** (41 from 3 students — Aarush Kumar alone has 30 pages)
- **Featured artists** (Nancy Verma, Prerit Mehan) have 8 pages each — highlight-worthy portfolios
- **MAAC logo PDF** converted to single high-res image (43044x25793px — very large, may need optimization)

### Best Practices Discovered
1. Always use `createPortal` for lightboxes to avoid z-index conflicts
2. `unoptimized` prop on Next.js Image is appropriate for lightbox full-size view (avoids double-processing)
3. Category badge on image + content area provides good visual hierarchy
4. Image count badge helps users understand portfolio depth before clicking

### Performance Notes
- Build takes significant time (Next.js image optimization for 153 images)
- TypeScript check passes cleanly — good type discipline in portfolio.ts
- Cache headers for portfolio images set to 1 year (immutable)

### SEO Actions Taken
- Descriptive alt text: `{studentName} - {description}`
- ImageGallery JSON-LD on gallery page
- Category labels in URLs are lowercase-hyphenated (SEO-friendly)
- Canonical URLs preserved on all pages

### Next Session Recommendations
1. Test the dev server to verify images load correctly
2. Run Lighthouse audit on `/student-work` and `/gallery` pages
3. Consider generating individual portfolio pages (`/student-work/[slug]`)
4. Add OG image tags using featured portfolio images
5. Compress the maac-logo.jpg (currently 43044px wide — excessive)

# Feature Card Images

The VerticalCardGallery component requires the following WebP images (optimized for web):

## Required Images (380px × 209px minimum, aspect ratio ~16:9)

| File Name | Description | Suggested Content |
|-----------|-------------|-------------------|
| `feature-events.webp` | Transformative Educational Events | Workshop/classroom scene, students in training |
| `feature-portfolio.webp` | Industry-Ready Portfolio Development | Student portfolio showcase, artwork display |
| `feature-exposure.webp` | Exclusive Industry Exposure | Studio visit, industry professionals, internship |
| `feature-showreel.webp` | Portfolio That Speaks Volumes | Showreel playback, screen with animation |
| `feature-facilities.webp` | Industry-Grade Facilities | Computer labs, rendering equipment, workstations |
| `feature-courses.webp` | Courses Built For Future | Modern classroom, VR/AR equipment, technology |
| `feature-careers.webp` | Creative Careers That Click | Graduation, job placement, professional setting |

## Image Specifications

- **Format**: WebP (with PNG/JPG fallback if needed)
- **Dimensions**: Minimum 380px × 209px (aspect ratio 16:9)
- **Quality**: 80-85% compression for web optimization
- **File Size**: Target < 50KB per image for fast loading
- **Color Profile**: sRGB

## Fallback Behavior

If images are not available, the component will display:
- Emoji fallback (🎬, 🎨, 🏢, etc.)
- Colored background using the card's accent color at 15% opacity

## Optimization Tips

1. Use tools like Squoosh, TinyPNG, or ImageOptim to compress images
2. Generate multiple sizes for responsive loading if needed
3. Consider adding blur-up placeholders for better perceived performance

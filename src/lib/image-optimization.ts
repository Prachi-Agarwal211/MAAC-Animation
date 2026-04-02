/**
 * Image Optimization Helper
 * 
 * Usage:
 * <Image
 *   src="/path/to/image.jpg"
 *   alt="Descriptive alt text"
 *   width={800}
 *   height={600}
 *   loading="lazy"
 *   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 *   priority={false}
 *   placeholder="blur"
 *   blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
 * />
 */

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

// Image optimization guidelines for MAAC website
export const imageOptimizationGuidelines = {
  // Formats to use (in order of preference)
  formats: ["webp", "avif", "jpg", "png"],
  
  // Responsive image sizes
  sizes: {
    hero: "100vw",
    courseCard: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    gallery: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
    testimonial: "(max-width: 768px) 100vw, 50vw",
  },
  
  // Loading strategies
  loading: {
    aboveFold: "eager",
    belowFold: "lazy",
    lcp: "eager", // Largest Contentful Paint
  },
  
  // Quality settings
  quality: {
    jpeg: 85,
    webp: 80,
    avif: 75,
  },
  
  // Maximum dimensions
  maxDimensions: {
    hero: { width: 1920, height: 1080 },
    courseCard: { width: 800, height: 600 },
    gallery: { width: 600, height: 600 },
    thumbnail: { width: 300, height: 300 },
  },
};

// Alt text guidelines for SEO
export const altTextGuidelines = {
  rules: [
    "Be specific and descriptive",
    "Include relevant keywords naturally",
    "Mention course names when applicable",
    "Describe what's happening in the image",
    "Keep it under 125 characters",
    "Don't start with 'Image of' or 'Picture of'",
  ],
  examples: [
    {
      good: "Students working on 3D animation project in MAAC Jaipur computer lab",
      bad: "Students in lab",
    },
    {
      good: "MAAC Jaipur student's VFX showreel showing compositing work",
      bad: "VFX project",
    },
    {
      good: "Award ceremony at MAAC Jaipur - Best Animation Institute 2024",
      bad: "Award",
    },
  ],
};

// Image file naming conventions for SEO
export const imageNamingGuidelines = {
  format: "lowercase-hyphenated-descriptive-name.jpg",
  examples: [
    {
      good: "maac-jaipur-3d-animation-student-project.jpg",
      bad: "IMG_1234.jpg",
    },
    {
      good: "vfx-compositing-workshop-jaipur.jpg",
      bad: "image.png",
    },
    {
      good: "maac-campus-computer-lab-jaipur.jpg",
      bad: "screenshot.png",
    },
  ],
  includeKeywords: [
    "maac-jaipur",
    "animation",
    "vfx",
    "student-work",
    "campus",
    "course",
  ],
};

// Structured data for images
export const getImageSchema = (imageUrl: string, caption: string, photographer?: string) => ({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": imageUrl,
  "caption": caption,
  "creditText": photographer || "MAAC Jaipur",
  "acquireLicensePage": "https://maacjaipur.com/image-license",
});

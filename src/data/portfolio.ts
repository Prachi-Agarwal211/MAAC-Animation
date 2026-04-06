/**
 * Portfolio data for the MAAC Student Work showcase.
 * Generated from PDF conversion on 2026-04-07.
 * Each entry represents a student's portfolio with category, images, and metadata.
 */

export interface PortfolioImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  studentName: string;
}

export interface PortfolioCategory {
  id: string;
  label: string;
  description: string;
  slug: string;
}

export interface PortfolioEntry {
  id: string;
  studentName: string;
  category: string; // matches category id
  course: string;
  description: string;
  images: string[]; // paths to images
  featuredImage: string; // first/main image
  tags: string[];
}

export const categories: PortfolioCategory[] = [
  { id: "all", label: "All Work", description: "All student portfolio pieces", slug: "all" },
  { id: "3d-game-asset", label: "3D Game Asset", description: "3D models, props, and assets for games", slug: "3d-game-asset" },
  { id: "architectural-design", label: "Architectural Design", description: "Architectural visualization and design projects", slug: "architectural-design" },
  { id: "character-modeling", label: "Character Modeling", description: "Character modeling and texturing work", slug: "character-modeling" },
  { id: "digital-painting", label: "Digital Painting", description: "Digital painting and illustration", slug: "digital-painting" },
  { id: "environment-modeling", label: "Environment Modeling", description: "Environment art and texturing", slug: "environment-modeling" },
  { id: "matte-painting", label: "Matte Painting", description: "Matte painting for film and media", slug: "matte-painting" },
  { id: "featured", label: "Featured", description: "Featured student portfolios", slug: "featured" },
];

// Helper to build image path
const portfolio = (category: string, file: string) => `/portfolio/${category}/${file}`;

export const portfolioEntries: PortfolioEntry[] = [
  // === FEATURED ===
  {
    id: "nancy-verma",
    studentName: "Nancy Verma",
    category: "featured",
    course: "Advanced Program",
    description: "Outstanding portfolio showcasing advanced animation and design skills.",
    featuredImage: portfolio("featured", "nancy-verma-page1.jpg"),
    images: Array.from({ length: 8 }, (_, i) => portfolio("featured", `nancy-verma-page${i + 1}.jpg`)),
    tags: ["Featured", "Animation", "Design"],
  },
  {
    id: "prerit-mehan",
    studentName: "Prerit Mehan",
    category: "featured",
    course: "Advanced Program",
    description: "Exceptional work demonstrating creative excellence and technical proficiency.",
    featuredImage: portfolio("featured", "prerit-mehan-page1.jpg"),
    images: Array.from({ length: 8 }, (_, i) => portfolio("featured", `prerit-mehan-page${i + 1}.jpg`)),
    tags: ["Featured", "Creative", "Technical"],
  },

  // === 3D GAME ASSET ===
  {
    id: "archita-roy",
    studentName: "Archita Roy",
    category: "3d-game-asset",
    course: "3D Game Asset Creation",
    description: "Game-ready 3D assets with optimized topology and PBR textures.",
    featuredImage: portfolio("3d-game-asset", "archita-roy-page1.jpg"),
    images: Array.from({ length: 8 }, (_, i) => portfolio("3d-game-asset", `archita-roy-page${i + 1}.jpg`)),
    tags: ["3D Modeling", "Game Assets", "PBR"],
  },
  {
    id: "bijoy-mech",
    studentName: "Bijoy Mech",
    category: "3d-game-asset",
    course: "3D Game Asset Creation",
    description: "High-quality game assets with detailed texturing and optimization.",
    featuredImage: portfolio("3d-game-asset", "bijoy-mech-page1.jpg"),
    images: Array.from({ length: 8 }, (_, i) => portfolio("3d-game-asset", `bijoy-mech-page${i + 1}.jpg`)),
    tags: ["3D Modeling", "Game Design", "Texturing"],
  },
  {
    id: "khushal-singla",
    studentName: "Khushal Singla",
    category: "3d-game-asset",
    course: "3D Game Asset Creation",
    description: "Professional game asset portfolio with clean topology.",
    featuredImage: portfolio("3d-game-asset", "khushal-singla.jpg"),
    images: [portfolio("3d-game-asset", "khushal-singla.jpg")],
    tags: ["3D Modeling", "Game Ready"],
  },
  {
    id: "shreya-halder",
    studentName: "Shreya Halder",
    category: "3d-game-asset",
    course: "3D Game Asset Creation",
    description: "Creative 3D game assets with attention to detail.",
    featuredImage: portfolio("3d-game-asset", "shreya-halder-page1.jpg"),
    images: Array.from({ length: 6 }, (_, i) => portfolio("3d-game-asset", `shreya-halder-page${i + 1}.jpg`)),
    tags: ["3D Art", "Game Assets"],
  },

  // === ARCHITECTURAL DESIGN ===
  {
    id: "krutika-vikram-rane",
    studentName: "Krutika Vikram Rane",
    category: "architectural-design",
    course: "Architectural Design Visualization",
    description: "Photorealistic architectural visualization with excellent lighting and composition.",
    featuredImage: portfolio("architectural-design", "krutika-vikram-rane-page1.jpg"),
    images: Array.from({ length: 10 }, (_, i) => portfolio("architectural-design", `krutika-vikram-rane-page${i + 1}.jpg`)),
    tags: ["ArchViz", "3ds Max", "Rendering"],
  },
  {
    id: "mohhamad-kaif",
    studentName: "Mohhamad Kaif Karamat Shaikh",
    category: "architectural-design",
    course: "Architectural Design Visualization",
    description: "Architectural design projects with strong composition skills.",
    featuredImage: portfolio("architectural-design", "mohhamad-kaif-karamat-shaikh-page1.jpg"),
    images: Array.from({ length: 5 }, (_, i) => portfolio("architectural-design", `mohhamad-kaif-karamat-shaikh-page${i + 1}.jpg`)),
    tags: ["Architecture", "Visualization"],
  },
  {
    id: "sharanjit-kaur",
    studentName: "Sharanjit Kaur",
    category: "architectural-design",
    course: "Architectural Design Visualization",
    description: "Stunning architectural renders with realistic materials and lighting.",
    featuredImage: portfolio("architectural-design", "sharanjit-kaur-page1.jpg"),
    images: Array.from({ length: 6 }, (_, i) => portfolio("architectural-design", `sharanjit-kaur-page${i + 1}.jpg`)),
    tags: ["ArchViz", "Rendering", "Design"],
  },

  // === CHARACTER MODELING & TEXTURING ===
  {
    id: "aarush-kumar",
    studentName: "Aarush Kumar",
    category: "character-modeling",
    course: "Character Modeling & Texturing",
    description: "Extensive character modeling portfolio with high-detail sculpts and clean topology.",
    featuredImage: portfolio("character-modeling", "aarush-kumar-page1.jpg"),
    images: Array.from({ length: 30 }, (_, i) => portfolio("character-modeling", `aarush-kumar-page${i + 1}.jpg`)),
    tags: ["Character Art", "ZBrush", "Sculpting"],
  },
  {
    id: "abhay-suryavanshi",
    studentName: "Abhay Suryavanshi",
    category: "character-modeling",
    course: "Character Modeling & Texturing",
    description: "Character modeling work with excellent anatomy and detailing.",
    featuredImage: portfolio("character-modeling", "abhay-suryavanshi.jpg"),
    images: [portfolio("character-modeling", "abhay-suryavanshi.jpg")],
    tags: ["Character Modeling", "Anatomy"],
  },
  {
    id: "arfat-aziz-khan",
    studentName: "Arfat Aziz Khan",
    category: "character-modeling",
    course: "Character Modeling & Texturing",
    description: "Character design and modeling with strong artistic vision.",
    featuredImage: portfolio("character-modeling", "arfat-aziz-khan-page1.jpg"),
    images: Array.from({ length: 10 }, (_, i) => portfolio("character-modeling", `arfat-aziz-khan-page${i + 1}.jpg`)),
    tags: ["Character Design", "3D Art"],
  },

  // === DIGITAL PAINTING ===
  {
    id: "deshna-shah",
    studentName: "Deshna Shah",
    category: "digital-painting",
    course: "Digital Painting",
    description: "Beautiful digital painting with strong color theory and composition.",
    featuredImage: portfolio("digital-painting", "deshna-shah.jpg"),
    images: [portfolio("digital-painting", "deshna-shah.jpg")],
    tags: ["Digital Art", "Painting"],
  },
  {
    id: "mai-nguyen",
    studentName: "Mai Nguyen Thi Xuan",
    category: "digital-painting",
    course: "Digital Painting",
    description: "Expressive digital paintings with vibrant colors and storytelling.",
    featuredImage: portfolio("digital-painting", "ms-mai-nguyen-thi-xuan-page1.jpg"),
    images: Array.from({ length: 2 }, (_, i) => portfolio("digital-painting", `ms-mai-nguyen-thi-xuan-page${i + 1}.jpg`)),
    tags: ["Digital Painting", "Illustration"],
  },
  {
    id: "rudrani-samajpati",
    studentName: "Rudrani Samajpati",
    category: "digital-painting",
    course: "Digital Painting",
    description: "Creative digital art with unique style and technique.",
    featuredImage: portfolio("digital-painting", "rudrani-samajpati-page1.jpg"),
    images: Array.from({ length: 2 }, (_, i) => portfolio("digital-painting", `rudrani-samajpati-page${i + 1}.jpg`)),
    tags: ["Digital Art", "Creative"],
  },
  {
    id: "suraj-anant-dhamne",
    studentName: "Suraj Anant Dhamne",
    category: "digital-painting",
    course: "Digital Painting",
    description: "Impressive digital paintings with strong composition and lighting.",
    featuredImage: portfolio("digital-painting", "suraj-anant-dhamne-page1.jpg"),
    images: Array.from({ length: 3 }, (_, i) => portfolio("digital-painting", `suraj-anant-dhamne-page${i + 1}.jpg`)),
    tags: ["Painting", "Composition"],
  },
  {
    id: "vithik-patankar",
    studentName: "Vithik Patankar",
    category: "digital-painting",
    course: "Digital Painting",
    description: "Digital painting with excellent artistic sensibility.",
    featuredImage: portfolio("digital-painting", "vithik-patankar.jpg"),
    images: [portfolio("digital-painting", "vithik-patankar.jpg")],
    tags: ["Digital Art", "Illustration"],
  },

  // === ENVIRONMENT MODELING & TEXTURING ===
  {
    id: "anindita-naskar",
    studentName: "Anindita Naskar",
    category: "environment-modeling",
    course: "Environment Modeling & Texturing",
    description: "Detailed environment art with realistic texturing and composition.",
    featuredImage: portfolio("environment-modeling", "anindita-naskar-page1.jpg"),
    images: Array.from({ length: 7 }, (_, i) => portfolio("environment-modeling", `anindita-naskar-page${i + 1}.jpg`)),
    tags: ["Environment Art", "Texturing"],
  },
  {
    id: "raghav-gupta",
    studentName: "Raghav Gupta",
    category: "environment-modeling",
    course: "Environment Modeling & Texturing",
    description: "Professional environment modeling with excellent attention to detail.",
    featuredImage: portfolio("environment-modeling", "raghav-gupta-page1.jpg"),
    images: Array.from({ length: 11 }, (_, i) => portfolio("environment-modeling", `raghav-gupta-page${i + 1}.jpg`)),
    tags: ["Environment Design", "3D Art"],
  },
  {
    id: "sayan-chowdhury",
    studentName: "Sayan Chowdhury",
    category: "environment-modeling",
    course: "Environment Modeling & Texturing",
    description: "Stunning environment art with atmospheric lighting.",
    featuredImage: portfolio("environment-modeling", "sayan-chowdhury-page1.jpg"),
    images: Array.from({ length: 7 }, (_, i) => portfolio("environment-modeling", `sayan-chowdhury-page${i + 1}.jpg`)),
    tags: ["Environment Art", "Lighting"],
  },
  {
    id: "tejaswini-lagad",
    studentName: "Tejaswini Haribhau Lagad",
    category: "environment-modeling",
    course: "Environment Modeling & Texturing",
    description: "Creative environment designs with strong visual storytelling.",
    featuredImage: portfolio("environment-modeling", "tejaswini-haribhau-lagad-page1.jpg"),
    images: Array.from({ length: 10 }, (_, i) => portfolio("environment-modeling", `tejaswini-haribhau-lagad-page${i + 1}.jpg`)),
    tags: ["Environment Design", "Storytelling"],
  },

  // === MATTE PAINTING ===
  {
    id: "akshat-asolkar",
    studentName: "Akshat Asolkar",
    category: "matte-painting",
    course: "Matte Painting",
    description: "Impressive matte paintings with photorealistic quality.",
    featuredImage: portfolio("matte-painting", "akshat-asolkar.jpg"),
    images: [portfolio("matte-painting", "akshat-asolkar.jpg")],
    tags: ["Matte Painting", "VFX"],
  },
  {
    id: "biswabrata-dutta",
    studentName: "Biswabrata Dutta",
    category: "matte-painting",
    course: "Matte Painting",
    description: "Cinematic matte painting with excellent composition.",
    featuredImage: portfolio("matte-painting", "biswabrata-dutta-page1.jpg"),
    images: Array.from({ length: 4 }, (_, i) => portfolio("matte-painting", `biswabrata-dutta-page${i + 1}.jpg`)),
    tags: ["Matte Painting", "Cinematic"],
  },
  {
    id: "krishna-bhatia",
    studentName: "Krishna Bhatia",
    category: "matte-painting",
    course: "Matte Painting",
    description: "Professional matte painting for film and media.",
    featuredImage: portfolio("matte-painting", "krishna-bhatia.jpg"),
    images: [portfolio("matte-painting", "krishna-bhatia.jpg")],
    tags: ["Matte Painting", "Film"],
  },
];

// Helper: Get entries by category
export function getEntriesByCategory(categoryId: string): PortfolioEntry[] {
  if (categoryId === "all") return portfolioEntries;
  return portfolioEntries.filter((entry) => entry.category === categoryId);
}

// Helper: Get category by ID
export function getCategoryById(id: string): PortfolioCategory | undefined {
  return categories.find((cat) => cat.id === id);
}

// Helper: Get all unique tags
export function getAllTags(): string[] {
  const tags = new Set<string>();
  portfolioEntries.forEach((entry) => entry.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

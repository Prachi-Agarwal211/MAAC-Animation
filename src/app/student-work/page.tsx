import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import MagneticButton from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Student Work - maacanimationjaipur.com",
  description:
    "At MAAC Animation Institute, we're committed to empowering aspiring artists and filmmakers to unleash their creative potential, hone their skills,",
  keywords: [
    "student work animation jaipur",
    "maac student projects",
    "animation student portfolio",
    "vfx student work jaipur",
    "gaming design student projects",
  ],
  openGraph: {
    type: "website",
    title: "Student Work - maacanimationjaipur.com",
    description:
      "At MAAC Animation Institute, we're committed to empowering aspiring artists and filmmakers to unleash their creative potential, hone their skills,",
    url: "https://www.maacanimationjaipur.com/student-work/",
    siteName: "maacanimationjaipur.com",
    locale: "en_US",
    images: [
      {
        url: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/07/Screenshot-2025-07-04-163930-400x89.png",
        width: 1200,
        height: 630,
        alt: "MAAC Animation Jaipur Student Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Work - maacanimationjaipur.com",
    description:
      "At MAAC Animation Institute, we're committed to empowering aspiring artists and filmmakers to unleash their creative potential, hone their skills,",
    images: [
      "https://www.maacanimationjaipur.com/wp-content/uploads/2025/07/Screenshot-2025-07-04-163930-400x89.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.maacanimationjaipur.com/student-work/",
  },
};

const studentProjects = [
  {
    id: 1,
    title: "Character Animation Showreel",
    student: "Rahul Sharma",
    category: "animation",
    course: "3D Animation",
    description: "A stunning character animation sequence demonstrating body mechanics, facial expressions, and emotional performance.",
    image: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/07/Screenshot-2025-07-04-163930-400x89.png",
    tags: ["Maya", "Character Animation", "Body Mechanics"],
  },
  {
    id: 2,
    title: "Photorealistic Interior Visualization",
    student: "Priya Singh",
    category: "design",
    course: "Architectural Design",
    description: "A photorealistic interior render showcasing advanced lighting techniques and material work.",
    image: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/DAFM.jpg",
    tags: ["3ds Max", "V-Ray", "Interior Design"],
  },
  {
    id: 3,
    title: "VFX Breakdown - Destruction Scene",
    student: "Amit Patel",
    category: "vfx",
    course: "VFX",
    description: "A complete VFX breakdown showing the process of creating a building destruction sequence.",
    image: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/07/Screenshot-2025-07-05-210336.png",
    tags: ["Houdini", "Nuke", "Simulation"],
  },
  {
    id: 4,
    title: "Game Environment Art",
    student: "Neha Verma",
    category: "gaming",
    course: "Gaming Design",
    description: "A detailed game-ready environment with modular assets and optimized PBR textures.",
    image: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/2020-07-05_23-03-12-500x498-1.jpg",
    tags: ["Unreal Engine", "Substance Painter", "Environment Art"],
  },
  {
    id: 5,
    title: "Short Film - 'The Last Light'",
    student: "Karan Mehta",
    category: "animation",
    course: "DAFM",
    description: "An award-winning animated short film exploring themes of hope and perseverance.",
    image: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/3.jpg",
    tags: ["Maya", "After Effects", "Short Film"],
  },
  {
    id: 6,
    title: "Brand Identity Design",
    student: "Sneha Joshi",
    category: "design",
    course: "Graphic Design",
    description: "A comprehensive brand identity package including logo, stationery, and brand guidelines.",
    image: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/Graphic-Design-Course.jpg",
    tags: ["Illustrator", "Photoshop", "Branding"],
  },
  {
    id: 7,
    title: "Creature Animation Reel",
    student: "Vikram Rathore",
    category: "animation",
    course: "AD3D Edge",
    description: "Advanced creature animation showcasing quadruped locomotion and fantasy creature performance.",
    image: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/AD3D-Edge.jpg",
    tags: ["Maya", "Creature Animation", "Advanced"],
  },
  {
    id: 8,
    title: "Motion Graphics Package",
    student: "Ananya Gupta",
    category: "vfx",
    course: "ADVFX",
    description: "A broadcast-ready motion graphics package for a news channel including titles, lower thirds, and transitions.",
    image: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/APDMD-300x300.jpg",
    tags: ["After Effects", "Motion Graphics", "Broadcast"],
  },
  {
    id: 9,
    title: "Mobile Game Prototype",
    student: "Arjun Chauhan",
    category: "gaming",
    course: "DGDI",
    description: "A fully playable mobile game prototype with complete art assets and UI implementation.",
    image: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/2020-07-05_23-03-12-500x498-1.jpg",
    tags: ["Unity", "Game Design", "Mobile"],
  },
  {
    id: 10,
    title: "Documentary Film",
    student: "Meera Kapoor",
    category: "design",
    course: "DFM",
    description: "A short documentary film exploring the craft of traditional Rajasthani artisans.",
    image: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/Graphic-Design-Course.jpg",
    tags: ["Premiere Pro", "DaVinci Resolve", "Documentary"],
  },
  {
    id: 11,
    title: "Compositing Showreel",
    student: "Rohan Desai",
    category: "vfx",
    course: "ADVFX",
    description: "Professional compositing showreel demonstrating advanced multi-layer CG integration.",
    image: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/07/Screenshot-2025-07-05-210336.png",
    tags: ["Nuke", "Compositing", "CG Integration"],
  },
  {
    id: 12,
    title: "Social Media Campaign",
    student: "Divya Sharma",
    category: "design",
    course: "APDMD",
    description: "A complete social media campaign with graphics, videos, and animated stories.",
    image: "https://www.maacanimationjaipur.com/wp-content/uploads/2025/06/APDMD-300x300.jpg",
    tags: ["Photoshop", "After Effects", "Social Media"],
  },
];

const categories = [
  { id: "all", label: "All Work" },
  { id: "animation", label: "Animation" },
  { id: "vfx", label: "VFX" },
  { id: "gaming", label: "Gaming" },
  { id: "design", label: "Design" },
];

export default function StudentWorkPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="student-work-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Student Work - MAAC Animation Jaipur",
            description:
              "At MAAC Animation Institute, we're committed to empowering aspiring artists and filmmakers to unleash their creative potential, hone their skills,",
            url: "https://www.maacanimationjaipur.com/student-work/",
            image:
              "https://www.maacanimationjaipur.com/wp-content/uploads/2025/07/Screenshot-2025-07-04-163930-400x89.png",
            publisher: {
              "@type": "Organization",
              name: "MAAC Animation Jaipur",
              sameAs: "https://www.maacanimationjaipur.com",
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1A0508 0%, #0C0C0C 50%, #0C0C0C 100%)" }}
        />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #E31837 0%, transparent 70%)" }} />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #C4A882 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-[#6B6560]">
                <li><Link href="/" className="hover:text-[#E31837] transition-colors">Home</Link></li>
                <li>/</li>
                <li className="text-[#A8A29C]">Student Work</li>
              </ol>
            </nav>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[#F0EBE1] leading-[1.1] mb-6">
              Student Work
            </h1>
            <p className="text-[#A8A29C] text-lg md:text-xl leading-relaxed max-w-2xl">
              At MAAC Animation Institute, we&apos;re committed to empowering aspiring artists and filmmakers to unleash their creative potential, hone their skills, and build professional portfolios that open doors to the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 md:py-28 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="px-6 py-3 rounded-full border border-white/10 text-[#A8A29C] hover:border-[#E31837]/50 hover:text-[#E31837] transition-all duration-300 text-sm font-medium bg-[#161616]"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-[#161616] rounded-xl overflow-hidden border border-white/5 hover:border-[#E31837]/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-[#1A1A1A]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#E31837]/90 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-semibold text-[#F0EBE1] text-lg mb-2 group-hover:text-[#E31837] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#6B6560] text-sm mb-3">
                    By {project.student} &middot; {project.course}
                  </p>
                  <p className="text-[#A8A29C] text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/5 text-[#6B6560] px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 md:py-28"
        style={{ background: "linear-gradient(135deg, #2A080C 0%, #170406 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F0EBE1] mb-6">
            Ready to Create Your Own Masterpiece?
          </h2>
          <p className="text-[#A8A29C] text-lg mb-10 max-w-2xl mx-auto">
            Join MAAC Jaipur and build a professional portfolio that gets you hired. Book a free demo class today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton>
              <Link
                href="/demo-class"
                className="btn bg-gradient-to-r from-[#E31837] to-[#C4132D] text-white hover:opacity-90 border border-[#E31837]/50 px-8 py-4 rounded-lg font-semibold shadow-[0_0_20px_rgba(227,24,55,0.3)]"
              >
                Book Free Demo Class
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/courses"
                className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-4 rounded-lg font-semibold"
              >
                Explore Courses
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}

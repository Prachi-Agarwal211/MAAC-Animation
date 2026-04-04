"use client";
import { useState } from "react";
import Image from "next/image";

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

export default function StudentWorkGallery() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? studentProjects
    : studentProjects.filter(p => p.category === activeFilter);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-6 py-3 rounded-full border text-sm font-medium transition-all duration-300 ${
              activeFilter === cat.id
                ? "border-[#E31837] text-[#E31837] bg-[#E31837]/10"
                : "border-white/10 text-[#A8A29C] hover:border-[#E31837]/50 hover:text-[#E31837] bg-[#161616]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="group bg-[#161616] rounded-xl overflow-hidden border border-white/5 hover:border-[#E31837]/30 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden bg-[#1A1A1A]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
    </>
  );
}

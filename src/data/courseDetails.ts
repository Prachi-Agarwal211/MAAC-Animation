export interface CourseDetail {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  duration: string;
  fee: string;
  eligibility: string;
  image: string;
  careers: string[];
  software: string[];
  highlights: string[];
  curriculum: string[];
  keywords: string[];
}

export const courseDetails: CourseDetail[] = [
  {
    slug: "3d-animation",
    title: "3D Animation Courses in Jaipur",
    shortTitle: "3D Animation",
    description:
      "Master 3D animation with Autodesk Maya, ZBrush, and industry-standard tools at MAAC Jaipur. B.Voc Degree & Diploma programs with 95% placement.",
    longDescription:
      "Dive into the world of 3D animation at MAAC Jaipur — Rajasthan's premier animation institute. Our 3D Animation program covers character animation, modeling, texturing, rigging, lighting, and rendering using industry-standard software like Autodesk Maya, ZBrush, 3ds Max, and Arnold Renderer. Learn from faculty with 10-15 years of studio experience at companies like DNEG, Prime Focus, and MPC. Build a professional showreel and portfolio that showcases your skills to top studios worldwide.",
    duration: "12-36 months",
    fee: "₹60,000 - ₹3,11,000",
    eligibility: "10+2 or equivalent",
    image: "/courses_images/ed_animation.png",
    careers: [
      "3D Animator",
      "Character Designer",
      "Storyboard Artist",
      "Rigging Artist",
      "Lighting Artist",
      "Game Asset Artist",
    ],
    software: [
      "Autodesk Maya",
      "ZBrush",
      "3ds Max",
      "Substance Painter",
      "Arnold Renderer",
      "V-Ray",
    ],
    highlights: [
      "B.Voc Degree option (UGC recognized)",
      "NSDC & MESC certified programs",
      "95% placement record",
      "Live studio projects",
      "Industry-experienced faculty",
      "State-of-the-art rendering farm",
    ],
    curriculum: [
      "Fundamentals of Drawing & Design",
      "3D Modeling & Sculpting",
      "Texturing & Material Design",
      "Character Rigging & Setup",
      "Character Animation (Body & Face)",
      "Lighting & Rendering",
      "Compositing & Post-Production",
      "Portfolio & Showreel Development",
    ],
    keywords: [
      "3d animation course jaipur",
      "maya animation course",
      "character animation training",
      "3d animator course jaipur",
      "animation diploma jaipur",
    ],
  },
  {
    slug: "vfx",
    title: "VFX Courses in Jaipur",
    shortTitle: "Visual Effects (VFX)",
    description:
      "Learn VFX compositing, rotoscopy, motion tracking & CG integration at MAAC Jaipur. Master Nuke, After Effects, and Houdini. 95% placement.",
    longDescription:
      "Step into the world of visual effects at MAAC Jaipur. Our VFX program teaches you everything from rotoscopy and paint prep to advanced compositing and CG integration. Master industry-standard tools like Nuke, After Effects, Fusion, and Houdini. Work on real film and OTT projects under the guidance of VFX professionals who have worked on Hollywood blockbusters. Our curriculum covers the complete VFX pipeline used at studios like DNEG, MPC, and Redchillies VFX.",
    duration: "12-24 months",
    fee: "₹80,000 - ₹2,11,000",
    eligibility: "10+2 or equivalent",
    image: "/courses_images/vfx.jpeg",
    careers: [
      "VFX Compositor",
      "Rotoscope Artist",
      "Motion Graphics Artist",
      "FX Artist",
      "Matte Painter",
      "Pre-visualization Artist",
    ],
    software: [
      "Nuke",
      "After Effects",
      "Fusion",
      "Houdini",
      "Silhouette",
      "Mocha Pro",
    ],
    highlights: [
      "Work on real film projects",
      "Nuke & Houdini certified training",
      "VFX pipeline mastery",
      "Showreel with film-quality shots",
      "Studio-ready skills",
      "Placement at top VFX studios",
    ],
    curriculum: [
      "Foundations of Visual Effects",
      "Rotoscoping & Paint Prep",
      "Compositing (2D & 3D)",
      "Motion Tracking & Matchmoving",
      "CG Integration & Layering",
      "Dynamics & Simulation",
      "Color Grading & Finishing",
      "Showreel Development",
    ],
    keywords: [
      "vfx course jaipur",
      "vfx training jaipur",
      "compositing course jaipur",
      "visual effects institute jaipur",
      "nuke course jaipur",
    ],
  },
  {
    slug: "game-design",
    title: "Game Design Course in Jaipur",
    shortTitle: "Game Design",
    description:
      "Learn game design, 3D modeling for games, level design & engine integration at MAAC Jaipur. Master Unity & Unreal Engine. 95% placement.",
    longDescription:
      "Launch your gaming career at MAAC Jaipur. Our Game Design program covers everything from concept art and character modeling to level design and engine integration using Unity and Unreal Engine 5. Learn to create immersive game worlds, design engaging gameplay mechanics, and optimize assets for real-time rendering. With India's gaming industry valued at $2.6 billion and growing, now is the perfect time to build a career in game design.",
    duration: "12-24 months",
    fee: "₹80,000 - ₹2,11,000",
    eligibility: "10+2 or equivalent",
    image: "/courses_images/game_design.jpeg",
    careers: [
      "Game Artist",
      "Level Designer",
      "3D Modeler (Games)",
      "Game Animator",
      "Game Programmer",
      "UI/UX Designer (Games)",
    ],
    software: [
      "Unreal Engine 5",
      "Unity",
      "Maya",
      "Blender",
      "Substance Painter",
      "ZBrush",
    ],
    highlights: [
      "Unreal Engine 5 & Unity training",
      "Real-time 3D production",
      "Game jam & hackathon events",
      "Portfolio with playable demos",
      "Industry mentorship program",
      "Placement at Ubisoft, EA, Rockstar",
    ],
    curriculum: [
      "Game Art & Concept Design",
      "3D Modeling for Games",
      "Texturing & Material Creation",
      "Character & Vehicle Animation",
      "Level Design & World Building",
      "Game Engine Integration (UE5/Unity)",
      "Gameplay Mechanics & Scripting",
      "Portfolio & Demo Reel",
    ],
    keywords: [
      "game design course jaipur",
      "game development training jaipur",
      "unreal engine course jaipur",
      "unity course jaipur",
      "game artist course",
    ],
  },
  {
    slug: "digital-content",
    title: "Digital Content Creation Course in Jaipur",
    shortTitle: "Digital Content Creation",
    description:
      "Master digital content creation — video editing, social media design, UI/UX, and motion graphics at MAAC Jaipur. B.Voc Degree available.",
    longDescription:
      "Become a versatile digital content creator at MAAC Jaipur. This program covers video editing, graphic design, UI/UX design, social media content strategy, and motion graphics. Learn to create compelling content for YouTube, Instagram, OTT platforms, and digital advertising. Master tools like Adobe Premiere Pro, After Effects, Photoshop, Illustrator, and Figma. Whether you want to be a YouTuber, social media manager, or digital designer, this program gives you all the skills you need.",
    duration: "6-24 months",
    fee: "₹50,000 - ₹1,80,000",
    eligibility: "10+2 or equivalent",
    image: "/courses_images/apdmd.jpeg",
    careers: [
      "Graphic Designer",
      "Video Producer",
      "Social Media Designer",
      "UI/UX Designer",
      "Motion Graphics Artist",
      "Content Strategist",
    ],
    software: [
      "Adobe Premiere Pro",
      "After Effects",
      "Photoshop",
      "Illustrator",
      "Figma",
      "DaVinci Resolve",
    ],
    highlights: [
      "Learn 6+ creative software tools",
      "Real social media projects",
      "Freelancing & entrepreneurship guidance",
      "B.Voc Degree option",
      "Portfolio with live campaigns",
      "Industry-relevant curriculum",
    ],
    curriculum: [
      "Fundamentals of Design & Color Theory",
      "Video Editing & Post-Production",
      "Graphic Design for Digital Media",
      "Motion Graphics & Animation",
      "UI/UX Design Principles",
      "Social Media Content Strategy",
      "Photography & Visual Storytelling",
      "Portfolio & Personal Branding",
    ],
    keywords: [
      "digital content creation course jaipur",
      "video editing course jaipur",
      "ui ux design course jaipur",
      "graphic design course jaipur",
      "social media marketing course",
    ],
  },
  {
    slug: "broadcast-motion",
    title: "Motion Graphics & Broadcast Design Course in Jaipur",
    shortTitle: "Broadcast & Motion Graphics",
    description:
      "Master motion graphics, broadcast design, and visual communication at MAAC Jaipur. Learn After Effects, Cinema 4D, and broadcast tools.",
    longDescription:
      "Create stunning motion graphics for TV, advertising, and digital media at MAAC Jaipur. Our Broadcast & Motion Graphics program teaches you to design dynamic title sequences, lower thirds, explainer videos, and broadcast packages. Master After Effects, Cinema 4D, and industry broadcast design workflows. Learn from professionals who have worked on TV shows, sports broadcasts, and advertising campaigns.",
    duration: "6-18 months",
    fee: "₹50,000 - ₹1,50,000",
    eligibility: "10+2 or equivalent",
    image: "/courses_images/vfx_plus.jpeg",
    careers: [
      "Motion Graphics Artist",
      "Broadcast Designer",
      "UI Designer",
      "Video Editor",
      "Title Designer",
      "Explainer Video Animator",
    ],
    software: [
      "After Effects",
      "Cinema 4D",
      "Premiere Pro",
      "Photoshop",
      "Illustrator",
      "Nuke",
    ],
    highlights: [
      "Broadcast-ready portfolio",
      "TV & advertising project experience",
      "Cinema 4D integration",
      "Live client projects",
      "Industry-standard workflows",
      "Placement in media houses",
    ],
    curriculum: [
      "Principles of Motion Design",
      "After Effects Mastery",
      "Cinema 4D for Broadcast",
      "Title Sequence Design",
      "Lower Thirds & Infographics",
      "Broadcast Package Design",
      "Explainer Video Production",
      "Showreel Development",
    ],
    keywords: [
      "motion graphics course jaipur",
      "broadcast design course",
      "after effects course jaipur",
      "cinema 4d training jaipur",
      "motion design institute",
    ],
  },
  {
    slug: "filmmaking-photography",
    title: "Filmmaking & Photography Course in Jaipur",
    shortTitle: "Filmmaking & Photography",
    description:
      "Learn cinematic filmmaking, video production, editing, and post-production at MAAC Jaipur. Master the complete film pipeline.",
    longDescription:
      "Turn your creative vision into reality at MAAC Jaipur. Our Filmmaking & Photography program covers the complete production pipeline — from scriptwriting and storyboarding to cinematography, directing, editing, and post-production. Learn camera operation, lighting techniques, sound design, and color grading. Whether you want to make short films, documentaries, commercials, or music videos, this program gives you hands-on experience with professional equipment and workflows.",
    duration: "6-18 months",
    fee: "₹50,000 - ₹1,50,000",
    eligibility: "10+2 or equivalent",
    image: "/courses_images/dafm.jpeg",
    careers: [
      "Video Editor",
      "Cinematographer",
      "Film Director",
      "Content Creator",
      "Documentary filmmaker",
      "Commercial Producer",
    ],
    software: [
      "Premiere Pro",
      "DaVinci Resolve",
      "After Effects",
      "Audition",
      "Photoshop",
      "Final Cut Pro",
    ],
    highlights: [
      "Hands-on camera & lighting training",
      "Short film production projects",
      "Professional editing suite access",
      "Documentary & commercial projects",
      "Industry guest lectures",
      "Film festival submissions",
    ],
    curriculum: [
      "Scriptwriting & Storytelling",
      "Cinematography & Camera Operation",
      "Lighting for Film & Video",
      "Directing & Production Management",
      "Video Editing & Post-Production",
      "Sound Design & Mixing",
      "Color Grading & Finishing",
      "Short Film & Documentary Projects",
    ],
    keywords: [
      "filmmaking course jaipur",
      "video production course jaipur",
      "cinematography course",
      "film editing course jaipur",
      "photography course jaipur",
    ],
  },
  {
    slug: "specialized-bootcamp",
    title: "Specialized Skill Enhancement Courses in Jaipur",
    shortTitle: "Skill Enhancement Bootcamp",
    description:
      "Short-term specialized courses in Blender, Maya, Cinema 4D, and more at MAAC Jaipur. Upsskill fast with focused training programs.",
    longDescription:
      "Upgrade your creative skills with MAAC Jaipur's specialized bootcamp programs. These short-term, intensive courses focus on specific tools and techniques — from Blender and Maya to Cinema 4D and Digital Photography. Perfect for working professionals, college students, or anyone looking to add new skills to their toolkit. Learn from industry experts in focused, hands-on sessions.",
    duration: "3-6 months",
    fee: "₹30,000 - ₹80,000",
    eligibility: "Basic computer knowledge",
    image: "/courses_images/skill_enhance.jpeg",
    careers: [
      "Freelance 3D Artist",
      "Social Media Content Creator",
      "YouTube Creator",
      "Corporate Designer",
      "Freelance Photographer",
      "Studio Technician",
    ],
    software: [
      "Blender",
      "Maya",
      "Cinema 4D",
      "3ds Max",
      "Photoshop",
      "Lightroom",
    ],
    highlights: [
      "Short-term focused training",
      "Tool-specific mastery",
      "Flexible batch timings",
      "Hands-on projects",
      "Certificate of completion",
      "Affordable pricing",
    ],
    curriculum: [
      "Tool Fundamentals & Interface",
      "Core Techniques & Workflows",
      "Advanced Features & Tips",
      "Real-world Project Work",
      "Portfolio Development",
      "Industry Best Practices",
    ],
    keywords: [
      "blender course jaipur",
      "maya course jaipur",
      "cinema 4d course jaipur",
      "short term animation course",
      "skill enhancement course jaipur",
    ],
  },
];

export function getCourseBySlug(slug: string): CourseDetail | undefined {
  return courseDetails.find((c) => c.slug === slug);
}

export function getAllCourseSlugs(): string[] {
  return courseDetails.map((c) => c.slug);
}

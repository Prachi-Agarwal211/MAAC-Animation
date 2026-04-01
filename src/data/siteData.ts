export const coursesData = {
  categories: [
    {
      id: "animation",
      title: "3D Animation",
      subtitle: "Master the art of storytelling",
      description: "Master the art of storytelling through high-quality animation and industry-standard techniques",
      fullDescription: "Become a 3D Animator, Character Designer, Storyboard Artist, or Lighting Artist in the animation industry. Learn Autodesk Maya, 3ds Max, and industry-standard tools.",
      image: "/courses/3d-animation.jpg",
      icon: "🎬",
      careers: ["3D Animator", "Character Designer", "Storyboard Artist", "Lighting Artist"],
    },
    {
      id: "digital-content",
      title: "Digital Content Creation",
      subtitle: "Build a career in digital media",
      description: "Build a career in digital media, social media content creation, short filmmaking, and video production. Ideal for influencers and YouTubers",
      fullDescription: "Create engaging content for YouTube, Instagram, and other digital platforms. Master video editing, content strategy, and audience engagement.",
      image: "/courses/digital-content.jpg",
      icon: "📱",
      careers: ["Content Creator", "Video Editor", "Social Media Manager", "YouTuber"],
    },
    {
      id: "gaming",
      title: "Game Design",
      subtitle: "Gain expertise in game design",
      description: "Gain expertise in game design, asset creation, and real-time rendering for mobile, online, and console gaming",
      fullDescription: "Design and develop games for multiple platforms. Learn game mechanics, level design, character creation, and game engine integration.",
      image: "/courses/game-design.jpg",
      icon: "🎮",
      careers: ["Game Designer", "Level Designer", "Game Artist", "Unity Developer"],
    },
    {
      id: "vfx",
      title: "VFX Courses",
      subtitle: "Develop high-end visual effects skills",
      description: "Develop high-end visual effects skills for film, television, and OTT platforms using industry-standard tools",
      fullDescription: "Create stunning visual effects for movies, TV shows, and OTT content. Master compositing, motion tracking, and CG integration.",
      image: "/courses/vfx.jpg",
      icon: "✨",
      careers: ["VFX Artist", "Compositor", "Roto Artist", "Matchmove Artist"],
    },
    {
      id: "motion-graphics",
      title: "Motion Graphics & Broadcast Design",
      subtitle: "Explore motion graphics and advertising",
      description: "Explore motion graphics, advertising, and digital media production for film and television",
      fullDescription: "Create dynamic motion graphics for TV, advertising, and digital media. Learn After Effects, Cinema 4D, and broadcast design principles.",
      image: "/courses/motion-graphics.jpg",
      icon: "🎨",
      careers: ["Motion Graphics Artist", "Broadcast Designer", "Title Designer", "Animator"],
    },
    {
      id: "skill-enhancement",
      title: "Skill Enhancement Courses",
      subtitle: "Fast-track your career",
      description: "Fast-track your career with specialized short-term courses in animation, VFX, game design, and more",
      fullDescription: "Upgrade your skills with focused short-term programs. Perfect for working professionals looking to specialize or upskill.",
      image: "/courses/skill-enhancement.jpg",
      icon: "🚀",
      careers: ["Specialized Artist", "Freelancer", "Independent Creator"],
    },
  ],
  popularCourses: [
    {
      name: "ADVFX",
      fullName: "Advanced Program in Visual Effects",
      duration: "24 Months",
      description:
        "Master compositing, rotoscopy, paint prep, matchmoving, and CG integration with real-world studio projects.",
    },
    {
      name: "AD3D Edge",
      fullName: "Advanced Program in 3D Animation",
      duration: "24 Months",
      description:
        "Comprehensive training in modeling, texturing, rigging, lighting, and character animation using Autodesk Maya.",
    },
    {
      name: "DGDI",
      fullName: "Program in Game Design & Integration",
      duration: "24 Months",
      description:
        "Learn game art, game design, level design, and game engine integration for next-gen gaming platforms.",
    },
    {
      name: "APDMD",
      fullName: "Advanced Program in Digital Media & Design",
      duration: "24 Months",
      description:
        "Master graphic design, web design, UI/UX, motion graphics, and digital marketing for the modern creative industry.",
    },
    {
      name: "D3D",
      fullName: "Program in 3D Animation",
      duration: "18 Months",
      description:
        "Foundation to intermediate training in 3D animation, covering all aspects of the 3D production pipeline.",
    },
    {
      name: "VFX Plus",
      fullName: "Program in Visual Effects",
      duration: "18 Months",
      description:
        "Comprehensive VFX training covering compositing, motion graphics, and visual effects for films and television.",
    },
  ],
};

export const testimonialsData = [
  {
    name: "Priya Sharma",
    role: "VFX Artist at DNEG",
    text: "MAAC transformed my passion for visual effects into a thriving career. The faculty and infrastructure are world-class. The hands-on projects prepared me for real studio work.",
  },
  {
    name: "Rahul Verma",
    role: "3D Animator at Prime Focus",
    text: "The practical approach to learning at MAAC gave me the skills and confidence to work on international projects. The industry connections are invaluable.",
  },
  {
    name: "Ananya Singh",
    role: "Game Designer at Ubisoft",
    text: "MAAC's gaming program is comprehensive and industry-relevant. The mentors are experienced professionals who genuinely care about student success.",
  },
  {
    name: "Karan Mehta",
    role: "Motion Graphics Artist",
    text: "The best decision I made was joining MAAC. The curriculum is constantly updated with industry trends and the placement support is excellent.",
  },
];

export const placementCompanies = [
  "DNEG",
  "Prime Focus",
  "Redchillies VFX",
  "MPC",
  "Technicolor",
  "Method Studios",
  "Ubisoft",
  "EA Games",
  "Rockstar Games",
  "Makuta VFX",
  "DQ Entertainment",
  "Green Gold Animation",
  "Reliance MediaWorks",
  "Xentrix Studios",
];

export const statsData = [
  { number: "50+", label: "Years of Excellence" },
  { number: "100+", label: "Centers Across India" },
  { number: "500K+", label: "Students Trained" },
  { number: "95%", label: "Placement Rate" },
];

export const awardsData = [
  "Best Animation Institute - FICCI BAF Awards",
  "Excellence in Media Education - CMAI Awards",
  "Best VFX Training Institute - Asianet Awards",
  "Education Leadership Award - World Education Summit",
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "Animation", href: "/courses/animation" },
      { label: "Visual Effects", href: "/courses/vfx" },
      { label: "Gaming", href: "/courses/gaming" },
      { label: "Filmmaking", href: "/courses/filmmaking" },
      { label: "Digital Media", href: "/courses/digital-media" },
      { label: "Architectural Design", href: "/courses/architectural" },
    ],
  },
  { label: "Placements", href: "/placements" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

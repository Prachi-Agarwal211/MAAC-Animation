export const coursesData = {
  categories: [
    {
      id: "animation",
      title: "3D Animation",
      subtitle: "Master the art of storytelling",
      description: "Master high-quality animation with industry-standard techniques and real studio workflows",
      fullDescription: "Become a 3D Animator, Character Designer, Storyboard Artist, or Lighting Artist. Learn Autodesk Maya, 3ds Max, and industry-standard tools used in major studios.",
      icon: "animation",
      careers: ["3D Animator", "Character Designer", "Storyboard Artist", "Lighting Artist"],
    },
    {
      id: "digital-content",
      title: "Digital Content Creation",
      subtitle: "Build a career in digital media",
      description: "Create content for social media, YouTube, and OTT platforms with professional production skills",
      fullDescription: "Create engaging content for YouTube, Instagram, and digital platforms. Master video editing, content strategy, and audience engagement.",
      icon: "digital",
      careers: ["Content Creator", "Video Editor", "Social Media Manager", "YouTuber"],
    },
    {
      id: "gaming",
      title: "Game Design",
      subtitle: "Gain expertise in game design",
      description: "Design games, build assets, and master real-time rendering for mobile, PC, and console",
      fullDescription: "Design and develop games for multiple platforms. Learn game mechanics, level design, character creation, and game engine integration.",
      icon: "gaming",
      careers: ["Game Designer", "Level Designer", "Game Artist", "Unity Developer"],
    },
    {
      id: "vfx",
      title: "VFX Courses",
      subtitle: "Develop high-end visual effects",
      description: "Create stunning VFX for film, television, and OTT using industry-standard compositing tools",
      fullDescription: "Create stunning visual effects for movies, TV shows, and OTT content. Master compositing, motion tracking, and CG integration.",
      icon: "vfx",
      careers: ["VFX Artist", "Compositor", "Roto Artist", "Matchmove Artist"],
    },
    {
      id: "motion-graphics",
      title: "Motion Graphics & Broadcast",
      subtitle: "Explore motion graphics and advertising",
      description: "Produce dynamic motion graphics for TV, advertising, and digital media production",
      fullDescription: "Create dynamic motion graphics for TV, advertising, and digital media. Learn After Effects, Cinema 4D, and broadcast design principles.",
      icon: "motion",
      careers: ["Motion Graphics Artist", "Broadcast Designer", "Title Designer", "Animator"],
    },
    {
      id: "skill-enhancement",
      title: "Skill Enhancement",
      subtitle: "Fast-track your career",
      description: "Short-term specialized courses to upskill in animation, VFX, game design, and more",
      fullDescription: "Upgrade your skills with focused short-term programs. Perfect for working professionals looking to specialize or upskill.",
      icon: "skill",
      careers: ["Specialized Artist", "Freelancer", "Independent Creator"],
    },
  ],
  popularCourses: [
    {
      name: "ADVFX",
      fullName: "Advanced Program in Visual Effects",
      duration: "24 Months",
      description: "Master compositing, rotoscopy, paint prep, matchmoving, and CG integration with real-world studio projects.",
      code: "ADVFX-24",
    },
    {
      name: "AD3D Edge",
      fullName: "Advanced Program in 3D Animation",
      duration: "24 Months",
      description: "Comprehensive training in modeling, texturing, rigging, lighting, and character animation using Autodesk Maya.",
      code: "AD3D-24",
    },
    {
      name: "DGDI",
      fullName: "Program in Game Design & Integration",
      duration: "24 Months",
      description: "Learn game art, game design, level design, and game engine integration for next-gen gaming platforms.",
      code: "DGDI-24",
    },
    {
      name: "APDMD",
      fullName: "Advanced Program in Digital Media & Design",
      duration: "24 Months",
      description: "Master graphic design, web design, UI/UX, motion graphics, and digital marketing for the modern creative industry.",
      code: "APDMD-24",
    },
    {
      name: "D3D",
      fullName: "Program in 3D Animation",
      duration: "18 Months",
      description: "Foundation to intermediate training in 3D animation, covering all aspects of the 3D production pipeline.",
      code: "D3D-18",
    },
    {
      name: "VFX Plus",
      fullName: "Program in Visual Effects",
      duration: "18 Months",
      description: "Comprehensive VFX training covering compositing, motion graphics, and visual effects for films and television.",
      code: "VFXP-18",
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
  { number: 30, suffix: "+", label: "Years of Excellence" },
  { number: 100, suffix: "+", label: "Centers Across India" },
  { number: 50, suffix: "K+", label: "Students Trained" },
  { number: 95, suffix: "%", label: "Placement Rate" },
];

export const awardsData = [
  { year: "2024", name: "Best Animation Institute", org: "FICCI BAF Awards" },
  { year: "2023", name: "Excellence in Media Education", org: "CMAI Awards" },
  { year: "2022", name: "Best VFX Training Institute", org: "Asianet Awards" },
  { year: "2021", name: "Education Leadership Award", org: "World Education Summit" },
];

export const tickerStats = [
  "95% Placement Rate",
  "30+ Years of Excellence",
  "500+ Partner Companies",
  "50K+ Alumni Network",
  "NSDC Certified",
  "B.Voc Degree Available",
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Courses",
    href: "/#courses",
    children: [
      { label: "Animation", href: "/#courses", icon: "animation" },
      { label: "Visual Effects", href: "/#courses", icon: "vfx" },
      { label: "Gaming", href: "/#courses", icon: "gaming" },
      { label: "Filmmaking", href: "/#courses", icon: "animation" },
      { label: "Digital Media", href: "/#courses", icon: "digital" },
      { label: "Architectural Design", href: "/#courses", icon: "motion" },
    ],
  },
  { label: "Placements", href: "/placements" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const contactInfo = {
  phone: "+91-141-4035604",
  whatsapp: "+91-141-4035604",
  email: "jaipur@maacindia.com",
  address: "MAAC Jaipur, C-44, Malviya Nagar Industrial Area, Jaipur, Rajasthan 302017",
  googleMapsUrl: "https://maps.google.com/?q=MAAC+Jaipur+Malviya+Nagar",
  hours: "Mon–Sat 9:00 AM – 7:00 PM",
};

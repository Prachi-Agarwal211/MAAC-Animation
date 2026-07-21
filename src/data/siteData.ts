export const siteCoursesData = {
  categories: [
    {
      id: "3d-animation",
      title: "3D Animation",
      subtitle: "Master the art of 3D storytelling",
      description: "Master high-quality 3D animation with industry-standard techniques, character rigging, and real studio workflows",
      fullDescription: "Become a 3D Animator, Character Designer, Storyboard Artist, Rigging Artist, Lighting Artist, or Game Asset Artist. Learn Autodesk Maya, 3ds Max, ZBrush, and industry-standard tools used in major studios worldwide.",
      icon: "animation",
      image: "/courses_images/ed_animation.png",
      careers: ["3D Animator", "Character Designer", "Storyboard Artist", "Rigging Artist", "Lighting Artist", "Game Asset Artist"],
    },
    {
      id: "digital-content",
      title: "Digital Content Creation",
      subtitle: "Build a career in digital media",
      description: "Create content for social media, YouTube, and OTT platforms with professional production skills",
      fullDescription: "Create engaging content for YouTube, Instagram, and digital platforms. Master video editing, content strategy, audience engagement, and become a Graphic Designer, Video Producer, Social Media Designer, UI/UX Designer, Motion Graphics Artist, or Content Strategist.",
      icon: "digital",
      image: "/courses_images/apdmd.jpeg",
      careers: ["Graphic Designer", "Video Producer", "Social Media Designer", "UI/UX Designer", "Motion Graphics Artist", "Content Strategist"],
    },
    {
      id: "game-design",
      title: "Game Design",
      subtitle: "Gain expertise in game design",
      description: "Design games, build assets, and master real-time rendering for mobile, PC, and console",
      fullDescription: "Design and develop games for multiple platforms. Learn game mechanics, level design, character creation, and game engine integration. Become a Game Developer, Level Designer, 3D Artist, Virtual Reality Artist, or Game Animator.",
      icon: "gaming",
      image: "/courses_images/game_design.jpeg",
      careers: ["Game Developer", "Level Designer", "3D Artist", "Virtual Reality Artist", "Game Animator"],
    },
    {
      id: "vfx",
      title: "Visual Effects (VFX)",
      subtitle: "Develop high-end visual effects",
      description: "Create stunning VFX for film, television, and OTT using industry-standard compositing tools",
      fullDescription: "Create stunning visual effects for movies, TV shows, and OTT content. Master compositing, motion tracking, and CG integration. Become a VFX Compositor, Motion Graphics Artist, FX Artist, Matte Painter, or Pre-visualization Artist.",
      icon: "vfx",
      image: "/courses_images/vfx.jpeg",
      careers: ["VFX Compositor", "Motion Graphics Artist", "FX Artist", "Matte Painter", "Pre-visualization Artist"],
    },
    {
      id: "broadcast-motion",
      title: "Broadcast & Motion Graphics",
      subtitle: "Explore motion graphics and broadcast design",
      description: "Produce dynamic motion graphics for TV, advertising, streaming, and digital media production",
      fullDescription: "Create dynamic motion graphics for broadcast, TV, advertising, and digital media. Learn After Effects, Cinema 4D, and broadcast design principles. Become a Motion Graphics Artist, Broadcast Designer, UI Designer, or Video Editor.",
      icon: "motion",
      image: "/courses_images/vfx_plus.jpeg",
      careers: ["Motion Graphics Artist", "Broadcast Designer", "UI Designer", "Video Editor"],
    },
    {
      id: "filmmaking-photography",
      title: "Filmmaking & Photography",
      subtitle: "Master the art of visual storytelling",
      description: "Learn cinematic filmmaking, photography, editing, and post-production for film and digital media",
      fullDescription: "Master the complete filmmaking pipeline — from scriptwriting and storyboarding to shooting, VFX, editing, and final delivery. Become a Video Editor, Cinematographer, Film Director, or Content Creator.",
      icon: "filmmaking",
      image: "/courses_images/dafm.jpeg",
      careers: ["Video Editor", "Cinematographer", "Film Director", "Content Creator"],
    },
    {
      id: "specialized-bootcamp",
      title: "Specialized Skills Bootcamp",
      subtitle: "Fast-track your career with focused learning",
      description: "Short-term specialized courses to upskill in specific areas of animation, VFX, game design, and more",
      fullDescription: "Upgrade your skills with focused short-term programs. Perfect for working professionals looking to specialize or upskill. Become a Motion Graphics Artist, Broadcast Designer, UI Designer, or Video Editor.",
      icon: "skill",
      image: "/courses_images/skill_enhance.jpeg",
      careers: ["Motion Graphics Artist", "Broadcast Designer", "UI Designer", "Video Editor"],
    },
  ],
};

/** Images + copy for the "Creative Evolution" / "The MAAC Standard" section on the homepage.
 * Uses real institute photos (campus, events) for facilities/events features and curated portfolio for creation/portfolio features.
 * This centralizes the "proper" images instead of hardcoding mismatched portfolio shots in the component (parallel to how coursesData.ogImage works).
 */
export const maacStandardFeatures = [
  {
    title: "Educational Events",
    desc: "Industry workshops, masterclasses, and live projects that bridge classroom learning with real-world experience",
    image: "/events/landscape/event-051.jpeg",
  },
  {
    title: "Portfolio Mastery",
    desc: "Build a professional portfolio with live projects, animations, and visual effects work that showcases your skills",
    image: "/courses_images/ad3d.jpeg",
  },
  {
    title: "Industry Exposure",
    desc: "Studio visits, live briefs, and internship opportunities with top animation and VFX companies",
    image: "/events/landscape/event-064.jpeg",
  },
  {
    title: "Premier Placements",
    desc: "Graduate with a professional showreel and portfolio that showcases your skills to potential employers",
    image: "/portfolio/featured/nancy-verma-page1.jpg",
  },
  {
    title: "Pro Facilities",
    desc: "State-of-the-art labs, rendering farms, and production suites equipped with latest software and hardware",
    image: "/campus-image.jpg",
  },
  {
    title: "Future-Proof Courses",
    desc: "Curriculum updated regularly with emerging technologies like AI, VR, AR, and real-time rendering",
    image: "/courses_images/dgdi.jpeg",
  },
  {
    title: "Creative Careers",
    desc: "Placement support, career counseling, and alumni network that helps you land your dream job",
    image: "/courses_images/apdmd.jpeg",
  },
];

export const testimonialsData = [
  {
    name: "Isha Jain",
    role: "Student",
    text: "Maac is really a great institute for learning and the faculty is also really helpful and sweet. 100% recommended",
  },
  {
    name: "Nandan Singhal",
    role: "Student",
    text: "Best Institute in jaipur for animation and graphic design and also the faculty is very nice.",
  },
  {
    name: "Tanisha Chauhan",
    role: "Student",
    text: "Maac Animation offers top-notch facilities and resources for aspiring animators. The studio environment is conducive to creativity, and the equipment is state-of-the-art. Highly recommended for anyone serious about pursuing a career in animation.",
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

export const statSegments = [
  { label: "Placement Rate", value: 95, color: "#E31837" },
  { label: "Partner Companies", value: 3, color: "#FF6B35" },
  { label: "Years of Excellence", value: 2, color: "#C4A882" },
];

export type NavChildLink = { label: string; href: string; external?: boolean };
/** Same taxonomy as maacindia.com Courses menu; links point to Jaipur site sections where possible. */
export type NavMegaGroup = { title: string; links: NavChildLink[] };
export type NavLinkItem = {
  label: string;
  href: string;
  mobileOnly?: boolean;
  external?: boolean;
  children?: NavChildLink[];
  megaGroups?: NavMegaGroup[];
};

/** Mirrors MAAC India course categories & program names (CareerX | CreatorX lines preserved). */
export const courseMegaMenuJaipur: NavMegaGroup[] = [
  {
    title: "Animation",
    links: [
      { label: "AD3D Edge Plus — Powered by CareerX | CreatorX", href: "/courses/3d-animation" },
      { label: "3D & Real-time Design", href: "/courses/3d-animation" },
      { label: "D3D", href: "/courses/3d-animation" },
      { label: "DAFM", href: "/courses/3d-animation" },
    ],
  },
  {
    title: "VFX",
    links: [
      { label: "ADVFX Plus — Powered by CareerX | CreatorX", href: "/courses/vfx" },
      { label: "VFX PLUS", href: "/courses/vfx" },
      { label: "Compositing & Editing Plus", href: "/courses/vfx" },
    ],
  },
  {
    title: "Digital Content Creation",
    links: [
      { label: "APDMC Plus — Powered by CareerX | CreatorX", href: "/courses/digital-content" },
      { label: "DGWA Plus", href: "/courses/digital-content" },
      { label: "APDMD", href: "/courses/digital-content" },
      { label: "UI/UX DESIGN PRO", href: "/courses/digital-content" },
    ],
  },
  {
    title: "Game Design",
    links: [
      { label: "3DGAI", href: "/courses/game-design" },
      { label: "APGDI", href: "/courses/game-design" },
      { label: "PMGDI", href: "/courses/game-design" },
      { label: "ADIDG Plus — Powered by CareerX | CreatorX NEW", href: "/courses/game-design" },
    ],
  },
  {
    title: "Motion Graphics & Broadcast",
    links: [
      { label: "APMG", href: "/courses/broadcast-motion" },
      { label: "BROADCAST PLUS", href: "/courses/broadcast-motion" },
    ],
  },
  {
    title: "Skill Enhancement Courses",
    links: [
      { label: "Blender Pro", href: "/courses/specialized-bootcamp" },
      { label: "Cinema 4D Pro", href: "/courses/specialized-bootcamp" },
      { label: "Max Pro", href: "/courses/specialized-bootcamp" },
      { label: "Maya Pro", href: "/courses/specialized-bootcamp" },
      { label: "Design Viz Pro", href: "/courses/specialized-bootcamp" },
      { label: "Digital Photography", href: "/courses/specialized-bootcamp" },
      { label: "Advance Compositing", href: "/courses/vfx" },
      { label: "Compositing Plus", href: "/courses/vfx" },
      { label: "GenAI for Digital Content Creators", href: "/courses/digital-content" },
    ],
  },
  {
    title: "Filmmaking",
    links: [
      { label: "Digital Film Making", href: "/courses/filmmaking-photography" },
      { label: "PPVP", href: "/courses/filmmaking-photography" },
    ],
  },
  {
    title: "Blended Model of Learning",
    links: [],
  },
  {
    title: "Visual Arts & Design",
    links: [
      { label: "IPVAD - XR — Powered by CareerX | CreatorX", href: "/courses/digital-content" },
    ],
  },
];

/** Desktop + mobile sheet: primary nav + Home/Contact on small screens. */
export const navLinks: NavLinkItem[] = [
  { label: "Home", href: "/", mobileOnly: true },
  {
    label: "Courses",
    href: "/courses",
    megaGroups: courseMegaMenuJaipur,
  },
  {
    label: "Student Work",
    href: "/student-work",
  },
  { 
  label: "Events", 
  href: "/events",
  children: [
    { label: "Events at MAAC", href: "/events" },
    { label: "Annual Trips at MAAC", href: "/annual-trip" }
  ]
},
  {
    label: "About Us",
    href: "/about",
  },
  { label: "Contact", href: "/contact", mobileOnly: true },
];

export const contactInfo = {
  phone: "+91-7300001589",
  phoneSecondary: "+91-9829294037",
  phoneTertiary: "+91-9929059559",
  whatsapp: "+91-7300001589",
  email: "maacanimationjaipur@gmail.com",
  address:
    "711-712, Ambition Tower, 7th Floor, D-46B, Malan Ka Chauraha, Agrasain Circle, Subhash Marg, C Scheme, Jaipur, Rajasthan 302001",
  googleMapsUrl: "https://maps.google.com/?cid=10289291929379673702",
  hours: "Mon–Sat 9:00 AM – 7:00 PM",
  social: {
    instagram:
      "https://www.instagram.com/maacjaipurcscheme?igsh=OGluNWQybHI2cjBv&utm_source=qr",
    linkedin: "https://www.linkedin.com/company/maac-jaipur-cscheme",
    youtube: "https://youtube.com/@maac-jaipur-cscheme?si=QiPdIu3guJaDr3cB",
    facebook: "https://www.facebook.com/MAAClndia",
    twitter: "https://twitter.com/MAAClndia",
  },
};


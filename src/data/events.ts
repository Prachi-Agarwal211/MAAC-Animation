import { Trophy, Users, Film, Camera, Award, Star, Mic, Monitor } from "lucide-react";

export type EventPhoto = {
  src: string;
  category: 'highlight' | 'press' | 'group' | 'lecture' | 'portrait' | 'other';
  title?: string;
};

// Landscape Photos for Laptop
export const LANDSCAPE_PHOTOS: EventPhoto[] = [
  { src: "/events/landscape/event-001.jpeg", category: 'lecture', title: "Digital Creators Revolution Seminar" },
  { src: "/events/landscape/event-038.jpeg", category: 'lecture', title: "Industry Talk" },
  { src: "/events/landscape/event-039.jpeg", category: 'lecture', title: "Student Session" },
  { src: "/events/landscape/event-041.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-042.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-043.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-044.jpeg", category: 'highlight', title: "Cinema Screening Experience" },
  { src: "/events/landscape/event-045.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-046.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-047.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-051.jpeg", category: 'group', title: "RAMA Zen Signing" },
  { src: "/events/landscape/event-054.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-055.jpeg", category: 'group', title: "Faculty & Industry Meet" },
  { src: "/events/landscape/event-056.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-057.jpeg", category: 'highlight', title: "24FPS Stage with Guests" },
  { src: "/events/landscape/event-062.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-063.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-064.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-066.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-067.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-069.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-070.jpeg", category: 'group', title: "Large Group in Auditorium" },
  { src: "/events/landscape/event-071.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/landscape/event-075.jpeg", category: 'group', title: "Group Moment" },
];

// Portrait Photos for Mobile
export const PORTRAIT_PHOTOS: EventPhoto[] = [
  { src: "/events/portrait/event-026.jpeg", category: 'other', title: "Cricket League Promo" },
  { src: "/events/portrait/event-048.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/portrait/event-049.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/portrait/event-050.jpeg", category: 'press', title: "Animation Sector Growth - Business Report" },
  { src: "/events/portrait/event-052.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/portrait/event-053.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/portrait/event-058.jpeg", category: 'portrait', title: "Traditional Attire at Event" },
  { src: "/events/portrait/event-059.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/portrait/event-060.jpeg", category: 'press', title: "RAMA Summit - First India Coverage" },
  { src: "/events/portrait/event-061.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/portrait/event-068.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/portrait/event-072.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/portrait/event-073.jpeg", category: 'group', title: "Group Moment" },
  { src: "/events/portrait/event-074.jpeg", category: 'group', title: "Group Moment" },
];

// Keep original array for other sections or legacy use, but updated paths
export const EVENT_PHOTOS: EventPhoto[] = [...LANDSCAPE_PHOTOS, ...PORTRAIT_PHOTOS];

export const PRESS_PHOTOS = EVENT_PHOTOS.filter(p => p.category === 'press');

export interface SignatureEvent {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  highlight?: string;
}

export const signatureEvents: SignatureEvent[] = [
  {
    id: "creata",
    name: "CREATA",
    description: "India's premier multi-category creative competition. Showcase skills in Animation, VFX, Gaming, Comics & Digital Design against the nation's best.",
    icon: Trophy,
    color: "#BF953F",
    highlight: "National Competition",
  },
  {
    id: "rain",
    name: "RAIN Awards",
    description: "India's top animation & VFX award ceremony celebrating outstanding student work. Recognition that opens studio doors.",
    icon: Award,
    color: "#E31837",
    highlight: "Prestige & Recognition",
  },
  {
    id: "100hr",
    name: "100 Hour Film Challenge",
    description: "The ultimate creative marathon. Write, direct, animate and deliver a complete short film in just 100 hours. Pure adrenaline.",
    icon: Film,
    color: "#2ECC71",
    highlight: "Creative Endurance",
  },
  {
    id: "masterclass",
    name: "Industry Masterclasses",
    description: "Immersive 4-day experiences with legends in Goa & Kutch. Portfolio reviews, techniques, and lifelong connections.",
    icon: Mic,
    color: "#9B59B6",
    highlight: "Direct Access",
  },
  {
    id: "nsm",
    name: "National Students' Meet",
    description: "The biggest student gathering. Workshops, panels, competitions and inspiration from peers across 60+ MAAC centers.",
    icon: Users,
    color: "#3498DB",
    highlight: "Community Power",
  },
  {
    id: "klick",
    name: "MAAC Klick Expeditions",
    description: "Photography & filmmaking journeys to Ranthambore, Coorg & Sariska. Learn visual storytelling in the wild.",
    icon: Camera,
    color: "#F39C12",
    highlight: "Beyond Classroom",
  },
  {
    id: "manifest",
    name: "MAAC Manifest",
    description: "Our annual celebration honoring student & alumni excellence. Awards, screenings, and the spirit of MAAC.",
    icon: Star,
    color: "#FFD700",
    highlight: "Our Flagship Night",
  },
  {
    id: "webinars",
    name: "Webinars & BTS Sessions",
    description: "Live sessions with working professionals from Pixar, DNEG, ILM, Ubisoft and more. Real talk. Real careers.",
    icon: Monitor,
    color: "#1ABC9C",
    highlight: "Industry Insights",
  },
];

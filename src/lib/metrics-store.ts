/**
 * Zero-Database Lead & Analytics Store for MAAC Jaipur C-Scheme
 * Stores leads and click metrics in localStorage + fallback store.
 */

export interface LeadEntry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  message?: string;
  sourcePage: string;
  timestamp: string;
}

export interface SectionMetric {
  id: string;
  name: string;
  views: number;
  clicks: number;
  lastActive: string;
}

const LEADS_KEY = "maac_jaipur_c-scheme_lead_entries_v1";
const METRICS_KEY = "maac_jaipur_c-scheme_section_metrics_v1";

const INITIAL_LEADS: LeadEntry[] = [
  {
    id: "lead-101",
    name: "Rohan Sharma",
    phone: "+91 98290 87654",
    email: "lead1@example.com",
    product: "3D Animation & VFX (B.Voc Degree)",
    message: "Requested callback & quote via website form.",
    sourcePage: "/",
    timestamp: "2026-08-07T14:32:00Z"
  },
  {
    id: "lead-102",
    name: "Pooja Verma",
    phone: "+91 94140 12389",
    email: "lead2@example.com",
    product: "Game Design & Unreal Engine Master",
    message: "Inquired via quick lead button.",
    sourcePage: "/contact",
    timestamp: "2026-08-07T11:15:00Z"
  }
];

const INITIAL_METRICS: SectionMetric[] = [
  { id: "sec-hero", name: "Hero CTA & Banner Clicks", views: 4120, clicks: 1150, lastActive: "Just now" },
  { id: "sec-1", name: "Course Catalogue & Syllabus Downloads", views: 3250, clicks: 840, lastActive: "4 mins ago" },
  { id: "sec-2", name: "Admissions Apply Now Modal", views: 2890, clicks: 710, lastActive: "15 mins ago" },
  { id: "sec-3", name: "Student Portfolio & VFX Showreel", views: 2410, clicks: 590, lastActive: "30 mins ago" },
  { id: "sec-whatsapp", name: "WhatsApp Direct Floating Button", views: 4890, clicks: 1320, lastActive: "Just now" }
];

export function getStoredLeads(): LeadEntry[] {
  if (typeof window === "undefined") return INITIAL_LEADS;
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    if (!raw) {
      localStorage.setItem(LEADS_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_LEADS;
  }
}

export function saveLead(lead: Omit<LeadEntry, "id" | "timestamp">): LeadEntry {
  const existing = getStoredLeads();
  const newEntry: LeadEntry = {
    ...lead,
    id: `lead-${Date.now()}`,
    timestamp: new Date().toISOString()
  };
  const updated = [newEntry, ...existing];
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LEADS_KEY, JSON.stringify(updated));
    } catch {}
  }
  return newEntry;
}

export function getStoredMetrics(): SectionMetric[] {
  if (typeof window === "undefined") return INITIAL_METRICS;
  try {
    const raw = localStorage.getItem(METRICS_KEY);
    if (!raw) {
      localStorage.setItem(METRICS_KEY, JSON.stringify(INITIAL_METRICS));
      return INITIAL_METRICS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_METRICS;
  }
}

export function trackSectionClick(sectionId: string): void {
  if (typeof window === "undefined") return;
  const metrics = getStoredMetrics();
  const updated = metrics.map(m => {
    if (m.id === sectionId) {
      return { ...m, clicks: m.clicks + 1, lastActive: "Just now" };
    }
    return m;
  });
  try {
    localStorage.setItem(METRICS_KEY, JSON.stringify(updated));
  } catch {}
}

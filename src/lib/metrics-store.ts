/**
 * Zero-Database Lead & Analytics Store
 * Uses server-side API for persistence, localStorage as fallback
 * SECURED: Requires authentication token
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
  ip?: string;
}

export interface SectionMetric {
  id: string;
  name: string;
  views: number;
  clicks: number;
  lastActive: string;
}

const API_URL = "/api/metrics";
const AUTH_TOKEN = process.env.NEXT_PUBLIC_METRICS_TOKEN || "";

async function fetchMetrics<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${AUTH_TOKEN}`,
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Metrics API error: ${response.status}`);
  }
  
  return response.json();
}

export async function getStoredLeads(): Promise<LeadEntry[]> {
  try {
    const data = await fetchMetrics<{ leads: LeadEntry[] }>("/");
    return data.leads || [];
  } catch {
    // Fallback to localStorage
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("metrics_leads");
    return stored ? JSON.parse(stored) : [];
  }
}

export async function getStoredMetrics(): Promise<SectionMetric[]> {
  try {
    const data = await fetchMetrics<{ metrics: SectionMetric[] }>("/");
    return data.metrics || [];
  } catch {
    // Fallback to localStorage
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("metrics_data");
    return stored ? JSON.parse(stored) : [];
  }
}

export async function saveLead(lead: Omit<LeadEntry, "id" | "timestamp">): Promise<void> {
  try {
    await fetchMetrics("", {
      method: "POST",
      body: JSON.stringify({ type: "lead", ...lead }),
    });
  } catch {
    // Fallback to localStorage
    if (typeof window === "undefined") return;
    const leads = JSON.parse(localStorage.getItem("metrics_leads") || "[]");
    leads.unshift({
      ...lead,
      id: `lead-${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("metrics_leads", JSON.stringify(leads));
  }
}

export async function trackSectionClick(sectionId: string, sectionName: string): Promise<void> {
  try {
    await fetchMetrics("", {
      method: "POST",
      body: JSON.stringify({ type: "metric", id: sectionId, name: sectionName }),
    });
  } catch {
    // Fallback to localStorage
    if (typeof window === "undefined") return;
    const metrics = JSON.parse(localStorage.getItem("metrics_data") || "[]");
    const idx = metrics.findIndex((m: SectionMetric) => m.id === sectionId);
    if (idx >= 0) {
      metrics[idx].clicks += 1;
      metrics[idx].lastActive = "Just now";
    } else {
      metrics.push({ id: sectionId, name: sectionName, views: 0, clicks: 1, lastActive: "Just now" });
    }
    localStorage.setItem("metrics_data", JSON.stringify(metrics));
  }
}

// Admin functions (require special auth)
export async function clearAllData(password: string): Promise<void> {
  await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${password}`,
    },
    body: JSON.stringify({ clear: "all" }),
  });
}

export async function getAccessLog(password: string): Promise<any[]> {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${password}`,
    },
    body: JSON.stringify({ type: "audit" }),
  });
  const data = await response.json();
  return data.accessLog || [];
}

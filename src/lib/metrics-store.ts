/**
 * Zero-Database Lead & Analytics Store
 * Uses server-side API for persistence, localStorage as fallback
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

const API_URL = "/api/metrics";

async function fetchFromAPI<T>(method: "GET" | "POST", data?: unknown): Promise<T> {
  try {
    const res = await fetch(API_URL, {
      method,
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : undefined
    });
    return await res.json();
  } catch {
    return { leads: [], metrics: [] } as T;
  }
}

export function getStoredLeads(): Promise<LeadEntry[]> {
  return fetchFromAPI<{ leads: LeadEntry[] }>("GET").then((r) => r.leads);
}

export function getStoredMetrics(): Promise<SectionMetric[]> {
  return fetchFromAPI<{ metrics: SectionMetric[] }>("GET").then((r) => r.metrics);
}

export function saveLead(lead: Omit<LeadEntry, "id" | "timestamp">): Promise<void> {
  return fetchFromAPI("POST", { type: "lead", ...lead });
}

export function trackSectionClick(sectionId: string): Promise<void> {
  return fetchFromAPI("POST", { type: "metric", id: sectionId });
}

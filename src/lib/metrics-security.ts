// SECURITY CONFIG — Change these values!
export const METRICS_PASSWORD = process.env.METRICS_PASSWORD || "Reverbex2026!";
export const MAX_LEADS_PER_HOUR = 100; // Rate limiting
export const ADMIN_IP_WHITELIST = process.env.ADMIN_IP_WHITELIST ? process.env.ADMIN_IP_WHITELIST.split(",") : [];

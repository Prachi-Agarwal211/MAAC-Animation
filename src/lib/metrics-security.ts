// SECURITY CONFIG — set METRICS_PASSWORD in .env (fails closed if unset)
export const METRICS_PASSWORD = process.env.METRICS_PASSWORD || "";
export const MAX_LEADS_PER_HOUR = 100; // Rate limiting
export const ADMIN_IP_WHITELIST = process.env.ADMIN_IP_WHITELIST ? process.env.ADMIN_IP_WHITELIST.split(",") : [];

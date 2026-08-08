import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { METRICS_PASSWORD, MAX_LEADS_PER_HOUR, ADMIN_IP_WHITELIST } from "@/lib/metrics-security";

// Move data file OUT of public folder for security
const DATA_FILE = path.join(process.cwd(), ".data", "metrics-data.json");

interface LeadData {
  leads: Array<{
    id: string;
    name: string;
    phone: string;
    email?: string;
    product?: string;
    message?: string;
    sourcePage: string;
    timestamp: string;
    ip?: string;
  }>;
  metrics: Array<{
    id: string;
    name: string;
    views: number;
    clicks: number;
    lastActive: string;
  }>;
  accessLog: Array<{
    timestamp: string;
    ip: string;
    action: string;
    success: boolean;
  }>;
}

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ leads: [], metrics: [], accessLog: [] }, null, 2));
  }
}

function loadData(): LeadData {
  ensureDataDir();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return { leads: [], metrics: [], accessLog: [] };
  }
}

function saveData(data: LeadData): void {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function logAccess(ip: string, action: string, success: boolean) {
  const data = loadData();
  data.accessLog.unshift({
    timestamp: new Date().toISOString(),
    ip,
    action,
    success
  });
  // Keep only last 1000 logs
  data.accessLog = data.accessLog.slice(0, 1000);
  saveData(data);
}

function getIP(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
         request.headers.get("x-real-ip") ||
         "unknown";
}

function checkRateLimit(ip: string): boolean {
  const data = loadData();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  
  const recentRequests = data.accessLog.filter(
    log => log.ip === ip && log.timestamp > oneHourAgo && log.action === "POST"
  );
  
  return recentRequests.length < MAX_LEADS_PER_HOUR;
}

function authenticate(request: NextRequest): { authenticated: boolean; ip: string } {
  const authHeader = request.headers.get("authorization");
  const ip = getIP(request);
  
  // Check for password in header
  if (authHeader === `Bearer ${METRICS_PASSWORD}`) {
    logAccess(ip, "AUTH_SUCCESS", true);
    return { authenticated: true, ip };
  }
  
  // Check IP whitelist
  if (ADMIN_IP_WHITELIST.includes(ip)) {
    logAccess(ip, "IP_WHITELIST", true);
    return { authenticated: true, ip };
  }
  
  logAccess(ip, "AUTH_FAILED", false);
  return { authenticated: false, ip };
}

export async function GET(request: NextRequest) {
  const { authenticated, ip } = authenticate(request);
  
  if (!authenticated) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  const data = loadData();
  // Don't expose access logs to client
  const { accessLog, ...safeData } = data;
  
  return NextResponse.json(safeData);
}

export async function POST(request: NextRequest) {
  const ip = getIP(request);
  
  // Check rate limit
  if (!checkRateLimit(ip)) {
    logAccess(ip, "RATE_LIMIT", false);
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429 }
    );
  }
  
  // Require authentication
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${METRICS_PASSWORD}`) {
    logAccess(ip, "AUTH_FAILED", false);
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  const body = await request.json();
  const data = loadData();
  
  if (body.type === "lead") {
    const lead = {
      id: `lead-${Date.now()}`,
      name: body.name || "Anonymous",
      phone: body.phone || "",
      email: body.email || "",
      product: body.product || "",
      message: body.message || "",
      sourcePage: body.sourcePage || "/",
      timestamp: new Date().toISOString(),
      ip: ip // Track IP for security
    };
    data.leads.unshift(lead);
    logAccess(ip, "LEAD_CREATED", true);
  } else if (body.type === "metric") {
    const idx = data.metrics.findIndex(m => m.id === body.id);
    if (idx >= 0) {
      data.metrics[idx].clicks += 1;
      data.metrics[idx].lastActive = "Just now";
    } else {
      data.metrics.push({
        id: body.id,
        name: body.name || "Unknown",
        views: 0,
        clicks: 1,
        lastActive: "Just now"
      });
    }
    logAccess(ip, "METRIC_TRACKED", true);
  } else if (body.type === "audit") {
    // Return access logs (only for admin)
    return NextResponse.json({ accessLog: data.accessLog.slice(0, 100) });
  }
  
  saveData(data);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const { authenticated, ip } = authenticate(request);
  
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const data = loadData();
  const { clear } = await request.json();
  
  if (clear === "leads") {
    data.leads = [];
  } else if (clear === "all") {
    data.leads = [];
    data.metrics = [];
  }
  
  saveData(data);
  logAccess(ip, "DATA_CLEARED", true);
  return NextResponse.json({ success: true });
}

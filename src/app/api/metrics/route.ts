import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "public", "metrics-data.json");

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
  }>;
  metrics: Array<{
    id: string;
    name: string;
    views: number;
    clicks: number;
    lastActive: string;
  }>;
}

function loadData(): LeadData {
  if (fs.existsSync(DATA_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    } catch {
      return { leads: [], metrics: [] };
    }
  }
  return { leads: [], metrics: [] };
}

function saveData(data: LeadData): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  const data = loadData();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
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
      timestamp: new Date().toISOString()
    };
    data.leads.unshift(lead);
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
  }
  
  saveData(data);
  return NextResponse.json({ success: true });
}

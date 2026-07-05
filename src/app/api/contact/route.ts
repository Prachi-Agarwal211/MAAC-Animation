import { NextRequest, NextResponse } from "next/server";
import { sendMetaCapiLead } from "@/lib/meta-capi";

// ponytail: in-memory rate limiter, per-IP. Good enough for single-instance.
// Upgrade: Vercel KV or Upstash Redis if serverless scaling matters.
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 submissions per minute per IP

function sanitize(text: string | null | undefined): string {
  if (!text) return "";
  return text
    .toString()
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 1000); // cap length
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimit) {
    if (now > entry.resetAt) rateLimit.delete(ip);
  }
}, 300_000);

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Anti-spam: honeypot check
    if (body._hp) {
      return NextResponse.json({ error: "Submission rejected" }, { status: 400 });
    }

    // Anti-spam: timing check (reject if submitted in < 3 seconds)
    if (body._ts && Date.now() - Number(body._ts) < 3000) {
      return NextResponse.json({ error: "Please wait before submitting" }, { status: 400 });
    }

    const name = sanitize(body.name);
    const phone = sanitize(body.phone);
    const email = sanitize(body.email);
    const course = sanitize(body.course);
    const message = sanitize(body.message);
    const source = sanitize(body.source);
    const utm_source = sanitize(body.utm_source);
    const utm_campaign = sanitize(body.utm_campaign);

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Basic validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (!/^[0-9+\s-]{10,15}$/.test(phone)) {
      return NextResponse.json({ error: "Invalid phone format" }, { status: 400 });
    }

    sendMetaCapiLead({ email, phone, url: "https://www.maacanimationjaipur.com/contact" });

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);

      // Escape HTML entities in user input for email safety
      const esc = (s: string) =>
        s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      await resend.emails.send({
        from: "MAAC Jaipur <maacanimationjaipur@gmail.com>",
        to: ["maacanimationjaipur@gmail.com"],
        subject: `New Contact Form Enquiry from ${esc(name)}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #E31837; border-bottom: 2px solid #E31837; padding-bottom: 10px;">New Contact Form Enquiry</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="background: #f9f9f9;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Name</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${esc(name)}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${esc(phone)}</td>
              </tr>
              <tr style="background: #f9f9f9;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${esc(email)}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Course Interest</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${esc(course || "Not specified")}</td>
              </tr>
              ${message ? `<tr style="background: #f9f9f9;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Message</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${esc(message)}</td>
              </tr>` : ""}
              ${source ? `<tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Source</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${esc(source)}</td>
              </tr>` : ""}
              ${utm_source ? `<tr style="background: #f9f9f9;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">UTM Source</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${esc(utm_source)}</td>
              </tr>` : ""}
              ${utm_campaign ? `<tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">UTM Campaign</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${esc(utm_campaign)}</td>
              </tr>` : ""}
            </table>
            <p style="margin-top: 20px; color: #666; font-size: 14px;">
              This enquiry was submitted from the MAAC Jaipur website contact form.
            </p>
          </div>
        `,
      });
    } else {
      console.warn("RESEND_API_KEY not configured. Form submission logged only.");
      console.warn("Contact form submission received (PII redacted)");
    }

    return NextResponse.json(
      { success: true, message: "Thank you! We'll get back to you soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

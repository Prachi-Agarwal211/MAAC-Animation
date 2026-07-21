/**
 * Meta Conversions API (CAPI) — server-side event tracking.
 * Sends hashed PII events directly to Meta's Graph API.
 * Works alongside the browser-side Pixel for complete coverage.
 */

let cachedToken: string | undefined;

function getAccessToken(): string | undefined {
  if (cachedToken === undefined) {
    cachedToken = process.env.META_ACCESS_TOKEN;
  }
  return cachedToken;
}

function getPixelId(): string | undefined {
  return process.env.NEXT_PUBLIC_META_PIXEL_ID;
}

/**
 * Compute SHA-256 hash using Web Crypto API (Node 18+).
 */
async function sha256(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export interface MetaCapiLeadParams {
  email: string;
  phone: string;
  name?: string;
  url?: string;
}

/**
 * Send a Lead event to Meta Conversions API (server-side).
 * PII is SHA-256 hashed before sending (required by Meta).
 * This is fire-and-forget — does not throw on failure.
 */
export async function sendMetaCapiLead(params: MetaCapiLeadParams) {
  const accessToken = getAccessToken();
  const pixelId = getPixelId();
  if (!accessToken || !pixelId) {
    console.warn("META_ACCESS_TOKEN or NEXT_PUBLIC_META_PIXEL_ID not configured — CAPI event skipped.");
    return;
  }

  try {
    const userData: Record<string, string[]> = {
      em: [await sha256(params.email.toLowerCase().trim())],
      ph: [await sha256(params.phone.replace(/\D/g, ""))],
    };

    // Optional: pass hashed name for better matching
    if (params.name) {
      const nameParts = params.name.trim().split(/\s+/);
      if (nameParts.length >= 2) {
        userData.fn = [await sha256(nameParts[0].toLowerCase())];
        userData.ln = [await sha256(nameParts.slice(1).join(" ").toLowerCase())];
      } else {
        userData.fn = [await sha256(nameParts[0].toLowerCase())];
      }
    }

    const eventData = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: params.url || "https://www.maacanimationjaipur.com",
          user_data: userData,
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(eventData),
      },
    );

    const result = await response.json();
    if (!response.ok) {
      console.error("Meta CAPI error:", result);
    }
  } catch (error) {
    console.error("Meta CAPI send failed:", error);
  }
}

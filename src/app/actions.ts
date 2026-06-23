"use server";

import crypto from "crypto";
import { sendMetaCapiLead } from "@/lib/meta-capi";

async function getGoogleAccessToken() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  
  if (!privateKey || !clientEmail) {
    throw new Error("Missing Google Service Account credentials");
  }
  
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };
  
  const encodeBase64Url = (obj: Record<string, unknown>) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const signatureInput = `${encodeBase64Url(header)}.${encodeBase64Url(claim)}`;
  
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signatureInput);
  const signature = sign.sign(privateKey, "base64url");
  const jwt = `${signatureInput}.${signature}`;
  
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  
  const data = await res.json();
  return data.access_token;
}

const sanitize = (text: string | null | undefined): string => {
  if (!text) return "";
  return text.toString().replace(/<[^>]*>/g, "").replace(/[<>]/g, "").trim();
};

export async function submitContactForm(formData: FormData) {
  const name = sanitize(formData.get("name") as string);
  const phone = sanitize(formData.get("phone") as string);
  const email = sanitize(formData.get("email") as string);
  const message = sanitize(formData.get("message") as string);

  if (!name || !phone) {
    return { success: false, message: "Name and phone are required" };
  }

  const phoneRegex = /^[0-9+\s-]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return { success: false, message: "Invalid phone number format" };
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, message: "Invalid email address format" };
  }

  try {
    const accessToken = await getGoogleAccessToken();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID || "1IE4nXFxIzhBRXULvWNuKg5neaMJvq7jW5-Bg6bdqHCA";
    const range = "A:E"; // Date, Name, Phone, Email, Message

    const values = [
      [
        new Date().toLocaleDateString("en-IN", { 
          timeZone: "Asia/Kolkata",
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        name,
        phone,
        email,
        message,
      ],
    ];

    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`);
    }

    // Fire Meta CAPI server-side event (doesn't block response)
    if (email && phone) {
      sendMetaCapiLead({ email, phone, name, url: "https://www.maacanimationjaipur.com/contact" });
    }

    return { success: true, message: "Application submitted successfully! We'll contact you soon." };
  } catch (error) {
    console.error("Google Sheets submission error:", error);
    return {
      success: false,
      message: "Failed to submit form. Please try again.",
    };
  }
}

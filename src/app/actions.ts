"use server";

import { google } from "googleapis";

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
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
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

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return { success: true, message: "Application submitted successfully! We'll contact you soon." };
  } catch (error: any) {
    console.error("Google Sheets submission error:", error);
    return {
      success: false,
      message: "Failed to submit form. Please try again.",
    };
  }
}

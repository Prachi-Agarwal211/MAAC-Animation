import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, course, message } = body;

    // Validate required fields
    if (!name || !phone || !email || !course) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Integrate with email service (e.g., Resend, SendGrid) or database
    // For now, log the submission
    console.log("Contact form submission:", {
      name,
      phone,
      email,
      course,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate async processing
    await new Promise((resolve) => setTimeout(resolve, 500));

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

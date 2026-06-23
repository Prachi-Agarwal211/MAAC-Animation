import { NextRequest, NextResponse } from "next/server";
import { sendMetaCapiLead } from "@/lib/meta-capi";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, course, message, source, utm_source, utm_campaign } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    sendMetaCapiLead({ email, phone, url: "https://www.maacanimationjaipur.com/contact" });

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);
      
      await resend.emails.send({
        from: 'MAAC Jaipur <maacanimationjaipur@gmail.com>',
        to: ['maacanimationjaipur@gmail.com'],
        subject: `New Contact Form Enquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #E31837; border-bottom: 2px solid #E31837; padding-bottom: 10px;">New Contact Form Enquiry</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="background: #f9f9f9;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Name</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${phone}</td>
              </tr>
              <tr style="background: #f9f9f9;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Course Interest</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${course || 'Not specified'}</td>
              </tr>
              ${message ? `<tr style="background: #f9f9f9;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Message</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${message}</td>
              </tr>` : ''}
              ${source ? `<tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Source</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${source}</td>
              </tr>` : ''}
              ${utm_source ? `<tr style="background: #f9f9f9;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">UTM Source</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${utm_source}</td>
              </tr>` : ''}
              ${utm_campaign ? `<tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">UTM Campaign</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${utm_campaign}</td>
              </tr>` : ''}
            </table>
            <p style="margin-top: 20px; color: #666; font-size: 14px;">
              This enquiry was submitted from the MAAC Jaipur website contact form.
            </p>
          </div>
        `,
      });
    } else {
      console.warn('RESEND_API_KEY not configured. Form submission logged only.');
      console.log("Contact form submission:", { name, phone, email, course, message, source });
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

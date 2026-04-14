"use server";

/**
 * Sanitizes input strings to prevent HTML/Email injection
 */
const sanitize = (text: string | null | undefined): string => {
  if (!text) return "";
  return text
    .toString()
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>]/g, "")    // Remove remaining brackets
    .trim();
};

export async function submitContactForm(formData: FormData) {
  const name = sanitize(formData.get("name") as string);
  const phone = sanitize(formData.get("phone") as string);
  const email = sanitize(formData.get("email") as string);
  const course = sanitize(formData.get("course") as string);
  const city = sanitize(formData.get("city") as string);
  const message = sanitize(formData.get("message") as string);
  const source = sanitize(formData.get("source") as string) || "demo_class_form";

  if (!name || !phone) {
    return { success: false, message: "Name and phone are required" };
  }

  // Basic phone validation
  const phoneRegex = /^[0-9+\s-]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return { success: false, message: "Invalid phone number format" };
  }

  // Basic email validation if provided
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, message: "Invalid email address format" };
  }

  try {
    // Only send email if API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);

      const { error } = await resend.emails.send({
        // IMPORTANT: 'from' must use a verified domain in Resend.
        // Go to resend.com/domains, add maacanimationjaipur.com,
        // verify DNS records, then this sender address will work.
        from: 'MAAC Jaipur <noreply@maacanimationjaipur.com>',
        to: ['maacanimationjaipur@gmail.com'],
        replyTo: email || undefined,
        subject: `New Enquiry from ${name} [${source}]`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"><style>
            body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .header { background: #CC0000; color: white; padding: 24px 32px; }
            .header h1 { margin: 0; font-size: 20px; }
            .header p { margin: 4px 0 0; font-size: 12px; opacity: 0.8; }
            .body { padding: 32px; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 10px 12px; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
            td:first-child { font-weight: bold; color: #555; width: 35%; background: #fafafa; }
            .footer { background: #f9f9f9; padding: 16px 32px; font-size: 11px; color: #999; text-align: center; }
          </style></head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Website Enquiry</h1>
                <p>MAAC Jaipur C-Scheme &mdash; ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
              </div>
              <div class="body">
                <table>
                  <tr><td>Name</td><td>${name}</td></tr>
                  <tr><td>Phone</td><td>${phone}</td></tr>
                  ${email ? `<tr><td>Email</td><td>${email}</td></tr>` : ''}
                  ${course ? `<tr><td>Course Interest</td><td>${course}</td></tr>` : ''}
                  ${city ? `<tr><td>City</td><td>${city}</td></tr>` : ''}
                  ${message ? `<tr><td>Message</td><td>${message}</td></tr>` : ''}
                  <tr><td>Source</td><td>${source}</td></tr>
                </table>
              </div>
              <div class="footer">This enquiry was submitted from the MAAC Jaipur website &mdash; maacanimationjaipur.com</div>
            </div>
          </body></html>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        throw new Error(error.message);
      }
    } else {
      console.warn('RESEND_API_KEY not configured. Form submission logged only.');
      console.log("Form submission received:", { name, phone, email, course, city, message, source });
    }

    return { success: true, message: "Application submitted successfully! We'll contact you soon." };
  } catch (error: any) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
    };
  }
}

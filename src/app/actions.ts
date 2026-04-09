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
        from: 'MAAC Jaipur <noreply@maacanimationjaipur.com>',
        to: ['maacanimationjaipur@gmail.com'],
        subject: `New Enquiry from ${name} [${source}]`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #E31837; border-bottom: 2px solid #E31837; padding-bottom: 10px;">New Website Enquiry</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="background: #f9f9f9;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; width: 30%;">Name</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${phone}</td>
              </tr>
              ${email ? `<tr style="background: #f9f9f9;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${email}</td>
              </tr>` : ''}
              ${course ? `<tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Course Interest</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${course}</td>
              </tr>` : ''}
              ${city ? `<tr style="background: #f9f9f9;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">City</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${city}</td>
              </tr>` : ''}
              ${message ? `<tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Message</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${message}</td>
              </tr>` : ''}
              <tr style="background: #f9f9f9;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Source</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${source}</td>
              </tr>
            </table>
            <p style="margin-top: 20px; color: #666; font-size: 14px;">
              This enquiry was submitted from the MAAC Jaipur website.
            </p>
          </div>
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
      message: error instanceof Error ? error.message : "Failed to submit form. Please try again." 
    };
  }
}

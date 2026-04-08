"use server";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const course = formData.get("course");
  const city = formData.get("city");
  const message = formData.get("message");
  const source = formData.get("source") || "demo_class_form";

  if (!name || !phone) {
    return { success: false, message: "Name and phone are required" };
  }

  try {
    // Only send email if API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);
      
      await resend.emails.send({
        from: 'MAAC Jaipur <noreply@maacanimationjaipur.com>',
        to: ['maacanimationjaipur@gmail.com'],
        subject: `New Demo Class Enquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #E31837; border-bottom: 2px solid #E31837; padding-bottom: 10px;">New Demo Class Enquiry</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="background: #f9f9f9;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Name</td>
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
    } else {
      console.warn('RESEND_API_KEY not configured. Form submission logged only.');
      console.log("Form submission received:", { name, phone, email, course, city, message, source });
    }

    return { success: true, message: "Application submitted successfully! We'll contact you soon." };
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, message: "Failed to submit form. Please try again." };
  }
}

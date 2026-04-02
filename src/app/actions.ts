"use server";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const course = formData.get("course");
  
  if (!name || !phone) {
    return { success: false, message: "Name and phone are required" };
  }

  try {
    // In a real app, this would integrate with Resend, SendGrid, or a CRM.
    // For now, we simulate a successful database save / email send.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("Form submission received:", { name, phone, course });
    
    return { success: true, message: "Application submitted successfully! We'll contact you soon." };
  } catch {
    return { success: false, message: "Failed to submit form. Please try again." };
  }
}

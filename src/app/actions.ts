"use server";

const WEB3FORMS_KEY = "156e9e6d6-90d4-4983-85c6-213ab749fabc";
const NOTIFY_EMAIL = "maacanimationjaipur@gmail.com";

const sanitize = (text: string | null | undefined): string => {
  if (!text) return "";
  return text.toString().replace(/<[^>]*>/g, "").replace(/[<>]/g, "").trim();
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

  const phoneRegex = /^[0-9+\s-]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return { success: false, message: "Invalid phone number format" };
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, message: "Invalid email address format" };
  }

  try {
    const subject = `New Enquiry from ${name} [${source}]`;
    
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        to: NOTIFY_EMAIL,
        from_name: name,
        subject: subject,
        email: email,
        phone: phone,
        course: course,
        city: city,
        message: message,
        source: source,
      }),
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || "Failed to submit");
    }

    return { success: true, message: "Application submitted successfully! We'll contact you soon." };
  } catch (error: any) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
    };
  }
}

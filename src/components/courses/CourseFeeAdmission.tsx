import SplitTextReveal from "@/components/ui/SplitTextReveal";

interface Course {
  slug: string;
  fullName: string;
  duration: string;
  code: string;
  eligibility: string;
}

const courseFees: Record<string, { min: string; max: string; emi: string }> = {
  "3d-animation": { min: "₹1,20,000", max: "₹2,00,000", emi: "₹5,000/month" },
  "vfx": { min: "₹1,20,000", max: "₹1,80,000", emi: "₹5,000/month" },
  "gaming-design": { min: "₹1,20,000", max: "₹1,80,000", emi: "₹5,000/month" },
  "graphic-design": { min: "₹60,000", max: "₹1,00,000", emi: "₹3,000/month" },
  "dafm": { min: "₹80,000", max: "₹1,20,000", emi: "₹4,000/month" },
  "dfm": { min: "₹80,000", max: "₹1,20,000", emi: "₹4,000/month" },
  "advfx": { min: "₹1,50,000", max: "₹2,20,000", emi: "₹6,000/month" },
  "vfx-plus": { min: "₹1,80,000", max: "₹2,50,000", emi: "₹7,000/month" },
  "ad3d": { min: "₹1,00,000", max: "₹1,60,000", emi: "₹4,500/month" },
  "d3d": { min: "₹80,000", max: "₹1,20,000", emi: "₹3,500/month" },
  "apdmd": { min: "₹1,00,000", max: "₹1,50,000", emi: "₹4,500/month" },
  "dgdi": { min: "₹60,000", max: "₹90,000", emi: "₹3,000/month" },
  "media": { min: "₹1,00,000", max: "₹1,50,000", emi: "₹4,500/month" },
  "ipvad": { min: "₹80,000", max: "₹1,20,000", emi: "₹4,000/month" },
  "skill-enhancement": { min: "₹40,000", max: "₹70,000", emi: "₹2,500/month" },
  "ce-pro": { min: "₹50,000", max: "₹80,000", emi: "₹3,000/month" },
  "max-pro": { min: "₹60,000", max: "₹90,000", emi: "₹3,000/month" },
  "architectural-design": { min: "₹70,000", max: "₹1,10,000", emi: "₹3,500/month" },
  "design-viz-pro": { min: "₹70,000", max: "₹1,10,000", emi: "₹3,500/month" },
};

export default function CourseFeeAdmission({ course }: { course: Course }) {
  const fees = courseFees[course.slug] || { min: "₹60,000", max: "₹1,50,000", emi: "₹4,000/month" };

  return (
    <section className="py-20 bg-[#0f0f0f]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="font-display text-3xl text-[#F0EBE1] mb-8 text-center font-black uppercase leading-[1.1] tracking-[0.1em]">
            <SplitTextReveal>{course.fullName} — Fee Structure & Admission</SplitTextReveal>
          </h2>
        </div>
        <div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Fee Card */}
          <div className="maac-scroll-card bg-[#161616] rounded-xl p-8 border border-white/5">
            <h3 className="font-display text-xl text-[#F0EBE1] mb-4 font-black uppercase leading-[1.1] tracking-[0.1em]">Course Fees in Jaipur</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-[#A8A29C] text-sm">Course Fee Range</dt>
                <dd className="text-[#F0EBE1] font-bold text-lg">{fees.min} – {fees.max}</dd>
              </div>
              <div>
                <dt className="text-[#A8A29C] text-sm">Easy EMI Option</dt>
                <dd className="text-[#FFD700] font-black">Starting {fees.emi}</dd>
              </div>
              <div>
                <dt className="text-[#A8A29C] text-sm">Education Loan</dt>
                <dd className="text-[#F0EBE1]">Available via partner banks</dd>
              </div>
              <div>
                <dt className="text-[#A8A29C] text-sm">Scholarship</dt>
                <dd className="text-[#F0EBE1]">Up to 25% for merit students</dd>
              </div>
            </dl>
            <a
              href="tel:+917300001589"
              className="mt-6 btn btn-primary w-full text-center block"
            >
              Call for Exact Fee: +91-7300001589
            </a>
          </div>

          {/* Admission Card */}
          <div className="maac-scroll-card bg-[#161616] rounded-xl p-8 border border-white/5">
            <h3 className="font-display text-xl text-[#F0EBE1] mb-4 font-black uppercase leading-[1.1] tracking-[0.1em]">Admission Process</h3>
            <ol className="space-y-3">
              {[
                "Book a free demo class online or by calling us",
                "Visit our Jaipur center — Ambition Tower, Subhash Marg",
                "Submit documents: 10th/12th marksheets, photo ID",
                "Counseling session with our academic advisors",
                "Pay first installment and confirm your batch",
              ].map((step, i) => (
                <li key={i} className="flex gap-3 text-[#A8A29C] text-sm">
                  <span className="w-6 h-6 rounded-full bg-[#FFD700]/20 text-[#FFD700] flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="mt-6 p-4 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-lg">
              <p className="text-[#FFD700] text-sm font-black">Eligibility: {course.eligibility}</p>
              <p className="text-[#A8A29C] text-xs mt-1">Duration: {course.duration}</p>
            </div>
          </div>
        </div>
        </div>

        {/* Location-specific paragraph */}
        <div className="maac-scroll-card mt-8 p-6 bg-[#161616] rounded-xl border border-white/5">
          <h3 className="font-display text-lg text-[#F0EBE1] mb-2 font-black uppercase leading-[1.1] tracking-[0.1em]">
            {course.fullName} in Jaipur — Why MAAC?
          </h3>
          <p className="text-[#A8A29C] leading-relaxed">
            MAAC Jaipur offers the {course.fullName} program at our centrally-located C-Scheme campus on Subhash Marg, easily accessible from Malviya Nagar, Vaishali Nagar, Mansarovar, Bani Park, and across Jaipur city. Our {course.fullName} course in Jaipur features industry-standard labs, 95% placement assistance, and faculty with hands-on studio experience. Students from all over Rajasthan — including Ajmer, Jodhpur, Kota, and Udaipur — join our programs and often relocate to Jaipur for the quality of training we provide. Batch timings are available morning, afternoon, and weekends to suit working professionals and college students.
          </p>
        </div>
      </div>
    </section>
  );
}

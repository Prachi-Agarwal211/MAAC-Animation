import SplitTextReveal from "@/components/ui/SplitTextReveal";

interface Course {
  slug: string;
  title: string;
  fullName: string;
  description: string;
  fullDescription: string;
  duration: string;
  code: string;
  tools: string[];
  careers: string[];
  eligibility: string;
  highlights: string[];
  oldUrls: string[];
}

export default function CourseCareer({ course }: { course: Course }) {
  return (
    <section className="py-20 md:py-28 bg-transparent" style={{ background: "linear-gradient(180deg, rgba(5, 0, 0, 0.8) 0%, rgba(26, 5, 8, 0.9) 50%, rgba(5, 0, 0, 1) 100%)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-[#F0EBE1] mb-4 text-center font-black uppercase leading-[1.1] tracking-[0.1em]">
            <SplitTextReveal>Career Options After Completion</SplitTextReveal>
          </h2>
          <p className="text-[#A8A29C] text-lg text-center mb-12 max-w-2xl mx-auto">
            Open doors to exciting roles in the animation, VFX, and gaming industry
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {course.careers.map((career, i) => (
              <div
                key={i}
                className="maac-scroll-card maac-depth-card bg-[#161616] rounded-xl p-6 border border-white/5 hover:border-[#FFD700]/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FFD700]/10 flex items-center justify-center mb-4 group-hover:bg-[#FFD700]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-[#F0EBE1] font-bold text-sm">{career}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

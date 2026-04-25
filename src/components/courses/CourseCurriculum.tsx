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

// Placeholder curriculum data — should be populated per course
const defaultCurriculum = [
  { module: "Foundation", topics: ["Basics and fundamentals", "Introduction to tools", "Industry overview"] },
  { module: "Core Skills", topics: ["Advanced techniques", "Project-based learning", "Workflow optimization"] },
  { module: "Specialization", topics: ["Specialized modules", "Real-world projects", "Portfolio development"] },
  { module: "Industry Readiness", topics: ["Showreel creation", "Interview preparation", "Industry exposure"] },
];

export default function CourseCurriculum({ course }: { course: Course }) {
  return (
    <section className="py-20 md:py-28 bg-transparent" style={{ background: "linear-gradient(180deg, rgba(5, 0, 0, 0.8) 0%, rgba(23, 17, 12, 0.9) 50%, rgba(5, 0, 0, 1) 100%)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl text-[#F0EBE1] mb-12 text-center font-black uppercase leading-[1.1] tracking-[0.1em]">
          Course Curriculum
        </h2>

        <div className="space-y-6">
          {defaultCurriculum.map((mod, i) => (
            <div key={i} className="bg-[#161616] rounded-xl p-6 md:p-8 border border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <span className="w-10 h-10 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700] font-bold text-sm">
                  {i + 1}
                </span>
                <h3 className="font-display text-[#F0EBE1] text-lg font-black uppercase leading-[1.1] tracking-[0.1em]">{mod.module}</h3>
              </div>
              <ul className="grid md:grid-cols-2 gap-3 ml-14">
                {mod.topics.map((topic, j) => (
                  <li key={j} className="flex items-center gap-2 text-[#A8A29C] text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]/60" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

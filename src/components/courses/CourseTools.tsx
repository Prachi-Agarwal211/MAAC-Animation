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

export default function CourseTools({ course }: { course: Course }) {
  return (
    <section className="py-20 md:py-28 bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F0EBE1] mb-4 text-center uppercase tracking-tighter">
          Tools &amp; Software You&apos;ll <span className="metallic-gold-text">Master</span>
        </h2>
        <p className="text-[#A8A29C] text-lg text-center mb-12 max-w-2xl mx-auto">
          Industry-standard tools used in professional studios worldwide
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {course.tools.map((tool, i) => (
            <div
              key={i}
              className="bg-[#161616] rounded-xl p-6 border border-white/5 flex items-center justify-center text-center hover:border-[#BF953F]/30 transition-colors duration-300"
            >
              <span className="text-[#F0EBE1] font-medium text-sm">{tool}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

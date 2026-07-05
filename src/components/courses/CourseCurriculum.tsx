import FadeIn from "@/components/animations/FadeIn";

interface Course {
  slug: string;
  curriculum: string[];
}

export default function CourseCurriculum({ course }: { course: Course }) {
  return (
    <section className="py-20 md:py-28 bg-transparent" style={{ background: "linear-gradient(180deg, rgba(5, 0, 0, 0.8) 0%, rgba(23, 17, 12, 0.9) 50%, rgba(5, 0, 0, 1) 100%)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl text-[#F0EBE1] mb-12 text-center font-black uppercase leading-[1.1] tracking-[0.1em]">
          Course Curriculum
        </h2>

        <FadeIn stagger={0.12} className="space-y-4">
          {course.curriculum.map((item, i) => (
            <div key={item} className="flex items-start gap-4 p-6 rounded-2xl bg-[#161616] border border-white/5 hover:border-white/10 transition-colors duration-300">
              <span className="metallic-gold-text font-display font-bold text-lg shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[#F0EBE1] font-medium">{item}</span>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

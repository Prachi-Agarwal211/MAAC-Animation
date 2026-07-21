import Image from "next/image";
import Link from "next/link";
import SplitTextReveal from "@/components/ui/SplitTextReveal";

const bentoItems = [
  {
    title: "Environment Modeling",
    category: "3D Art",
    image: "/portfolio/environment-modeling/raghav-gupta-page1.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Cinematic Lighting",
    category: "Lighting & Lookdev",
    image: "/portfolio/featured/nancy-verma-page1.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    title: "VFX Simulation",
    category: "Dynamics",
    image: "/portfolio/matte-painting/akshat-asolkar.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Digital Painting",
    category: "Concept Art",
    image: "/portfolio/digital-painting/deshna-shah.jpg",
    span: "md:col-span-2 lg:col-span-1 md:row-span-1 lg:row-span-2",
  },
  {
    title: "Character Design",
    category: "Sculpting",
    image: "/portfolio/character-modeling/aarush-kumar-page1.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Feature Production",
    category: "Full Production",
    image: "/portfolio/featured/prerit-mehan-page1.jpg",
    span: "md:col-span-1 lg:col-span-2 row-span-1",
  },
];

export default function BentoGallery() {
  return (
    <section className="bg-transparent py-24 md:py-40 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block metallic-gold-text-sm text-[10px] font-bold tracking-[0.4em] uppercase mb-6">Our</span>
          <h2 className="font-display text-[clamp(1.5rem,5vw,3rem)] text-white leading-[0.9] font-bold uppercase leading-[1.1] tracking-[0.1em]">
            <SplitTextReveal>Student</SplitTextReveal>{' '}
            <SplitTextReveal delay={0.2} className="metallic-gold-text font-bold">Work</SplitTextReveal>
          </h2>
          <Link 
            href="/student-work" 
            className="inline-flex items-center gap-2 mt-8 px-8 py-3 metallic-gold-accent text-white font-bold text-sm tracking-wide rounded-full hover:bg-[#c41230] transition-colors duration-300 shadow-[0_4px_15px_rgba(191,149,63,0.3)]"
          >
            View All Work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {bentoItems.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-[32px] glass-card maac-liquid-card maac-film-card border border-white/10 transition-all duration-700 hover:border-[#BF953F]/50 ${item.span}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={i < 2}
                placeholder="empty"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="metallic-gold-text-sm text-[10px] font-bold uppercase tracking-[0.2em]">{item.category}</span>
                <h3 className="text-white text-xl font-display mt-2 font-bold uppercase leading-[1.1] tracking-[0.1em]">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

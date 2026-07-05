import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import IndustryPartners from "@/components/IndustryPartners";
import ApplyNow from "@/components/ApplyNow";
import { blogPosts } from "@/data/blog";
import FadeIn from "@/components/animations/FadeIn";

export default function BlogIndexPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Blog - MAAC Animation Jaipur",
            description: "Insights, tips, and career guidance from MAAC Animation Jaipur.",
            url: "https://www.maacanimationjaipur.com/blog",
            publisher: {
              "@type": "Organization",
              name: "MAAC Animation Jaipur",
              sameAs: "https://www.maacanimationjaipur.com",
            },
          }),
        }}
      />

      <main className="bg-[#080808] min-h-screen">
        {/* Hero Section */}
        <section 
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#080808] z-10" />
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              poster="/hero-poster.jpg"
              className="w-full h-full object-cover opacity-40"
            >
              <source src="/hero-video-compressed.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative z-20 text-center px-6 pt-20">
            <FadeIn>
              <p className="metallic-gold-text text-[10px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
                <span className="w-8 h-[1px] metallic-gold-accent" />
                Creative Insights
                <span className="w-8 h-[1px] metallic-gold-accent" />
              </p>
              <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.85] text-white mb-6 font-bold uppercase leading-[1.1] tracking-[0.1em]">
                Blog & <span className="metallic-gold-text italic text-[1.1em]">Insights</span>
              </h1>
              <p className="text-[#A8A29C] text-lg max-w-2xl mx-auto leading-relaxed">
                Industry trends, career guidance, and expert tips from the masters at MAAC Animation Jaipur.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-24 md:py-32 bg-transparent relative">
          <div className="atmosphere-blob blob-orange top-0 left-0 opacity-5" />
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <FadeIn stagger={0.1} className="grid md:grid-cols-2 gap-10">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group bg-white/[0.02] rounded-3xl overflow-hidden border border-white/5 hover:border-[#FFD700]/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                >
                  {/* Image */}
                  <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
                    <Image
                      src={post.ogImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-[#FFD700] text-black text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-[#A8A29C] mb-6">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span className="w-1 h-1 bg-[#FFD700] rounded-full" />
                      <span>{post.readTime}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="font-display text-white text-2xl mb-4 group-hover:text-[#FFD700] transition-colors font-bold uppercase leading-[1.1] tracking-[0.1em]">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-[#A8A29C] text-base leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-3 text-white text-[11px] font-bold uppercase tracking-[0.2em] group/btn"
                    >
                      Read Article
                      <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-[#FFD700] group-hover/btn:border-[#FFD700] group-hover/btn:text-black transition-all">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </article>
              ))}
            </FadeIn>
          </div>
        </section>

        <div className="border-t border-white/5">
          <IndustryPartners />
        </div>

        <div className="border-t border-white/5">
          <ApplyNow />
        </div>
      </main>
    </>
  );
}

import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CourseCTA() {
  return (
    <section className="py-20 md:py-28 bg-transparent" style={{ background: "linear-gradient(135deg, rgba(42, 8, 12, 0.8) 0%, rgba(23, 4, 6, 1) 100%)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-[#F0EBE1] mb-6 font-black uppercase leading-[1.1] tracking-[0.1em]">
          Ready to Start Your Journey?
        </h2>
        <p className="text-white/85 text-lg mb-10 max-w-2xl mx-auto">
          Book a free demo class and experience our teaching methodology firsthand. No commitment required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton>
            <Link
              href="/contact"
              className="btn bg-gradient-to-r from-[#C4A882] to-[#C4132D] text-white hover:opacity-90 border border-[#C4A882]/50 px-8 py-4 rounded-lg font-black shadow-[0_0_20px_rgba(227,24,55,0.3)]"
            >
              Book Free Demo Class
            </Link>
          </MagneticButton>

          <MagneticButton>
            <a
              href="tel:+917300001589"
              className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-4 rounded-lg font-black"
            >
              Call Us: +91 7300001589
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

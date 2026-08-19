import Image from "next/image";
import Link from "next/link";
import { contactInfo } from "@/data/siteData";

/**
 * Server-rendered, always-visible homepage copy.
 * SEO scanners and LLM crawlers that do not execute JS only see this HTML.
 */
export default function HomeCrawlContent() {
  return (
    <article className="home-crawl relative z-20 mx-auto max-w-4xl px-5 md:px-12 py-16 md:py-24 text-[#F0EBE1]">
      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C4A882] mb-4">
        C-Scheme, Jaipur · Est. 1998
      </p>
      <h1 className="font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold uppercase leading-[0.95] tracking-[0.04em] text-white mb-6">
        MAAC Animation Institute Jaipur
      </h1>
      <p className="text-white/85 text-base md:text-lg leading-relaxed mb-6">
        MAAC Animation Jaipur C-Scheme is a training centre for 3D animation, visual
        effects, game design and digital filmmaking at Ambition Tower, Agrasain Circle,
        Subhash Marg. The centre has run from this address since 1998. Students work in
        Maya, 3ds Max, Nuke, After Effects, Unity and Unreal, then leave with a showreel
        and placement support from the on-site cell. Call{" "}
        <a href={`tel:${contactInfo.phone}`} className="text-[#C4A882] underline underline-offset-2">
          {contactInfo.phone}
        </a>{" "}
        or visit Monday to Saturday, 9:00 AM to 7:00 PM.
      </p>
      <p className="text-white/80 text-base leading-relaxed mb-10">
        This page is the local C-Scheme centre, not the national MAAC brand site. The
        legal classroom address is 711-712, Ambition Tower, 7th Floor, D-46B, Malan Ka
        Chauraha, C Scheme, Jaipur, Rajasthan 302001. Map pin:{" "}
        <a
          href={contactInfo.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C4A882] underline underline-offset-2"
        >
          Google Maps
        </a>
        .
      </p>

      <div className="relative w-full aspect-[16/9] mb-12 overflow-hidden rounded-2xl border border-white/10">
        <Image
          src="/campus-image.jpg"
          alt="MAAC Animation Jaipur C-Scheme campus at Ambition Tower, Subhash Marg"
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
        />
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wide text-white mb-4">
        Animation and VFX courses in Jaipur
      </h2>
      <p className="text-white/80 text-base leading-relaxed mb-4">
        The C-Scheme desk runs long diplomas, a UGC-aligned B.Voc track, and short
        skill programs. Typical paths:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-white/80 text-base leading-relaxed mb-6">
        <li>
          <Link href="/courses/3d-animation" className="text-[#C4A882] underline underline-offset-2">
            3D Animation (AD3D Edge, D3D)
          </Link>{" "}
          — modelling, texturing, rigging and character animation in Maya.
        </li>
        <li>
          <Link href="/courses/vfx" className="text-[#C4A882] underline underline-offset-2">
            Visual Effects (ADVFX, VFX Plus)
          </Link>{" "}
          — compositing, rotoscopy, matchmoving and CG integration.
        </li>
        <li>
          <Link href="/courses/gaming-design" className="text-[#C4A882] underline underline-offset-2">
            Game Design (DGDI)
          </Link>{" "}
          — game art, level work and engine integration in Unity and Unreal.
        </li>
        <li>
          <Link href="/courses/dfm" className="text-[#C4A882] underline underline-offset-2">
            Digital Filmmaking (DFM)
          </Link>{" "}
          — shooting, edit and post for short-form and diploma films.
        </li>
        <li>
          Graphic design, architectural viz, Maya Pro and Max Pro certificates for
          students who need a shorter stack.
        </li>
      </ul>
      <p className="text-white/80 text-base leading-relaxed mb-10">
        Full syllabus, duration and batch options sit on the{" "}
        <Link href="/courses" className="text-[#C4A882] underline underline-offset-2">
          courses index
        </Link>
        . Morning, afternoon and weekend batches run through the week. Fees vary by
        program length. Ask the counsellor for the current slab and EMI options rather
        than treating any blog number as a quote. Bring a laptop if you have one. Labs
        on the seventh floor have the licensed seats for the first terms.
      </p>

      <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wide text-white mb-4">
        Certifications and how this centre is not the national brand
      </h2>
      <p className="text-white/80 text-base leading-relaxed mb-4">
        Programs are framed against{" "}
        <a href="https://nsdcindia.org" target="_blank" rel="noopener noreferrer" className="text-[#C4A882] underline underline-offset-2">
          NSDC
        </a>{" "}
        and{" "}
        <a href="https://mesc.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#C4A882] underline underline-offset-2">
          MESC
        </a>{" "}
        skill standards. The parent network is{" "}
        <a href="https://www.maac.in" target="_blank" rel="noopener noreferrer" className="text-[#C4A882] underline underline-offset-2">
          MAAC India
        </a>
        . This website speaks only for the Jaipur C-Scheme classroom. Do not treat
        maacindia.com or another city centre as this entity.
      </p>
      <div className="flex flex-wrap items-center gap-6 mb-10">
        <Image src="/govt/nsdc.png" alt="NSDC logo" width={96} height={48} className="h-10 w-auto object-contain" />
        <Image src="/govt/mesc.png" alt="MESC logo" width={96} height={48} className="h-10 w-auto object-contain" />
        <Image src="/govt/skillIndia.jpg" alt="Skill India logo" width={96} height={48} className="h-10 w-auto object-contain" />
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wide text-white mb-4">
        Placement support and student work
      </h2>
      <p className="text-white/80 text-base leading-relaxed mb-4">
        The placement cell reviews showreels, runs mock interviews and introduces
        students to studios that have hired from this centre, including DNEG, MPC,
        Prime Focus, Technicolor and Ubisoft. Outcomes depend on the reel, attendance
        and the hiring cycle. See{" "}
        <Link href="/student-work" className="text-[#C4A882] underline underline-offset-2">
          student work
        </Link>{" "}
        and{" "}
        <Link href="/about" className="text-[#C4A882] underline underline-offset-2">
          about the centre
        </Link>{" "}
        for faculty and lab context.
      </p>
      <table className="w-full text-sm text-left border-collapse mb-10 text-white/80">
        <thead>
          <tr className="border-b border-white/15">
            <th className="py-2 pr-4 font-semibold text-white">Fact</th>
            <th className="py-2 font-semibold text-white">Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/10">
            <td className="py-2 pr-4">Centre</td>
            <td className="py-2">MAAC Animation Jaipur C-Scheme</td>
          </tr>
          <tr className="border-b border-white/10">
            <td className="py-2 pr-4">Address</td>
            <td className="py-2">{contactInfo.address}</td>
          </tr>
          <tr className="border-b border-white/10">
            <td className="py-2 pr-4">Hours</td>
            <td className="py-2">{contactInfo.hours}</td>
          </tr>
          <tr className="border-b border-white/10">
            <td className="py-2 pr-4">Phone</td>
            <td className="py-2">{contactInfo.phone}, {contactInfo.phoneSecondary}</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">Email</td>
            <td className="py-2">{contactInfo.email}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wide text-white mb-4">
        Visit, WhatsApp or book a demo
      </h2>
      <p className="text-white/80 text-base leading-relaxed mb-4">
        Walk in during working hours, write to {contactInfo.email}, or start on the{" "}
        <Link href="/contact" className="text-[#C4A882] underline underline-offset-2">
          contact form
        </Link>
        . A short{" "}
        <Link href="/creative-career-assessment" className="text-[#C4A882] underline underline-offset-2">
          career assessment
        </Link>{" "}
        helps match animation, VFX or games before you pay a fee. Events and trips are
        listed under{" "}
        <Link href="/events" className="text-[#C4A882] underline underline-offset-2">
          events
        </Link>
        .
      </p>
      <p className="text-white/80 text-base leading-relaxed mb-6">
        Official social for this centre only:{" "}
        <a href={contactInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[#C4A882] underline underline-offset-2">
          Instagram
        </a>
        ,{" "}
        <a href={contactInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="text-[#C4A882] underline underline-offset-2">
          Facebook
        </a>
        ,{" "}
        <a href={contactInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="text-[#C4A882] underline underline-offset-2">
          YouTube
        </a>
        . There is no X/Twitter or LinkedIn company page for this centre. Do not use
        national handles as if they were Jaipur C-Scheme.
      </p>
    </article>
  );
}

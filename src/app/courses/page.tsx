import CoursesClient from "./CoursesClient";

export { metadata } from "./metadata";

export default function CoursesPage() {
  return (
    <>
      {/* GEO Answer Block — 40-60 word direct answer for AI citation */}
      <section className="seo-page-title">
        MAAC Animation Jaipur offers over 14 animation and VFX courses at its C-Scheme campus including B.Voc in 3D Animation and VFX (UGC-recognized 3-year degree), AD3D Edge (advanced 3D animation), ADVFX Plus (advanced visual effects), D3D (3D animation diploma), Game Design, Digital Filmmaking, and short-term skill programs in Maya, 3ds Max, and motion graphics. MAAC Animation Institute Jaipur provides NSDC-certified programs with 95% placement support. Fees range from Rs. 50,000 to Rs. 2,50,000 with EMI options. Contact MAAC Animation Jaipur at +91-7300001589.
      </section>
      <h1>Animation & VFX Courses in Jaipur - MAAC Institute</h1>
      <CoursesClient />
    </>
  );
}

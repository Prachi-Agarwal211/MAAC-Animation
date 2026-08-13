import AboutClient from "./AboutClient";
import ErrorBoundary from "@/components/ErrorBoundary";

export { metadata } from "./metadata";

export default function AboutPage() {
  return (
    <ErrorBoundary>
      <section className="seo-answer-block speakable-summary">
        MAAC Animation Jaipur (Maya Academy of Advanced Creativity) opened in 1998 at C-Scheme, Jaipur. The centre is NSDC and MESC certified, offers UGC-recognized B.Voc degrees in 3D Animation and VFX, and runs a dedicated placement cell with studio partners including DNEG, Prime Focus, MPC, Technicolor and Ubisoft. Call +91-7300001589.
      </section>
      <AboutClient />
    </ErrorBoundary>
  );
}

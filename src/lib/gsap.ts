// src/lib/gsap.ts
// Centralized GSAP registration — registered ONCE globally to prevent memory leaks
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });
  // ponytail: lagSmoothing(0) removed — was causing burst-stutter when main thread blocked
}

export { gsap, ScrollTrigger };
export default gsap;

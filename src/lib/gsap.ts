// src/lib/gsap.ts
// Centralized GSAP registration — registered ONCE globally to prevent memory leaks
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // CRITICAL: Prevent address-bar resize jump on mobile
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };
export default gsap;

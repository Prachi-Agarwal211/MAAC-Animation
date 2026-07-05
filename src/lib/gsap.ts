// src/lib/gsap.ts
// Centralized GSAP registration — registered ONCE globally to prevent memory leaks
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });
  // Required for proper Lenis integration to prevent desync
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };
export default gsap;

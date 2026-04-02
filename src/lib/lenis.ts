import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | null = null;

export const initLenis = () => {
  // Return existing instance if already initialized
  if (lenis) return lenis;

  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    touchMultiplier: 2,
    infinite: false,
  });

  // Correct GSAP + Lenis sync
  lenis.on('scroll', ScrollTrigger.update);

  // GSAP ticker passes seconds, lenis needs milliseconds
  gsap.ticker.add((time: number) => {
    lenis!.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // FIX: ScrollTrigger normalization for mobile and scroll position sync
  ScrollTrigger.normalizeScroll(true);
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length && lenis) {
        lenis.scrollTo(value as number, { immediate: true });
      }
      return lenis?.scroll || window.scrollY;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
  });

  // Refresh ScrollTrigger on resize and font load
  window.addEventListener('resize', () => ScrollTrigger.refresh());
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  return lenis;
};

export const getLenis = () => lenis;

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | null = null;

export const initLenis = () => {
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

  // Refresh ScrollTrigger on resize and font load
  window.addEventListener('resize', () => ScrollTrigger.refresh());
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  return lenis;
};

export const getLenis = () => lenis;

import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

let lenis: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return true;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
};

export const initLenis = () => {
  // DISABLE on touch devices (mobile/tablet)
  if (isTouchDevice()) return null;

  if (lenis) return lenis;

  lenis = new Lenis({
    lerp: 0.08, // Slightly faster = less input lag
    smoothWheel: true,
    infinite: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  // Store ticker callback reference for cleanup
  tickerCallback = (time: number) => {
    lenis!.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  window.addEventListener('resize', () => ScrollTrigger.refresh());
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  return lenis;
};

export const getLenis = () => lenis;

// NEW: Proper destroy function that resets singleton
export const destroyLenis = () => {
  if (lenis) {
    lenis.destroy();
    if (tickerCallback) {
      gsap.ticker.remove(tickerCallback);
      tickerCallback = null;
    }
    lenis = null;
  }
};

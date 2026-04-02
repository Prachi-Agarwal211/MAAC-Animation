import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

export const initLenis = () => {
  // DISABLE on touch devices (mobile/tablet)
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }
  
  if (lenis) return lenis;

  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    touchMultiplier: 2,
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

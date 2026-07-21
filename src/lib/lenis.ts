import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { isPhoneDevice } from './constants';

let lenis: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;
let resizeHandler: (() => void) | null = null;

export const initLenis = () => {
  // DISABLE smooth scroll only on phones (< 768px touchscreens)
  if (isPhoneDevice()) return null;

  if (lenis) return lenis;

  lenis = new Lenis({
    lerp: 0.08, // Slightly faster = less input lag
    smoothWheel: true,
    infinite: false,
  });

  // Hook ScrollTrigger to Lenis scroll event
  lenis.on('scroll', ScrollTrigger.update);
  
  tickerCallback = (time: number) => {
    lenis!.raf(time * 1000);
  };
  resizeHandler = () => ScrollTrigger.refresh();

  gsap.ticker.add(tickerCallback);

  window.addEventListener('resize', resizeHandler);
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  return lenis;
};

export const getLenis = () => lenis;

// NEW: Proper destroy function that resets singleton
export const destroyLenis = () => {
  if (lenis) {
    lenis.off('scroll', ScrollTrigger.update);
    lenis.destroy();
    if (tickerCallback) {
      gsap.ticker.remove(tickerCallback);
      tickerCallback = null;
    }
    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler);
      resizeHandler = null;
    }
    lenis = null;
  }
};

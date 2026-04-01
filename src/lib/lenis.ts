import Lenis from 'lenis';

let lenis: Lenis | null = null;

export const initLenis = () => {
  if (lenis) return lenis;

  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    touchMultiplier: 2,
    infinite: false,
  });

  // Connect to GSAP ScrollTrigger
  lenis.on('scroll', () => {
    if (typeof window !== 'undefined') {
      const win = window as unknown as { ScrollTrigger?: { update: () => void } };
      win.ScrollTrigger?.update();
    }
  });

  // Sync with GSAP ticker
  const raf = (time: number) => {
    if (lenis) {
      lenis.raf(time * 1000);
    }
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  return lenis;
};

export const getLenis = () => lenis;

import { useEffect, useRef, useState } from 'react';
import { useUIStore } from '@/lib/store';
import { getLenis } from '@/lib/lenis';

/**
 * Centralized scroll hook that broadcasts scroll position via Zustand
 * Single source of truth for scroll state across the application
 * Lenis-aware: gets visual scroll position even during smooth scrolling
 */
export const useScroll = () => {
  const setScroll = useUIStore((state) => state.setScroll);
  const tickingRef = useRef(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        animationFrameRef.current = requestAnimationFrame(() => {
          const lenis = getLenis();
          const scrollY = lenis ? lenis.scroll : window.scrollY;
          setScroll(scrollY);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const lenis = getLenis();
    if (lenis) lenis.on('scroll', handleScroll);

    handleScroll();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('scroll', handleScroll);
      const l = getLenis();
      if (l) l.off('scroll', handleScroll);
    };
  }, [setScroll]);

  return {
    scrollY: useUIStore((state) => state.scrollY),
    isScrolled: useUIStore((state) => state.isScrolled),
  };
};

/**
 * Hook for scroll progress (0-100)
 * Use this for progress bars instead of adding separate scroll listeners
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const tickingRef = useRef(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        animationFrameRef.current = requestAnimationFrame(() => {
          const lenis = getLenis();
          const scrollY = lenis ? lenis.scroll : window.scrollY;
          const height = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(height > 0 ? (scrollY / height) * 100 : 0);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', handleScroll);
    }

    handleScroll();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      
      const lenisCleanup = getLenis();
      if (lenisCleanup) {
        lenisCleanup.off('scroll', handleScroll);
      }
    };
  }, []);

  return progress;
};


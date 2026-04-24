import { gsap } from './gsap';

/**
 * Centralized GSAP animation configuration
 * Manages animation presets based on device capabilities
 */

// Device capability detection
export const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  
  // Low-end if: less than 4GB RAM OR less than 4 cores AND touch device
  return (memory && memory < 4) || (cores && cores < 4) || (isTouch && cores && cores < 6);
};

export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches;
};

export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Animation preset manager
 * Returns appropriate animation settings based on device
 */
export const getAnimationPreset = () => {
  const isLowEnd = isLowEndDevice();
  const isMobile = isMobileDevice();
  const reducedMotion = prefersReducedMotion();
  
  if (reducedMotion) {
    return {
      duration: 0.01,
      ease: 'none',
      stagger: 0,
    };
  }
  
  if (isLowEnd || isMobile) {
    return {
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.05,
    };
  }
  
  // High-end desktop
  return {
    duration: 1.2,
    ease: 'expo.out',
    stagger: 0.1,
  };
};

/**
 * Apply global GSAP settings based on device
 */
export const applyGlobalSettings = () => {
  const preset = getAnimationPreset();
  
  // Set default tween duration
  gsap.config({
    force3D: !prefersReducedMotion(),
  });
  
  return preset;
};

import { gsap } from './gsap';
import { MOBILE_BREAKPOINT, isTouchDevice } from './constants';

/**
 * Centralized GSAP animation configuration
 * Manages animation presets based on device capabilities
 */

// Device capability detection
export const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean; effectiveType?: string } };
  const memory = nav.deviceMemory;
  const cores = navigator.hardwareConcurrency;
  const isTouch = isTouchDevice();
  const connection = nav.connection;
  
  // Data saver mode — most restrictive
  if (connection?.saveData) return true;
  
  // Slow connection (2G/3G)
  if (connection?.effectiveType && ['slow-2g', '2g', '3g'].includes(connection.effectiveType)) return true;
  
  // Low-end if: less than 4GB RAM OR less than 4 cores AND touch device
  return (memory && memory < 4) || (cores && cores < 4) || (isTouch && cores && cores < 6);
};

export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
};

export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if data saver mode is enabled in browser
 */
export const prefersDataSaver = () => {
  if (typeof window === 'undefined') return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return conn?.saveData === true;
};

/**
 * Get comprehensive device performance profile
 */
export const getPerformanceProfile = () => {
  return {
    isLowEnd: isLowEndDevice(),
    isMobile: isMobileDevice(),
    reducedMotion: prefersReducedMotion(),
    dataSaver: prefersDataSaver(),
  };
};

/**
 * Should we skip heavy animations/videos?
 */
export const shouldSimplify = () => {
  const profile = getPerformanceProfile();
  return profile.isLowEnd || profile.reducedMotion || profile.dataSaver;
};

/**
 * Animation preset manager
 * Returns appropriate animation settings based on device
 */
export const getAnimationPreset = () => {
  const profile = getPerformanceProfile();
  
  if (profile.reducedMotion || profile.dataSaver) {
    return {
      duration: 0.01,
      ease: 'none',
      stagger: 0,
    };
  }
  
  if (profile.isLowEnd || profile.isMobile) {
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
  
  gsap.config({
    force3D: !shouldSimplify(),
  });
  
  return preset;
};

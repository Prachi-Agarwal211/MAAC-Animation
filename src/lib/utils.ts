import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge Tailwind classes with clsx support
 * Fallback to basic string joining if libraries are missing (though they should be installed)
 */
export function cn(...inputs: ClassValue[]) {
  // Basic implementation to avoid "Module not found" if libraries are being installed/restored
  try {
    return twMerge(clsx(inputs));
  } catch {
    return inputs.filter(Boolean).join(" ");
  }
}

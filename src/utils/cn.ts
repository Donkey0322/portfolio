import { type ClassValue,clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditionally merges Tailwind class names while letting later classes win
 * over conflicting earlier ones. Used everywhere we accept `className` from
 * a parent so consumers can safely override our defaults.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

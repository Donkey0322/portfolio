"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds before the reveal starts. Used to stagger siblings. */
  delay?: number;
  /** Translate offset (px) before reveal. Negative values pull from above. */
  y?: number;
  /** When true, animates only the first time the element enters the viewport. */
  once?: boolean;
  className?: string;
}

/**
 * Tiny client-only wrapper that fades + lifts its children once they
 * scroll into view. Designed to wrap individual *server* children — the
 * surrounding section can stay an RSC.
 *
 * Honors `prefers-reduced-motion` by skipping animation entirely. Kept
 * intentionally narrow (no full motion-prop forwarding) so the public
 * surface is small and types stay simple.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

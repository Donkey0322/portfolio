"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

/**
 * Scroll-linked yin-yang koi transition. Two stylized koi swim in from the
 * top-left and bottom-right, orbit the center like the yin-yang fish, then
 * spiral inward to a closed ring before the About section is revealed.
 *
 * Implementation notes:
 *  - All motion is driven by `useScroll({ target })` so the transition is
 *    tied to scroll position, not a timer. Feels intentional rather than
 *    autoplay-y.
 *  - Pure SVG koi shapes so the component stays cheap and accessible.
 *  - Honors `prefers-reduced-motion` by collapsing to a small empty spacer.
 */
export default function YinYangKoi() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Two koi swing around a shared center. The ring tightens as the user
  // scrolls past the midpoint, then the whole transition fades out before
  // the About card enters.
  const rotation = useTransform(scrollYProgress, [0, 1], [-90, 320]);
  const radius = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [220, 80, 12]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.78, 1],
    [0, 1, 1, 0]
  );
  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1.2]);

  if (reduceMotion) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none relative h-10 w-full"
      />
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none relative h-80 w-full overflow-hidden md:h-96"
    >
      {/* Concentric ripple rings that tighten as the koi close in */}
      <motion.div
        style={{ opacity, scale: ringScale }}
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pond-300/40"
      />
      <motion.div
        style={{ opacity, scale: ringScale }}
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pond-300/25"
      />
      <motion.div
        style={{ opacity, scale: ringScale }}
        className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-pond-300/15"
      />

      {/* The rotating pair. Each koi is offset by 180° from the other. */}
      <motion.div
        style={{ rotate: rotation, opacity }}
        className="absolute left-1/2 top-1/2 h-px w-px"
      >
        <KoiOrbit
          radius={radius}
          angleDeg={0}
          color="var(--koi)"
          accent="var(--canvas-soft)"
        />
        <KoiOrbit
          radius={radius}
          angleDeg={180}
          color="var(--canvas-soft)"
          accent="var(--koi)"
        />
      </motion.div>
    </div>
  );
}

function KoiOrbit({
  radius,
  angleDeg,
  color,
  accent,
}: {
  radius: ReturnType<typeof useTransform<number, number>>;
  angleDeg: number;
  color: string;
  accent: string;
}) {
  return (
    <motion.div
      style={{ rotate: angleDeg }}
      className="absolute left-0 top-0"
    >
      <motion.div style={{ x: radius }} className="absolute left-0 top-0">
        <motion.svg
          width={68}
          height={32}
          viewBox="0 0 68 32"
          className="-translate-x-1/2 -translate-y-1/2"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          {/* Body */}
          <ellipse cx="34" cy="16" rx="24" ry="8" fill={color} />
          {/* Tail */}
          <path
            d="M9 16 Q 2 8 -3 14 Q 0 18 -2 22 Q 4 22 9 16 Z"
            fill={color}
            opacity="0.8"
          />
          {/* Accent koi spots */}
          <ellipse cx="46" cy="13" rx="3" ry="2" fill={accent} />
          <ellipse cx="38" cy="17" rx="3.4" ry="2.4" fill={accent} />
          <ellipse cx="30" cy="14" rx="2.8" ry="2" fill={accent} />
          {/* Eye */}
          <circle cx="52" cy="15" r="1.6" fill="var(--ink)" />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}

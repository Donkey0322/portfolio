"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

/**
 * Two stylized koi swim from top-left and bottom-right and rotate around the
 * center like a yin-yang pair as the user scrolls from the hero into the
 * About section. Pure SVG so it stays cheap and accessible.
 *
 * Drives all motion off `useScroll({ target })` so the transition is tied to
 * scroll position, not a timer — which makes it feel deliberate rather than
 * autoplay-y.
 */
export default function YinYangKoi() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Path: enter from corners, swirl into a tighter circle in the middle,
  // then drift further apart again. Two koi mirror each other.
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const radius = useTransform(scrollYProgress, [0, 0.5, 1], [180, 60, 180]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 1],
    [0, 1, 1, 0]
  );

  if (reduceMotion) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none relative h-12 w-full"
      />
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none relative h-72 w-full overflow-hidden md:h-80"
    >
      {/* Decorative ripple ring in the middle */}
      <motion.div
        style={{ opacity }}
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pond-300/40"
      />
      <motion.div
        style={{ opacity }}
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pond-300/20"
      />

      <motion.div
        style={{ rotate: rotation, opacity }}
        className="absolute left-1/2 top-1/2 h-px w-px"
      >
        <KoiSvg
          x={0}
          y={0}
          radius={radius}
          angleDeg={0}
          color="var(--koi)"
          accent="var(--canvas-soft)"
        />
        <KoiSvg
          x={0}
          y={0}
          radius={radius}
          angleDeg={180}
          color="var(--canvas-soft)"
          accent="var(--koi)"
        />
      </motion.div>
    </div>
  );
}

function KoiSvg({
  radius,
  angleDeg,
  color,
  accent,
}: {
  x: number;
  y: number;
  radius: ReturnType<typeof useTransform<number, number>>;
  angleDeg: number;
  color: string;
  accent: string;
}) {
  // Position fish on the orbit by translating along radius then rotating.
  return (
    <motion.div
      style={{
        rotate: angleDeg,
      }}
      className="absolute left-0 top-0"
    >
      <motion.div style={{ x: radius }} className="absolute left-0 top-0">
        <motion.svg
          width={56}
          height={28}
          viewBox="0 0 56 28"
          className="-translate-x-1/2 -translate-y-1/2"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="28" cy="14" rx="20" ry="7" fill={color} />
          <path
            d="M5 14 Q 0 8 -4 14 Q 0 20 5 14 Z"
            fill={color}
            opacity={0.8}
          />
          <circle cx="38" cy="11" r="2.2" fill={accent} />
          <circle cx="32" cy="15" r="2.6" fill={accent} />
          <circle cx="26" cy="12" r="2.2" fill={accent} />
          <circle cx="42" cy="13" r="1.4" fill="var(--ink)" />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}

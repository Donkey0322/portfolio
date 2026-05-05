"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { ArrowDownIcon } from "@/components/icons";
import HeroFallback from "@/components/pond/HeroFallback";
import { PROFILE } from "@/lib/site/profile";
import { useSeason } from "@/providers/season";
import { cn } from "@/utils/cn";

/**
 * The Three.js scene is loaded only on the client and only when we actually
 * decide to render it (desktop, motion-OK, WebGL-capable). The chunk is
 * separate from the main page bundle so initial paint stays light.
 */
const KoiPondScene = dynamic(
  () => import("@/components/pond/KoiPondScene"),
  {
    ssr: false,
    loading: () => <HeroFallback />,
  }
);

interface Props {
  /** Anchor id of the section we should scroll to from the CTA. */
  ctaTargetId: string;
}

/**
 * Full-screen koi pond hero.
 *
 * Layered as:
 *   - decorative WebGL canvas (or SVG fallback) absolutely positioned
 *   - text + CTA on top, centered
 *
 * Decision logic for whether to mount the WebGL scene:
 *   - prefers-reduced-motion → never (use SVG fallback)
 *   - viewport < 768px       → never (use SVG fallback, save battery)
 *   - WebGL unavailable      → never (use SVG fallback)
 *   - everywhere else        → mount, after a small idle delay so initial
 *                              page interactivity isn't blocked by Three init.
 */
export default function KoiPondHero({ ctaTargetId }: Props) {
  const reduceMotion = useReducedMotion();
  const { season } = useSeason();
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const mq = window.matchMedia("(min-width: 768px)");
    const supportsWebGL = (() => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") ??
            canvas.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    })();
    if (!mq.matches || !supportsWebGL) return;

    /**
     * Defer Three init until the browser is idle so the rest of the page
     * can become interactive first. `requestIdleCallback` isn't in every
     * browser, so fall back to a short timeout.
     */
    const idle = (cb: () => void) => {
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void) => number;
      };
      if (typeof w.requestIdleCallback === "function") {
        return w.requestIdleCallback(cb);
      }
      return window.setTimeout(cb, 250);
    };
    const handle = idle(() => setShouldRender3D(true));

    const onChange = () => {
      setShouldRender3D(mq.matches && supportsWebGL);
    };
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      clearTimeout(handle as unknown as number);
    };
  }, [reduceMotion]);

  return (
    <section
      id="hero"
      aria-label="Welcome"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* WebGL canvas / SVG fallback layer. */}
      <div className="pointer-events-auto absolute inset-0 -z-10">
        {shouldRender3D ? <KoiPondScene season={season} /> : <HeroFallback />}
      </div>

      {/* Soft overlay for legibility regardless of palette. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-canvas/0 via-canvas/0 to-canvas/60"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-sm uppercase tracking-[0.4em] text-pond-700"
        >
          welcome to the pond
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 font-display text-5xl leading-tight text-ink sm:text-6xl md:text-7xl"
        >
          Hi, I&apos;m{" "}
          <span className="ink-gradient">{PROFILE.name}</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-5 max-w-xl text-base text-ink-soft sm:text-lg"
        >
          {PROFILE.title} · {PROFILE.tagline}
          <br />
          <span className="text-ink-soft/80">
            Move your cursor across the pond — the koi don&apos;t mind.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={`#${ctaTargetId}`}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full bg-pond-700 px-6 py-3 text-sm font-semibold text-canvas-soft shadow-water transition-all hover:-translate-y-0.5 hover:bg-pond-800"
            )}
          >
            <span>Wander in</span>
            <ArrowDownIcon className="transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-canvas-soft/70 px-6 py-3 text-sm font-medium text-ink backdrop-blur transition-all hover:-translate-y-0.5 hover:border-pond-300"
          >
            See projects
          </a>
        </motion.div>
      </div>

      {/* Quiet scroll hint at the bottom. */}
      <motion.a
        href={`#${ctaTargetId}`}
        aria-label="Scroll to about section"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ink-soft/70"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          <ArrowDownIcon className="text-2xl" />
        </motion.span>
      </motion.a>
    </section>
  );
}

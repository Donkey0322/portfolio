"use client";

import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import HeroPanel from "@/components/pond/HeroPanel";
import HeroScenery from "@/components/pond/HeroScenery";
import { useSeason } from "@/providers/season";

/**
 * The koi pond hero — a faithful, interactive translation of the cover
 * artwork. Composition (back-to-front):
 *
 *   1. <HeroScenery background>    Painted sky, mountains, mist, water,
 *                                  bamboo, cherry branch + lanterns,
 *                                  waterfall. (SSR-renderable SVG.)
 *
 *   2. <KoiPondScene>              Bounded WebGL canvas — koi swim across
 *                                  the painted pond, mouse hover creates
 *                                  ripples. Mounted only on the client
 *                                  after we've decided we *should* render
 *                                  3D (desktop, motion-ok, WebGL-capable).
 *
 *   3. <HeroScenery foreground>    Foreground rocks, lotus blossoms, grass,
 *                                  bamboo spout — sits *on top* of the
 *                                  canvas so koi appear to swim "behind"
 *                                  the rocks and lotus.
 *
 *   4. <HeroPanel>                 Title, parchment card with three nav
 *                                  links, CTA pill, social row, portrait
 *                                  medallion in the corner.
 *
 * The R3F scene is dynamically imported so initial paint is fast and the
 * page stays SSR-friendly. A graceful fallback (no canvas, just the painted
 * SVG) is used on mobile, reduced-motion sessions, and devices without
 * WebGL.
 */

interface Props {
  /** Anchor id the CTA scrolls to. */
  ctaTargetId: string;
}

const KoiPondScene = dynamic(
  () => import("@/components/pond/KoiPondScene"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function KoiPondHero({ ctaTargetId }: Props) {
  const reduceMotion = useReducedMotion();
  const { season } = useSeason();
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    /**
     * Diagnostic escape hatch: `?force-3d=1` forces the WebGL scene to
     * mount even when the gates would normally fall back to SVG-only. Used
     * by the Playwright regression test for the ReactCurrentOwner issue.
     */
    const force =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("force-3d") === "1";

    if (reduceMotion && !force) return;

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
    if (!force && (!mq.matches || !supportsWebGL)) return;

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
    const handle = force
      ? window.setTimeout(() => setShouldRender3D(true), 0)
      : idle(() => setShouldRender3D(true));

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
      {/* 1. Painted background scenery — sky, mountains, bamboo, cherry,
             waterfall, painted pond. SSR-renderable. */}
      <HeroScenery
        season={season}
        background
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full"
      />

      {/* 2. WebGL koi pond canvas — bounded to the painted pond area so it
             doesn't bleed into the sky. Only mounts when allowed. */}
      <div
        className="pointer-events-auto absolute inset-x-0 bottom-0 -z-10 h-[60%] md:h-[55%]"
        aria-hidden="true"
      >
        {shouldRender3D ? <KoiPondScene season={season} /> : null}
      </div>

      {/* 3. Painted foreground scenery — rocks, lotus blossoms, grass,
             bamboo spout. Sits on top of the canvas so koi swim *behind*
             these elements. */}
      <HeroScenery
        season={season}
        foreground
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      />

      {/* 4. UI layer — title, parchment card, portrait. */}
      <div className="relative z-10 w-full">
        <HeroPanel ctaTargetId={ctaTargetId} />
      </div>
    </section>
  );
}

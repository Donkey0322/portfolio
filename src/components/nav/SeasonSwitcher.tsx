"use client";

import { motion } from "framer-motion";

import {
  type Season,
  SEASON_EMOJI,
  SEASON_LABEL,
  SEASONS,
} from "@/lib/season/types";
import { useSeason } from "@/providers/season";
import { cn } from "@/utils/cn";

interface Props {
  className?: string;
  /** Compact pill mode used in the mobile drawer / footer. */
  compact?: boolean;
}

export default function SeasonSwitcher({ className, compact }: Props) {
  const { season, setSeason } = useSeason();

  return (
    <div
      role="radiogroup"
      aria-label="Season palette"
      className={cn(
        "relative inline-flex items-center gap-1 rounded-full border border-border-soft bg-canvas-soft/70 p-1 backdrop-blur",
        compact && "p-0.5",
        className
      )}
    >
      {SEASONS.map((s: Season) => {
        const active = s === season;
        return (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`Switch to ${SEASON_LABEL[s]}`}
            data-season-value={s}
            onClick={() => setSeason(s)}
            className={cn(
              "relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              compact && "px-2 py-1 text-[11px]",
              active ? "text-canvas-soft" : "text-ink/60 hover:text-ink"
            )}
          >
            {active && (
              <motion.span
                layoutId="season-pill"
                className="absolute inset-0 -z-10 rounded-full bg-pond-700"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span aria-hidden="true">{SEASON_EMOJI[s]}</span>
            <span className={cn(compact && "sr-only sm:not-sr-only")}>
              {SEASON_LABEL[s]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

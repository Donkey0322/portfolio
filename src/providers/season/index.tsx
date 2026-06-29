"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { ReactNode } from "react";

import {
  DEFAULT_SEASON,
  type Season,
  SEASONS,
  STORAGE_KEY,
} from "@/lib/season/types";

interface SeasonContextValue {
  season: Season;
  setSeason: (next: Season) => void;
  cycleSeason: () => void;
}

const SeasonContext = createContext<SeasonContextValue | null>(null);

export function SeasonProvider({ children }: { children: ReactNode }) {
  /**
   * The inline `SEASON_BOOT_SCRIPT` already set `<html data-season="...">`
   * before hydration, so we read straight from the DOM on mount instead
   * of touching `localStorage` here. That keeps SSR markup deterministic
   * (no `season`-dependent attributes are rendered on the server).
   */
  const [season, setSeasonState] = useState<Season>(DEFAULT_SEASON);

  useEffect(() => {
    const fromDom = document.documentElement.getAttribute(
      "data-season"
    ) as Season | null;
    if (fromDom && SEASONS.includes(fromDom)) {
      setSeasonState(fromDom);
    }
  }, []);

  const setSeason = useCallback((next: Season) => {
    setSeasonState(next);
    document.documentElement.setAttribute("data-season", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage may be unavailable (private mode); ignore.
    }
  }, []);

  const cycleSeason = useCallback(() => {
    setSeasonState((current) => {
      const idx = SEASONS.indexOf(current);
      const next = SEASONS[(idx + 1) % SEASONS.length];
      document.documentElement.setAttribute("data-season", next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ season, setSeason, cycleSeason }),
    [season, setSeason, cycleSeason]
  );

  return (
    <SeasonContext.Provider value={value}>{children}</SeasonContext.Provider>
  );
}

export function useSeason(): SeasonContextValue {
  const ctx = useContext(SeasonContext);
  if (!ctx) {
    throw new Error("useSeason must be used inside <SeasonProvider />");
  }
  return ctx;
}

export type Season = "spring" | "summer" | "autumn" | "winter";

export const SEASONS: Season[] = ["spring", "summer", "autumn", "winter"];

export const SEASON_LABEL: Record<Season, string> = {
  spring: "Spring",
  summer: "Summer",
  autumn: "Autumn",
  winter: "Winter",
};

export const SEASON_EMOJI: Record<Season, string> = {
  spring: "🌸",
  summer: "🪷",
  autumn: "🍁",
  winter: "❄️",
};

export const DEFAULT_SEASON: Season = "summer";

export const STORAGE_KEY = "portfolio:season";

/**
 * Pond accent colors mirrored in TS for the koi pond canvas (Three.js does not
 * read CSS variables). Keep these in lockstep with `globals.css` palette tokens.
 */
export interface SeasonScene {
  water: string;
  waterDeep: string;
  sky: string;
  koiA: string;
  koiB: string;
  lotus: string;
  leaf: string;
  petal: string;
}

export const SEASON_SCENE: Record<Season, SeasonScene> = {
  spring: {
    water: "#fbe1ea",
    waterDeep: "#973655",
    sky: "#fff7fa",
    koiA: "#ff5d8f",
    koiB: "#ffffff",
    lotus: "#ffb3c7",
    leaf: "#6dba7a",
    petal: "#ffd2df",
  },
  summer: {
    water: "#aee2c9",
    waterDeep: "#1d5e4f",
    sky: "#f3fbf6",
    koiA: "#ff7849",
    koiB: "#ffffff",
    lotus: "#ff5c8a",
    leaf: "#2f9476",
    petal: "#ffd1bd",
  },
  autumn: {
    water: "#fadfc4",
    waterDeep: "#823814",
    sky: "#fff5e8",
    koiA: "#d63a1c",
    koiB: "#f6c290",
    lotus: "#f0a05f",
    leaf: "#a04a14",
    petal: "#fae0c5",
  },
  winter: {
    water: "#dbe7f2",
    waterDeep: "#2f4862",
    sky: "#f6fafc",
    koiA: "#6190b8",
    koiB: "#ffffff",
    lotus: "#c2cfe5",
    leaf: "#6e8aa3",
    petal: "#e3eaf5",
  },
};


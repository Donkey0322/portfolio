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
 * Painterly scene palette mirrored in TypeScript so we can drive both
 *   - the SVG backdrop (`HeroScenery`), and
 *   - the WebGL koi scene (`KoiPondScene`)
 * from a single source. Three.js cannot read CSS variables, hence the
 * duplication. Keep these in lockstep with the relevant tokens in
 * `globals.css`.
 *
 * Visual roles:
 *   skyTop / skyBottom — gradient behind the mountains
 *   mountainBack / mountainMid / mountainFront — three painterly ridges
 *   mist — atmospheric haze in front of the mountains
 *   water / waterDeep — pond surface tint and reflection depth
 *   leaf — lotus pad green
 *   lotus — lotus blossom pink
 *   blossom — flowering branch (cherry, plum, maple) tint
 *   bamboo — bamboo stalk green
 *   stone — rock body color
 *   stoneShadow — rock shadow / underside
 *   lantern — lantern lamp glow
 *   parchment / parchmentEdge — central card body and edge
 *   koiA / koiB — two koi color variants
 *   petal — drifting particle tint
 */
export interface SeasonScene {
  skyTop: string;
  skyBottom: string;
  mountainBack: string;
  mountainMid: string;
  mountainFront: string;
  mist: string;
  water: string;
  waterDeep: string;
  leaf: string;
  lotus: string;
  blossom: string;
  bamboo: string;
  stone: string;
  stoneShadow: string;
  lantern: string;
  parchment: string;
  parchmentEdge: string;
  koiA: string;
  koiB: string;
  petal: string;
  /** Convenience: solid-color clear used by the WebGL canvas. */
  sky: string;
}

export const SEASON_SCENE: Record<Season, SeasonScene> = {
  spring: {
    skyTop: "#fff7fa",
    skyBottom: "#ffe1ec",
    mountainBack: "#b69bc8",
    mountainMid: "#8b7aa6",
    mountainFront: "#5e547d",
    mist: "#fff4f7",
    water: "#f1d8e2",
    waterDeep: "#b56b88",
    leaf: "#83c489",
    lotus: "#ff95b4",
    blossom: "#ffc4d6",
    bamboo: "#6daa6b",
    stone: "#b0a59a",
    stoneShadow: "#6f6258",
    lantern: "#ffb56a",
    parchment: "#fff7ec",
    parchmentEdge: "#d9c19c",
    koiA: "#ff5d8f",
    koiB: "#ffffff",
    petal: "#ffd2df",
    sky: "#fff7fa",
  },
  summer: {
    skyTop: "#dbeef2",
    skyBottom: "#a9d4d7",
    mountainBack: "#7796a6",
    mountainMid: "#4f7585",
    mountainFront: "#2f4c5d",
    mist: "#eaf3f4",
    water: "#9fd6bc",
    waterDeep: "#1d5e4f",
    leaf: "#2f9476",
    lotus: "#ff7faa",
    blossom: "#ffb7c8",
    bamboo: "#3c8f5c",
    stone: "#a89c8f",
    stoneShadow: "#5d4f44",
    lantern: "#ffb56a",
    parchment: "#fff5e1",
    parchmentEdge: "#cdb98a",
    koiA: "#ff7849",
    koiB: "#ffffff",
    petal: "#ffd1bd",
    sky: "#dbeef2",
  },
  autumn: {
    skyTop: "#fff5e8",
    skyBottom: "#ffd9a9",
    mountainBack: "#c89c7a",
    mountainMid: "#a37052",
    mountainFront: "#704632",
    mist: "#fff0dc",
    water: "#f0c79a",
    waterDeep: "#823814",
    leaf: "#bf8950",
    lotus: "#f0a05f",
    blossom: "#ff9b67",
    bamboo: "#94732f",
    stone: "#a8927a",
    stoneShadow: "#5d4732",
    lantern: "#ff8a3a",
    parchment: "#fff2dc",
    parchmentEdge: "#cca87a",
    koiA: "#d63a1c",
    koiB: "#f6c290",
    petal: "#ffd29e",
    sky: "#fff5e8",
  },
  winter: {
    skyTop: "#f3f7fb",
    skyBottom: "#d4e1ee",
    mountainBack: "#b5c4d4",
    mountainMid: "#8aa0b6",
    mountainFront: "#5d738a",
    mist: "#eef4f8",
    water: "#cad7e6",
    waterDeep: "#2f4862",
    leaf: "#8aa3b3",
    lotus: "#c2cfe5",
    blossom: "#dfe6f2",
    bamboo: "#7c97a8",
    stone: "#9aa7b1",
    stoneShadow: "#4e5b69",
    lantern: "#ffd29a",
    parchment: "#f8fbfd",
    parchmentEdge: "#b9c8d7",
    koiA: "#6190b8",
    koiB: "#ffffff",
    petal: "#e3eaf5",
    sky: "#f3f7fb",
  },
};

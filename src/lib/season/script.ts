import { DEFAULT_SEASON, STORAGE_KEY } from "@/lib/season/types";

/**
 * Inline script body that runs *before* React hydrates.
 *
 * It reads the persisted season from `localStorage` and sets it on the
 * `<html data-season="...">` attribute synchronously, so that CSS variables
 * resolve to the correct palette on first paint and we never get a flash
 * of the default summer palette.
 *
 * Kept as a string constant (rather than imported into a `<script>`) so it
 * is statically embedded by Next.js with zero runtime overhead.
 */
export const SEASON_BOOT_SCRIPT = `(() => {
  try {
    var key = ${JSON.stringify(STORAGE_KEY)};
    var allowed = ["spring","summer","autumn","winter"];
    var stored = window.localStorage.getItem(key);
    var season = allowed.indexOf(stored) >= 0 ? stored : ${JSON.stringify(DEFAULT_SEASON)};
    document.documentElement.setAttribute("data-season", season);
  } catch (_) {
    document.documentElement.setAttribute("data-season", ${JSON.stringify(DEFAULT_SEASON)});
  }
})();`;

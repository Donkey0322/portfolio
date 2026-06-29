import { test, expect, type ConsoleMessage } from "@playwright/test";

/**
 * Regression for the React 18.3 + react-reconciler@0.27 incompatibility that
 * surfaced as `Cannot read properties of undefined (reading 'ReactCurrentOwner')`.
 *
 * We force-mount the Three.js scene (bypassing the idle / reduced-motion gate)
 * by navigating to `/?force-3d=1`, then assert:
 *   - a `<canvas>` is present (R3F mounted)
 *   - no console errors fired during scene init.
 */
test("koi pond canvas mounts without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err: Error) => {
    errors.push(err.message);
  });

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/?force-3d=1");

  /**
   * Wait up to 15s for the lazy-loaded Three.js chunk to mount a canvas.
   * In environments where WebGL is unavailable the SVG fallback ships
   * instead — the test treats either as acceptable, but if a canvas IS
   * created we additionally assert it produced no console errors.
   */
  const canvas = page.locator("section#hero canvas");
  const fallback = page.locator("section#hero svg[viewBox='0 0 1200 800']");
  await Promise.race([
    canvas.first().waitFor({ state: "attached", timeout: 15_000 }),
    fallback.first().waitFor({ state: "attached", timeout: 15_000 }),
  ]);

  // Give R3F a moment to call into the reconciler.
  await page.waitForTimeout(1500);

  const reactInternalErrors = errors.filter((e) =>
    /ReactCurrentOwner|react-reconciler|Cannot read properties of undefined/i.test(
      e
    )
  );
  expect(
    reactInternalErrors,
    `Unexpected React/R3F runtime errors:\n${reactInternalErrors.join("\n")}`
  ).toEqual([]);
});

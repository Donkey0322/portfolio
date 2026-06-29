import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./e2e",
  /**
   * Run sequentially. The dev server compiles each route on first visit;
   * parallel hits to /, /resume, etc. cause slow first-paint timeouts.
   * Sequential execution is plenty fast for our small suite.
   */
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  /** Default expect / navigation budget, bumped for cold dev compiles. */
  expect: { timeout: 15_000 },
  timeout: 60_000,
  reporter: [["list"]],
  /**
   * Spin up the Next dev server automatically before running tests, unless
   * `E2E_BASE_URL` is set to point at an already-running instance (CI).
   */
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "pnpm next dev -p 3000",
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});


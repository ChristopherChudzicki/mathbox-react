import { defineConfig, devices } from "@playwright/test"

/**
 * Drives the examples app in a real browser so we can assert against real
 * WebGL / real-frame behavior that jsdom cannot model — a smoke test of the
 * scene graph, and the useLayoutEffect atomic-mount regression test. See the
 * specs under src/playwright/.
 *
 * The examples app resolves `mathbox-react` to its TypeScript source (a Vite
 * alias in vite.config.ts), so no build step is needed before running these.
 */
export default defineConfig({
  testDir: "./src/playwright",
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "list" : "line",
  use: {
    baseURL: "http://localhost:5173",
    launchOptions: {
      // Headless Chromium needs software WebGL (SwiftShader) to run mathbox's
      // WebGL context. Chromium 120+ requires --enable-unsafe-swiftshader to
      // opt into it; without these flags the renderer segfaults.
      args: [
        "--use-gl=angle",
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
      ],
    },
  },
  webServer: {
    command: "yarn dev --port 5173 --strictPort",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
})

/* eslint-disable no-underscore-dangle */
import { test, expect } from "@playwright/test"

/**
 * Real-browser smoke test: renders a scene with the actual library, a real
 * mathbox instance, and a real WebGL context, then asserts the scene graph was
 * built correctly. The jsdom unit tests exercise the same code against a fake
 * WebGL automock, so this is the only coverage that would catch a breakage that
 * only surfaces with a real browser / real three.js.
 *
 * `window.__mbRoot` is populated by the TestHarness view.
 */
test.describe("real-browser mount", () => {
  test("builds the mathbox scene graph in a real WebGL context", async ({
    page,
  }) => {
    await page.goto("/test-harness")

    await page.waitForFunction(
      () => !!(window as unknown as { __mbRoot?: unknown }).__mbRoot
    )

    const counts = await page.evaluate(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const root = (window as any).__mbRoot
      return {
        cartesian: root.select("cartesian").length,
        group: root.select("group").length,
        axis: root.select("axis").length,
        grid: root.select("grid").length,
      }
    })

    expect(counts).toEqual({ cartesian: 1, group: 1, axis: 2, grid: 2 })
  })
})

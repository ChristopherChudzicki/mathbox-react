/* eslint-disable no-underscore-dangle */
import { test, expect } from "@playwright/test"

/** One per-frame node-count sample, recorded by the LayoutEffectHarness view. */
type MbFrame = { frame: number; groups: number; grids: number }
declare global {
  interface Window {
    __mbFrames?: MbFrame[]
  }
}

/**
 * Pins the `useLayoutEffect` timing of the node-creation effects in the factory
 * (`components.tsx`) and root (`Mathbox.tsx`): the whole mathbox scene graph is
 * built in a single synchronous, pre-paint commit, so every node exists on the
 * very first animation frame after mount.
 *
 * If those effects revert to `useEffect` (passive), the build is deferred past
 * the first paint and the tree fills in over several frames instead — measured
 * here, frame 0 is empty and the 8-deep tree isn't complete until ~frame 4
 * (later still under CPU load). This test fails in that case because the first
 * sampled frame is incomplete.
 *
 * The `/layout-effect-harness` view renders an 8-level-deep tree — each level a
 * `<Group>` holding a renderable `<Grid>` (a real warmup participant, so the
 * passive-effect build spreads over a wide, non-flaky margin) — and records the
 * node counts once per animation frame into `window.__mbFrames`.
 */
test.describe("layout-effect atomic mount", () => {
  test("builds the entire scene graph on the first animation frame", async ({
    page,
  }) => {
    await page.goto("/layout-effect-harness")

    // Wait until the per-frame samples settle (the tree stops growing).
    await page.waitForFunction(() => {
      const f = window.__mbFrames
      if (!f || f.length < 12) return false
      const last = f[f.length - 1]
      return (
        last.grids > 0 &&
        f
          .slice(-6)
          .every((x) => x.grids === last.grids && x.groups === last.groups)
      )
    })

    const frames = await page.evaluate(() => window.__mbFrames ?? [])
    const first = frames[0]
    const settled = frames[frames.length - 1]

    // Sanity: the deep tree actually built (8 nested groups, each with a grid).
    expect(settled).toMatchObject({ groups: 8, grids: 8 })

    // The heart of the test: the first sampled frame already holds the whole
    // tree — it was built atomically in one commit, not filled in over frames.
    // Under `useEffect` this frame would be empty (0 groups, 0 grids).
    expect(first.groups).toBe(settled.groups)
    expect(first.grids).toBe(settled.grids)
  })
})

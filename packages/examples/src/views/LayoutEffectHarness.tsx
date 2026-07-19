/* eslint-disable no-underscore-dangle */
import React, { useCallback, useLayoutEffect } from "react"
import { ContainedMathbox, Cartesian, Group, Grid } from "mathbox-react"
import type { MathboxSelection } from "mathbox"

/**
 * Deep-tree harness for the useEffect-vs-useLayoutEffect regression test.
 *
 * The two effect timings build an *identical* final tree; they differ only in
 * how many animation frames the build takes. The factory creates each node in
 * an effect and only exposes a real parent to its children after that effect
 * runs, so the tree builds one level per `effect -> forceUpdate -> re-render`
 * cycle:
 *   - useLayoutEffect: the whole cascade flushes synchronously, before paint,
 *     so the entire tree exists on the very first animation frame.
 *   - useEffect (passive): each level flushes after a paint, so the tree fills
 *     in over several frames.
 *
 * To observe that we need (a) a *deep* tree and (b) a *per-frame* measurement.
 * Each level also holds a renderable `Grid` — a real warmup participant — so
 * the passive-effect build spreads over a comfortably wide, non-flaky margin
 * rather than collapsing into a single deferred frame the way a groups-only
 * tree does. We record, once per animation frame, how many nodes exist yet.
 */
declare global {
  interface Window {
    __mbRoot?: MathboxSelection<"root"> | null
    __mbFrames?: Array<{ frame: number; groups: number; grids: number }>
  }
}

const LayoutEffectHarness: React.FC = () => {
  const handleRoot = useCallback((root: MathboxSelection<"root"> | null) => {
    window.__mbRoot = root
  }, [])

  // Sample the node counts once per frame, starting as early as possible.
  useLayoutEffect(() => {
    window.__mbFrames = []
    let frame = 0
    let raf = 0
    const tick = () => {
      const root = window.__mbRoot
      const groups = root ? root.select("group").length : 0
      const grids = root ? root.select("grid").length : 0
      window.__mbFrames?.push({ frame, groups, grids })
      frame += 1
      if (frame < 40) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <ContainedMathbox
      ref={handleRoot}
      options={{ plugins: ["core"] }}
      containerStyle={{ height: "100vh" }}
    >
      <Cartesian>
        <Group>
          <Grid axes="xy" />
          <Group>
            <Grid axes="xy" />
            <Group>
              <Grid axes="xy" />
              <Group>
                <Grid axes="xy" />
                <Group>
                  <Grid axes="xy" />
                  <Group>
                    <Grid axes="xy" />
                    <Group>
                      <Grid axes="xy" />
                      <Group>
                        <Grid axes="xy" />
                      </Group>
                    </Group>
                  </Group>
                </Group>
              </Group>
            </Group>
          </Group>
        </Group>
      </Cartesian>
    </ContainedMathbox>
  )
}

export default LayoutEffectHarness

/* eslint-disable no-underscore-dangle */
import React, { useCallback } from "react"
import { ContainedMathbox, Cartesian, Group, Axis, Grid } from "mathbox-react"
import type { MathboxSelection } from "mathbox"

/**
 * A small, deterministic scene used by the Playwright smoke test. It exposes
 * the root selection on `window` so the test can assert — in a real browser
 * with a real WebGL context — that the library builds mathbox's scene graph
 * correctly. (The jsdom unit tests run against a fake WebGL automock, so they
 * can't catch real-browser integration breakage.)
 */
declare global {
  interface Window {
    __mbRoot?: MathboxSelection<"root"> | null
  }
}

const TestHarness: React.FC = () => {
  const handleRoot = useCallback((root: MathboxSelection<"root"> | null) => {
    window.__mbRoot = root
  }, [])

  return (
    <ContainedMathbox
      ref={handleRoot}
      options={{ plugins: ["core"] }}
      containerStyle={{ height: "100vh" }}
    >
      <Cartesian>
        <Group>
          <Axis axis="x" />
          <Axis axis="y" />
          <Grid axes="xy" />
          <Grid axes="xz" />
        </Group>
      </Cartesian>
    </ContainedMathbox>
  )
}

export default TestHarness

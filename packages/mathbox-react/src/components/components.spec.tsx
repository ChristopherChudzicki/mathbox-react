import React, { useState } from "react"
import { render, act } from "@testing-library/react"
import { MathboxSelection } from "mathbox"
import ContainedMathbox from "./ContainedMathbox"
import Mathbox from "./Mathbox"
import { Cartesian, Grid, Voxel } from "./components"
import { MathboxRef } from "./types"

function assertNotNil<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined) {
    throw new Error("Unexpected undefined value")
  }
  if (value === null) {
    throw new Error("Unexpected null value")
  }
}

/**
 * Assert that two mathbox selections have the same nodes in the same order.
 */
const assertSelectionsEqual = (s1: MathboxSelection, s2: MathboxSelection) => {
  expect(s1.length).toBe(s2.length)
  Array(s1.length)
    .fill(null)
    .forEach((_, i) => {
      expect(s1[i]).toBe(s2[i])
    })
}

describe("ContainedMathbox", () => {
  it("makes a new mathbox instance only if the options have changed", () => {
    const mbRef: MathboxRef<"root"> = { current: null }
    const { rerender } = render(<ContainedMathbox options={{}} ref={mbRef} />)

    const mb0 = mbRef.current
    assertNotNil(mb0)
    rerender(<ContainedMathbox options={{}} ref={mbRef} />)
    const mb1 = mbRef.current
    expect(mb1).toBe(mb0)
    assertNotNil(mb1)
    rerender(<ContainedMathbox options={{ plugins: ["core"] }} ref={mbRef} />)
    const mb2 = mbRef.current
    assertNotNil(mb2)
    expect(mb2).not.toBe(mb1)
  })
})

describe("Cartesian", () => {
  it("exposes Mathbox instance via ref", () => {
    const mbRef: MathboxRef<"root"> = { current: null }
    const cartesianRef: MathboxRef<"cartesian"> = { current: null }
    render(
      <ContainedMathbox ref={mbRef}>
        <Cartesian ref={cartesianRef} />
      </ContainedMathbox>
    )

    expect(mbRef.current?.[0].type).toBe("root")
    expect(cartesianRef.current?.[0].type).toBe("cartesian")
  })

  it("creates a cartesian instance as child of root", () => {
    const mbRef: MathboxRef<"root"> = { current: null }
    render(
      <ContainedMathbox ref={mbRef}>
        <Cartesian />
      </ContainedMathbox>
    )
    expect(mbRef.current?.select("cartesian").length).toBe(1)
  })

  it("creates mathbox children as children of itself", () => {
    const mbRef: MathboxRef<"root"> = { current: null }
    render(
      <ContainedMathbox ref={mbRef}>
        <Cartesian>
          <Grid />
          <Grid />
        </Cartesian>
      </ContainedMathbox>
    )
    mbRef.current?.print()
    expect(mbRef.current?.select("cartesian").length).toBe(1)
    expect(mbRef.current?.select("cartesian grid").length).toBe(2)
  })

  it("removes its mathbox instance when unmounted", () => {
    const mbRef: MathboxRef<"root"> = { current: null }
    const { rerender } = render(
      <ContainedMathbox ref={mbRef}>
        <Cartesian />
      </ContainedMathbox>
    )
    expect(mbRef.current?.select("cartesian").length).toBe(1)
    rerender(<ContainedMathbox ref={mbRef} />)
    expect(mbRef.current?.select("cartesian").length).toBe(0)
  })

  it.each([
    { props: { visible: true, scale: [3, 2, 1] } },
    { props: { visible: false, scale: [1, 2, 3] } },
  ])("passes appropriate props to its mathbox instance", ({ props }) => {
    const mbRef: MathboxRef<"root"> = { current: null }
    render(
      <ContainedMathbox ref={mbRef}>
        <Cartesian {...props} />
      </ContainedMathbox>
    )
    const cartesian = mbRef.current?.select<"cartesian">("cartesian")

    assertNotNil(cartesian)

    expect(cartesian.get("visible")).toBe(props.visible)
    // Mathbox converts scale to a ThreeJS Vec3
    expect(cartesian.get("scale").toArray()).toStrictEqual(props.scale)
  })

  it("updates props on its mathbox instance when rerendered", () => {
    const mbRef: MathboxRef<"root"> = { current: null }
    const { rerender } = render(
      <ContainedMathbox ref={mbRef}>
        <Cartesian />
      </ContainedMathbox>
    )
    const cartesian = mbRef.current?.select<"cartesian">("cartesian")
    assertNotNil(cartesian)

    expect(cartesian.get("visible")).toBe(true)
    rerender(
      <ContainedMathbox ref={mbRef}>
        <Cartesian visible={false} />
      </ContainedMathbox>
    )
    expect(cartesian.get("visible")).toBe(false)
  })

  it("updates liveProps on its mathbox instance when rerendered", async () => {
    const mbRef: MathboxRef<"root"> = { current: null }
    const { rerender } = render(
      <ContainedMathbox ref={mbRef}>
        <Cartesian>
          <Grid
            liveProps={{
              width: (t) => 1 + t,
            }}
          />
        </Cartesian>
      </ContainedMathbox>
    )
    const grid = mbRef.current?.select<"grid">("grid")
    assertNotNil(grid)

    const w1 = grid.get("width")
    await new Promise((resolve) => {
      setTimeout(resolve, 500)
    })
    const w2 = grid.get("width")
    expect(w1).toBe(1)
    // Mathbox uses seconds
    expect(w2 - w1).toBeGreaterThan(0.45)
    expect(w2 - w1).toBeLessThanOrEqual(0.5)
    rerender(
      <ContainedMathbox ref={mbRef}>
        <Cartesian>
          <Grid width={10} />
        </Cartesian>
      </ContainedMathbox>
    )
    expect(grid.get("width")).toBe(10)
  })

  it("re-renders inside new instance when root changes", () => {
    const mbRef: MathboxRef<"root"> = { current: null }
    const cartesianRef: MathboxRef<"cartesian"> = { current: null }
    const gridRef: MathboxRef<"grid"> = { current: null }
    const options1 = {}
    const { rerender } = render(
      <ContainedMathbox ref={mbRef} options={options1}>
        <Cartesian ref={cartesianRef}>
          <Grid ref={gridRef} />
        </Cartesian>
      </ContainedMathbox>
    )

    const mb1 = mbRef.current
    const cartesian1 = cartesianRef.current
    const grid1 = gridRef.current
    assertNotNil(mb1)
    assertNotNil(cartesian1)
    assertNotNil(grid1)

    expect(cartesian1).toHaveLength(1)
    assertSelectionsEqual(mb1.select("cartesian"), cartesian1)
    expect(grid1).toHaveLength(1)
    assertSelectionsEqual(mb1.select("grid"), grid1)

    /**
     * When re-rendered, this will create a new mathBox since the options
     * object prop will have changed.
     */
    const options2 = { plugins: ["core"] }
    expect(options1).not.toBe(options2)

    rerender(
      <ContainedMathbox ref={mbRef} options={options2}>
        <Cartesian ref={cartesianRef}>
          <Grid ref={gridRef} />
        </Cartesian>
      </ContainedMathbox>
    )

    const mb2 = mbRef.current
    const cartesian2 = cartesianRef.current
    const grid2 = gridRef.current
    assertNotNil(mb2)
    assertNotNil(cartesian2)
    assertNotNil(grid2)

    // The options have changed (via deep equal) so a new instance is created
    expect(mb1).not.toBe(mb2)

    expect(cartesian2).toHaveLength(1)
    assertSelectionsEqual(mb2.select("cartesian"), cartesian2)
    expect(grid2).toHaveLength(1)
    assertSelectionsEqual(mb2.select("grid"), grid2)
  })

  it("Can render a new instance without error", async () => {
    const mbRef: MathboxRef<"root"> = { current: null }
    let containerDiv: HTMLDivElement | null = null
    let setKey: (key: string) => void
    const KeyedMathbox = () => {
      const [container, setContainer] = useState<HTMLDivElement | null>(null)
      const [key, setKeyState] = useState("key-0")
      setKey = setKeyState
      containerDiv = container
      return (
        <div ref={setContainer} key={key}>
          {container && (
            <Mathbox ref={mbRef} container={container}>
              <Cartesian />
            </Mathbox>
          )}
        </div>
      )
    }
    render(<KeyedMathbox />)

    assertNotNil(mbRef.current)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    act(() => setKey!("key-2"))

    assertNotNil(containerDiv)
    expect(mbRef.current.three.element).toBe(containerDiv)
    expect(mbRef.current.select("cartesian").length).toBe(1)
  })

  it("Can add and remove children without error", async () => {
    const mbRef: MathboxRef<"root"> = { current: null }

    const { rerender } = render(
      <ContainedMathbox ref={mbRef} options={{}}>
        <Cartesian>
          <Grid />
        </Cartesian>
      </ContainedMathbox>
    )

    assertNotNil(mbRef.current)
    expect(mbRef.current.select("grid").length).toBe(1)

    rerender(
      <ContainedMathbox ref={mbRef} options={{}}>
        <Cartesian>
          <Grid />
          <Grid />
        </Cartesian>
      </ContainedMathbox>
    )

    assertNotNil(mbRef.current)
    expect(mbRef.current.select("grid").length).toBe(2)

    rerender(
      <ContainedMathbox ref={mbRef} options={{}}>
        <Cartesian />
      </ContainedMathbox>
    )

    assertNotNil(mbRef.current)
    expect(mbRef.current.select("grid").length).toBe(0)
  })
})

describe("<Voxel />", () => {
  it("throws a runtime error if it has children", () => {
    const willThrow = () =>
      render(
        <ContainedMathbox>
          <Cartesian>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment  */}
            {/* @ts-expect-error */}
            <Voxel>
              <Grid />
            </Voxel>
          </Cartesian>
        </ContainedMathbox>
      )
    expect(willThrow).toThrow("Component <Voxel /> cannot have children.")
  })
})

import React from "react"
import { render } from "@testing-library/react"
import ContainedMathbox from "./ContainedMathbox"
import { Cartesian, Grid } from "./components"
import { MathboxRef } from "./types"

function assertNotUndefined<T>(value: T | undefined): asserts value is T {
  if (value === undefined) {
    throw new Error("Unexpected undefined value")
  }
}

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

    assertNotUndefined(cartesian)

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
    assertNotUndefined(cartesian)

    expect(cartesian.get("visible")).toBe(true)
    rerender(
      <ContainedMathbox ref={mbRef}>
        <Cartesian visible={false} />
      </ContainedMathbox>
    )
    expect(cartesian.get("visible")).toBe(false)
  })
})

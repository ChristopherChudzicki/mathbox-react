import React from "react"
import { render } from "@testing-library/react"
import { getMockContext } from './test_utils'
import Mathbox from './Mathbox'
import Cartesian from './Cartesian'
import Grid from './Grid'
import { MathboxNodeAPI } from './types'

HTMLCanvasElement.prototype.getContext = getMockContext

describe("Cartesian", () => {
  it('exposes Mathbox instance via ref', () => {
    const mbRef: React.Ref<MathboxNodeAPI> = { current: null }
    const cartesianRef: React.Ref<MathboxNodeAPI> = { current: null }
    render(<Mathbox ref={mbRef}><Cartesian ref={cartesianRef} /></Mathbox>)

    expect(mbRef.current?.[0].type).toBe('root')
    expect(cartesianRef.current?.[0].type).toBe('cartesian')
  })

  it('creates a cartesian instance as child of root', () => {
    const mbRef: React.Ref<MathboxNodeAPI> = { current: null }
    render(<Mathbox ref={mbRef}><Cartesian /></Mathbox>)
    expect(mbRef.current?.select('cartesian').length).toBe(1)
  })

  it('creates mathbox children as children of itself', () => {
    const mbRef: React.Ref<MathboxNodeAPI> = { current: null }
    render(
      <Mathbox ref={mbRef}>
        <Cartesian>
          <Grid />
          <Grid />
        </Cartesian>
      </Mathbox>
    )
    mbRef.current?.print()
    expect(mbRef.current?.select('cartesian').length).toBe(1)
    expect(mbRef.current?.select('cartesian grid').length).toBe(2)
  })

  it('removes its mathbox instance when unmounted', () => {
    const mbRef: React.Ref<MathboxNodeAPI> = { current: null }
    const { rerender } = render(<Mathbox ref={mbRef}><Cartesian /></Mathbox>)
    expect(mbRef.current?.select('cartesian').length).toBe(1)
    rerender(<Mathbox ref={mbRef} />)
    expect(mbRef.current?.select('cartesian').length).toBe(0)
  })

  it.each(
    [{ props: { visible: true, scale: [3, 2, 1,] } },
    { props: { visible: false, scale: [1, 2, 3,] } }]
  )('passes appropriate props to its mathbox instance', ({ props }) => {
    const mbRef: React.Ref<MathboxNodeAPI> = { current: null }
    render(<Mathbox ref={mbRef}><Cartesian {...props} /></Mathbox>)
    const cartesian = mbRef.current?.select('cartesian')[0]

    expect(cartesian.props.visible).toBe(props.visible)
    // Mathbox converts scale to a ThreeJS Vec3
    expect(cartesian.props.scale.toArray()).toStrictEqual(props.scale)
  })

  it('updates props on its mathbox instance when rerendered', () => {
    const mbRef: React.Ref<MathboxNodeAPI> = { current: null }
    const { rerender } = render(<Mathbox ref={mbRef}><Cartesian /></Mathbox>)
    const cartesian = mbRef.current?.select('cartesian')[0]
    expect(cartesian.props.visible).toBe(true)
    rerender(<Mathbox ref={mbRef}><Cartesian visible={false} /></Mathbox>)
    expect(cartesian.props.visible).toBe(false)
  })
})

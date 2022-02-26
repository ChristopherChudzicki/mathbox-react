import React from "react"
import { render } from "@testing-library/react"
import { getMockContext } from './test_utils'
import Mathbox from './Mathbox'
import Cartesian from './Cartesian'
import { MathboxNode } from './types'

HTMLCanvasElement.prototype.getContext = getMockContext

describe("Cartesian", () => {
  it("woofs", () => {
    const meow: React.Ref<MathboxNode> = { current: null }
    const mb = <Mathbox ref={meow}><Cartesian /></Mathbox>;
    render(mb)
    meow.current?.print()
  })
})

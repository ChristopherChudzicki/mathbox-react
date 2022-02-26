import React from "react"
import { render } from "@testing-library/react"
import { getMockContext } from './test_utils'
import Mathbox from './Mathbox'
import Cartesian from './Cartesian'

HTMLCanvasElement.prototype.getContext = getMockContext

describe("Cartesian", () => {
  it("woofs", () => {
    render(<Mathbox><Cartesian /></Mathbox>)
  })
})

import React, { forwardRef } from "react"
import MathboxAPIContext from "./MathboxNodeContext"
import { CartesianProps, MathboxComponent } from "./types"
import { useMathboxAPI } from "./hooks"

const Cartesian: MathboxComponent<CartesianProps> = (props, ref) => {
  const nodeAPI = useMathboxAPI("cartesian", props, ref)

  return (
    <MathboxAPIContext.Provider value={nodeAPI}>
      {props.children}
    </MathboxAPIContext.Provider>
  )
}

export default forwardRef(Cartesian)

import React, { forwardRef } from "react"
import MathboxAPIContext from "./MathboxNodeContext"
import { MathboxComponent } from "./types"
import { useMathboxAPI } from "./hooks"

const Grid: MathboxComponent<'grid'> = (props, ref) => {
  const nodeAPI = useMathboxAPI("grid", props, ref)

  return (
    <MathboxAPIContext.Provider value={nodeAPI}>
      {props.children}
    </MathboxAPIContext.Provider>
  )
}

export default forwardRef(Grid)

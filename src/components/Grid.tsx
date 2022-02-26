import React, { forwardRef } from "react"
import MathboxAPIContext from "./MathboxNodeContext"
import { GridProps, MathboxComponent } from "./types"
import { useMathboxAPI } from "./hooks"

const Grid: MathboxComponent<GridProps> = (props, ref) => {
  const nodeAPI = useMathboxAPI("grid", props, ref)

  return (
    <MathboxAPIContext.Provider value={nodeAPI}>
      {props.children}
    </MathboxAPIContext.Provider>
  )
}

export default forwardRef(Grid)

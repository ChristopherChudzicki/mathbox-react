import React, { forwardRef } from "react"
import MathboxNodeContext from "./MathboxNodeContext"
import { GridProps, MathboxComponent } from "./types"
import { useMathboxAPI } from "./hooks"

const Grid: MathboxComponent<GridProps> = (props, ref) => {
  const node = useMathboxAPI("grid", props, ref)

  return (
    <MathboxNodeContext.Provider value={node}>
      {props.children}
    </MathboxNodeContext.Provider>
  )
}

export default forwardRef(Grid)

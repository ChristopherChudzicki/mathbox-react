import React, { forwardRef } from "react"
import MathboxAPIContext from "./MathboxNodeContext"
import { MathboxComponent } from "./types"
import { useMathboxAPI } from "./hooks"

const Point: MathboxComponent<"point"> = (props, ref) => {
  const nodeAPI = useMathboxAPI("point", props, ref)

  return (
    <MathboxAPIContext.Provider value={nodeAPI}>
      {props.children}
    </MathboxAPIContext.Provider>
  )
}

export default forwardRef(Point)

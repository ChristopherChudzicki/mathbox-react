import React, { forwardRef } from "react"
import MathboxAPIContext from "./MathboxNodeContext"
import { PointProps, MathboxComponent } from "./types"
import { useMathboxAPI } from "./hooks"

const Point: MathboxComponent<PointProps> = (props, ref) => {
  const nodeAPI = useMathboxAPI("point", props, ref)

  return (
    <MathboxAPIContext.Provider value={nodeAPI}>
      {props.children}
    </MathboxAPIContext.Provider>
  )
}

export default forwardRef(Point)

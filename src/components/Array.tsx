import React, { forwardRef } from "react"
import MathboxAPIContext from "./MathboxNodeContext"
import { MathboxComponent } from "./types"
import { useMathboxAPI } from "./hooks"

const ArrayComponent: MathboxComponent<"array"> = (props, ref) => {
  const nodeAPI = useMathboxAPI("array", props, ref)

  return (
    <MathboxAPIContext.Provider value={nodeAPI}>
      {props.children}
    </MathboxAPIContext.Provider>
  )
}

export default forwardRef(ArrayComponent)

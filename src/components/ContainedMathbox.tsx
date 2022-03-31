import React, { useState, forwardRef } from "react"
import { RootProps, MathBoxOptions, MathboxSelection } from "mathbox"
import Mathbox from "./Mathbox"
import { WithChildren } from "./types"

type Props = WithChildren<
  {
    containerId?: string
    containerClass?: string
    containerStyle?: React.CSSProperties
    options?: MathBoxOptions
  } & RootProps
>

const ContainedMathbox = (
  props: Props,
  ref: React.Ref<MathboxSelection<"root">>
) => {
  const { children, containerId, containerClass, containerStyle, ...others } =
    props
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  return (
    <div
      ref={setContainer}
      id={containerId}
      className={containerClass}
      style={containerStyle}
    >
      {container && (
        <Mathbox ref={ref} container={container} {...others}>
          {children}
        </Mathbox>
      )}
    </div>
  )
}

export default forwardRef(ContainedMathbox)

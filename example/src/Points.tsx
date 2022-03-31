import React from "react"
import * as MB from "mathbox-react"
import type { AreaEmitter } from "mathbox"

type Props = {
  size: number
  width: number
  height: number
  expr: AreaEmitter
}

const Points = (props: Props) => {
  return (
    <>
      <MB.Area
        id="sampler"
        width={props.width}
        height={props.height}
        axes="xz"
        expr={props.expr}
      />
      <MB.Point points="#sampler" color={0x3090ff} size={props.size} />
      <MB.Transform position={[0, 0.5, 0]}>
        <MB.Point
          points="#sampler"
          shape="diamond"
          color="green"
          size={props.size}
        />
      </MB.Transform>
    </>
  )
}

export default Points

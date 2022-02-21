import React, { forwardRef } from 'react';
import MathboxNodeContext from './MathboxNodeContext';
import { PointProps, MathboxComponent } from './types'
import { useMathboxAPI } from './hooks'

const Point: MathboxComponent<PointProps> = (props, ref) => {
  const node = useMathboxAPI('point', props, ref)

  return (
    <MathboxNodeContext.Provider value={node}>
      {props.children}
    </MathboxNodeContext.Provider>
  )
}

export default forwardRef(Point)
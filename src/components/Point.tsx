import React, { forwardRef } from 'react';
import MathboxNodeContext from './MathboxNodeContext';
import { PointProps, MathboxComponent } from './types'
import { useMathboxNode } from './hooks'

const Point: MathboxComponent<PointProps> = (props, ref) => {
  console.log('hello from point')
  const node = useMathboxNode('point', props, ref)

  return (
    <MathboxNodeContext.Provider value={node}>
      {props.children}
    </MathboxNodeContext.Provider>
  )
}

export default forwardRef(Point)
import React, { forwardRef } from 'react';
import MathboxNodeContext from './MathboxNodeContext';
import { CartesianProps, MathboxComponent } from './types'
import { useMathboxNode } from './hooks'

const Cartesian: MathboxComponent<CartesianProps> = (props, ref) => {

  const node = useMathboxNode('cartesian', props, ref)

  return (
    <MathboxNodeContext.Provider value={node}>
      {props.children}
    </MathboxNodeContext.Provider>
  )
}

export default forwardRef(Cartesian)
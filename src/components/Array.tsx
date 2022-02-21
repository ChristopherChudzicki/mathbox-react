import React, { forwardRef } from 'react';
import MathboxNodeContext from './MathboxNodeContext';
import { ArrayProps, MathboxComponent } from './types'
import { useMathboxNode } from './hooks'

const Cartesian: MathboxComponent<ArrayProps> = (props, ref) => {

  const node = useMathboxNode('array', props, ref)

  return (
    <MathboxNodeContext.Provider value={node}>
      {props.children}
    </MathboxNodeContext.Provider>
  )
}

export default forwardRef(Cartesian)
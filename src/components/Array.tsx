import React, { forwardRef } from 'react';
import MathboxNodeContext from './MathboxNodeContext';
import { ArrayProps, MathboxComponent } from './types'
import { useMathboxAPI } from './hooks'

const ArrayComponent: MathboxComponent<ArrayProps> = (props, ref) => {

  const node = useMathboxAPI('array', props, ref)

  return (
    <MathboxNodeContext.Provider value={node}>
      {props.children}
    </MathboxNodeContext.Provider>
  )
}

export default forwardRef(ArrayComponent)
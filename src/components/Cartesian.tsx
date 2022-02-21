import React, { useContext, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import MathboxNodeContext from './MathboxNodeContext';
import { CartesianProps, MathboxNode } from './types'

type Props = {
  children?: React.ReactNode
} & CartesianProps

const Cartesian = (props: Props, ref: any) => {
  const parent = useContext(MathboxNodeContext)
  const [node, setNode] = useState<MathboxNode<CartesianProps> | null>(null)
  useEffect(() => {
    const { children, ...mbProps } = props
    if (!parent) return;
    if (!node) {
      const thisNode = parent.cartesian(mbProps)
      setNode(thisNode)
    } else {
      node.set(mbProps)
    }
  }, [parent, node, props])

  useImperativeHandle(ref, () => ({ cartesian: 'hi' }))

  return (
    <MathboxNodeContext.Provider value={node}>
      {props.children}
    </MathboxNodeContext.Provider>
  )
}

export default forwardRef(Cartesian)
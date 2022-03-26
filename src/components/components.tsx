import React, { forwardRef } from "react"
import { Props, NodeType, MathboxSelection } from 'mathbox'
import MathboxAPIContext from "./MathboxNodeContext"
import { useMathboxAPI } from "./hooks"

type WithChildren = { children?: React.ReactNode | React.ReactNode[] }
type MathboxComponent<T extends NodeType> = React.ForwardRefExoticComponent<
  Props[T] & WithChildren & React.RefAttributes<MathboxSelection<T>>
>

const mathboxComponentFactory = <T extends NodeType>(type: T): MathboxComponent<T> => {
  const Comp = (
    props: Props[T] & WithChildren,
    ref: React.Ref<MathboxSelection<T> | null>
  ) => {
    const nodeAPI = useMathboxAPI(type, props, ref)
    return (
      <MathboxAPIContext.Provider value={nodeAPI}>
        {props.children}
      </MathboxAPIContext.Provider>
    )
  }
  /**
   * The line below gives a TS error without explicit any.
   * But if you replace each generic T above with a specific instance, e.g.,
   * 'cartesian', there is no error.
   * 
   * So an alternative without "any" would be be to copy the definition of Comp
   * with all ~64 different node types.
   * 
   * I'm not 100% sure why there's a ts error here, but the above indicates to
   * me that this is actually type-safe. And I do not want that much copy pasta.
   * So instead, use the any and put explicit return type on the factory.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return forwardRef(Comp) as any
}

export const Cartesian = mathboxComponentFactory('cartesian');
export const Grid = mathboxComponentFactory('grid');
export const Array = mathboxComponentFactory('array');
export const Point = mathboxComponentFactory('point');
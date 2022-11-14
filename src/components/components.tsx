import React, {
  forwardRef,
  useRef,
  useContext,
  useEffect,
  useReducer,
  useImperativeHandle,
} from "react"
import { Props, NodeType, MathboxSelection } from "mathbox"
import MathboxAPIContext from "./MathboxNodeContext"
import { WithChildren } from "./types"
import {
  isRootDestroyed,
  isSelectionParent,
  canNodeHaveChildren,
  ParentNodeTypes,
  capitalize,
} from "./util"

type MathboxComponent<T extends NodeType> = React.ForwardRefExoticComponent<
  (T extends ParentNodeTypes ? WithChildren<Props[T]> : Props[T]) &
    React.RefAttributes<MathboxSelection<T>>
>

const mathboxComponentFactory = <T extends NodeType>(
  type: T
): MathboxComponent<T> => {
  const canHaveChildren = canNodeHaveChildren(type)
  const componentName = capitalize(type)
  const Comp = (
    props: WithChildren<Props[T]>,
    ref: React.Ref<MathboxSelection<T> | null>
  ) => {
    const [_ignored, forceUpdate] = useReducer((x) => x + 1, 0)
    const parent = useContext(MathboxAPIContext)
    const selection = useRef<MathboxSelection<T> | null>(null)
    useEffect(
      () => () => {
        if (selection.current) {
          selection.current.remove()
          selection.current = null
        }
      },
      []
    )
    useImperativeHandle(ref, () => selection.current)

    const { children, ...others } = props
    useEffect(() => {
      if (!parent) return
      if (isRootDestroyed(parent)) {
        forceUpdate()
        return
      }
      if (selection.current) {
        if (!isSelectionParent(selection.current, parent)) {
          selection.current.remove()
          selection.current = null
          forceUpdate()
        }
      }
      if (!selection.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        selection.current = parent[type](others)
        forceUpdate()
      } else {
        selection.current.set(others)
      }
    }, [parent, others])
    if (!canHaveChildren) {
      if (props.children) {
        throw new Error(`Component <${componentName} /> cannot have children.`)
      }
      return null
    }
    return (
      <MathboxAPIContext.Provider value={selection.current}>
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

/**
 * Component wrapper for mathbox [`area`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#dataarea).
 */
export const Area = mathboxComponentFactory("area")

/**
 * Component wrapper for mathbox [`array`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#dataarray).
 */
const MBArray = mathboxComponentFactory("array")

export { MBArray as Array }

/**
 * Component wrapper for mathbox [`axis`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#drawaxis).
 */
export const Axis = mathboxComponentFactory("axis")

/**
 * Component wrapper for mathbox [`camera`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#cameracamera).
 */
export const Camera = mathboxComponentFactory("camera")

/**
 * Component wrapper for mathbox [`cartesian`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#viewcartesian).
 */
export const Cartesian = mathboxComponentFactory("cartesian")

/**
 * Component wrapper for mathbox [`cartesian4`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#viewcartesian4).
 */
export const Cartesian4 = mathboxComponentFactory("cartesian4")

/**
 * Component wrapper for mathbox [`clamp`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#operatorclamp).
 */
export const Clamp = mathboxComponentFactory("clamp")

/**
 * Component wrapper for mathbox [`clock`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#timeclock).
 */
export const Clock = mathboxComponentFactory("clock")

/**
 * Component wrapper for mathbox [`compose`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#rttcompose).
 */
export const Compose = mathboxComponentFactory("compose")

/**
 * Component wrapper for mathbox [`dom`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#overlaydom).
 */
export const Dom = mathboxComponentFactory("dom")

/**
 * Component wrapper for mathbox [`face`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#drawface).
 */
export const Face = mathboxComponentFactory("face")

/**
 * Component wrapper for mathbox [`format`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#textformat).
 */
export const Format = mathboxComponentFactory("format")

/**
 * Component wrapper for mathbox [`fragment`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#transformfragment).
 */
export const Fragment = mathboxComponentFactory("fragment")

/**
 * Component wrapper for mathbox [`grid`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#drawgrid).
 */
export const Grid = mathboxComponentFactory("grid")

/**
 * Component wrapper for mathbox [`group`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#basegroup).
 */
export const Group = mathboxComponentFactory("group")

/**
 * Component wrapper for mathbox [`grow`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#operatorgrow).
 */
export const Grow = mathboxComponentFactory("grow")

/**
 * Component wrapper for mathbox [`html`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#overlayhtml).
 */
export const Html = mathboxComponentFactory("html")

/**
 * Component wrapper for mathbox [`inherit`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#baseinherit).
 */
export const Inherit = mathboxComponentFactory("inherit")

/**
 * Component wrapper for mathbox [`interval`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#datainterval).
 */
export const Interval = mathboxComponentFactory("interval")

/**
 * Component wrapper for mathbox [`join`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#operatorjoin).
 */
export const Join = mathboxComponentFactory("join")

/**
 * Component wrapper for mathbox [`label`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#textlabel).
 */
export const Label = mathboxComponentFactory("label")

/**
 * Component wrapper for mathbox [`layer`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#transformlayer).
 */
export const Layer = mathboxComponentFactory("layer")

/**
 * Component wrapper for mathbox [`lerp`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#operatorlerp).
 */
export const Lerp = mathboxComponentFactory("lerp")

/**
 * Component wrapper for mathbox [`line`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#drawline).
 */
export const Line = mathboxComponentFactory("line")

/**
 * Component wrapper for mathbox [`mask`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#transformmask).
 */
export const Mask = mathboxComponentFactory("mask")

/**
 * Component wrapper for mathbox [`matrix`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#datamatrix).
 */
export const Matrix = mathboxComponentFactory("matrix")

/**
 * Component wrapper for mathbox [`memo`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#operatormemo).
 */
export const Memo = mathboxComponentFactory("memo")

/**
 * Component wrapper for mathbox [`move`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#presentmove).
 */
export const Move = mathboxComponentFactory("move")

/**
 * Component wrapper for mathbox [`now`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#timenow).
 */
export const Now = mathboxComponentFactory("now")

/**
 * Component wrapper for mathbox [`play`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#presentplay).
 */
export const Play = mathboxComponentFactory("play")

/**
 * Component wrapper for mathbox [`point`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#drawpoint).
 */
export const Point = mathboxComponentFactory("point")

/**
 * Component wrapper for mathbox [`polar`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#viewpolar).
 */
export const Polar = mathboxComponentFactory("polar")

/**
 * Component wrapper for mathbox [`present`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#presentpresent).
 */
export const Present = mathboxComponentFactory("present")

/**
 * Component wrapper for mathbox [`readback`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#operatorreadback).
 */
export const Readback = mathboxComponentFactory("readback")

/**
 * Component wrapper for mathbox [`repeat`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#operatorrepeat).
 */
export const Repeat = mathboxComponentFactory("repeat")

/**
 * Component wrapper for mathbox [`resample`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#operatorresample).
 */
export const Resample = mathboxComponentFactory("resample")

/**
 * Component wrapper for mathbox [`retext`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#textretext).
 */
export const Retext = mathboxComponentFactory("retext")

/**
 * Component wrapper for mathbox [`reveal`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#presentreveal).
 */
export const Reveal = mathboxComponentFactory("reveal")

/**
 * Component wrapper for mathbox [`rtt`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#rttrtt).
 */
export const Rtt = mathboxComponentFactory("rtt")

/**
 * Component wrapper for mathbox [`scale`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#datascale).
 */
export const Scale = mathboxComponentFactory("scale")

/**
 * Component wrapper for mathbox [`shader`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#shadershader).
 */
export const Shader = mathboxComponentFactory("shader")

/**
 * Component wrapper for mathbox [`slice`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#operatorslice).
 */
export const Slice = mathboxComponentFactory("slice")

/**
 * Component wrapper for mathbox [`slide`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#presentslide).
 */
export const Slide = mathboxComponentFactory("slide")

/**
 * Component wrapper for mathbox [`spherical`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#viewspherical).
 */
export const Spherical = mathboxComponentFactory("spherical")

/**
 * Component wrapper for mathbox [`split`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#operatorsplit).
 */
export const Split = mathboxComponentFactory("split")

/**
 * Component wrapper for mathbox [`spread`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#operatorspread).
 */
export const Spread = mathboxComponentFactory("spread")

/**
 * Component wrapper for mathbox [`step`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#presentstep).
 */
export const Step = mathboxComponentFactory("step")

/**
 * Component wrapper for mathbox [`stereographic`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#viewstereographic).
 */
export const Stereographic = mathboxComponentFactory("stereographic")

/**
 * Component wrapper for mathbox [`stereographic4`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#viewstereographic4).
 */
export const Stereographic4 = mathboxComponentFactory("stereographic4")

/**
 * Component wrapper for mathbox [`strip`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#drawstrip).
 */
export const Strip = mathboxComponentFactory("strip")

/**
 * Component wrapper for mathbox [`subdivide`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#operatorsubdivide).
 */
export const Subdivide = mathboxComponentFactory("subdivide")

/**
 * Component wrapper for mathbox [`surface`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#drawsurface).
 */
export const Surface = mathboxComponentFactory("surface")

/**
 * Component wrapper for mathbox [`swizzle`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#operatorswizzle).
 */
export const Swizzle = mathboxComponentFactory("swizzle")

/**
 * Component wrapper for mathbox [`text`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#texttext).
 */
export const Text = mathboxComponentFactory("text")

/**
 * Component wrapper for mathbox [`ticks`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#drawticks).
 */
export const Ticks = mathboxComponentFactory("ticks")

/**
 * Component wrapper for mathbox [`transform`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#transformtransform).
 */
export const Transform = mathboxComponentFactory("transform")

/**
 * Component wrapper for mathbox [`transform4`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#transformtransform4).
 */
export const Transform4 = mathboxComponentFactory("transform4")

/**
 * Component wrapper for mathbox [`transpose`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#operatortranspose).
 */
export const Transpose = mathboxComponentFactory("transpose")

/**
 * Component wrapper for mathbox [`unit`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#baseunit).
 */
export const Unit = mathboxComponentFactory("unit")

/**
 * Component wrapper for mathbox [`vector`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#drawvector).
 */
export const Vector = mathboxComponentFactory("vector")

/**
 * Component wrapper for mathbox [`vertex`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#transformvertex).
 */
export const Vertex = mathboxComponentFactory("vertex")

/**
 * Component wrapper for mathbox [`view`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#viewview).
 */
export const View = mathboxComponentFactory("view")

/**
 * Component wrapper for mathbox [`volume`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#datavolume).
 */
export const Volume = mathboxComponentFactory("volume")

/**
 * Component wrapper for mathbox [`voxel`](https://github.com/unconed/mathbox/blob/master/docs/primitives.md#datavoxel).
 */
export const Voxel = mathboxComponentFactory("voxel")

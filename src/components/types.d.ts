import React from "react"

export type GridProps = Partial<{
  axes: number[] | string
  baseX: number
  baseY: number
  blending: string
  classes: string[]
  closed: boolean
  closedX: boolean
  closedY: boolean
  color: string
  crossed: boolean
  crossedX: boolean
  crossedY: boolean
  depth: number
  detailY: number
  detailX: number
  divideX: number
  divideY: number
  endX: number
  endY: number
  factorX: number
  factorY: number
  id: string | null
  lineX: boolean
  lineY: boolean
  modeX: string
  modeY: string
  niceX: boolean
  niceY: boolean
  opacity: number
  origin: number[]
  proximity: number | null
  rangeX: number[]
  rangeY: number[]
  size: number
  startX: boolean
  startY: boolean
  stroke: number
  unitX: number
  unitY: number
  visible: boolean
  zBias: number
  zIndex: number
  zOrder: number
  zTest: boolean
  zWrite: boolean
  zeroX: boolean
  zeroY: boolean
}>

export type CartesianProps = Partial<{
  classes: string[]
  eulerOrder: string[]
  id: string | null
  pass: string
  position: number[]
  quaternion: number[]
  range: number[][]
  rotation: number[]
  scale: number[]
  visible: boolean
}>

export type PointProps = Partial<{
  color: string
  opacity: number
  /**
   * I believe this points to the mose recent data source if not
   * specified. Steven's docs say the default is "<".
   */
  points: string | MathboxNode
  size: number
  visible: number
}>

export type ArrayProps = Partial<{
  channels: number
  data: number[][]
  items: number
}>

export type MathboxNode<T = unknown> = {
  set(props: T): MathboxNode<T>
  cartesian: (props: CartesianProps) => MathboxNode<CartesianProps>
  grid: (props: GridProps) => MathboxNode<GridProps>
  remove: () => void
  print: () => MathboxNode<T>
}

export type WithChildren<T> = {
  children?: ReactNode | undefined
} & T

type Test = React.FC

export type MathboxComponent<T> = (
  props: WithChildren<T>,
  ref: React.Ref<MathboxNode<T> | null>
) => React.ReactElement | null

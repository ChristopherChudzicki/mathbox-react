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

export type MathboxNode<T = unknown> = {
  set(props: T): MathboxNode<T>
  cartesian: (props: CartesianProps) => MathboxNode<CartesianProps>
  grid: (props: GridProps) => MathboxNode<GridProps>
}

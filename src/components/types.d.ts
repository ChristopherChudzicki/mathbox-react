import type { ReactNode } from "react"
import type { MathboxSelection, NodeType, Props } from "mathbox"
import React from "react"

export { MathboxSelection, NodeType }

export type WithChildren<T> = {
  children?: ReactNode | ReactNode[] | undefined
} & T

export type MathboxComponent<T extends NodeType> = (
  props: WithChildren<Props[T]>,
  ref: React.Ref<MathboxSelection<T> | null>
) => React.ReactElement | null

export type MathboxRef<T extends NodeType> = React.Ref<MathboxSelection<T>>

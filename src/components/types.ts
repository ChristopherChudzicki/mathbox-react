import type { ReactNode } from "react"
import type { MathboxSelection, NodeType } from "mathbox"
import React from "react"

export type WithChildren<T> = {
  children?: ReactNode | ReactNode[]
} & T

export type MathboxRef<T extends NodeType> = React.Ref<MathboxSelection<T>>

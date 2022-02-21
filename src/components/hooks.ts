/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  useContext,
  useEffect,
  useState,
  useImperativeHandle,
} from "react"
import MathboxNodeContext from "./MathboxNodeContext"
import type { MathboxNode, WithChildren } from "./types"

export const useMathboxNode = <T>(
  name: string,
  props: WithChildren<T>,
  ref: React.Ref<MathboxNode<T> | null>
) => {
  const parent = useContext(MathboxNodeContext)
  const [node, setNode] = useState<MathboxNode<T> | null>(null)

  useEffect(() => {
    const { children, ...mbProps } = props
    if (!parent) return
    if (!node) {
      // @ts-ignore
      const thisNode = parent[name](mbProps)
      setNode(thisNode)
    } else {
      // @ts-ignore
      node.set(mbProps)
    }
  }, [parent, node, props, name])

  useImperativeHandle(ref, () => node)

  return node
}

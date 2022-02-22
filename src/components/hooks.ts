import React, {
  useContext,
  useEffect,
  useState,
  useImperativeHandle,
} from "react"
import MathboxNodeContext from "./MathboxNodeContext"
import type { MathboxNode, WithChildren } from "./types"

export const useMathboxAPI = <T>(
  name: string,
  props: WithChildren<T>,
  ref: React.Ref<MathboxNode<T> | null>
) => {
  const parent = useContext(MathboxNodeContext)
  const [node, setNode] = useState<MathboxNode<T> | null>(null)

  useEffect(
    () => () => {
      if (node) {
        node.remove()
      }
    },
    [node]
  )

  useEffect(() => {
    const { children, ...mbProps } = props
    if (!parent) return
    if (!node) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const thisNode = parent[name](mbProps)
      setNode(thisNode)
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      node.set(mbProps)
    }
  }, [parent, node, props, name])

  useImperativeHandle(ref, () => node)

  return node
}

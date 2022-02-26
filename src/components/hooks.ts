import React, {
  useContext,
  useEffect,
  useState,
  useImperativeHandle,
} from "react"
import MathboxAPIContext from "./MathboxNodeContext"
import type { MathboxNodeAPI, WithChildren } from "./types"

export const useMathboxAPI = <T>(
  name: string,
  props: WithChildren<T>,
  ref: React.Ref<MathboxNodeAPI<T> | null>
) => {
  const parent = useContext(MathboxAPIContext)
  const [nodeAPI, setNodeAPI] = useState<MathboxNodeAPI<T> | null>(null)

  useEffect(
    () => () => {
      if (nodeAPI) {
        nodeAPI.remove()
      }
    },
    [nodeAPI]
  )

  useEffect(() => {
    const { children, ...mbProps } = props
    if (!parent) return
    if (!nodeAPI) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const thisNode = parent[name](mbProps)
      setNodeAPI(thisNode)
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      nodeAPI.set(mbProps)
    }
  }, [parent, nodeAPI, props, name])

  useImperativeHandle(ref, () => nodeAPI)

  return nodeAPI
}

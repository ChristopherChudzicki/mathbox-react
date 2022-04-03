import React, {
  useContext,
  useEffect,
  useState,
  useImperativeHandle,
} from "react"
import type { MathboxSelection, NodeType, Props } from "mathbox"
import MathboxAPIContext from "./MathboxNodeContext"
import type { WithChildren } from "./types"

type WithPrivateUp = MathboxSelection & { _up: WithPrivateUp | null }

/**
 * Check that parent is actually the selection's parent.
 * The mathbox components occasionally render with a selection value whose
 * parent does not match the parent specified in MathboxContext.
 *
 * I believe this fundamentally this is happening because
 * - we store parent value in context...
 * - we update the context parent value using useEffect hooks..
 * - useEffect hooks are called children before parents.
 *
 * One wonders whether we really need to be using useEffect hooks for the
 * mathbox components, or if we can just put all the node creation/removal stuff
 * in a render function. Hooks seem nice for dependencies, but mathbox is pretty
 * smart about diffing out the actual changes.
 */
export const isSelectionParent = (
  selection: MathboxSelection,
  parent: MathboxSelection
) => {
  // eslint-disable-next-line no-underscore-dangle
  const selectionParentNode = (selection as WithPrivateUp)._up?.[0]
  return selectionParentNode === parent[0]
}

export const useMathboxAPI = <T extends NodeType>(
  name: T,
  props: WithChildren<Props[T]>,
  ref: React.Ref<MathboxSelection<T> | null>
) => {
  const parent = useContext(MathboxAPIContext)
  const [selection, setSelection] = useState<MathboxSelection<T> | null>(null)

  useEffect(
    () => () => {
      if (selection) {
        selection.remove()
        setSelection(null)
      }
    },
    [selection, parent]
  )

  useEffect(() => {
    const { children, ...mbProps } = props
    if (!parent) return
    if (!selection || !isSelectionParent(selection, parent)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const thisNode: MathboxSelection<T> = parent[name](mbProps)
      setSelection(thisNode)
    } else {
      /**
       * Set all the props anew. It's MathBox's responsibility to diff out the
       * unchanged props if it wants to do that optimization.
       *
       * (In fact, Mathbox delegates that optimization to Threestrap through
       * some rather byzantine inheritance.)
       */
      selection.set(mbProps)
    }
  }, [parent, selection, setSelection, props, name])

  useImperativeHandle(ref, () => selection, [selection])

  return { selection, parent }
}

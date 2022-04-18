/* eslint-disable no-underscore-dangle */
import isEqual from "lodash/eqDeep"
import { useRef, useMemo } from "react"
import { MathboxSelection, NodeType } from "mathbox"

type WithPrivateUp = MathboxSelection & { _up?: WithPrivateUp }

/**
 * Get root node given any node in Mathbox tree
 */
const getRoot = (selection: MathboxSelection) => {
  let current = selection as WithPrivateUp
  while (current._up) {
    current = current._up
  }
  return current
}

export const isRootDestroyed = (selection: MathboxSelection) => {
  const root = getRoot(selection)
  return root.three === undefined
}

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
  const selectionParentNode = (selection as WithPrivateUp)._up?.[0]
  return selectionParentNode === parent[0]
}

const CAN_HAVE_CHILDREN = [
  "view",
  "cartesian",
  "cartesian4",
  "polar",
  "spherical",
  "stereographic",
  "stereographic4",
  "transform",
  "transform4",
  "vertex",
  "fragment",
  "layer",
  "mask",
  "group",
  "inherit",
  "root",
  "unit",
  "rtt",
  "clock",
  "now",
  "move",
  "present",
  "reveal",
  "slide",
] as const

export type ParentNodeTypes = typeof CAN_HAVE_CHILDREN[number]

export const canNodeHaveChildren = (type: NodeType) =>
  (CAN_HAVE_CHILDREN as readonly string[]).includes(type)

export const capitalize = (s: string) => {
  if (!s) return ""
  return s[0].toLocaleUpperCase() + s.slice(1)
}

/**
 * Returns the same reference to `value` as long as the the given values are
 * deep equal.
 *
 * This is, in general, not a great idea. See
 * https://github.com/facebook/react/issues/14476#issuecomment-471199055
 *
 * This should work OK for mathbox options because the objects in question are
 * either shallow, or are deep equal at a fairly shallow level.
 * E.g., OrbitControls may not be a shall object, but if it's not, it will at
 * least be deep equal between renders.
 *
 * But should work OK for mathbox options.
 */
export const useDeepCompareMemo = <T>(value: T, initial: T): T => {
  const oldValue = useRef<T>(initial)
  const memoOptions = useMemo(() => {
    if (isEqual(value, oldValue.current)) return oldValue.current
    oldValue.current = value
    return value
  }, [value])
  return memoOptions
}

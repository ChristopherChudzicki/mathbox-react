/* eslint-disable no-underscore-dangle */
import { MathboxSelection } from "mathbox"

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

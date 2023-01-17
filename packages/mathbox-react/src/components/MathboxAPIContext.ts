import { createContext, useContext } from "react"
import { MathboxSelection, NodeType } from "mathbox"

const MathboxAPIContext = createContext<MathboxSelection<NodeType> | null>(null)

/**
 * Returns Mathbox API Selection object for the nearest enclosing Mathbox node.
 */
const useMathbox = () => {
  const selection = useContext(MathboxAPIContext)
  if (!selection) {
    throw new Error(
      "useMathbox must be used within Mathbox or ContainedMathbox"
    )
  }
  return selection
}

export default MathboxAPIContext

export { useMathbox }

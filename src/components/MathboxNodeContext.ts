import { createContext } from "react"
import { MathboxSelection, NodeType } from "mathbox"

const MathboxAPIContext = createContext<MathboxSelection<NodeType> | null>(null)

export default MathboxAPIContext

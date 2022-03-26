import { createContext } from "react"
import { MathboxSelection, NodeType } from "./types"

const MathboxAPIContext = createContext<MathboxSelection<NodeType> | null>(null)

export default MathboxAPIContext

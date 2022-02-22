import { createContext } from "react"
import { MathboxNode } from "./types"

const MathboxNodeContext = createContext<MathboxNode | null>(null)

export default MathboxNodeContext

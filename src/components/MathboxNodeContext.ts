import { createContext } from "react"
import { MathboxNodeAPI } from "./types"

const MathboxAPIContext = createContext<MathboxNodeAPI | null>(null)

export default MathboxAPIContext

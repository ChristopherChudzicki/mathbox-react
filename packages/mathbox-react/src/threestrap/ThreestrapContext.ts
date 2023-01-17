import { createContext, useContext } from "react"
import type { Threestrap } from "./threestrap"

const ThreestrapContext = createContext<Threestrap | null>(null)

export default ThreestrapContext

const useThreestrap = () => {
  const threestrap = useContext(ThreestrapContext)
  if (!threestrap) {
    throw new Error("Threestrap context is not available")
  }
  return threestrap
}

export { useThreestrap }

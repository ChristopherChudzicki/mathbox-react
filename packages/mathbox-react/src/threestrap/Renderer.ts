import React, { useEffect } from "react"
import type { ColorRepresentation } from "three"
import { useThreestrap } from "./ThreestrapContext"

type RendererProps = {
  clearColor?: ColorRepresentation
}

const Renderer: React.FC<RendererProps> = (props) => {
  const threestrap = useThreestrap()
  useEffect(() => {
    if (props.clearColor) {
      threestrap.renderer.setClearColor(props.clearColor)
    }
  })
  return null
}

export default Renderer

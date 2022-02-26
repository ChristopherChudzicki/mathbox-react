import React, { useEffect, useState, DOMAttributes } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Color } from "three"
import * as MB from "mathbox"
import MathboxNodeContext from "./MathboxNodeContext"

type Props = {
  children?: React.ReactNode
} & React.HTMLProps<HTMLDivElement>

const Mathbox = (props: Props) => {
  const { children, ...divProps } = props;
  const [node, setNode] = useState(null)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!container) return;
    const mathbox = MB.mathBox({
      plugins: ["core", "controls", "cursor"],
      controls: {
        klass: OrbitControls,
      },
      element: container,
    })
    setNode(mathbox)

    mathbox.three.camera.position.set(1, 1, 2)
    mathbox.three.renderer.setClearColor(new Color(0xffffff), 1.0)
  }, [container])
  return (
    <div ref={setContainer} {...divProps}>
      <MathboxNodeContext.Provider value={node}>
        {children}
      </MathboxNodeContext.Provider>
    </div>
  )
}

export default Mathbox

import React, { useEffect, useState } from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Color } from "three/src/math/Color"
import * as MB from 'mathbox'
import MathboxNodeContext from './MathboxNodeContext'

type Props = {
  element: HTMLElement
  children?: React.ReactNode
}

const Mathbox = (props: Props) => {
  const [node, setNode] = useState(null)
  useEffect(() => {
    const mathbox = MB.mathBox({
      plugins: ["core", "controls", "cursor"],
      controls: {
        klass: OrbitControls,
      },
      element: props.element,
    })
    setNode(mathbox)

    mathbox.three.camera.position.set(1, 1, 2)
    mathbox.three.renderer.setClearColor(new Color(0xffffff), 1.0)

  }, [props.element])
  return (
    <MathboxNodeContext.Provider value={node}>
      {props.children}
    </MathboxNodeContext.Provider>
  )
}

export default Mathbox

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Color } from "three"
import * as MB from "mathbox"
import MathboxAPIContext from "./MathboxNodeContext"
import { MathboxNodeAPI } from "./types"

type Props = {
  children?: React.ReactNode
} & React.HTMLProps<HTMLDivElement>

const Mathbox = (props: Props, ref: React.Ref<MathboxNodeAPI | null>) => {
  const { children, ...divProps } = props
  const [nodeAPI, setNodeAPI] = useState(null)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!container) return
    const mathbox = MB.mathBox({
      plugins: ["core", "controls", "cursor"],
      controls: {
        klass: OrbitControls,
      },
      element: container,
    })
    setNodeAPI(mathbox)

    mathbox.three.camera.position.set(1, 1, 2)
    mathbox.three.renderer.setClearColor(new Color(0xffffff), 1.0)
  }, [container])
  useImperativeHandle(ref, () => nodeAPI)
  return (
    <div ref={setContainer} {...divProps}>
      <MathboxAPIContext.Provider value={nodeAPI}>
        {children}
      </MathboxAPIContext.Provider>
    </div>
  )
}

export default forwardRef(Mathbox)

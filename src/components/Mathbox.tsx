import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Color } from "three"
import { mathBox, MathboxSelection } from "mathbox"
import MathboxAPIContext from "./MathboxNodeContext"

type Props = {
  children?: React.ReactNode
} & React.HTMLProps<HTMLDivElement>

const Mathbox = (props: Props, ref: React.Ref<MathboxSelection<'root'> | null>) => {
  const { children, ...divProps } = props
  const [selection, setSelection] = useState<MathboxSelection<'root'> | null>(null)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!container) return
    const mathbox = mathBox({
      plugins: ["core", "controls", "cursor"],
      controls: {
        klass: OrbitControls,
      },
      element: container,
    })
    setSelection(mathbox)

    mathbox.three.camera.position.set(1, 1, 2)
    mathbox.three.renderer.setClearColor(new Color(0xffffff), 1.0)
  }, [container])
  useImperativeHandle(ref, () => selection)
  return (
    <div ref={setContainer} {...divProps}>
      <MathboxAPIContext.Provider value={selection}>
        {children}
      </MathboxAPIContext.Provider>
    </div>
  )
}

export default forwardRef(Mathbox)

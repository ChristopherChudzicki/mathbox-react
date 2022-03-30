import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react"
import { Color } from "three"
import { mathBox, MathboxSelection, MathBoxOptions } from "mathbox"
import MathboxAPIContext from "./MathboxNodeContext"

type Props = {
  options?: MathBoxOptions
  initialCameraPosition?: number[]
} & React.HTMLProps<HTMLDivElement>

const Mathbox = (
  props: Props,
  ref: React.Ref<MathboxSelection<"root"> | null>
) => {
  const { children, initialCameraPosition, options, ...divProps } = props
  const mathboxOptions = useMemo(() => options ?? {}, [options])
  const [selection, setSelection] = useState<MathboxSelection<"root"> | null>(
    null
  )
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!container) return () => {}

    const mathbox = mathBox({
      ...mathboxOptions,
      element: container,
    })
    setSelection(mathbox)

    /**
     * TODO: Should Mathbox component allow setting these more easily?
     */
    mathbox.three.renderer.setClearColor(new Color(0xffffff), 1.0)
    if (initialCameraPosition) {
      mathbox.three.camera.position.set(...initialCameraPosition)
    }
    return () => {
      mathbox.select("*").remove()
      mathbox.three.destroy()
    }
  }, [container, mathboxOptions, initialCameraPosition])
  useImperativeHandle(ref, () => selection, [selection])
  return (
    <div ref={setContainer} {...divProps}>
      <MathboxAPIContext.Provider value={selection}>
        {children}
      </MathboxAPIContext.Provider>
    </div>
  )
}

export default forwardRef(Mathbox)

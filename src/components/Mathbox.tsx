import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react"
import { Color } from "three"
import { mathBox, RootProps, MathboxSelection, MathBoxOptions } from "mathbox"
import MathboxAPIContext from "./MathboxNodeContext"
import { WithChildren } from "./types"

type Props = WithChildren<
  {
    container: HTMLElement
    options?: MathBoxOptions
  } & RootProps
>

const Mathbox = (
  props: Props,
  ref: React.Ref<MathboxSelection<"root"> | null>
) => {
  const { container, children, options, ...rootProps } = props
  const mathboxOptions = useMemo(() => options ?? {}, [options])
  const [selection, setSelection] = useState<MathboxSelection<"root"> | null>(
    null
  )
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
    return () => {
      mathbox.select("*").remove()
      mathbox.three.destroy()
      setSelection(null)
    }
  }, [container, mathboxOptions])

  useEffect(() => {
    if (!selection) return
    selection.set(rootProps)
  }, [selection, rootProps])

  useImperativeHandle(ref, () => selection, [selection])
  return (
    <MathboxAPIContext.Provider value={selection}>
      {children}
    </MathboxAPIContext.Provider>
  )
}

export default forwardRef(Mathbox)

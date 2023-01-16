import React, { useMemo, useCallback } from "react"
import { MathboxSelection } from "mathbox"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { ContainedMathbox } from "../components"

type MathboxProps = React.ComponentProps<typeof ContainedMathbox>

const storybookDefaultMathboxOptions = {
  plugins: ["core", "controls", "cursor"],
  controls: {
    klass: OrbitControls,
  },
}

export const CustomMathbox = (props: MathboxProps) => {
  const { options: overrides, ...others } = props
  const options = useMemo(
    () => ({
      ...storybookDefaultMathboxOptions,
      ...(overrides ?? {}),
    }),
    [overrides]
  )
  const setup = useCallback((mathbox: MathboxSelection<"root"> | null) => {
    if (mathbox === null) return
    mathbox.three.camera.position.set(1, 1, 2)
  }, [])
  return (
    <ContainedMathbox ref={setup} options={options} {...others}>
      {props.children}
    </ContainedMathbox>
  )
}

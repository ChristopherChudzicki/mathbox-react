import React, { forwardRef, useMemo } from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Mathbox } from '../components'

type MathboxProps = React.ComponentProps<typeof Mathbox>
type MathboxRef = React.ComponentRef<typeof Mathbox>

const storybookDefaultMathboxOptions = {
  plugins: ["core", "controls", "cursor"],
  controls: {
    klass: OrbitControls,
  },
}

const CustomMathboxF = (props: MathboxProps, ref: React.Ref<MathboxRef>) => {
  const { options: overrides, ...divProps } = props;
  const options = useMemo(() => ({
    ...storybookDefaultMathboxOptions,
    ...(props.options ?? {})
  }
  ), [props.options])
  return (
    <Mathbox options={options} {...divProps} ref={ref}>
      {props.children}
    </Mathbox>
  )
}

export const CustomMathbox = forwardRef(CustomMathboxF)
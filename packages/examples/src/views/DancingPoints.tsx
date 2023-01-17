import React, { useState, useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { AreaEmitter, MathboxSelection } from "mathbox"
import * as MB from "mathbox-react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { isEvaluateableFunc, textToAreaEmitter } from "./util"

const mathboxOptions = {
  plugins: ["core", "controls", "cursor"],
  controls: {
    klass: OrbitControls,
  },
}

interface FormValues {
  showPoints: boolean
  width: number
  height: number
  size: number
  expr: string
  A: number
}
const defaultFormValues: FormValues = {
  showPoints: true,
  width: 48,
  height: 64,
  size: 4,
  expr: "0.25*A*sin(10*x - t)*sin(2*y - t)",
  A: 0.5,
}

interface ControlsFormProps {
  onChange: (values: FormValues) => void
}

const ControlsForm = ({ onChange }: ControlsFormProps) => {
  const { register, watch } = useForm<FormValues>()
  const values = watch()
  const onFormChange = useCallback(() => onChange(watch()), [onChange, watch])
  return (
    <form onChange={onFormChange}>
      <label htmlFor="showPoints">Show Points</label>
      <span>{values.showPoints}</span>
      <input
        id="showPoints"
        type="checkbox"
        defaultChecked={defaultFormValues.showPoints}
        {...register("showPoints")}
      />
      <label htmlFor="size">Size</label>
      <span>{values.size}</span>
      <input
        id="size"
        type="range"
        min={2}
        max={32}
        defaultValue={defaultFormValues.size}
        {...register("size", { valueAsNumber: true })}
      />
      <label htmlFor="width">Width</label>
      <span>{values.width}</span>
      <input
        id="width"
        type="range"
        min={2}
        max={128}
        defaultValue={defaultFormValues.width}
        {...register("width", { valueAsNumber: true })}
      />
      <label htmlFor="height">Height</label>
      <span>{values.height}</span>
      <input
        id="height"
        type="range"
        min={2}
        max={128}
        defaultValue={defaultFormValues.height}
        {...register("height", { valueAsNumber: true })}
      />
      <label htmlFor="expr">expr</label>
      <span>f(x, y, t, A) = </span>
      <input
        id="expr"
        type="text"
        defaultValue={defaultFormValues.expr}
        {...register("expr")}
      />
      <label htmlFor="sliderA">A</label>
      <span>{values.A}</span>
      <input
        id="sliderA"
        type="range"
        min="-1"
        max="1"
        step="0.01"
        defaultValue={defaultFormValues.A}
        {...register("A", { valueAsNumber: true })}
      />
    </form>
  )
}

interface PointsProps {
  size: number
  width: number
  height: number
  expr: AreaEmitter
}

const Points: React.FC<PointsProps> = (props) => (
  <>
    <MB.Area
      id="sampler"
      width={props.width}
      height={props.height}
      axes="xz"
      expr={props.expr}
    />
    <MB.Surface points="#sampler" color={0x3090ff} shaded lineX lineY />
    <MB.Transform position={[0, 0.5, 0]}>
      <MB.Point
        points="#sampler"
        shape="diamond"
        color="green"
        size={props.size}
      />
    </MB.Transform>
    <MB.Transform position={[0, 0.25, 0]}>
      <MB.Line points="#sampler" color="orange" />
    </MB.Transform>
  </>
)

const DancingPoints: React.FC = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues)
  const [emitter, setEmitter] = useState<AreaEmitter>(() => {})
  useEffect(() => {
    if (isEvaluateableFunc(["x", "y", "t", "A"], 1)(formValues.expr)) {
      const scope = { A: formValues.A }
      setEmitter(() => textToAreaEmitter(formValues.expr, scope))
    }
  }, [formValues.expr, formValues.A])

  const setup = useCallback((mathbox: MathboxSelection<"root"> | null) => {
    // @ts-expect-error Useful for debugging
    window.mathbox = mathbox
  }, [])

  return (
    <>
      <ControlsForm onChange={setFormValues} />
      <div ref={setContainer} className="h-100">
        {container && (
          <MB.Mathbox
            container={container}
            ref={setup}
            options={mathboxOptions}
          >
            <MB.Cartesian>
              <MB.Grid axes="xz" />
              {formValues.showPoints && (
                <Points
                  width={formValues.width}
                  height={formValues.height}
                  size={formValues.size}
                  expr={emitter}
                />
              )}
            </MB.Cartesian>
          </MB.Mathbox>
        )}
      </div>
    </>
  )
}

export default DancingPoints

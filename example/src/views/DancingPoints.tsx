import { useState, useCallback, useEffect } from "react"
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

export default function DancingPoints() {
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
    // @ts-ignore
    window.mathbox = mathbox
    if (mathbox === null) return
    mathbox.three.camera.position.set(1, 1, 2)
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

function ControlsForm({ onChange }: ControlsFormProps) {
  const { register, watch } = useForm<FormValues>()
  const values = watch()
  const onFormChange = useCallback(() => onChange(watch()), [onChange, watch])
  return (
    <form onChange={onFormChange}>
      <>
        <label>Show Points</label>
        <span>{values.showPoints}</span>
        <input
          type="checkbox"
          defaultChecked={defaultFormValues.showPoints}
          {...register("showPoints")}
        />
      </>
      <>
        <label>Size</label>
        <span>{values.size}</span>
        <input
          type="range"
          min={2}
          max={32}
          defaultValue={defaultFormValues.size}
          {...register("size", { valueAsNumber: true })}
        />
      </>
      <>
        <label>Width</label>
        <span>{values.width}</span>
        <input
          type="range"
          min={2}
          max={128}
          defaultValue={defaultFormValues.width}
          {...register("width", { valueAsNumber: true })}
        />
      </>
      <>
        <label>Height</label>
        <span>{values.height}</span>
        <input
          type="range"
          min={2}
          max={128}
          defaultValue={defaultFormValues.height}
          {...register("height", { valueAsNumber: true })}
        />
      </>
      <>
        <label>expr</label>
        <span>f(x, y, t, A) = </span>
        <input
          type="text"
          defaultValue={defaultFormValues.expr}
          {...register("expr")}
        />
      </>
      <>
        <label>A</label>
        <span>{values.A}</span>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          defaultValue={defaultFormValues.A}
          {...register("A", { valueAsNumber: true })}
        />
      </>
    </form>
  )
}

interface PointsProps {
  size: number
  width: number
  height: number
  expr: AreaEmitter
}

function Points(props: PointsProps) {
  return (
    <>
      <MB.Area
        id="sampler"
        width={props.width}
        height={props.height}
        axes="xz"
        expr={props.expr}
      />
      <MB.Surface
        points="#sampler"
        color={0x3090ff}
        shaded={true}
        lineX={true}
        lineY={true}
      />
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
}

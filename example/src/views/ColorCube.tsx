import { useCallback, useState } from "react"
import { MathboxSelection } from "mathbox"
import * as MB from "mathbox-react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { useForm } from "react-hook-form"

const mathboxOptions = {
  plugins: ["core", "controls", "cursor"],
  controls: {
    klass: OrbitControls,
  },
}

export default function ColorCube() {
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues)
  const setup = useCallback((mathbox: MathboxSelection<"root"> | null) => {
    // @ts-expect-error
    window.mathbox = mathbox
  }, [])
  return (
    <>
      <ControlsForm onChange={setFormValues} />
      <MB.ContainedMathbox
        options={mathboxOptions}
        ref={setup}
        containerStyle={{ height: "500px" }}
      >
        <MB.Cartesian
          range={[
            [0, 1],
            [0, 1],
            [0, 1],
          ]}
          scale={[1, 1, 1]}
        >
          <MB.Volume
            id="volume"
            width={formValues.width}
            height={formValues.height}
            depth={formValues.depth}
            items={1}
            channels={4}
            expr={(emit, x, y, z) => {
              emit(x, y, z, formValues.opacity)
            }}
          />
          <MB.Point
            points="#volume"
            colors="#volume"
            size={formValues.size}
            color={0xffffff}
          />
        </MB.Cartesian>
      </MB.ContainedMathbox>
    </>
  )
}

interface FormValues {
  opacity: number
  size: number
  width: number
  height: number
  depth: number
}
const defaultFormValues: FormValues = {
  opacity: 0.75,
  size: 4,
  width: 16,
  height: 16,
  depth: 16,
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
        <label>Opacity</label>
        <span>{values.opacity}</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          defaultValue={defaultFormValues.opacity}
          {...register("opacity", { valueAsNumber: true })}
        />
      </>
      <>
        <label>Size</label>
        <span>{values.size}</span>
        <input
          type="range"
          min={1}
          max={32}
          step={1}
          defaultValue={defaultFormValues.size}
          {...register("size", { valueAsNumber: true })}
        />
      </>
      <>
        <label>Width</label>
        <span>{values.width}</span>
        <input
          type="range"
          min={1}
          max={64}
          step={1}
          defaultValue={defaultFormValues.width}
          {...register("width", { valueAsNumber: true })}
        />
      </>
      <>
        <label>Height</label>
        <span>{values.height}</span>
        <input
          type="range"
          min={1}
          max={64}
          step={1}
          defaultValue={defaultFormValues.height}
          {...register("height", { valueAsNumber: true })}
        />
      </>
      <>
        <label>Depth</label>
        <span>{values.depth}</span>
        <input
          type="range"
          min={1}
          max={64}
          step={1}
          defaultValue={defaultFormValues.depth}
          {...register("depth", { valueAsNumber: true })}
        />
      </>
    </form>
  )
}

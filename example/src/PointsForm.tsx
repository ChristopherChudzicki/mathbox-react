import React, { useCallback } from "react"
import type { AreaEmitter } from "mathbox"
import "./form.css"

export const expr1: AreaEmitter = (emit, x, y, i, j, t) => {
  emit(x, 0.25 + 0.25 * (Math.sin(x + t) * Math.sin(y + t)), y)
}

export const expr2: AreaEmitter = (emit, x, y, i, j, t) => {
  const r = Math.sqrt(x ** 2 + y ** 2)
  const val = 0.2 * Math.exp(-(r ** 2)) * Math.sin(2 * Math.PI * r + 1.5 * t)
  emit(x, val, y)
}

const exprOptions = [
  { id: "expr1", label: "Wavy Product", expr: expr1 },
  { id: "expr2", label: "Decaying polar waves", expr: expr2 },
]

type Props = {
  size: number
  setSize: (value: number) => void
  width: number
  setWidth: (value: number) => void
  height: number
  setHeight: (value: number) => void
  expr: AreaEmitter
  setExpr: (value: AreaEmitter) => void
}

const PointsForm = (props: Props) => {
  const { setExpr } = props
  const setExprFromOption = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const opt = exprOptions.find((opt) => opt.id === e.target.value)
      if (opt === undefined) {
        throw new Error(`Unexpected undefined expression.`)
      }
      setExpr(() => opt.expr)
    },
    [setExpr]
  )
  return (
    <div className="form-container">
      <label htmlFor="size">size</label>
      <span>{props.size}</span>
      <input
        id="size"
        value={props.size}
        type="range"
        min={1}
        max={32}
        onChange={(e) => props.setSize(Number(e.target.value))}
      />
      <label htmlFor="width">width</label>
      <span>{props.width}</span>
      <input
        id="width"
        value={props.width}
        type="range"
        min={2}
        max={256}
        onChange={(e) => props.setWidth(Number(e.target.value))}
      />
      <label htmlFor="height">height</label>
      <span>{props.height}</span>
      <input
        id="width"
        value={props.height}
        type="range"
        min={2}
        max={256}
        onChange={(e) => props.setHeight(Number(e.target.value))}
      />
      <label htmlFor="expr">Expression</label>
      <span></span>
      <select id="expr" onChange={setExprFromOption}>
        {exprOptions.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PointsForm

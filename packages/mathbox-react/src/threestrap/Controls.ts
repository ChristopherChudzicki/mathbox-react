/* eslint-disable react/no-unused-prop-types */
import React, { useEffect } from "react"
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { useThreestrap } from "./ThreestrapContext"
import type { Threestrap } from "./threestrap"

type OrbitControlsProps = {
  type: "orbit"
  enablePan?: boolean
  enableRotate?: boolean
  enableZoom?: boolean
}
type ControlsProps = OrbitControlsProps

const ALLOWED_CONTROLS = ["orbit"]

const useOrbitControls = (threestrap: Threestrap, props: ControlsProps) => {
  useEffect(() => {
    if (props.type !== "orbit") return
    if (!threestrap.controls) return
    const controls = threestrap.controls as OrbitControls
    if (props.enablePan !== undefined) {
      controls.enablePan = props.enablePan
    }
    if (props.enableZoom !== undefined) {
      controls.enableZoom = props.enableZoom
    }
    if (props.enableRotate !== undefined) {
      controls.enableRotate = props.enableRotate
    }
  })
}

const Controls: React.FC<ControlsProps> = (props) => {
  if (!ALLOWED_CONTROLS.includes(props.type)) {
    throw new Error(`Invalid control type ${props.type}`)
  }
  const threestrap = useThreestrap()
  useOrbitControls(threestrap, props)
  return null
}

export default Controls

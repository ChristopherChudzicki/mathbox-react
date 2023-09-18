/* eslint-disable react/no-unused-prop-types */
import React, { useEffect } from "react"
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import type { Vector3 } from "three"
import { useThreestrap } from "./ThreestrapContext"
import type { Threestrap } from "./threestrap"

type OrbitControlsProps = {
  type: "orbit"
  enablePan?: boolean
  enableRotate?: boolean
  enableZoom?: boolean
  target?: Vector3
  onStart?: (event: { type: "end"; target: OrbitControls }) => void
  onEnd?: (event: { type: "end"; target: OrbitControls }) => void
}
type ControlsProps = OrbitControlsProps

const ALLOWED_CONTROLS = ["orbit"]

const useOrbitControls = (
  threestrap: Threestrap,
  {
    type,
    enablePan,
    enableRotate,
    enableZoom,
    onStart,
    onEnd,
    target,
  }: ControlsProps
) => {
  useEffect(() => {
    if (type !== "orbit") return
    if (!threestrap.controls) return
    const controls = threestrap.controls as OrbitControls
    if (enablePan !== undefined) {
      controls.enablePan = enablePan
    }
    if (enableZoom !== undefined) {
      controls.enableZoom = enableZoom
    }
    if (enableRotate !== undefined) {
      controls.enableRotate = enableRotate
    }
  }, [type, enablePan, enableRotate, enableZoom, threestrap.controls])

  useEffect(() => {
    if (type !== "orbit") return
    if (!threestrap.controls) return
    const controls = threestrap.controls as OrbitControls
    if (target) {
      controls.target = target
    }
  }, [type, threestrap.controls, target])

  useEffect(() => {
    if (type !== "orbit") return () => {}
    if (!threestrap.controls) return () => {}
    const controls = threestrap.controls as OrbitControls
    if (onStart) {
      controls.addEventListener("start", onStart)
    }
    return () => {
      if (onStart) {
        controls.removeEventListener("start", onStart)
      }
    }
  }, [type, onStart, threestrap.controls])

  useEffect(() => {
    if (type !== "orbit") return () => {}
    if (!threestrap.controls) return () => {}
    const controls = threestrap.controls as OrbitControls
    if (onEnd) {
      controls.addEventListener("end", onEnd)
    }
    return () => {
      if (onEnd) {
        controls.removeEventListener("end", onEnd)
      }
    }
  }, [type, onEnd, threestrap.controls])
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

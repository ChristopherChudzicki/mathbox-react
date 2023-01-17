import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import type { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls"
import type { WebGLRenderer } from "three"

export interface ThreestrapControls {
  orbit: OrbitControls
  firstPerson: FirstPersonControls
}

type Controls = ThreestrapControls[keyof ThreestrapControls]

// TODO: This should be in threestrap package
export interface Threestrap {
  renderer: WebGLRenderer
  controls: Controls | null
}

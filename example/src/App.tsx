import React, { useState } from "react"
import { AreaEmitter } from "mathbox"
import * as MB from "mathbox-react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import PointsForm, { expr1 } from "./PointsForm"
import Points from "./Points"

const mathboxOptions = {
  plugins: ["core", "controls", "cursor"],
  controls: {
    klass: OrbitControls,
  },
}
const initialCameraPosition = [1, 1, 2]

function App() {
  const [width, setWidth] = useState(32)
  const [height, setHeight] = useState(32)
  const [size, setSize] = useState(16)
  const [expr, setExpr] = useState<AreaEmitter>(() => expr1)
  return (
    <>
      {/**
       * Changes from PointsForm will cause this whole component to re-
       * render, when really only Points needs to update.
       *
       * It probably is not necessary for all Mathbox components to be
       * children of MB.Mathbox. It should be possibly to
       *  1. store a ref from Cartesian
       *  2. pass that ref to a separate component, "PointsContainer" that is
       *     NOT a child of  MB.Mathbox
       *  3. Inside PointsContainer...
       *     <PointsContainer>
       *        <PointsForm />
       *        <MathboxAPIContext.Provider value={refToMathboxParent}>
       *          <Points />
       *        </MathboxAPIContext.Provider>
       *     </PointsContainer>
       *
       *    Where the Provider is given a ref to the mathbox parent node, in
       *    this case the Cartesian node.
       *
       *  TODO: Test this and expose MathboxAPIContext. Probably also rename
       *  it to MathboxContext
       */}
      <PointsForm
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        size={size}
        setSize={setSize}
        expr={expr}
        setExpr={setExpr}
      />
      <MB.Mathbox
        options={mathboxOptions}
        className="h-100"
        initialCameraPosition={initialCameraPosition}
      >
        <MB.Cartesian>
          <MB.Grid axes="xz" />
          <Points width={width} height={height} size={size} expr={expr} />
        </MB.Cartesian>
      </MB.Mathbox>
    </>
  )
}

export default App

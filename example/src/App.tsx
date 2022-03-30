import React, { useState, useCallback } from "react"
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

function App() {
  const [width, setWidth] = useState(32)
  const [height, setHeight] = useState(32)
  const [size, setSize] = useState(16)
  const [expr, setExpr] = useState<AreaEmitter>(() => expr1)

  const setup = useCallback((mathbox) => {
    if (mathbox === null) return
    mathbox.three.camera.position.set(1, 1, 2)
  }, [])

  return (
    <>
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
      <MB.Mathbox ref={setup} options={mathboxOptions} className="h-100">
        <MB.Cartesian>
          <MB.Grid axes="xz" />
          <Points width={width} height={height} size={size} expr={expr} />
        </MB.Cartesian>
      </MB.Mathbox>
    </>
  )
}

export default App

/**
 * Re above structure:
 *
 * Changes from PointsForm will cause this whole component to re-render, when
 * really only Points needs to update. (E.g., <Grid /> does not need to
 * re-render.)
 *
 * This probably isn't a big deal. The re-renders should not trigger any actual
 * updats to Mathbox because useEffect dependencies should not have changed.
 *    - @Chris: Check this!
 *
 * But I can think of two possible approaches for avoiding the unnecessary
 * re-renders above.
 *
 * One: It probably is not necessary for all Mathbox components to be children
 * of MB.Mathbox. It should be possibly to
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
 *  Where the Provider is given a ref to the mathbox parent node, in
 *  this case the Cartesian node.
 *
 * Two: The form could live inside Mathbox. There's no reason, I believe, that
 * DOM-rendering components can't be children of Mathbox.
 */

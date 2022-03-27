import React, { useState } from 'react';
import * as MB from 'mathbox-react'

import "mathbox/mathbox.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Form, { AreaEmitter, expr1 } from './Form'

const mathboxOptions = {
  plugins: ["core", "controls", "cursor"],
  controls: {
    klass: OrbitControls,
  },
}
const initialCameraPosition = [1, 1, 2]


type PointsProps = {
  size: number;
  width: number;
  height: number;
  expr: AreaEmitter;
}

const Points = (props: PointsProps) => {
  return (
    <>
      <MB.Area id="sampler" width={props.width} height={props.height} axes="xz" expr={props.expr} />
      <MB.Point points="#sampler" color={0x3090ff} size={props.size}></MB.Point>
      <MB.Transform position={[0, 0.5, 0]}>
        <MB.Point points="#sampler" shape='diamond' color="green" size={props.size}></MB.Point>
      </MB.Transform>
    </>
  )
}

function App() {
  const [width, setWidth] = useState(32);
  const [height, setHeight] = useState(32);
  const [size, setSize] = useState(16);
  const [expr, setExpr] = useState<AreaEmitter>(() => expr1)
  console.log(expr)
  return (
    <>
      <Form width={width} setWidth={setWidth} height={height} setHeight={setHeight} size={size} setSize={setSize} expr={expr} setExpr={setExpr} />
      <MB.Mathbox options={mathboxOptions} className='h-100' initialCameraPosition={initialCameraPosition}>
        <MB.Cartesian>
          <MB.Grid axes="xz" />
          <Points width={width} height={height} size={size} expr={expr} />
        </MB.Cartesian>
      </MB.Mathbox>
    </>
  );
}

export default App;

import React, { useRef } from 'react';
import * as MB from 'mathbox-react'
import "mathbox/mathbox.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const mathboxOptions = {
  plugins: ["core", "controls", "cursor"],
  controls: {
    klass: OrbitControls,
  },
}
const initialCameraPosition = [1, 1, 2]

const expr = (emit: any, x: number, y: number, i: number, j: number, time: number) => {
  emit(x, 0.25 + 0.25 * (Math.sin(x + time) * Math.sin(y + time)), y);
};

const Points = () => {
  return (
    <>
      <MB.Area id="sampler" width={32} height={32} axes="xz" expr={expr} />
      <MB.Point points="#sampler" color={0x3090ff} size={20}></MB.Point>
      <MB.Transform position={[0, 0.5, 0]}>
        <MB.Point points="#sampler" shape='diamond' color="green" size={20}></MB.Point>
      </MB.Transform>
    </>
  )
}

function App() {
  const ref = useRef<any>();
  return (
    <MB.Mathbox ref={ref} options={mathboxOptions} className='h-100' initialCameraPosition={initialCameraPosition}>
      <MB.Cartesian >
        <MB.Grid axes="xz" />
        <Points />
      </MB.Cartesian>
    </MB.Mathbox>
  );
}

export default App;

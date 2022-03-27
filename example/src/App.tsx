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

function App() {
  const ref = useRef<any>();
  return (
    <MB.Mathbox ref={ref} options={mathboxOptions} style={{ height: 500 }} initialCameraPosition={[0, 0, 3]}>
      <MB.Cartesian >
        <MB.Grid axes="xy" />
        <MB.Grid axes="xz" />
      </MB.Cartesian>
    </MB.Mathbox>
  );
}

export default App;

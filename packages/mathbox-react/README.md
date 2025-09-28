# Mathbox React

React bindings for [Mathbox](https://github.com/unconed/mathbox).

## Example

```tsx
import React from "react"
import { ContainedMathbox, Axis, Grid, Cartesian } from "mathbox-react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const SimpleExample: React.FC = () => (
  <ContainedMathbox
    options={{
      plugins: ["core", "controls", "cursor"],
      controls: { klass: OrbitControls },
    }}
    containerStyle={{ height: "100vh" }}
  >
    <Cartesian>
      <Axis axis="x" color="orange" />
      <Axis axis="y" color="blue" />
      <Axis axis="z" color="green" />
      <Grid axes="xz" />
    </Cartesian>
  </ContainedMathbox>
)

export default SimpleExample
```

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

## Development
The project uses [Yarn](https://yarnpkg.com/getting-started/install) and includes two [Yarn Workspaces](https://yarnpkg.com/features/workspaces):
- [mathbox-react](./mathbox-react/) The actual package code, pbulished to NPM
- [examples](./example/) Examples using `mathbox-react`.

See individual `package.json` files for available commands. In general, commands should be run via `yarn`, not `npm`. E.g., `yarn install` or `yarn lint`.
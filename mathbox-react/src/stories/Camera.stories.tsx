import React from "react"
import { Story, Meta } from "@storybook/react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { Camera, Cartesian, Surface, Area, Grid } from "../components/components"
import { ContainedMathbox } from "../index"

export default {
  title: "Camera",
  component: Camera,
  argTypes: {},
} as Meta<typeof Camera>

const options = {
  plugins: ["core", "controls", "cursor"],
  controls: {
    klass: OrbitControls,
  },
}

const Template: Story<React.ComponentProps<typeof Surface>> = (args) => (
  <ContainedMathbox options={options} containerStyle={{ height: 450 }}>
    <Cartesian
      range={[
        [-5, 5],
        [-2, 2],
        [-5, 5],
      ]}
    >
      <Camera
        lookAt={[0, 0, 0]}
        liveProps={
          {
            position: t => [
              5 * Math.cos(t),
              2,
              3 * Math.sin(t),
            ]
          }
        }
        proxy
      />
      <Grid axes="xz" />
      <Area
        width={64}
        height={64}
        axes={["x", "z"]}
        expr={(emit, x, z, i, j, t) => {
          const y = Math.sin(x - t) * Math.cos(z - t)
          emit(x, y, z)
        }}
      />
      <Surface color='rgb(48,144,255)' shaded />
    </Cartesian>
  </ContainedMathbox>
)

export const DefaultCamera = Template.bind({})
DefaultCamera.args = {}

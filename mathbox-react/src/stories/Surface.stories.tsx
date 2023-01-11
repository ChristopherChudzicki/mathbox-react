import React from "react"
import { Story, Meta } from "@storybook/react"

import { CustomMathbox as Mathbox } from "./utils"
import { Cartesian, Surface, Area, Grid } from "../components/components"

export default {
  title: "Surface",
  component: Surface,
  argTypes: {
    color: {
      type: "string",
      defaultValue: "rgb(48,144,255)",
    },
    shaded: {
      type: "boolean",
      defaultValue: true,
    },
  },
} as Meta<typeof Surface>

const Template: Story<React.ComponentProps<typeof Surface>> = (args) => (
  <Mathbox containerStyle={{ height: 450 }}>
    <Cartesian
      range={[
        [-5, 5],
        [-2, 2],
        [-5, 5],
      ]}
    >
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
      <Surface {...args} />
    </Cartesian>
  </Mathbox>
)

export const DefaultCartesian = Template.bind({})
DefaultCartesian.args = {}

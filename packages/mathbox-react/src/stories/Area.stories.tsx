import React from "react"
import { Story, Meta } from "@storybook/react"

import { CustomMathbox as Mathbox } from "./utils"
import { Cartesian, Surface, Area, Grid } from "../components/components"

export default {
  title: "Area",
  component: Area,
  argTypes: {
    width: {
      type: "number",
      defaultValue: 18,
    },
    height: {
      type: "number",
      defaultValue: 18,
    },
    live: {
      type: "boolean",
      defaultValue: true,
    },
  },
} as Meta<typeof Area>

const Template: Story<React.ComponentProps<typeof Area>> = (args) => (
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
        axes={["x", "z"]}
        expr={(emit, x, z, i, j, t) => {
          const y = Math.sin(x - t) * Math.cos(z - t)
          emit(x, y, z)
        }}
        {...args}
      />
      <Surface color={0x3090ff} shaded />
    </Cartesian>
  </Mathbox>
)

export const DefaultCartesian = Template.bind({})
DefaultCartesian.args = {}

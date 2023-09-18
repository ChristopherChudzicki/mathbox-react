import React from "react"
import { Story, Meta } from "@storybook/react"

import { CustomMathbox as Mathbox } from "./utils"
import { Cartesian, Grid, Axis } from "../components/components"

export default {
  title: "Cartesian",
  component: Cartesian,
  argTypes: {
    range: {
      type: "string",
      defaultValue: [
        [-1, 1],
        [-1, 1],
        [-1, 1],
      ],
    },
    scale: {
      type: "string",
      defaultValue: [1, 1, 1],
    },
  },
} as Meta<typeof Cartesian>

const Template: Story<React.ComponentProps<typeof Cartesian>> = (args) => (
  <Mathbox containerStyle={{ height: 450 }}>
    <Cartesian {...args}>
      <Grid axes="xz" />
      <Axis width={4} axis="x" color="red" />
      <Axis width={4} axis="y" color="green" />
      <Axis width={4} axis="z" color="blue" />
    </Cartesian>
  </Mathbox>
)

export const DefaultCartesian = Template.bind({})
DefaultCartesian.args = {}

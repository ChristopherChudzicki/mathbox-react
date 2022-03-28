import React from "react"
import { Story, Meta } from "@storybook/react"

import { CustomMathbox as Mathbox } from "./utils"
import { Cartesian, Grid } from "../components/components"

export default {
  title: "Cartesian",
  component: Cartesian,
  argTypes: {
    range: {
      type: "array",
      default: [
        [-1, 1],
        [-1, 1],
        [-1, 1],
        [-1, 1],
      ],
    },
    scale: {
      type: "array",
      default: [1, 1, 1],
    },
  },
} as Meta<typeof Cartesian>

const Template: Story<React.ComponentProps<typeof Cartesian>> = (args) => (
  <Mathbox style={{ height: 450 }}>
    <Cartesian {...args}>
      <Grid />
    </Cartesian>
  </Mathbox>
)

export const DefaultCartesian = Template.bind({})
DefaultCartesian.args = {}

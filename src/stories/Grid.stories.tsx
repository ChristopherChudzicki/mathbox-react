import React from "react"
import { Story, Meta } from "@storybook/react"

import { CustomMathbox as Mathbox } from "./utils"
import { Grid } from "../components"

export default {
  title: "Grid",
  component: Grid,
  argTypes: {
    color: {
      type: "string",
      default: "rgb(128, 128, 128)",
    },
    axes: {
      type: "string",
      default: "xy",
    },
  },
} as Meta<typeof Grid>

const Template: Story<React.ComponentProps<typeof Grid>> = (args) => (
  <Mathbox style={{ height: 450 }} >
    <Grid {...args} />
  </Mathbox>
)

export const DefaultGrid = Template.bind({})
DefaultGrid.args = {}

export const GridXY = Template.bind({})
GridXY.args = { axes: "xy" }

export const GridYZ = Template.bind({})
GridYZ.args = { axes: "yz" }

export const GridZX = Template.bind({})
GridZX.args = { axes: "zx" }

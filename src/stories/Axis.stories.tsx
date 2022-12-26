import React from "react"
import * as THREE from "three"
import { Story, Meta } from "@storybook/react"

import { CustomMathbox as Mathbox } from "./utils"
import { Axis, Cartesian } from "../components/components"

export default {
  title: "Axis",
  component: Axis,
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
} as Meta<typeof Axis>

const Template: Story<React.ComponentProps<typeof Axis>> = (args) => (
  <Mathbox containerStyle={{ height: 450 }}>
    <Cartesian {...args}>
      <Axis color={new THREE.Color(0xff4136)} />
      <Axis axis={2} color={new THREE.Color(0x2ecc40)} />
      <Axis axis={3} color={new THREE.Color(0x0074d9)} />
    </Cartesian>
  </Mathbox>
)

export const AxisDoesntRenderColors = Template.bind({})
AxisDoesntRenderColors.args = {}

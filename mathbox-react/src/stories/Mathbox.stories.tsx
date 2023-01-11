import React from "react"
import { Story, Meta } from "@storybook/react"

import { ContainedMathbox } from "../components"

export default {
  title: "Mathbox",
  component: ContainedMathbox,
  argTypes: {},
} as Meta<typeof ContainedMathbox>

const Template: Story<React.ComponentProps<typeof ContainedMathbox>> = () => (
  <ContainedMathbox />
)

export const HelloWorld = Template.bind({})

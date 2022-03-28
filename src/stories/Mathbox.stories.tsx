import React from "react"
import { Story, Meta } from "@storybook/react"

import Mathbox from "../components/Mathbox"

export default {
  title: "Mathbox",
  component: Mathbox,
  argTypes: {},
} as Meta<typeof Mathbox>

const Template: Story<React.ComponentProps<typeof Mathbox>> = () => (
  <Mathbox style={{ height: 450 }} />
)

export const HelloWorld = Template.bind({})

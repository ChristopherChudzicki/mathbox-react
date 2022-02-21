import React, { useRef, useState, useEffect } from "react"
import { Story, Meta } from "@storybook/react"

import Mathbox from "./Mathbox"
import Cartesian from './Cartesian'
import Grid from './Grid'

export default {
  title: "Cartesian",
  component: Cartesian,
  argTypes: {
    range: {
      type: 'array',
      default: [[-1, 1], [-1, 1], [-1, 1], [-1, 1]]
    },
    scale: {
      type: 'array',
      default: [1, 1, 1]
    }
  },
} as Meta<typeof Cartesian>

const Template: Story<React.ComponentProps<typeof Cartesian>> = (args) => {
  const [container, setContainer] = useState<HTMLDivElement>()
  return (
    <div ref={setContainer} style={{ height: 450 }}>
      {container && <Mathbox element={container}>
        <Cartesian {...args} >
          <Grid />
        </Cartesian>
      </Mathbox>}
    </div>
  )
}

export const DefaultCartesian = Template.bind({})
DefaultCartesian.args = {}
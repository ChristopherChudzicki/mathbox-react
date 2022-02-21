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
  const container = useRef<HTMLDivElement>(null)
  const [_isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])
  return (
    <div ref={container} style={{ height: 450 }}>
      {container.current && <Mathbox element={container.current}>
        <Cartesian {...args} >
          <Grid />
        </Cartesian>
      </Mathbox>}
    </div>
  )
}

export const DefaultCartesian = Template.bind({})
DefaultCartesian.args = {}
import React, { useRef, useState, useEffect } from "react"
import { Story, Meta } from "@storybook/react"

import Mathbox from "./Mathbox"
import Grid from './Grid'

export default {
  title: "Grid",
  component: Grid,
  argTypes: {
    color: {
      type: 'string',
      default: "rgb(128, 128, 128)"
    },
    axes: {
      type: 'string',
      default: 'xy'
    }
  },
} as Meta<typeof Grid>

const Template: Story<React.ComponentProps<typeof Grid>> = (args) => {
  const container = useRef<HTMLDivElement>(null)
  const [_isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])
  return (
    <div ref={container} style={{ height: 450 }}>
      {container.current && <Mathbox element={container.current}>
        <Grid {...args} />
      </Mathbox>}
    </div>
  )
}

export const DefaultGrid = Template.bind({})
DefaultGrid.args = {}

export const GridXY = Template.bind({})
GridXY.args = { axes: 'xy' }

export const GridYZ = Template.bind({})
GridYZ.args = { axes: 'yz' }

export const GridZX = Template.bind({})
GridZX.args = { axes: 'zx' }

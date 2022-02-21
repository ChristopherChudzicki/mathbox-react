import React, { useRef, useState, useEffect } from "react"
import { Story, Meta } from "@storybook/react"

import Mathbox from "./Mathbox"
import Grid from './Grid'
import Point from './Point'
import Array from './Array'

export default {
  title: "Point",
  component: Point,
  argTypes: {
    color: {
      type: 'string',
      default: "rgb(128, 128, 128)"
    },
    opacity: {
      type: 'number',
      default: 1
    },
    points: {
      type: 'array',
      default: [[1, 1, 1]]
    },
    size: {
      type: 'number',
      default: 4
    }
  },
} as Meta<typeof Grid>

const Template: Story<React.ComponentProps<typeof Point>> = (args) => {
  const { points, ...otherArgs } = args
  const container = useRef<HTMLDivElement>(null)
  const [_isMounted, setIsMounted] = useState(false)
  const arrayRef = useRef(null);
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])
  return (
    /**
     * ALERT: This is not working properly yet.
     * I'd like to have the array feeding the Point some data
     */
    <div ref={container} style={{ height: 450 }}>
      {container.current && <Mathbox element={container.current}>
        <Array ref={arrayRef} items={1} channels={3} data={[[1, 1, 2]]} />
        <Grid axes='xy' />
        {arrayRef.current && <Point points={arrayRef.current} {...otherArgs} />}
      </Mathbox>}
    </div>
  )
}

export const DefaultPoint = Template.bind({})
DefaultPoint.args = {}

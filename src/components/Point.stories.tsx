import React, { useState } from "react"
import { Story, Meta } from "@storybook/react"

import Mathbox from "./Mathbox"
import Cartesian from "./Cartesian"
import Grid from "./Grid"
import Point from "./Point"
import MBArray from "./Array"
import type { MathboxNode } from "./types"

export default {
  title: "Point",
  component: Point,
  argTypes: {
    color: {
      type: "string",
      default: "rgb(128, 128, 128)",
    },
    opacity: {
      type: "number",
      default: 1,
    },
    points: {
      type: "array",
      default: [[1, 1, 1]],
    },
    size: {
      type: "number",
      default: 4,
    },
  },
} as Meta<typeof Grid>

const Template: Story<React.ComponentProps<typeof Point>> = (args) => {
  const { points, ...otherArgs } = args
  const [container, setContainer] = useState<HTMLDivElement>()
  const [data, setData] = useState<MathboxNode>()
  return (
    <div ref={setContainer} style={{ height: 450 }}>
      {container && (
        <Mathbox element={container}>
          <Cartesian
            range={[
              [-5, 5],
              [-5, 5],
              [-5, 5],
            ]}
          >
            <Grid axes="xy" />
            <Grid axes="xz" />
            <MBArray
              ref={setData}
              items={1}
              channels={3}
              data={[
                [1, 1, 2],
                [1, 1, 3],
              ]}
            />
            <MBArray
              items={1}
              channels={3}
              data={[
                [1, 1, -2],
                [1, 1, -3],
              ]}
            />
            <Point points={data} {...otherArgs} />
          </Cartesian>
        </Mathbox>
      )}
    </div>
  )
}

export const DefaultPoint = Template.bind({})
DefaultPoint.args = {}

import React, { useState } from "react"
import { Story, Meta } from "@storybook/react"
import { MathboxSelection } from "mathbox"
import { CustomMathbox as Mathbox } from "./utils"
import { Cartesian, Grid, Point, Array as MBArray } from "../components"

export default {
  title: "Point",
  component: Point,
  argTypes: {
    color: {
      type: "string",
      defaultValue: "rgb(128, 128, 128)",
    },
    opacity: {
      type: "number",
      defaultValue: 1,
    },
    points: {
      type: "array",
      defaultValue: [[1, 1, 1]],
    },
    size: {
      type: "number",
      defaultValue: 4,
    },
  },
} as Meta<typeof Grid>

const Template: Story<React.ComponentProps<typeof Point>> = (args) => {
  const { points, ...otherArgs } = args
  const [data, setData] = useState<MathboxSelection<"array"> | null>(null)
  return (
    <Mathbox containerStyle={{ height: 450 }}>
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
  )
}

export const DefaultPoint = Template.bind({})
DefaultPoint.args = {}

export const LiveProps = Template.bind({})
LiveProps.args = {
  liveProps: {
    size: (t: number) => 20 * (1 + 0.5 * Math.sin(t)),
  },
}

import React from "react"
import { Story, Meta } from "@storybook/react"

import { CustomMathbox as Mathbox } from "./utils"
import { Cartesian, Play, Interval, Line, Grid } from "../components/components"

export default {
  title: "Play",
  component: Play,
  argTypes: {},
} as Meta<typeof Play>

const Template: Story<React.ComponentProps<typeof Play>> = () => (
  <Mathbox containerStyle={{ height: 450 }}>
    <Cartesian
      range={[
        [-5, 5],
        [-2, 2],
        [-2, 2],
      ]}
    >
      <Grid axes="xy" />
      <Interval
        width={64}
        channels={2}
        expr={(emit, x, i, t) => {
          const y = Math.sin(x - t)
          emit(x, y)
        }}
      />
      <Play
        delay={1}
        speed={1000}
        script={[{ props: { live: true } }, { props: { live: false } }]}
      />
      <Line id="line" color={0x3090ff} width={4} />
      <Play
        target="#line"
        delay={1}
        pace={2}
        script={[
          { props: { opacity: 1 } },
          { props: { opacity: 0.25 } },
          { props: { color: "red" } },
        ]}
      />
    </Cartesian>
  </Mathbox>
)

export const DefaultCartesian = Template.bind({})
DefaultCartesian.args = {}

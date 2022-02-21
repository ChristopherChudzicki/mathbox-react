import React, { useRef, useState, useEffect } from "react"
import { Story, Meta } from "@storybook/react"

import Mathbox from "./Mathbox"

export default {
  title: "Mathbox",
  component: Mathbox,
  argTypes: {},
} as Meta<typeof Mathbox>

const Template: Story<React.ComponentProps<typeof Mathbox>> = () => {
  const [container, setContainer] = useState<HTMLDivElement>()
  return (
    <div ref={setContainer} style={{ height: 450 }}>
      {container && <Mathbox element={container} />}
    </div>
  )
}

export const HelloWorld = Template.bind({})

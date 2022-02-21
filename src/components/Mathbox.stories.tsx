import React, { useRef, useState, useEffect } from "react"
import { Story, Meta } from "@storybook/react"

import Mathbox from "./Mathbox"

export default {
  title: "Mathbox",
  component: Mathbox,
  argTypes: {},
} as Meta<typeof Mathbox>

const Template: Story<React.ComponentProps<typeof Mathbox>> = () => {
  const container = useRef<HTMLDivElement>(null)
  const [_isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])
  return (
    <div ref={container} style={{ height: 450 }}>
      {container.current && <Mathbox element={container.current} />}
    </div>
  )
}

export const HelloWorld = Template.bind({})

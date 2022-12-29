import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DancingPoints from "./views/DancingPoints"
import ColorCube from "./views/ColorCube"
import SimpleExample from "./views/SimpleExample"
import "./index.css"

const rootElement = document.getElementById("root")
if (!rootElement) {
  throw new Error ("No root element found")
}

const root = ReactDOM.createRoot(rootElement)

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DancingPoints />} />
      <Route path="/color-cube" element={<ColorCube />} />
      <Route path="/simple-example" element={<SimpleExample />} />
    </Routes>
  </BrowserRouter>
)

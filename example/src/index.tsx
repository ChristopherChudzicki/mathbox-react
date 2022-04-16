import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DancingPoints from "./views/DancingPoints"
import ColorCube from "./views/ColorCube"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DancingPoints />} />
      <Route path="/color-cube" element={<ColorCube />} />
    </Routes>
  </BrowserRouter>
)

import { createRoot } from "react-dom"

import "../assets/css/base.scss"

import App from "./App"


const Main = () => {
  return (
    <App />
  )
}

const container = document.getElementById("root")
if (container) {
  const root = createRoot(container)
  root.render(<Main />)
}

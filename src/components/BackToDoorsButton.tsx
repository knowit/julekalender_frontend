import { FC } from "react"
import { Link } from "react-router-dom"


const BackToDoorsButton: FC = () => (
  <Link className="text-gray-400 ml-4" tabIndex={4} to="/">&larr; Tilbake til lukene</Link>
)

export default BackToDoorsButton

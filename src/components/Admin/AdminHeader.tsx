import { VFC } from "react"
import { Link } from "react-router-dom"

import Button from "../Button"


const AdminHeader: VFC = () => (
  <header className="space-x-8">
    <Link to="/admin/doors">
      <Button content="Luker" />
    </Link>
    <Link to="/admin/new">
      <Button>Ny luke</Button>
    </Link>
    <Link to="/admin/edit">
      <Button>Rediger luke</Button>
    </Link>
  </header>
)


export default AdminHeader

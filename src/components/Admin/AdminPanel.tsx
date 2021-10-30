import { noop } from "lodash"
import { FC, useState } from "react"

import Button from "../Button"

import EditBox from "./EditBox"


type AdminPanelProps = {
  door: number
}
const AdminPanel: FC<AdminPanelProps> = ({ door }) => {
  const [edit, setEdit] = useState(false)
  const onClick = () => {
    setEdit(!edit)
  }
  return (
    <div>
      <Button onClick={noop}>Last opp ny oppgave</Button>
      <Button className="text-left ml-4" onClick={onClick}>Rediger oppgave</Button>
      {edit ? <EditBox door={door} /> : null}
    </div>
  )
}


export default AdminPanel

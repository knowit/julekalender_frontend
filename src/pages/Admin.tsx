import { FC, useEffect, useRef, useState } from "react"
import { Redirect } from "react-router-dom"
import { map, range } from "lodash"

import PostsSection from "../components/Posts/PostsSection"
import Challenge from "../components/Door/Challenge"
import { useIsAdmin } from "../hooks/useIsAdmin"

import Page from "./Page"
import TextareaAutosize from 'react-autosize-textarea/lib'
import Button from '../components/Button'
import { useChallenge } from '../api/requests'


const Admin: FC = () => {
  const isAdmin = useIsAdmin()
  const [door, setDoor] = useState(1)

  if (!isAdmin) return <Redirect to="/" />

  return (
    <Page className="space-y-door-elements">
      <Challenge
        door={door}
        withoutInput
        preamble={<>
          <span>Velg luke:&emsp;</span>
          <select onChange={((e) => setDoor(parseInt(e.target.value)))}>
            {map(range(1, 25), (door, i) => <option key={i} value={door}>{door}</option>)}
          </select>
          <AdminPanel doorNumber={door} />
        </>}
      />
      <PostsSection door={door} />
    </Page>
  )
}


type AdminPanelProps = {
  doorNumber: number
}
const AdminPanel: FC<AdminPanelProps> = ({ doorNumber }) => {
  const [edit, setEdit] = useState(false)
  const onClick = () => {
    // Når trykket, vis et textfield som viser markdown til oppgaven, som du kan hente fra backend
    // henting og state skal seff skje gjennom hooks
    setEdit(!edit)
  }
  return (
    <div>
      <Button onClick={()=> console.log("hei")}>Last opp ny oppgave</Button>
      <Button className="text-left ml-4" onClick={onClick}>Rediger oppgave</Button>
      {edit ? <EditBox doorNumber={doorNumber} /> : null}
    </div>
  )
}

type EditBoxProps = {
  doorNumber: number
}

const EditBox: FC<EditBoxProps> = ({ doorNumber }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [fubar, setError] = useState<Error>()
  const { data: challenge, error } = useChallenge(doorNumber)

  console.log(challenge)


  if (!challenge) return null
  return (
    <div>
      <TextareaAutosize
        className="w-full"
        ref={inputRef}
        defaultValue={challenge.content}
      />
      <Button onClick={() => console.log('pls lagre :))')}>Lagre</Button>
    </div>
  )
}

export default Admin

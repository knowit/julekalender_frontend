import { FC, useEffect, useRef, useState } from "react"
import { Redirect } from "react-router-dom"
import { map, noop, range, update } from "lodash"
import TextareaAutosize from "react-autosize-textarea/lib"

import PostsSection from "../components/Posts/PostsSection"
import Challenge from "../components/Door/Challenge"
import { useIsAdmin } from "../hooks/useIsAdmin"
import Button from "../components/Button"
import { useAdminChallenge, useUpdateChallenge } from "../api/requests"

import Page from "./Page"
import { AdminChallenge } from '../api'


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
          <AdminPanel door={door} />
        </>}
      />
      <PostsSection door={door} />
    </Page>
  )
}


type AdminPanelProps = {
  door: number
}
const AdminPanel: FC<AdminPanelProps> = ({ door }) => {
  const [edit, setEdit] = useState(false)
  const onClick = () => {
    console.log("ree")
    // Når trykket, vis et textfield som viser markdown til oppgaven, som du kan hente fra backend
    // henting og state skal seff skje gjennom hooks
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

type EditBoxProps = {
  door: number
}

const EditBox: FC<EditBoxProps> = ({ door }) => {
  const { data: challenge, error } = useAdminChallenge(door)
  const [markdown, setMarkdown] = useState<string | undefined>(challenge?.markdown_content)
  // const [challengeState, setChallengeState] = useState<ChallengeType>()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  // const [fubar, setError] = useState<Error>()
  const { mutate: updateChallenge } = useUpdateChallenge()

  const save = () => {
    if (challenge && markdown) {
      const ch: AdminChallenge = { ...challenge }
      ch.markdown_content = markdown
      updateChallenge({ challenge: ch })
    }
  }

  useEffect(() => {
    setMarkdown(challenge?.markdown_content)
  }, [challenge])

  if (!challenge) return null
  console.log(challenge)
  return (
    <div>
      <TextareaAutosize
        className="w-full"
        ref={inputRef}
        defaultValue={challenge.markdown_content}
        onChange={(ev) => setMarkdown(ev.target.value)}
      />
      <Button onClick={save}>Lagre</Button>
    </div>
  )
}

export default Admin

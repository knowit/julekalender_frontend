import { FC, useState } from "react"
import { Redirect } from "react-router-dom"
import { map, range } from "lodash"

import PostsSection from "../components/Posts/PostsSection"
import Challenge from "../components/Door/Challenge"
import { useIsAdmin } from "../hooks/useIsAdmin"

import Page from "./Page"


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
        </>}
      />
      <PostsSection door={door} />
    </Page>
  )
}

export default Admin

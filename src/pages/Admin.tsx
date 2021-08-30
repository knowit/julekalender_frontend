import { FC, useState } from "react"
import { Redirect } from "react-router-dom"
import { map, noop, range } from "lodash"

import CommentsSection from "../components/Comments/CommentsSection"
import Challenge from "../components/Door/Challenge"
import useRequestsAndAuth from "../hooks/useRequestsAndAuth"

import Page from "./Page"


const Admin: FC = () => {
  const { isAdmin } = useRequestsAndAuth()
  const [doorNumber, setDoorNumber] = useState("1")

  if (!isAdmin) return <Redirect to="/" />

  return (
    <Page>
      <Challenge
        doorNumber={doorNumber}
        isDoorSolved={true}
        setIsDoorSolved={noop}
        preamble={<>
          <span>Velg luke:&emsp;</span>
          <select onChange={((e) => setDoorNumber(e.target.value))}>
            {map(range(1, 25), (door, i) => <option key={i} value={door}>{door}</option>)}
          </select>
        </>}
      />
      <CommentsSection doorNumber={doorNumber} />
    </Page>
  )
}

export default Admin

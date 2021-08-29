import { FC, useState } from "react"
import { Redirect } from "react-router-dom"
import { map, noop, range } from "lodash"

import BackToDoorsButton from "../components/BackToDoorsButton"
import CommentsSection from "../components/Comments/CommentsSection"
import Challenge from "../components/Door/Challenge"
import useRequestsAndAuth from "../hooks/useRequestsAndAuth"


type AdminProps = {

}

const Admin: FC<AdminProps> = () => {
  const { isAdmin } = useRequestsAndAuth()
  const [doorNumber, setDoorNumber] = useState("1")

  if (!isAdmin) return <Redirect to="/" />

  return (
    <main className="max-w-kodekalender mx-auto mt-10">
      <BackToDoorsButton />
      <div className="py-12 px-8 md:px12 mx4 md:mx-8 text-gray-700 rounded-md">
        <div className="py-8 px-8 md:px-12 mx-4 md:mx-8 bg-gray-100 rounded-md">
          <select onChange={((e) => setDoorNumber(e.target.value))}>
            {map(range(1, 25), (door, i) => <option key={i} value={door}>{door}</option>)}
          </select>
          <Challenge
            doorNumber={doorNumber}
            isDoorSolved={true}
            setIsDoorSolved={noop}
          />
        </div>
        <CommentsSection doorNumber={doorNumber} />
      </div>
    </main>
  )
}

export default Admin

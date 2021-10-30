import { useState, VFC } from "react"

import { useChallenge } from "../../api/admin/requests"
import ChallengeForm from "../../components/Admin/ChallengeForm"
import DoorSelect from "../../components/Admin/DoorSelect"


// TODO: Make this a Link from Doors instead of selection
const EditDoor: VFC = () => {
  const [door, setDoor] = useState(1)
  const { data: challenge } = useChallenge(door)

  // TODO: Finish save
  const save = () => {
    // if (challenge && markdown) {
    //   const ch: AdminChallenge = { ...challenge }
    //   ch.markdown_content = markdown
    //   // updateChallenge({ challenge: ch })
    // }
  }

  if (!challenge) return null

  return (
    <div className="space-y-8">
      <DoorSelect door={door} setDoor={setDoor} />
      <ChallengeForm challenge={challenge} submit={save} />
    </div>
  )
}

export default EditDoor

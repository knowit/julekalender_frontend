import { FC, useState } from "react"

import Challenge from "../../components/Door/Challenge"
import PostsSection from "../../components/Posts/PostsSection"
import DoorSelect from "../../components/Admin/DoorSelect"
import { useChallenge } from "../../api/admin/requests"


// TODO: Link to edit/destroy
const Doors: FC = () => {
  const [door, setDoor] = useState(1)
  const { data: challenge } = useChallenge(door)

  return (
    <div className="space-y-door-elements">
      <Challenge
        challenge={challenge}
        withoutInput
        preamble={<DoorSelect door={door} setDoor={setDoor} />}
      />

      <PostsSection door={door} />
    </div>
  )
}

export default Doors

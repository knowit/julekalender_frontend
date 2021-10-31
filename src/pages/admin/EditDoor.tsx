import { VFC } from "react"
import { useHistory, useParams } from "react-router-dom"

import { AdminChallengePayload } from "../../api/admin/Challenge"
import { useChallenge, useUpdateChallenge } from "../../api/admin/requests"
import ChallengeForm from "../../components/Admin/ChallengeForm"


const EditDoor: VFC = () => {
  const { door: doorString } = useParams<{ door: string }>()
  const door = parseInt(doorString)
  const history = useHistory()

  const { data: challenge } = useChallenge(door)
  const { mutate: updateChallenge } = useUpdateChallenge()

  const submit = (challenge: AdminChallengePayload) => {
    updateChallenge({ challenge }, { onSuccess: () => history.push(`/admin/doors?door=${challenge.door}`) })
  }

  if (!challenge) return null

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="text-4xl font-semibold">Luke {door}</span>
      </div>

      <ChallengeForm challenge={challenge} submit={submit} />
    </div>
  )
}

export default EditDoor

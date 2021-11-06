import { isEmpty } from "lodash"
import { VFC } from "react"
import { useHistory } from "react-router-dom"

import { AdminChallengePayload } from "../../api/admin/Challenge"
import { useCreateChallenge } from "../../api/admin/requests"
import ChallengeForm from "../../components/Admin/ChallengeForm"
import useAvailableDoors from "../../hooks/admin/useAvailableDoors"


const Newdoor: VFC = () => {
  const history = useHistory()

  const { mutate: createChallenge } = useCreateChallenge()

  const submit = (challenge: AdminChallengePayload) => {
    createChallenge({ challenge }, { onSuccess: () => history.push(`/admin/doors?door=${challenge.door}`) })
  }

  const availableDoors = useAvailableDoors()

  if (isEmpty(availableDoors)) return (
    <div className="text-center">
      <span className="text-4xl font-semibold">Ingen ledige luker!</span>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="text-4xl font-semibold">Ny luke</span>
      </div>

      <ChallengeForm newForm challenge={{ door: availableDoors[0], title: "", author: "", answer: "", markdown_content: "", files: [] }} submit={submit} />
    </div>
  )
}

export default Newdoor

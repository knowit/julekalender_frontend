import { FC, memo, useLayoutEffect, useMemo, useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import { isNil, minBy, values } from "lodash"

import Challenge from "../../components/Door/Challenge"
import PostsSection from "../../components/Posts/PostsSection"
import DoorSelect from "../../components/Admin/DoorSelect"
import { useChallenge, useChallenges, useDeleteChallenge, usePosts as useAdminPosts } from "../../api/admin/requests"
import Button from "../../components/Button"


const Doors: FC = () => {
  const history = useHistory()
  const { search } = useLocation()
  const paramMatch = search.match(/door=(?<door>\d+)/)?.groups

  // Find the first available challenge in case we need to choose a default door
  const { data: challenges } = useChallenges()
  const minChallenge = useMemo(() => minBy(values(challenges), "door"), [challenges])

  const { mutate: doDeleteChallenge, isLoading: isDeleting } = useDeleteChallenge()

  const deleteChallenge = () => {
    if (!window.confirm(`Er du sikker på at du vil slette luke ${door} "${adminChallenge?.title}"?`)) return

    doDeleteChallenge(
      { door },
      {
        onSuccess: () => {
          setDoor(undefined)
          history.push("/admin/doors")
        }
      }
    )
  }

  const [door, setDoor] = useState<number | undefined>(paramMatch && parseInt(paramMatch.door))

  // If no door is set (through query or user choice), default to first available door
  useLayoutEffect(() => {
    setDoor((door) => door ?? minChallenge?.door)
  }, [setDoor, minChallenge])

  const { data: adminChallenge } = useChallenge(door ?? minChallenge?.door)

  if (isNil(door)) return null

  return (
    <div className="space-y-door-elements">
      <Challenge
        challenge={adminChallenge}
        withoutInput
        preamble={(
          <div className="w-full flex justify-between mb-8">
            <DoorSelect door={door} setDoor={setDoor} />

            <div className="space-x-8">
              <Link to={`/admin/doors/${door}/edit`}>
                <Button disabled={isDeleting}>Rediger luke</Button>
              </Link>
              <Button disabled={isDeleting} onClick={deleteChallenge}>Slett luke</Button>
            </div>
          </div>
        )}
      />

      <PostsSection door={door} usePosts={useAdminPosts} withoutInput />
    </div>
  )
}

export default memo(Doors)

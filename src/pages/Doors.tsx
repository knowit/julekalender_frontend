import { get } from "lodash"
import { useCallback, useMemo } from "react"
import { useHistory } from "react-router"

import { useChallenges, usePrefetchLikes, usePrefetchPosts, useSolvedStatus } from "../api/requests"
import Footer from "../components/Footer"
import LightsDesktop from "../components/Lights/LightsDesktop"
import LightsMobile from "../components/Lights/LightsMobile"
import useCurrentTime from "../hooks/useCurrentTime"
import { getRaffleEnd } from "../utils"


const Doors = () => {
  const history = useHistory()

  const { data: challenges } = useChallenges()
  const { data: solvedStatus } = useSolvedStatus()
  const prefetchPosts = usePrefetchPosts()
  const prefetchLikes = usePrefetchLikes()

  const currentTime = useCurrentTime()


  const prefetch = useCallback((door: number) => {
    prefetchLikes()

    if (get(solvedStatus, door))
      prefetchPosts(door)
  }, [prefetchLikes, prefetchPosts, solvedStatus])

  const navigateToDoor = useCallback((door: number) => {
    history.push(`/luke/${door}`)
  }, [history])

  const lightProps = useMemo(() => ({
    challenges,
    solvedStatus,
    prefetch,
    navigateToDoor
  }), [challenges, solvedStatus, prefetch, navigateToDoor])

  return (
    <main>
      {currentTime >= getRaffleEnd() && (
        <div className="mx-auto text-center p-4 w-10/12 max-w-[40rem]">
          NB!<br />
          Konkurransen er over for i år, men du kan fortsette å svare på luker
          og skrive innlegg til vi skrur av tjenesten en gang i løpet av januar.
        </div>
      )}

      {/* Visibility toggle done with media queries in CSS */}
      <LightsDesktop {...lightProps} />
      <LightsMobile {...lightProps} />

      <Footer />
    </main>
  )
}

export default Doors

import { get } from "lodash"
import { useCallback, useMemo } from "react"

import { useChallenges, usePrefetchLikes, usePrefetchPosts, useSolvedStatus } from "../api/requests"
import Footer from "../components/Footer"
import LightsDesktop from "../components/Lights/LightsDesktop"
import LightsMobile from "../components/Lights/LightsMobile"


const Doors = () => {
  const { data: challenges } = useChallenges()
  const { data: solvedStatus } = useSolvedStatus()
  const prefetchPosts = usePrefetchPosts()
  const prefetchLikes = usePrefetchLikes()


  const prefetch = useCallback((door: number) => {
    prefetchLikes()

    if (get(solvedStatus, door))
      prefetchPosts(door)
  }, [prefetchLikes, prefetchPosts, solvedStatus])

  const lightProps = useMemo(() => ({
    solvedStatus,
    prefetch,
    challenges
  }), [solvedStatus, prefetch, challenges])

  return (
    <main>
      <LightsDesktop {...lightProps} className="hidden md:block" />
      <LightsMobile {...lightProps} className="md:hidden" />

      <Footer />
    </main>
  )
}

export default Doors

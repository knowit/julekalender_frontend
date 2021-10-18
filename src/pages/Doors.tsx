import { get } from "lodash"

import { usePrefetchChallenge, usePrefetchLikes, usePrefetchPosts, useSolvedStatus } from "../api/requests"
import Footer from "../components/Footer"
import LightsDesktop from "../components/Lights/LightsDesktop"
import LightsMobile from "../components/Lights/LightsMobile"


const Doors = () => {
  const { data: solvedStatus } = useSolvedStatus()
  const prefetchChallenge = usePrefetchChallenge()
  const prefetchPosts = usePrefetchPosts()
  const prefetchLikes = usePrefetchLikes()


  const prefetch = (door: number) => {
    prefetchChallenge(door)
    prefetchLikes()

    if (get(solvedStatus, door))
      prefetchPosts(door)
  }

  return (
    <>
      <main>
        <LightsDesktop solvedStatus={solvedStatus} prefetch={prefetch} className="hidden md:block" />
        <LightsMobile solvedStatus={solvedStatus} prefetch={prefetch} className="md:hidden" />
      </main>
      <Footer />
    </>
  )
}

export default Doors

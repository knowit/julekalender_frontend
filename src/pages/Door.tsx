import { FC, useContext } from "react"
import { useParams } from "react-router-dom"

import Light from "../components/Light"
import PostsSection from "../components/Posts/PostsSection"
import Challenge from "../components/Door/Challenge"
import { AuthContext } from "../AuthContext"
import useIsDoorSolved from "../hooks/useIsDoorSolved"
import { useChallenge } from "../api/requests"
import ServiceMessageAlert from "../components/Door/ServiceMessageAlert"

import Page from "./Page"


const Door: FC = () => {
  const { door: doorString } = useParams<{ door: string }>()
  const door = parseInt(doorString)

  const { data: challenge } = useChallenge(door)

  const { isFullyAuthenticated } = useContext(AuthContext)
  const solved = useIsDoorSolved(door)

  return (
    <Page className="relative">
      <div className="space-y-door-elements">
        <Challenge challenge={challenge} />
        {isFullyAuthenticated && solved && <PostsSection door={door} />}
      </div>
      <Light
        door={door}
        solved={solved}
        className="w-20 lg:w-28 float-right absolute right-8 top-10 lg:top-12"
      />
      <ServiceMessageAlert
        door={door}
        className="w-10 h-10 md:w-12 md:h-12 absolute left-12 md:left-20 top-16"
      />
    </Page>
  )
}

export default Door

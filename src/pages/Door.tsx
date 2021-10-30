import { FC, useContext } from "react"
import { useParams } from "react-router-dom"

import Light from "../components/Light"
import PostsSection from "../components/Posts/PostsSection"
import Challenge from "../components/Door/Challenge"
import { AuthContext } from "../AuthContext"
import useIsDoorSolved from "../hooks/useIsDoorSolved"
import { useChallenge } from "../api/requests"

import Page from "./Page"


const Door: FC = () => {
  const { door: doorString } = useParams<Record<string, string>>()
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
        className="w-20 lg:w-28 float-right mr-8 mt-10 lg:mt-12 absolute right-0 top-0"
      />
    </Page>
  )
}

export default Door

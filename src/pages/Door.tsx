import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Light from "../components/Light"
import PostsSection from "../components/Posts/PostsSection"
import useRequestsAndAuth from "../hooks/useRequestsAndAuth"
import Challenge from "../components/Door/Challenge"

import Page from "./Page"


const Door: FC = () => {
  const { doorNumber } = useParams<Record<string, string>>()
  const { isAuthenticated, fetchSolvedStatus } = useRequestsAndAuth()
  const [isDoorSolved, setIsDoorSolved] = useState(false)
  const [fubar, setError] = useState<Error>()

  useEffect(() => {
    if (!isAuthenticated) return

    fetchSolvedStatus()
      .then((response) => setIsDoorSolved(response.data[doorNumber]))
      .catch((e) => setError(e))
  }, [isAuthenticated, fetchSolvedStatus, setIsDoorSolved, doorNumber])

  if (fubar !== undefined) {
    return (<><h1>Ooops...</h1><span>{fubar.message}</span></>)
  }

  return (
    <Page className="relative">
      <Light
        nr={parseInt(doorNumber)}
        solved={isDoorSolved}
        className="w-20 lg:w-28 float-right mr-8 mt-10 lg:mt-12 absolute right-0 top-0"
      />
      <div className="space-y-door-elements">
        <Challenge
          doorNumber={doorNumber}
          isDoorSolved={isDoorSolved}
          setIsDoorSolved={setIsDoorSolved}
        />
        {isAuthenticated && isDoorSolved && <PostsSection doorNumber={doorNumber} />}
      </div>
    </Page>
  )
}

export default Door

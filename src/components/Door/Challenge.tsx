import { FC, ReactNode, useEffect, useState } from "react"
import { isNil } from "lodash"

import useHighlightJs from "../../hooks/useHighlightJs"
import useRequestsAndAuth from "../../hooks/useRequestsAndAuth"
import { Challenge as ChallengeType } from "../../api/Challenge"

import Input from "./Input"


type ChallengeProps = {
  doorNumber: string
  isDoorSolved: boolean
  setIsDoorSolved: (value: boolean) => void
  preamble?: ReactNode
}

const Challenge: FC<ChallengeProps> = ({ doorNumber, isDoorSolved, setIsDoorSolved, preamble }) => {
  const { fetchChallenge, createSolution } = useRequestsAndAuth()
  const [challenge, setChallenge] = useState<ChallengeType>()
  const challengeContentRef = useHighlightJs<HTMLDivElement>()
  const [attemptCount, setAttemptCount] = useState(0)
  const [isWaitingForSolutionResponse, setIsWaitingForSolutionResponse] = useState(false)
  const [fubar, setError] = useState<Error>()

  useEffect(() => {
    fetchChallenge(doorNumber)
      .then((response) => {
        setError(undefined)
        setChallenge(response.data)
      })
      .catch((e) => setError(e))
  }, [fetchChallenge, doorNumber])

  const submitAnswer = (answer: string) => {
    if (isNil(doorNumber)) return

    setIsWaitingForSolutionResponse(true)

    // TODO: Handle rate limiting
    createSolution(doorNumber, answer)
      .then((response) => {
        setIsWaitingForSolutionResponse(false)
        setIsDoorSolved(response.data.solved)
        setAttemptCount((count) => count + 1)
      })
      .catch((error) => setError(error))
  }

  if (fubar !== undefined) {
    return <><h1>Ooops...</h1><pre>{fubar.message}</pre></>
  }

  if (!challenge) return null

  return (
    <div className="pb-8 pt-14 px-8 md:px-12 mx-4 md:mx-8 bg-gray-100 text-gray-700 rounded-md">
      {preamble}
      <div className="space-y-4 md:space-y-6 lg:space-y-12">
        <div className="text-center pb-4 md:pb-6 border-b-2">
          <h1 className="text-4xl font-semibold">{challenge.title}</h1>
          <p className="mt-1"><em>Av {challenge.author}</em></p>
        </div>
        <div
          className="mx-auto prose prose-sm md:prose max-w-none md:max-w-none break-words"
          ref={challengeContentRef}
          dangerouslySetInnerHTML={{ __html: challenge.content }}
        />
      </div>
      <Input
        doorNumber={doorNumber}
        isDoorSolved={isDoorSolved}
        isFirstSubmit={attemptCount === 0}
        isWaitingForSolutionResponse={isWaitingForSolutionResponse}
        onSubmit={submitAnswer}
      />
    </div>
  )
}

export default Challenge

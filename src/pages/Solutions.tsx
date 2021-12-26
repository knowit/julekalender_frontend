import { compact, isEmpty, map, values } from "lodash"

import { useChallenges } from "../api/requests"
import useCurrentTime from "../hooks/useCurrentTime"
import { getRaffleEnd } from "../utils"

import Page from "./Page"


const Solutions = () => {
  const { data: challenges, isLoading } = useChallenges()
  const currentTime = useCurrentTime()

  if (currentTime < getRaffleEnd()) {
    return (
      <div>Hva gjør du her?? Gå og løs lukene!</div>
    )
  }

  if (isLoading) return null

  return (
    <Page className="py-12 px-8 md:px-12 mx-4 md:mx-8 bg-gray-100 text-gray-700 rounded-md space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Løsninger</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 justify-items-center">
        {isEmpty(challenges)
          ? <div>Ingenting her!</div>
          : map(compact(values(challenges)), (challenge) => (
            <div className="grid gap-1 justify-items-center">
              <div className="tracking-wide">Luke {challenge.door} <span className="text-gray-700 text-opacity-40">&mdash;</span> <em>{challenge.title}</em></div>
              <div className="font-mono font-semibold text-lg max-w-full overflow-x-scroll">{challenge.answer}</div>
            </div>
          ))
        }
      </div>
    </Page>
  )
}

export default Solutions

import clsx, { ClassValue } from "clsx"
import { get, has, isNil } from "lodash"

import { ChallengeDict, SolvedStatus } from "../../api/Challenge"


export type LightsProps = {
  solvedStatus: SolvedStatus | undefined
  challenges: ChallengeDict | undefined
  prefetch: (door: number) => void
  className?: ClassValue
}

export const getBulbClass = (door: number, solvedStatus: SolvedStatus | undefined, challenges: ChallengeDict | undefined) => (
  clsx("fill-current", get(solvedStatus, door)
    ? "text-lightbulb-green"
    : isNil(challenges) || has(challenges, door)
      ? "text-lightbulb-yellow"
      : "text-lightbulb-dim"
  )
)

export const getTextClass = (door: number, challenges: ChallengeDict | undefined) => (
  isNil(challenges) || has(challenges, door) ? "text-gray-800" : "text-gray-800 opacity-25"
)

export const getLinkDateDependentProps = (door: number, challenges: ChallengeDict | undefined, prefetch: (door: number) => void) => (
  has(challenges, door)
    ? { to: `/luke/${door}`, onMouseEnter: () => prefetch(door) }
    : { to: "/", className: "cursor-not-allowed" }
)

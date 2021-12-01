import clsx, { ClassValue } from "clsx"
import { get, has, isNil } from "lodash"

import { ChallengeDict, SolvedStatus } from "../../api/Challenge"


type LightsUtilsBaseProps = {
  solvedStatus: SolvedStatus | undefined
  challenges: ChallengeDict | undefined
  prefetch: (door: number) => void
  navigateToDoor: (door: number) => void
}

type LightsUtilsProps = LightsUtilsBaseProps & {
  door: number
}

export type LightsProps = LightsUtilsBaseProps & {
  className?: ClassValue
}

export const getBulbProps = ({ door, solvedStatus, challenges }: LightsUtilsProps) => ({
  className:
    clsx("fill-current", get(solvedStatus, door)
      ? "text-lightbulb-green"
      : isNil(challenges) || !has(challenges, door)
        ? "text-lightbulb-dim"
        : "text-lightbulb-yellow"
    )
})

export const getTextProps = ({ door, challenges }: LightsUtilsProps) => ({
  className: clsx("text-gray-800", (isNil(challenges) || !has(challenges, door)) && "opacity-25" ),
  fontFamily: "'Arial'"
})

export const getLinkProps = ({ door, challenges, prefetch, navigateToDoor }: LightsUtilsProps) => ( {
  tabIndex: door + 3,
  title: `Luke ${door}`,
  ...(
    has(challenges, door)
      ? { to: `/luke/${door}`, onMouseEnter: () => prefetch(door) /*, onClick: () => navigateToDoor(door) */ }
      : { to: "/", className: "cursor-not-allowed" }
  )
})

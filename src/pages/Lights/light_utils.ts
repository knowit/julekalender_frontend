import clsx from "clsx"
import { get } from "lodash"

import { SolvedStatus } from "../../api/Challenge"
import { beforeDoorDate2020 } from "../../utils"


export type LightsProps = {
  solvedStatus: SolvedStatus | undefined
  prefetch: (door: number) => void
}

export const getBulbClass = (door: number, solvedStatus: SolvedStatus | undefined) => (
  clsx("fill-current", get(solvedStatus, door)
    ? "text-lightbulb-green"
    : beforeDoorDate2020(door)
      ? "text-lightbulb-dim"
      : "text-lightbulb-yellow"
  )
)

export const getTextClass = (door: number) => (
  beforeDoorDate2020(door) ? "text-gray-800 opacity-25" : "text-gray-800"
)

export const getLinkDateDependentProps = (door: number, prefetch: (door: number) => void) => (
  beforeDoorDate2020(door)
    ? { to: "/", className: "cursor-not-allowed" }
    : { to: `/luke/${door}`, onMouseEnter: () => prefetch(door) }
)

import { FC, ReactElement, useEffect, useState } from "react"
import { map, reduce, upperFirst } from "lodash"

import { numberString } from "../utils"
import useRequestsAndAuth from "../hooks/useRequestsAndAuth"


type LeaderboardWithPosition = Array<[number, Array<{ username: string, position: number }>]>

type LeaderBoardContentProps = {
  CloseButton?: ReactElement
}

const LeaderBoardContent: FC<LeaderBoardContentProps> = () => {
  const { fetchLeaderboard } = useRequestsAndAuth()
  const [leaderboard, setLeaderboard] = useState<LeaderboardWithPosition>()

  useEffect(() => {
    fetchLeaderboard()
      .then((response) => setLeaderboard(
        reduce(response.data, (list, [solvedCount, usernames]) => (
          [
            ...list,
            [
              solvedCount,
              map(usernames, (username, i) => ({
                username,
                position: reduce(list, (sum, [_, entries]) => sum + entries.length, 0) + i + 1
              }))
            ]
          ]
        ), [] as LeaderboardWithPosition)))
  }, [fetchLeaderboard])

  return (<>
    {map(leaderboard, ([solvedCount, entries]) =>
      <div key={solvedCount}>
        <h3 className="sticky top-0 py-1 bg-lightbulb-green rounded-md -space-y-1" key={solvedCount} >
          <div className="text-lg font-semibold tracking-wide">
            {upperFirst(numberString(solvedCount))} løst{solvedCount > 1 && "e"}
          </div>
          <div className="text-gray-200 text-opacity-80 text-sm">
            {numberString(entries.length, true)} snil{entries.length > 1 ? "le" : "t"} barn
          </div>
        </h3>
        <div className="pt-2 pb-4 space-y-1">
          {map(entries, ({ username, position }) =>
            <p key={username}>
              <span className="text-gray-200 text-opacity-40 text-xs tracking-wide">{position}.</span>
              &nbsp;{username}
            </p>)}
        </div>
      </div>
    )}
  </>)
}

export default LeaderBoardContent

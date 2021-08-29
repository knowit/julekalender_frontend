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
        reduce(response.data, (list, [solvedCount, usernames]) =>
          list.length <= 0
            ? [[solvedCount, map(usernames, (username, i) => ({ username, position: i + 1 }))]]
            : [
              ...list,
              [solvedCount, map(usernames, (username, i) => ({ username, position: reduce(list, (sum, [_, entries]) => sum + entries.length, 0) + i + 1 }))]
            ]
        , [] as LeaderboardWithPosition)))
  }, [fetchLeaderboard])

  return (<>
    {map(leaderboard, ([solvedCount, entries]) =>
      <div key={solvedCount}>
        <h3 className="sticky top-0 py-1 bg-lightbulb-green rounded-md text-md tracking-wide" key={solvedCount} >
          <span className="font-semibold">{upperFirst(numberString(solvedCount))} løst{solvedCount > 1 && "e"}</span>
          &nbsp;&mdash;&nbsp;
          <span className="text-gray-200 text-opacity-80">{numberString(entries.length, true)} snil{entries.length > 1 ? "le" : "t"} barn</span>
        </h3>
        <div className="pt-2 pb-4 space-y-1">
          {map(entries, ({ username, position }) => <p key={username}><span className="text-gray-200 text-opacity-40">{position}.</span>&nbsp;{username}</p>)}
        </div>
      </div>
    )}
  </>)
}

export default LeaderBoardContent

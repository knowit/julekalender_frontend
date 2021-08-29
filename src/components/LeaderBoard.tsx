import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Transition } from "@headlessui/react"
import { map, reduce, upperFirst } from "lodash"

import useRequestsAndAuth from "../hooks/useRequestsAndAuth"
import useOnClickOutside from "../hooks/useOnClickOutside"
import { numberString } from "../utils"

import { ReactComponent as Flourish } from "./svg/pointsdecor.svg"
import { ReactComponent as Close } from "./svg/close.svg"


type LeaderboardWithPosition = Array<[number, Array<{ username: string, position: number }>]>

type LeaderBoardProps = {
  hidden: boolean
  closeHandler: () => void
}

const LeaderBoard: FC<LeaderBoardProps> = ({ hidden, closeHandler }) => {
  const { fetchLeaderboard } = useRequestsAndAuth()
  const [leaderboard, setLeaderboard] = useState<LeaderboardWithPosition>()
  const clickableLeaderboardRef = useRef<HTMLDivElement>(null)
  const [hiddenTransitioning, setHiddenTransitioning] = useState(false)

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

  const closeHandlerWithTransition = useCallback(() => {
    setHiddenTransitioning(true)
    setTimeout(() => {
      setHiddenTransitioning(false)
      closeHandler()
    }, 300)
  }, [closeHandler])

  useOnClickOutside(clickableLeaderboardRef, useCallback(() => {
    if (!clickableLeaderboardRef.current) return

    closeHandlerWithTransition()
  }, [closeHandlerWithTransition]))

  if (!leaderboard) return null

  const closeBoard = () => {
    closeHandlerWithTransition()
  }

  if (hidden && !hiddenTransitioning) return null

  return (
    <aside className="absolute top-0 right-0 pt-14 w-full sm:w-[25.5rem] sm:pr-6 overflow-hidden pointer-events-none">
      <Transition
        appear={true}
        show={!hiddenTransitioning}
        enter="transition duration-300"
        enterFrom="translate-x-full sm:translate-x-[calc(100%+6rem)]"
        enterTo="translate-x-0"
        leave="transition duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full sm:translate-x-[calc(100%+6rem)]"
      >
        <div className="bg-leaderboard-green relative p-4 rounded-md sm:rounded-xl pointer-events-auto" ref={clickableLeaderboardRef} >
          <Close className="fill-current absolute top-0 right-0 m-2 cursor-pointer" onClick={closeBoard}/>
          <div className="h-24 pt-2 text-2xl text-center">
            <h2>Snille barn</h2>
            <Flourish className="-mt-8 h-20 w-full transform rotate-2" />
          </div>
          <div className="h-96 xl:h-192 text-center overflow-y-auto">
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
          </div>
        </div>
      </Transition>
    </aside>
  )
}

export default LeaderBoard

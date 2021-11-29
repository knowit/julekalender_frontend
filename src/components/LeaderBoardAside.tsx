import { FC, useCallback, useRef, useState } from "react"
import { Transition } from "@headlessui/react"

import useOnClickOutside from "../hooks/useOnClickOutside"

import { ReactComponent as Flourish } from "./svg/pointsdecor.svg"
import { ReactComponent as Close } from "./svg/close.svg"
import LeaderBoardContent from "./LeaderboardContent"


type LeaderBoardAsideProps = {
  hidden: boolean
  closeHandler: () => void
}

const LeaderBoardAside: FC<LeaderBoardAsideProps> = ({ hidden, closeHandler }) => {
  const clickableLeaderboardRef = useRef<HTMLDivElement>(null)
  const [hiddenTransitioning, setHiddenTransitioning] = useState(false)

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

  const closeBoard = () => {
    closeHandlerWithTransition()
  }

  if (hidden && !hiddenTransitioning) return null

  return (
    <aside className="z-20 absolute top-0 right-0 pt-14 w-full sm:w-[25.5rem] sm:pr-6 overflow-hidden pointer-events-none">
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
          <Close className="fill-current absolute top-0 right-0 m-2 cursor-pointer" onClick={closeBoard} />
          <div className="h-24 pt-2 text-2xl text-center">
            <h2>Snille barn</h2>
            <Flourish className="-mt-8 h-20 w-full transform rotate-2" />
          </div>
          <div className="h-96 xl:h-192 text-center overflow-y-auto">
            <LeaderBoardContent />
          </div>
        </div>
      </Transition>
    </aside>
  )
}

export default LeaderBoardAside

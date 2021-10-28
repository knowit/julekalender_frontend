import { FC } from "react"
import { Link } from "react-router-dom"
import { FaLock } from "react-icons/fa"

import { ReactComponent as Logo } from "../img/knowitlogo.svg"
import { useIsAdmin } from "../hooks/useIsAdmin"
import { usePrefetchLeaderboard } from "../api/requests"

import LoginButton from "./LoginButton"
import Button from "./Button"
import useHasUnresolvedServiceMessage from "../hooks/useHasUnresolvedServiceMessage"


type HeaderProps = {
  setLeaderboardHidden: (state: boolean) => void
}

const Header: FC<HeaderProps> = ({ setLeaderboardHidden }) => {
  const isAdmin = useIsAdmin()
  const hasUnresolvedServiceMessage = useHasUnresolvedServiceMessage()
  const prefetchLeaderboard = usePrefetchLeaderboard()

  return (
    <header>
      <nav className="p-4">
        <a className="inline-block float-left" href="https://www.knowit.no/" target="_blank" rel="noopener noreferrer" tabIndex={1}>
          <Logo className="h-7 md:h-10 fill-current" />
        </a>
        <div className="float-right space-x-2 sm:space-x-6 h-10 mt-0.5 md:mt-1">
          {isAdmin && (
            <>
              <Link to="/admin" title="Super secret admin pages">
                <Button className="hidden sm:inline">Admin page</Button>
                <Button className="sm:hidden"><FaLock /></Button>
              </Link>
            </>
          )}

          <Link className="relative" to="/service_messages" tabIndex={3}>
            <Button>Driftsmeldinger</Button>
            {hasUnresolvedServiceMessage && <span className="absolute top-[-.2rem] right-[-.8rem] w-2 h-2 mr-2 bg-red-600 rounded-full" />}
          </Link>

          {/* Link to separate page on mobile */}
          <Button className="hidden sm:inline" onMouseEnter={prefetchLeaderboard} onClick={() => setLeaderboardHidden(false)} tabIndex={2}>Ledertavle</Button>
          <Link className="sm:hidden" to="/leaderboard" tabIndex={2}>
            <Button onMouseEnter={prefetchLeaderboard}>Ledertavle</Button>
          </Link>

          <LoginButton />
        </div>
      </nav>
    </header>
  )
}

export default Header

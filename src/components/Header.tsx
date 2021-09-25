import { FC, useCallback } from "react"
import { Link } from "react-router-dom"
import { FaLock } from "react-icons/fa"
import { useQueryClient } from "react-query"
import { merge } from "lodash"

import { ReactComponent as Logo } from "../img/knowitlogo.svg"
import { Whoami } from "../api/User"
import { useIsAdmin } from "../hooks/useIsAdmin"
import { usePrefetchLeaderboard } from "../api/requests"

import LoginButton from "./LoginButton"
import Button from "./Button"


type HeaderProps = {
  setLeaderboardHidden: (state: boolean) => void
}

const Header: FC<HeaderProps> = ({ setLeaderboardHidden }) => {
  const isAdmin = useIsAdmin()
  const queryClient = useQueryClient()
  const prefetchLeaderboard = usePrefetchLeaderboard()

  const isLocalhost = window.location.hostname === "localhost"

  const toggleAdmin = useCallback(() => {
    queryClient.setQueryData(
      ["whoami"],
      (whoami: Whoami | undefined) => merge(whoami, { is_admin: !isAdmin })
    )
  }, [queryClient, isAdmin])

  return (
    <header>
      <nav className="p-4">
        <a className="inline-block float-left" href="https://www.knowit.no/" target="_blank" rel="noopener noreferrer" tabIndex={1}>
          <Logo className="h-7 md:h-10 fill-current" />
        </a>
        <div className="float-right space-x-2 sm:space-x-6 h-10 mt-0.5 md:mt-1">
          {isAdmin && <>
            <span className="text-green-500 uppercase tracking-wider hidden sm:inline">You are admin!</span>
            <Link to="/admin" title="Super secret admin pages">
              <Button className="hidden sm:inline">Admin page</Button>
              <Button className="sm:hidden"><FaLock /></Button>
            </Link>
          </>}

          {isLocalhost && <Button className="hidden sm:inline" onClick={toggleAdmin}>Toggle admin</Button>}
          {isLocalhost && <Button className="sm:hidden" onClick={toggleAdmin}>Admin</Button>}

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

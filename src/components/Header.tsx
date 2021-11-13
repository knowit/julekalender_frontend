import { FC } from "react"
import { Link } from "react-router-dom"
import { FaExclamationTriangle, FaLock } from "react-icons/fa"
import { every, isEmpty, some } from "lodash"
import clsx from "clsx"

import { ReactComponent as Logo } from "../img/knowitlogo.svg"
import { useIsAdmin } from "../hooks/useIsAdmin"
import { usePrefetchLeaderboard, useServiceMessages } from "../api/requests"

import LoginButton from "./LoginButton"
import Button from "./Button"


const ServiceMessageBadge = () => {
  const { data: serviceMessages } = useServiceMessages()

  // No unresolved service messages, no badge shown
  if (every(serviceMessages, { resolved: true })) return null

  const classes = "absolute w-full h-full bg-red-600 rounded-full"

  return (
    <div className="absolute top-[-.2rem] right-[-.3rem] w-2 h-2">
      <span className={classes} />

      {/* Animate badge if there are any general service messages */}
      {some(serviceMessages, { resolved: false, door: null }) && <span className={clsx(classes, "animate-ping")} />}
    </div>
  )
}

type HeaderProps = {
  setLeaderboardHidden: (state: boolean) => void
}

const Header: FC<HeaderProps> = ({ setLeaderboardHidden }) => {
  const isAdmin = useIsAdmin()
  const { data: serviceMessages } = useServiceMessages()
  const prefetchLeaderboard = usePrefetchLeaderboard()

  return (
    <header>
      <nav className="p-4">
        <a className="inline-block float-left" href="https://www.knowit.no/" target="_blank" rel="noopener noreferrer" tabIndex={1}>
          <Logo className="h-7 md:h-10 fill-current" />
        </a>
        <div className="float-right space-x-4 md:space-x-6 h-10 mt-0.5 md:mt-1">
          {isAdmin && (
            <>
              <Link to="/admin" title="Super secret admin pages">
                <Button className="hidden md:inline">Adminside</Button>
                <Button className="md:hidden"><FaLock /></Button>
              </Link>
            </>
          )}

          {!isEmpty(serviceMessages) && (
            // Only show link to service messages if there are any
            <Link className="relative" to="/service_messages" tabIndex={3}>
              <Button className="hidden md:inline">Driftsmeldinger</Button>
              <Button className="md:hidden"><FaExclamationTriangle /></Button>
              <ServiceMessageBadge />
            </Link>
          )}

          {/* Link to separate page on mobile */}
          <Button className="hidden md:inline" onMouseEnter={prefetchLeaderboard} onClick={() => setLeaderboardHidden(false)} tabIndex={2}>Ledertavle</Button>
          <Link className="md:hidden" to="/leaderboard" tabIndex={2}>
            <Button onMouseEnter={prefetchLeaderboard}>Ledertavle</Button>
          </Link>

          <LoginButton />
        </div>
      </nav>
    </header>
  )
}

export default Header

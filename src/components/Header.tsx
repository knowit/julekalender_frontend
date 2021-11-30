import { FC } from "react"
import { Link } from "react-router-dom"
import { every, isEmpty, some } from "lodash"
import clsx from "clsx"

import { ReactComponent as Logo } from "../img/knowitlogo.svg"
import { useIsAdmin } from "../hooks/useIsAdmin"
import { usePrefetchLeaderboard, useServiceMessages } from "../api/requests"

import SignInButton from "./SignInButton"
import Button from "./Button"
import SignOutButton from "./SignOutButton"


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
  className?: string
}

const Header: FC<HeaderProps> = ({ setLeaderboardHidden, className }) => {
  const isAdmin = useIsAdmin()
  const { data: serviceMessages } = useServiceMessages()
  const prefetchLeaderboard = usePrefetchLeaderboard()

  return (
    <header>
      <nav className="p-4 flex flex-cols space-x-2 md:space-x-8">
        <a className="inline-block" href="https://www.knowit.no/" target="_blank" rel="noopener noreferrer" tabIndex={1}>
          <Logo className="h-7 md:h-10 fill-current" />
        </a>
        {/* <div className="float-right h-10 mt-0.5 md:mt-1 flex flex-row-reverse flex-wrap space-x-reverse space-x-2 md:space-x-8 space-y-reverse space-y-2"> */}
        <div
          className={clsx(
            "float-right",
            "mt-0.5",
            "md:mt-1",
            "w-full",
            "flex",
            "flex-col",
            "gap-2",
            "md:gap-8",
            "md:flex-row-reverse",
            "children:flex",
            "children:flex-row-reverse",
            "children:gap-4",
            "md:children:gap-8",
            "children:items-center",
            "children:flex-wrap",
            className
          )}
        >
          <div>
            <SignOutButton />
            <SignInButton />
          </div>

          <div>
            {/* Link to separate page on mobile */}
            <Button className="hidden lg:inline" onMouseEnter={prefetchLeaderboard} onClick={() => setLeaderboardHidden(false)} tabIndex={2}>Ledertavle</Button>
            <Link className="lg:hidden" to="/leaderboard" tabIndex={2}>
              <Button onMouseEnter={prefetchLeaderboard}>Ledertavle</Button>
            </Link>

            {!isEmpty(serviceMessages) && (
              // Only show link to service messages if there are any
              <Link className="relative" to="/service_messages" tabIndex={3}>
                <Button content="Driftsmeldinger" />
                <ServiceMessageBadge />
              </Link>
            )}

            {isAdmin && (
              <>
                <Link to="/admin" title="Super secret admin pages">
                  <Button className="">Adminside</Button>
                  {/* <Button className="md:hidden"><FaLock /></Button> */}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

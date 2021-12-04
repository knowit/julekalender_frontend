import { lazy, memo, Suspense, useCallback, useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { map, range } from "lodash"
import { FaCogs } from "react-icons/fa"
import clsx from "clsx"

import Gdpr from "./pages/Gdpr"
import Door from "./pages/Door"
import Header from "./components/Header"
import StarBackground from "./components/StarBackground"
import LeaderBoardAside from "./components/LeaderBoardAside"
import Doors from "./pages/Doors"
import Leaderboard from "./pages/Leaderboard"
import ServiceMessages from "./pages/ServiceMessages"
import BackgroundPauseButton from "./components/BackgroundPauseButton"
import Page from "./pages/Page"


const LazyAdmin = () => {
  const Component = lazy(() => import("./pages/Admin"))

  const Fallback = (
    <Page>
      <FaCogs
        className={clsx(
          "fixed",
          "top-1/2",
          "left-1/2",
          "w-32",
          "h-32",
          "translate-x-[-50%]",
          "translate-y-[-50%]",
          "text-lightbulb-yellow",
          "text-opacity-70",
          "animate-pulse"
        )}
      />
    </Page>
  )

  return (
    <Suspense fallback={Fallback}>
      <Component />
    </Suspense>
  )
}

const LazyUser = () => {
  const Component = lazy(() => import("./pages/User"))

  return (
    <Suspense fallback={<Page />}>
      <Component />
    </Suspense>
  )
}

const App = () => {
  const [leaderboardHidden, setLeaderboardHidden] = useState(true)

  // Match door 1-24 only
  const doorPaths = map(range(1, 25), (door) => `/luke/:door(${door})`)

  const [bgAnimationPaused, setBgAnimationPaused] = useState(localStorage.getItem("stars-paused") === "true")
  const togglePaused = useCallback(() => {
    setBgAnimationPaused((state) => {
      localStorage.setItem("stars-paused", state ? "false" : "true")
      return !state
    })
  }, [setBgAnimationPaused])

  return (<>
    <StarBackground paused={bgAnimationPaused} />
    <LeaderBoardAside
      hidden={leaderboardHidden}
      closeHandler={() => setLeaderboardHidden(true)}
    />

    <div id="content-container" className="relative min-h-[calc(100vh+1.5rem)] h-[calc(100%+1.5rem)]">
      <Header className="-mb-4" setLeaderboardHidden={setLeaderboardHidden} />

      <Switch>
        <Route exact path="/" component={Doors} />
        <Route path={doorPaths} component={Door} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/gdpr" component={Gdpr} />
        <Route path="/service_messages" component={ServiceMessages} />

        <Route path="/admin" component={LazyAdmin} />
        <Route path="/users" component={LazyUser} />

        {/* 404? - Route to main view */}
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>

      <BackgroundPauseButton paused={bgAnimationPaused} onTogglePaused={togglePaused} />
    </div>
  </>)
}

export default memo(App)

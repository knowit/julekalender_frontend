import { useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { map, range } from "lodash"

import Admin from "./pages/Admin"
import Gdpr from "./pages/Gdpr"
import Door from "./pages/Door"
import Header from "./components/Header"
import StarBackground from "./effects/StarBackground"
import LeaderBoard from "./components/LeaderBoard"
import Doors from "./pages/Doors"
import AnimationToggle from "./components/AnimationToggle"
import useRequestsAndAuth from "./hooks/useRequestsAndAuth"


const App = () => {
  const { isAdmin } = useRequestsAndAuth()
  const [leaderboardHidden, setLeaderboardHidden] = useState(true)
  const [isLeaderboardHiding, setIsLeaderboardHiding] = useState(false)
  const [backgroundPaused, setBackgroundPaused] = useState<boolean>(localStorage.getItem("bgPaused") === "true")

  // Match door 1-24 only
  const doorPaths = map(range(1, 25), (door) => `/luke/:doorNumber(${door})`)

  return (<>
    <StarBackground paused={backgroundPaused} />
    <div className="text-gray-200">
      <div className="pb-16">
        <Header isLeaderboardHiding={isLeaderboardHiding} setLeaderboardHidden={setLeaderboardHidden} />
        <Switch>
          <Route exact path="/" component={Doors} />
          <Route path={isAdmin ? "/luke/:doorNumber" : doorPaths} component={Door} />
          <Route path="/gdpr" component={Gdpr} />
          <Route path="/admin" component={Admin} />

          {/* 404? - Route to main view */}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
      <LeaderBoard
        hidden={leaderboardHidden}
        setIsLeaderboardHiding={setIsLeaderboardHiding}
        closeHandler={() => setLeaderboardHidden(true)}
      />
    </div>
    <AnimationToggle backgroundPaused={backgroundPaused} setBackgroundPaused={setBackgroundPaused} />
  </>)
}

export default App

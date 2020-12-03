import React, { useCallback, useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import './App.css';
import Admin from './pages/Admin';
import Gdpr from './pages/Gdpr';
import Door from './pages/Door';
import Header from './components/Header';
import StarBackground from './effects/stars'
import LeaderBoard from './components/LeaderBoard';
import Doors from './pages/Doors'
import AnimationToggle from './components/AnimationToggle';
import useRequestsAndAuth from './hooks/useRequestsAndAuth';


function App() {
  const { isAdmin } = useRequestsAndAuth();
  const [leaderboardHidden, setLeaderboardHidden] = useState(true);
  const [isLeaderboardHiding, setIsLeaderboardHiding] = useState(false);
  const [backgroundPaused, setBackgroundPaused] = useState<boolean>(localStorage.getItem("bgPaused") === "true");

  // Match door 1-24 only
  const doorPaths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((door) => `/luke/:doorNumber(${door})`);

  return (
    <>
      <StarBackground paused={backgroundPaused} />
      <div className="FlexContainer text-gray-200">
        <div className="pb-16">
          <Header isLeaderboardHiding={isLeaderboardHiding} setLeaderboardHidden={setLeaderboardHidden} />
          <Switch>
            <Route exact path="/">
              <Doors />
            </Route>
            <Route path={isAdmin ? '/luke/:doorNumber' : doorPaths}>
              <Door />
            </Route>
            <Route path='/gdpr'>
              <Gdpr />
            </Route>
            <Route path='/admin'>
              <Admin />
            </Route>
            {/* 404? - Route to main view*/}
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
        <LeaderBoard
          hidden={leaderboardHidden}
          setIsLeaderboardHiding={setIsLeaderboardHiding}
          closeHandler={useCallback(() => setLeaderboardHidden(true), [])}
        />
      </div>
      <AnimationToggle backgroundPaused={backgroundPaused} setBackgroundPaused={setBackgroundPaused} />
    </>
  );
}

export default App;

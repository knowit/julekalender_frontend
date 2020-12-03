import React, { useCallback, useState } from 'react';
import './App.css';
import Doors from './components/Doors'
import Footer from './components/Footer';
import StarBackground from './effects/stars'
import LeaderBoard from './components/LeaderBoard';
import Admin from './components/Admin';
import Gdpr from './components/Gdpr';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Door from './components/Door/Door';
import Header from './components/Header';
import AnimationToggle from './components/AnimationToggle';


function App() {
  const [leaderboardHidden, setLeaderboardHidden] = useState(true);
  const [isLeaderboardHiding, setIsLeaderboardHiding] = useState(false);
  const [backgroundPaused, setBackgroundPaused] = useState<boolean>(localStorage.getItem("bgPaused") === "true");

  return (
    <>
      <StarBackground paused={backgroundPaused} />
      <div className="FlexContainer text-gray-200">
        <div className="pb-16">
          <Header isLeaderboardHiding={isLeaderboardHiding} setLeaderboardHidden={setLeaderboardHidden} />
          <Switch>
            <Route exact path="/">
              <Doors />
              <Footer />
            </Route>
            {/* Match door 1-24 only*/}
            <Route path="/luke/:doorNumber(0?[1-9]|1[0-9]|2[0-4])">
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

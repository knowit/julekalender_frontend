import React, { useState } from 'react';
import './App.css';
import Doors from './components/Doors'
import Footer from './components/Footer';
import StarBackground from './effects/stars'
import LoginButton from './components/LoginButton';
import LeaderBoard from './components/LeaderBoard';
import Gdpr from './components/Gdpr';
import { ReactComponent as Logo } from './img/knowitlogo.svg';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Door from './components/Door';


function App() {
  const [leaderBoardOpen, toggleLeaderBoard] = useState(false);

  function closeLeaderBoard() {
    toggleLeaderBoard(false);
  }

  return (
    <>
      {/*TODO: Kanskje pause bakgrunn når dør åpen?*/}
      <StarBackground paused={false} />
      <div className="FlexContainer">
        <div>
          <header>
            <nav>
              <a id="knowitlogo" href="https://www.knowit.no/" target="_blank" rel="noopener noreferrer" tabIndex={1}><Logo /></a>
              <button onClick={() => toggleLeaderBoard(!leaderBoardOpen)} tabIndex={2}>LEDERTAVLE</button>
              <LoginButton />
            </nav>
          </header>
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
            {/* 404? - Route to main view*/}
            <Route>
              <Redirect to="/"/>
            </Route>
          </Switch>
        </div>
        <LeaderBoard open={leaderBoardOpen} closeHandler={closeLeaderBoard} />
      </div>
    </>
  );
}

export default App;

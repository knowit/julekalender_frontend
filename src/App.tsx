import React, { useState } from 'react';
import './App.css';
import Modal from 'react-modal';
import Doors from './components/Doors'
import Task from './components/task';
import Footer from './components/Footer';
import StarBackground from './effects/stars'
import LoginButton from './components/LoginButton';
import LeaderBoard from './components/LeaderBoard';
import { ReactComponent as Logo } from './img/knowitlogo.svg';
import {
  Switch,
  Route,
} from "react-router-dom";
import Door from './components/Door';


function App() {
  Modal.setAppElement('#root');
  const [selectedDoor, selectDoor] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [leaderBoardOpen, toggleLeaderBoard] = useState(false);

  function openDoor(doorNumber: number) {
    selectDoor(doorNumber)
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeLeaderBoard() {
    toggleLeaderBoard(false);
  }

  return (
    <>
      <StarBackground paused={modalIsOpen} />
      <div className="FlexContainer">
        <div>
          <header>
            <nav>
              <a id="knowitlogo" href="https://www.knowit.no/" target="_blank" rel="noopener noreferrer"><Logo /></a>
              <button onClick={() => toggleLeaderBoard(!leaderBoardOpen)}>LEDERTAVLE</button>
              <LoginButton />
            </nav>
          </header>
          <main>
            <Switch>
              <Route exact path="/">
                <Doors clickHandler={openDoor} />
                <Task number={selectedDoor} modalIsOpen={modalIsOpen} closeHandler={closeModal} />
              </Route>
              <Route path="/luke/:id">
                <Door />
              </Route>
              <Route>
                <Doors clickHandler={openDoor} />
              </Route>
            </Switch>
          </main>
          <Footer />
        </div>
        <LeaderBoard open={leaderBoardOpen} closeHandler={closeLeaderBoard} />
      </div>
    </>
  );
}

export default App;

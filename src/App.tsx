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
        <div className={`Wrapper ${leaderBoardOpen ? 'open' : ''}`}>
          <header>
            <nav>
              <a id="knowitlogo" href="https://www.knowit.no/" target="_blank" rel="noopener noreferrer"><Logo /></a>
              <button onClick={() => toggleLeaderBoard(!leaderBoardOpen)}>LEDERTAVLE</button>
              <LoginButton />
            </nav>
          </header>
          <main>
            <Doors clickHandler={openDoor} />
            <Task number={selectedDoor} modalIsOpen={modalIsOpen} closeHandler={closeModal} />
          </main>

          <Footer />
        </div>
        <aside className={`Leaderboard ${leaderBoardOpen ? 'open' : ''}`}>
          <LeaderBoard closeHandler={closeLeaderBoard}/>
        </aside>

      </div>
    </>
  );
}

export default App;

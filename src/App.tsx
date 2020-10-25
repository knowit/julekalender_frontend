import React, { useState } from 'react';
import './App.css';
import Modal from 'react-modal';
import Test from './components/test'
import Task from './components/task';
import Footer from './components/Footer';
import StarBackground from './effects/stars'
import LoginButton from './components/LoginButton';
import { ReactComponent as Logo } from './img/knowitlogo.svg';


function App() {
  Modal.setAppElement('#root');
  const [selectedDoor, selectDoor] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openDoor(doorNumber: number) {
    selectDoor(doorNumber)
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  return (
    <>
      <StarBackground />
      <header>
        <nav>
          <a id="knowitlogo" href="https://www.knowit.no/" target="_blank" rel="noopener noreferrer"><Logo/></a>
          <button>LEDERTAVLE</button>
          <LoginButton />
        </nav>
      </header>
      <main>
        <Test clickHandler={openDoor} />
        <Task number={selectedDoor} modalIsOpen={modalIsOpen} closeHandler={closeModal} />

      </main>
      <Footer />
    </>
  );
}

export default App;

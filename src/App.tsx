import React, { useState } from 'react';
import './App.css';
import Modal from 'react-modal';
import Test from './components/test'
import Task from './components/task';
import Footer from './components/Footer';
import StarBackground from './effects/stars'
import LoginButton from './components/LoginButton';




function App() {
  Modal.setAppElement('#root');
  const [selectedDoor, selectDoor] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openDoor(doorNumber: number) {
    selectDoor(doorNumber)
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }


  return (
    <>
      <StarBackground/>
      <header>
        <nav><button>LEDERTAVLE</button><LoginButton/></nav>
        <h1>Kodekalender 2020</h1>
        <p>Løs lukene og bli med i trekningen av en telefon eller et nettbrett!</p>
        <p>En ny luke åpnes hver dag frem til jul.</p>
      </header>
      <main>
        <Test clickHandler={openDoor}/>
        <Task number={selectedDoor} modalIsOpen={modalIsOpen} closeHandler={closeModal} />
        
      </main>
      <Footer/>
    </>
  );
}

export default App;

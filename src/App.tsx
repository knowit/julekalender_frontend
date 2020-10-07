import React, { useState } from 'react';
import './App.css';
import Modal from 'react-modal';
import Test from './components/test'
import Task from './components/task';
import StarBackground from './effects/stars'


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
        <nav><button>LEDERTAVLE</button><button>LOGG INN</button></nav>
        <h1>KNOWIT KODEKALENDER 2020</h1>
        <p>Løs lukene og bli med i trekningen av en telefon eller et nettbrett!</p>
        <p>En ny luke åpnes hver dag frem til jul.</p>
      </header>
      <main>
        <Test clickHandler={openDoor}/>
        <Task number={selectedDoor} modalIsOpen={modalIsOpen} closeHandler={closeModal} />
        
      </main>
      <footer>
        <p>Kodekalenderen er kalenderen for deg som er glad i programmering. Hver luke er en oppgave som løses best ved hjelp av kode.</p>
        <p>Lukene varierer i vanskelighetsgrad og utforming, men felles for alle er at koden til løsningen din skal resultere i et svar på en linje som systemet kan sjekke om er korrekt.</p>
        <p>Hver luke som løses er et lodd i trekningen av en telefon eller et nettbrett. Løs så mange luker som mulig for å øke vinnersjansene dine!</p>
        <p>Lukene åpnes klokken 06:00 hver dag, og du har 24 timer på på å løse oppgaven. Vinneren trekkes på nyåret og vil bli kontaktet. Lykke til og god jul!</p>
        <a href="https://www.knowit.no/karriere/systemutvikler-backend-mobil-ogeller-frontend/">Vil du jobbe med oss?</a>
      </footer>
    </>
  );
}

export default App;

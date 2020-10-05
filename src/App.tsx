import React, { useState } from 'react';
import './App.css';
import Modal from 'react-modal';
//import Task from './components/task'
import Test from './components/test'


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

 

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  return (
    <>
      <header>
        <nav>KNOWIT-LOGO HER <button>LEDERTAVLE</button><button>LOGG INN</button></nav>
        <h1>KNOWIT KODEKALENDER 2020</h1>
      </header>
      <main>
        <Test clickHandler={openDoor}/>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Task modal"
          onRequestClose={closeModal}
        >
          <h2>Luke {selectedDoor}</h2>
          <button onClick={() => closeModal()}>close</button>
          <div>1 + 1 = ?</div>
          <form>
            <input />
          </form>
        </Modal>
        
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

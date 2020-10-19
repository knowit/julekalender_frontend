import React, { CSSProperties } from 'react'
import './Task.css';
import Modal from 'react-modal';

type TaskProps = {
     number: number,
     modalIsOpen: boolean,
     closeHandler: () => void
}; 


const Task = ({ number, modalIsOpen, closeHandler }: TaskProps) => {

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

     return <Modal
     isOpen={modalIsOpen}
     style={customStyles}
     contentLabel="Task modal"
     onRequestClose={closeHandler}
     closeTimeoutMS={1500}
   >
     <h2>Luke {number}</h2>
     <button onClick={() => closeHandler()}>close</button>
     <div>1 + 1 = ?</div>
     <form>
       <input />
     </form>
   </Modal>
}     


export default Task;
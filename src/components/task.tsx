import React from 'react'
import './Task.css';
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown'

type TaskProps = {
  number: number,
  modalIsOpen: boolean,
  closeHandler: () => void
};


const Task = ({ number, modalIsOpen, closeHandler }: TaskProps) => {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  const markdown = `# Heading  
  Lorem ipsum dolor sit amet. Foo bar bacon chips crisp.`

  return <Modal
    isOpen={modalIsOpen}
    style={customStyles}
    contentLabel="Task modal"
    onRequestClose={closeHandler}
    closeTimeoutMS={1500}
  >
    <button onClick={() => closeHandler()}>close</button>
    <ReactMarkdown>{markdown}</ReactMarkdown>
    <form>
      <input />
    </form>
  </Modal>
}


export default Task;
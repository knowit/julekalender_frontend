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
      right: '50%',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  const markdown = `# Heading  
  Bacon ipsum dolor amet salami picanha swine bacon pork chop frankfurter, meatloaf biltong filet mignon shoulder. Jerky flank kielbasa tenderloin venison andouille rump sirloin pig alcatra. Jerky turducken tongue, flank pig cupim pancetta sausage shoulder filet mignon hamburger chislic burgdoggen t-bone pork loin. Tongue frankfurter biltong short loin jerky shank salami, chislic beef corned beef jowl doner.
  
  Tongue alcatra meatball, jerky short ribs flank corned beef capicola. Pancetta filet mignon ground round, ham hock landjaeger doner meatloaf brisket alcatra meatball t-bone. Salami chislic porchetta capicola. Leberkas cow beef filet mignon corned beef, kielbasa burgdoggen buffalo sausage ground round drumstick beef ribs jerky. Doner beef bacon hamburger, porchetta frankfurter tail tenderloin shoulder pork. Swine turkey biltong kielbasa ball tip. Hamburger short loin kielbasa, cow biltong sirloin prosciutto tri-tip brisket pork belly.`

  return <Modal id="task_modal"
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
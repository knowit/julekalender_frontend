import React, { FC }  from 'react'
import './Task.css';
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown'

type TaskProps = {
  number: number,
  modalIsOpen: boolean,
  closeHandler: () => void
};


const Task: FC<TaskProps> = ({ number, modalIsOpen, closeHandler }) => {

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
  
  Tongue alcatra meatball, jerky short ribs flank corned beef capicola. Pancetta filet mignon ground round, ham hock landjaeger doner meatloaf brisket alcatra meatball t-bone. Salami chislic porchetta capicola. Leberkas cow beef filet mignon corned beef, kielbasa burgdoggen buffalo sausage ground round drumstick beef ribs jerky. Doner beef bacon hamburger, porchetta frankfurter tail tenderloin shoulder pork. Swine turkey biltong kielbasa ball tip. Hamburger short loin kielbasa, cow biltong sirloin prosciutto tri-tip brisket pork belly.
  
  Tongue alcatra meatball, jerky short ribs flank corned beef capicola. Pancetta filet mignon ground round, ham hock landjaeger doner meatloaf brisket alcatra meatball t-bone. Salami chislic porchetta capicola. Leberkas cow beef filet mignon corned beef, kielbasa burgdoggen buffalo sausage ground round drumstick beef ribs jerky. Doner beef bacon hamburger, porchetta frankfurter tail tenderloin shoulder pork. Swine turkey biltong kielbasa ball tip. Hamburger short loin kielbasa, cow biltong sirloin prosciutto tri-tip brisket pork belly.
  
  Tongue alcatra meatball, jerky short ribs flank corned beef capicola. Pancetta filet mignon ground round, ham hock landjaeger doner meatloaf brisket alcatra meatball t-bone. Salami chislic porchetta capicola. Leberkas cow beef filet mignon corned beef, kielbasa burgdoggen buffalo sausage ground round drumstick beef ribs jerky. Doner beef bacon hamburger, porchetta frankfurter tail tenderloin shoulder pork. Swine turkey biltong kielbasa ball tip. Hamburger short loin kielbasa, cow biltong sirloin prosciutto tri-tip brisket pork belly.`


  
  return <Modal id="task_modal"
    isOpen={modalIsOpen}
    style={customStyles}
    contentLabel="Task modal"
    onRequestClose={closeHandler}
    closeTimeoutMS={1000}
  >
    <button title="Lukk oppgave" id="task-close" onClick={() => closeHandler()}>
      {/*X-icon svg*/}
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
      </button>
    <div id="task">
    <ReactMarkdown>{markdown}</ReactMarkdown>
    <form>
      <input placeholder="Ditt svar:"/>
      <input type="submit" value="Send inn svar" />
    </form>
    </div>
  </Modal>
}


export default Task;
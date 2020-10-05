import React from 'react'
import './Task.css';

type TaskProps = {
     number: number
}; /* could also use interface */

const Task = ({ number }: TaskProps) =>
     <dialog open={number !== 0} className="my-modal">
          <h3>Well, hello there cowboy! 👋</h3>
          <p>I'm a fancy modal.</p>
          <div className="actions">
               <button className="small ok-modal-btn">Ok!</button>
               <button className="small close-modal-btn">Close</button>
          </div>
     </dialog>;


export default Task;
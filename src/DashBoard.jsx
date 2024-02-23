import React from 'react'
import { useEffect } from 'react';
import HamBurger from './images/HamBurgerSign.svg'
import scissor from './images/scissors.svg'
import clock_history from './images/clock-history.svg'
import NotesGuidlines from './NotesGuidlines';
const DashBoard = () => {
    useEffect(() => {
        // Add class to body element when Dashboard component mounts
        document.body.classList.add('dashboard-page');
    
        // Clean up function to remove the class when the component unmounts
        return () => {
          document.body.classList.remove('dashboard-page');
        };
      }, []);
  return (
    <>
    <div className='dashBoardPage'>
      <div className="hamBurger">
        <button className='shareBtn'><img src={scissor} alt="" /> Working List</button>
      </div>

      <div className="shareNotes">
        <p>edited 7m ago</p>
        <button className='shareBtn'>share</button>
        <button className='shareBtn'><img src={clock_history} alt="" /></button>
      </div>

    </div>
    <NotesGuidlines/>
    </>
  )
}
export default DashBoard;

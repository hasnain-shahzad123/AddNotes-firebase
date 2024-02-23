import React from 'react'
import scissor from './images/scissors.svg'
import AddNotes from './AddNotes'
const NotesGuidlines = () => {
  return (
    <>
    <div className='ParentNotes'>
    <div className="NotesInstructions"><img src={scissor} alt="" /><span>Working List</span>
    <p className='InstructionNote'>
    Use this template to track your personal tasks.
    Click<span>+ New</span> to create a new task directly on this board.
    Click an existing task to add additional context or subtasks.
    </p>
    </div>
    </div>
    <AddNotes/>
    </>
  )
}
export default NotesGuidlines;

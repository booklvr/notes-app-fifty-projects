import React, { useState } from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'

const Note = ({ deleteNote, id, savedText, saveNote }) => {
  const [text, setText] = useState('')
  const [editState, setEditState] = useState(false)

  const handleBlurEvent = () => {
    saveNote(id, text)
    setEditState(false)
  }

  return (
    <div className='note'>
      <div className='tools'>
        <button className='edit'>
          <i className='fas fa-edit' onClick={() => setEditState(true)}></i>
        </button>
        <button className='delete' onClick={() => deleteNote(id)}>
          <i className='fas fa-trash-alt'></i>
        </button>
      </div>
      <div
        className={savedText && !editState ? 'main' : 'main hidden'}
        dangerouslySetInnerHTML={{ __html: marked(savedText) }}
      ></div>
      <textarea
        className={savedText && !editState ? 'hidden' : ''}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => handleBlurEvent(id, text)}
      ></textarea>
    </div>
  )
}

Note.propTypes = {
  deleteNote: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  savedText: PropTypes.string.isRequired,
  saveNote: PropTypes.func.isRequired,
}

export default Note

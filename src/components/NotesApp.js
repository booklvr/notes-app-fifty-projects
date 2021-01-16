import React, { useState, useEffect } from 'react'
import Note from './Note'
import _uniqueId from 'lodash/uniqueId'

const NotesApp = () => {
  const [notesList, setNotesList] = useState([])

  const addNote = () => {
    setNotesList(notesList.concat({ savedText: '', id: _uniqueId() }))
  }

  // <Note deleteNote={deleteNote} key={notesList.length}></Note>

  const deleteNote = (id) => {
    console.log('delete note')
    console.log(id)

    const updatedList = notesList.filter((note) => note.id !== id)
    localStorage.setItem('notes', JSON.stringify(updatedList))
    setNotesList(updatedList)
  }

  const saveNote = (id, text) => {
    console.log('handle blur event')

    const updatedList = notesList.map((note) =>
      note.id === id ? { ...note, savedText: text } : { ...note }
    )

    localStorage.setItem('notes', JSON.stringify(updatedList))
    setNotesList(updatedList)
  }

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'))

    if (notes) {
      setNotesList(notes)
    }
  }, [])

  return (
    <div className='container'>
      <button className='add' onClick={addNote}>
        <i className='fas fa-plus'></i> Add note
      </button>
      {notesList &&
        notesList.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            deleteNote={deleteNote}
            saveNote={saveNote}
            savedText={note.savedText}
          ></Note>
        ))}
    </div>
  )
}

export default NotesApp

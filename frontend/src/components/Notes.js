import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchNotes = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/notes`, config);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload();
      }
    }
  }, [config]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const addNote = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/notes`, { text }, config);
      setNotes([...notes, res.data]);
      setText('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/notes/${id}`, config);
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (note) => {
    setEditId(note._id);
    setEditText(note.text);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.put(`${API_BASE}/api/notes/${id}`, { text: editText }, config);
      setNotes(notes.map(note => (note._id === id ? res.data : note)));
      cancelEdit();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
    <div className="notes-container">
      
      <div className="note-form">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a note..."
        />
        <button onClick={addNote}>Add</button>
      </div>

      {notes.map(note => (
        <div key={note._id} className="note-card">
          {editId === note._id ? (
            <>
              <input 
                value={editText}
                onChange={e => setEditText(e.target.value)}
              />
              <div>
                <button onClick={() => saveEdit(note._id)}>💾 Save</button>
                <button onClick={cancelEdit}>❌ Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p>{note.text}</p>
              <div>
                <button onClick={() => startEdit(note)}>✏️ Edit</button>
                <button onClick={() => deleteNote(note._id)}>🗑️ Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Notes;

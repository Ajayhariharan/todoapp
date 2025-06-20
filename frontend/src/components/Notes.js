import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Notes(){
    const[notes,setNotes]=useState([]);
    const[text,setText]=useState('');
    const token=localStorage.getItem('token');
    const config={headers:{Authorization:`Bearer ${token}`}};

    useEffect(()=>{
        axios.get('http://localhost:5000/api/notes',config).then(res=>setNotes(res.data));
    },[]);

    const addNote=async()=>{
        const res=await axios.post('http://localhost:5000/api/notes',{text},config);
        setNotes([...notes,res.data]);
    };
    return(
        <div>
            <input value={text} onChange={e=>setText(e.target.value)}/>
            <button onClick={addNote}>Add</button>
            {notes.map(note=>(
                <div key={note._id}>{note.text}</div>
            ))}
        </div>
    );
}

export default Notes;
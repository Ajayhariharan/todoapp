import './App.css';
import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import Notes from './components/Notes';

function App() {

  const token=localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const [mode, setMode]=useState('login'); //added
  return(
    <div>
      {!token?(
        <>
            <button onClick={() => setMode('register')}>Register</button>
            <button onClick={() => setMode('login')}>Login</button>

            <h2>{mode === 'register' ? 'Register New User' : 'Login to Notes'}</h2>
            <AuthForm type={mode} />
        </>
      ):(
        <>
        <button onClick={() => {
          localStorage.removeItem('token');
          window.location.reload();
          }}>Logout</button>
          <h2>This is ~{username}'s~ Notes</h2>
          
          <Notes />
         
        </>
      )}
    </div>
  );
}

export default App;

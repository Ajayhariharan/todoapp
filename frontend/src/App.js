import './App.css';
import React, { useState} from 'react';
import AuthForm from './components/AuthForm';
import Notes from './components/Notes';


function App() {



  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const [mode, setMode] = useState('login');

  
  return (
    <div className='container' style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      {!token ? (
        <>
          <div className="toggle-buttons">
            <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Register</button>
            <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
          </div>

          <h2>{mode === 'register' ? 'Register' : 'Login'}</h2>
          <AuthForm type={mode} />
        </>
      ) : (
        <>
          <button onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.reload();
          }}>
            Logout
          </button>
          <h2>To-do List</h2>
          <Notes />
        </>
      )}
      
    </div>
  );
}

export default App;

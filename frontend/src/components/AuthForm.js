import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config'; 

function AuthForm({ type }) {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/${type}`, form); 
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        window.location.reload();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error during auth:", error);
      const msg = error.response?.data?.message || "Something went wrong :)";
      alert(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className='rounded' placeholder='Username' onChange={e => setForm({ ...form, username: e.target.value })} />
      <input className='rounded' placeholder='Password' type='password' onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type='submit'>{type}</button>
    </form>
  );
}

export default AuthForm;

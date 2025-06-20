import React, {useState} from 'react';
import axios from 'axios';

function AuthForm({type}){

const [form, setForm] = useState({ username: '', password: '' });
    const handleSubmit=async e=>{
        e.preventDefault();
        console.log(`Sending to http://localhost:5000/api/${type}`, form);
        try{
            const res=await axios.post(`http://localhost:5000/api/${type}`,form);
            if(res.data.token){
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('username', res.data.username);
                window.location.reload();
            }
            else{alert(res.data.message);}
        }
        catch(error){
            console.error("Error during auth:",error);
            const msg=error.response?.data?.message || "Something went wrong :)";
            alert(msg);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <input placeholder='Username' onChange={e=>setForm({...form,username:e.target.value})}/>
            <input placeholder='Password' type='password' onChange={e=>setForm({...form,password:e.target.value})}/>  
            <button type='submit'>{type}</button> 
        </form>
    );

}

export default AuthForm;
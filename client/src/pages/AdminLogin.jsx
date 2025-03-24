import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { api } from '../api/api';
import { toast } from 'react-toastify';

function AdminLogin() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    time: ''
  });


  async function loginWithPassword(e) {
    e.preventDefault();

    // Handling request
    const data = await api.admin.login(form);
    
    if( !data ){
      toast.error( "Invalid credentials" )
    }
    if(data){
      toast.success("Login success")
    }

  }

  return (
    <div className='flex justify-center bg-slate-950 h-[100vh]'>
      <form className='bg-slate-700 text-white p-5 h-100 mt-5 rounded-md text-center'>
        <label className='text-lg font-500'>Admin Login</label>
        <img src='/vite.svg' className='align-center' />
        <br />
        <input
          type='text'
          placeholder='username'
          className='bg-slate-900 text-white p-1 rounded-md m-2 w-60'
          onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
        />
        <br />
        <input
          type='password'
          placeholder='password'
          className='bg-slate-900 text-white p-1 rounded-md m-2 w-60'
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
        />
        <br />
        <button
          className='bg-green-800 text-white p-1 rounded-md m-2 w-60 hover:bg-green-700 cursor-pointer'
          onClick={loginWithPassword}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
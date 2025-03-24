import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { api } from '../api/api';
import { toast } from 'react-toastify';

function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    time: '',
    name: '',
    image: '',
    type: '',
    device: '',
  });

  const getDeviceInfo = async () => {
    if (navigator.userAgentData) {
      const deviceInfo = await navigator.userAgentData.getHighEntropyValues([
        'model',
        'platform',
        'architecture',
      ]);
      console.log('Device Info:', deviceInfo);
      return `${deviceInfo.platform} ${deviceInfo.model || ''} (${deviceInfo.architecture})`;
    }
    return navigator.userAgent; // Fallback
  };

  async function onSuccess(params) {
    console.log(params.credential);
    const credential = jwtDecode(params.credential);
    console.log(credential);

    // Update form state with Google credentials
    setForm((prev) => ({
      ...prev,
      email: credential.email,
      name: credential.name,
      image: credential.picture,
      type: 'google-auth',
    }));

    // You can send this data to your backend if needed
    const data = await api.login({
      email: credential.email,
      name: credential.name,
      image: credential.picture,
      type: 'google-auth',
      time: new Date(),
      device: await getDeviceInfo(),
    });

    console.log('Google Login Response:', data);

    if(!data.success){
      toast.error(data.message)
    }else{
      toast.success(data.message)
    }

  }

  async function loginWithPassword(e) {
    e.preventDefault();

    const deviceInfo = await getDeviceInfo();

    const userInstance = {
      ...form,
      device: deviceInfo,
      time: new Date(),
      type: 'username-password',
    };

    // Handling request
    const data = await api.login(userInstance);
    console.log('Login Response:', data);
    
    if(data.success == false ){
      toast.error(data.error || data.message )
    }
    if(data.success){
      toast.success(data.message)
    }

  }

  return (
    <div className='flex justify-center bg-slate-950 h-[100vh]'>
      <form className='bg-slate-700 text-white p-5 h-100 mt-5 rounded-md text-center'>
        <label className='text-lg font-500'>Login/Register</label>
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
        <br />
        <label>or</label>
        <br />
        <br />

        <GoogleLogin onSuccess={onSuccess} />
        <br/>
        <a href='/admin-login' className='text-blue-300 underline text-sm'>admin-login</a>
      </form>
    </div>
  );
}

export default Login;
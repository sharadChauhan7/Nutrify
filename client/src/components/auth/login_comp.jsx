import React from 'react'
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setName, setEmail, setPassword, login } from '../../features/User/user'
import DotLoading from '../shared/DotLoading';
import axios from 'axios';
import { validateLogin } from '../../util/validator'
import {toast} from 'sonner'
function Login_comp({ toggleAuth }) {
  const { userInfo } = useSelector((state) => state.userInfo);
  const [isloading,setIsLoading] = new React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogin = async (e) => {
    try {
      e.preventDefault();
      const info = { email: userInfo.email, password: userInfo.password };
      const { error } = validateLogin.validate(info);
      if (error) {
        throw new Error(error);
      }
      setIsLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}auth/login`,
        userInfo,
        { withCredentials: true } // Important for sending cookies
      );
      setIsLoading(false);
      if (response.status === 200) {
        toast.success("Logedin successfully");
        dispatch(login());
      }
    }
    catch (e) {
      toast.error(e.response.data);
      setIsLoading(false);
    }
  }



  return (
    // Login form goes here
    <>
      <form className='w-full'>
        <h1 className='text-4xl font-semi-bold max-sm:text-3xl  mb-5'>Login</h1>
        <p className='mb-6'>Welcome back! Please enter your details.</p>
        <div className='mb-5'>
          <input type="text" id='email' placeholder='Email' className='w-full border-b-2  border-gray-300 py-2 focus:outline-none focus:border-blue-500' value={userInfo.email} onChange={(e) => { dispatch(setEmail(e.target.value)) }} required />
        </div>
        <div className='mb-5'>
          <input type="password" id='password' placeholder='Password' className='w-full border-b-2 border-gray-300  py-2  focus:outline-none focus:border-blue-500' value={userInfo.password} onChange={(e) => { dispatch(setPassword(e.target.value)) }} required />
        </div>
        <div className='mb-5 '>
          <button className='w-full bg-black text-xl text-white max-xs:text-lg max-xs:py-1 py-2 rounded-md' onClick={handelLogin}>{isloading ?<DotLoading/>:"Login"}</button>  
        </div>
        {/* Make a boundary */}
        <div className='flex justify-between items-center mb-5'>
          <div className='w-2/5 border-b-2 border-gray-300'></div>
          <div>or</div>
          <div className='w-2/5 border-b-2 border-gray-300'></div>
        </div>
        {/* Sign in with google button */}
        <div className='mb-5'>
          <button className='w-full bg-red-500 max-xs:text-lg max-xs:py-1 text-xl text-white py-2 rounded-md'>Sign in with Google</button>
        </div>
        <div className='flex justify-center'>
          <p>Don't have an account? <span className='text-blue-500 hover:cursor-pointer' onClick={toggleAuth}>Signup</span></p>
        </div>
      </form>
    </>
  )
}

export default Login_comp
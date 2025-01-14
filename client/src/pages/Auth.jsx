import React from 'react'
import { useState } from 'react'
import Login_img from '../assets/login.jpg'
import Login_Component from '../components/auth/login_comp'
import Signup_Component from '../components/auth/signup_comp'
function Auth() {
  let [auth, setAuth] = useState(true);
  
  document.title = 'Auth'
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-slate-300'>
      <div className='bg-white flex cd:h-[80vh]'>
      {auth && <div className='w-3/5 max-ss:w-full px-24 py-16 max-ss:px-12 max-ss:py-8'>
          <h1 className='font-medium text-xl mb-5 max-xs:mb-5 '>Demo Account</h1>
           <Login_Component toggleAuth={()=>setAuth(!auth)}/>
        </div>}
        <div className='w-2/5 max-ss:hidden'>
          <img src={Login_img} alt="" className=' w-full h-full object-cover' />
        </div>
        {!auth && <div className='w-3/5 max-ss:w-full px-24 py-16 max-ss:px-12 max-ss:py-8'>
          <h1 className='font-medium text-xl mb-10'>Demo Account</h1>
        <Signup_Component toggleAuth={()=>setAuth(!auth)}/>
        </div>}
      </div>
    </div>
  )
}

export default Auth
import React from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit';
import { next } from '../../features/User/flow'
function Target({userStatus,heading,discription,dispatcher}) {
    const dispatch = useDispatch();
  return (
    <div>
        {heading.map((data,idx)=>{
            const style=userStatus==data?'border-primary':'border-black';
            return <div key={nanoid()} className={`border-4 cursor-pointer rounded-3xl p-4 my-4 ${style}`} onClick={()=>{dispatch(dispatcher(data)),dispatch(next())}}>
                <h1 className='text-xl  font-bold'>{data}</h1>
                <p className='text-sm font-semibold text-gray-700'>{discription[idx]}</p>
            </div>
        })}
    </div>
  )
}

export default Target
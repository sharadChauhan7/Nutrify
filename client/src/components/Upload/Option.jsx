import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setDisease } from '../../features/User/status';

function Option({userStatus,options,dispatcher}) {

    let dispatch=useDispatch();
    
  return (
    <>
    <div className='flex flex-wrap justify-center items-center gap-5' >
        {options.map((option,index)=>{
            let style=userStatus.medicineType==option?' border-primary w-1/3 border-4 ':'w-1/3 border-4 border-black';
            return(
                <div className={`${style} text-center cursor-pointer`} id={option} key={index} onClick={()=>{dispatch(dispatcher(option))}}  >
                    <div>
                        <Typography variant='h5' id={option} >{option}</Typography>
                    </div>
                </div>
            );
        })}
    </div>
    </>
  )
}

export default Option
import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setDisease } from '../../features/User/status';

function Dificulty({userStatus,options,dispatcher,property}) {
    let dispatch=useDispatch();

    function handleChange(e){

        if(userStatus[property].includes(e.target.id)){
            dispatch(dispatcher(userStatus[property].filter((item)=>item!==e.target.id)))
        }
        else{
            let curr=[...userStatus[property],e.target.id]
            dispatch(dispatcher(curr));
        }

    }
  return (
    <>
    <div className='flex flex-wrap justify-center items-center gap-5' >
        {options.map((option,index)=>{
            let style=userStatus.disease.includes(option)?' border-primary w-1/3 border-4 ':'w-1/3 border-4 border-black';
            return(
                <div className={`${style} text-center cursor-pointer`} id={option} key={index} onClick={handleChange} >
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

export default Dificulty
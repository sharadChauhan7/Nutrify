import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setDisease } from '../../features/User/status';
import {common_disease} from '../../util/formdata'

function Dificulty({userStatus}) {
    let dispatch=useDispatch();
    function handleChange(e){
        if(userStatus.disease.includes(e.target.id)){
            dispatch(setDisease(userStatus.disease.filter((item)=>item!==e.target.id)))
        }
        else{
            let curr=[...userStatus.disease,e.target.id]
            dispatch(setDisease(curr));
        }

    }
  return (
    <>
    <div className='flex flex-wrap justify-center items-center gap-5' >
        {common_disease.map((disease,index)=>{
            let style=userStatus.disease.includes(disease)?' border-[#ffd60a] w-1/3 border-4 ':'w-1/3 border-4 border-black';
            return(
                <div className={`${style} text-center cursor-pointer`} id={disease} key={index} onClick={handleChange} >
                    <div>
                        <Typography variant='h5' id={disease} >{disease}</Typography>
                    </div>
                </div>
            );
        })}
    </div>
    </>
  )
}

export default Dificulty
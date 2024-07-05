import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useDispatch } from 'react-redux';
import {setGender} from '../../features/User/status';

function Gender({userStatus}) {
    let options=["Male","Female","Other"];
    let dispatch=useDispatch();
  return (
    <>
    <Stack spacing={10} direction={"row"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
        {options.map((item,index)=>{
            let style=userStatus.gender==item?'border-primary border-2':'';
            return(
                <Paper key={index} elevation={3} className={`${style} w-64 h-64 `} onClick={()=>{dispatch(setGender(item))}} >
                    <Stack spacing={5} className={`${style}  w-64 h-64 text-primary `} direction={"column"}  justifyContent={"center"} alignItems={"center"}>
                        {item==="Male" && <MaleIcon sx={{fontSize:"5rem"}} />}
                        {item==="Female" && <FemaleIcon sx={{fontSize:"5rem"}} />}
                        {item==="Other" && < TransgenderIcon  sx={{fontSize:"5rem"}} />}
                        <Typography variant='h5'>{item}</Typography>
                    </Stack>
                </Paper>
            );
        })}
    </Stack>
    </>
  )
}

export default Gender
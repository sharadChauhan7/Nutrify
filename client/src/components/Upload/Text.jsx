import React from 'react'
import { Stack, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
function Text({userStatus,heading,dispatcher}) {
    const dispatch = useDispatch();
    function handleChange(e){
        dispatch(dispatcher(e.target.value));
    }
  return (
    <Stack justifyContent={"center"} alignItems={"center"} className='w-[40vw]'>
        <TextField id="standard-basic" label={heading} variant="standard" onChange={handleChange}  value={userStatus} sx={{width:"80%"}} />
    </Stack>
  )
}

export default Text
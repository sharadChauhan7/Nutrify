import React from 'react'
import { Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../Features/ProblemForm/problemSlice.js';
function Title({problem}) {
    let dispatch=useDispatch();
    function handleChange(e){
        dispatch(setTitle(e.target.value));
    }
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
        <TextField id="standard-basic" label="Problem Title" variant="standard" onChange={handleChange}  value={problem.title} sx={{width:"80%"}} />
    </Stack>
  )
}

export default Title
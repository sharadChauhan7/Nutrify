import React from 'react'
import { Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import {setDescription} from '../../Features/ProblemForm/problemSlice.js';
function Description({problem}) {

  let dispatch=useDispatch();

  function handleDescription(e){
    dispatch(setDescription(e.target.value));
  }
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
       <TextField
          id="outlined-multiline-static"
          label="Problem Description"
          multiline
          rows={15}
          value={problem.description}
          onChange={handleDescription}
          sx={{width:"100%",height:"100%"}}
        />
    </Stack>
   
  )
}

export default Description
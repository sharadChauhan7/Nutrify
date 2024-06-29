import React from 'react'
import { Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import {setFollowUp} from '../../Features/ProblemForm/problemSlice.js';

function Followup({problem}) {

    let dispatch=useDispatch();

    function handleFollowup(e){
        dispatch(setFollowUp(e.target.value));
    }
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
    <TextField
       id="outlined-multiline-static"
       label="Followup Problem"
       multiline
       rows={5}
       value={problem.description}
       onChange={handleFollowup}
       sx={{width:"100%",height:"100%"}}
     />
 </Stack>
  )
}

export default Followup
import React from 'react'
import { Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import {setDescription} from '../../features/ListingForm/property.js';
function Description({property}) {

  let dispatch=useDispatch();

  function handleDescription(e){
    dispatch(setDescription(e.target.value));
  }
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
       <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          value={property.description}
          onChange={handleDescription}
          sx={{width:"100%",height:"100%"}}
        />
    </Stack>
   
  )
}

export default Description
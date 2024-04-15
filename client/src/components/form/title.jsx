import React from 'react'
import { Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setName } from '../../features/ListingForm/property.js';
function title({property}) {
    let dispatch=useDispatch();
    function handleChange(e){
        dispatch(setName(e.target.value));
    }
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
        <TextField id="standard-basic" label="Name" variant="standard" onChange={handleChange}  value={property.name} sx={{width:"80%"}} />
    </Stack>
  )
}

export default title
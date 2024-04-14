import { Box, Stack, TextField } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setLocation } from '../../features/ListingForm/property'

function Location({property}) {
  let [address,setAddress]=React.useState(property.location);
  function handleChange(e){
    setAddress(e.target.value);
    dispatch(setLocation(e.target.value));
  }
  let dispatch=useDispatch();
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
        <TextField id="standard-basic" label="Full Address" value={address} variant="standard" onChange={handleChange} sx={{width:"80%"}} />
    </Stack>
  )
}

export default Location
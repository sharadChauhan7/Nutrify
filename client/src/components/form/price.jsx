import React from 'react'
import {  Stack, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setPrice } from '../../features/ListingForm/property'

function Price({property}) {
    let dispatch = useDispatch();
    function handelPrice(e){
      let tonumber=parseInt(e.target.value);
        dispatch(setPrice(tonumber));
    }
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
        <TextField id="standard-basic" label="Per Month" value={property.price} variant="standard" onChange={handelPrice} sx={{width:"80%"}} />
    </Stack>
  )
}

export default Price
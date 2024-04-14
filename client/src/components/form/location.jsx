import { Box, Stack, TextField } from '@mui/material'
import React from 'react'

function location({property}) {
    console.log(property);
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
        <TextField id="standard-basic" label="Full Address" variant="standard" sx={{width:"80%"}} />
    </Stack>
  )
}

export default location
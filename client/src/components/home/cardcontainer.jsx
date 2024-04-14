import { Box, Grid } from '@mui/material'
import React from 'react'
import Card from './propertycard'

function cardcontainer() {
  return (
    <Box sx={{display:"flex",justifyContent:"center",flexWrap:"wrap", p:{md:"3rem", sm:"2rem", xs:"1rem"}}}>
        <Grid container spacing={5}>

            {[...Array(6)].map(()=>{
                return(
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Card />
                    </Grid>
                )
            })}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card />
            </Grid>
        </Grid>
    </Box>
  )
}

export default cardcontainer
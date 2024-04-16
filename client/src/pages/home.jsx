import React from 'react'
import Navbar from '../components/shared/navbar'
import CardContainer from '../components/home/cardcontainer'
import { Container, Typography } from '@mui/material'
function home() {
  return (
    <>
    {/* <Navbar /> */}
      <Container sx={{display:"flex",justifyContent:"center"}}>
        <Typography variant="h4" align="center" sx={{ fontFamily:"sans-serif", fontSize:{md:"2.4rem",sm:"2rem",xs:"1.5rem"}, fontWeight:"500", my: 5,width:{md:"60%",sm:"80%",xs:"100%"}}}>
        Discover the best rental properties near your college
        </Typography>
      </Container>
      {/* <CardContainer /> */}
    </>
  )
}

export default home
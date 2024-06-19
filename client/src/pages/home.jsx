import React from 'react'
import Navbar from '../components/shared/navbar'
import { Container, Typography } from '@mui/material'
function home() {
  return (
    <>
    {/* <Navbar /> */}
      <Container className='flex justify-center items-center flex-col  border-2'>
        <Typography className='text-center' >
          Drag and drop the files to upload of click to capture the image
        </Typography>
        {/* Box to get image */}
        <Container sx={{display:"flex",justifyContent:"center",alignItems:"center",width:{md:"60%",sm:"80%",xs:"100%",border:"2px solid red"}}}>
          {/* <input type="file" id="file" style={{display:"none"}} /> */}
          <label htmlFor="file" style={{cursor:"pointer"}}>
            <img src="https://img.icons8.com/ios/452/camera--v1.png" alt="camera" style={{width:"100px",height:"100px"}} />
          </label>
          </Container>
      </Container>
      {/* <CardContainer /> */}
    </>
  )
}

export default home
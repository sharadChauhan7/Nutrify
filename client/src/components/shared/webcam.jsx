import React from 'react'
import Webcam from 'react-webcam'
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { capture } from '../../features/Webcam/webcamSlice';
function webcam() {
    const webcamRef = React.useRef(null);
    const dispatch = useDispatch();
    console.log(webcamRef);
  return (
    <div className='flex flex-col justify-center items-center  '>
        <Webcam
        audio={false}
        mirrored={true}
        height={620}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className='bg-gray-300 rounded-3xl'
        width={1280}
        videoConstraints={{ width: 1280, height: 620, }}
        
    />
        <Button variant="contained" sx={{ margin: "0 1rem", width: "100%" }} onClick={() => { dispatch(capture(webcamRef.current.getScreenshot())) }}>Capture</Button>

    </div>
  )
}

export default webcam
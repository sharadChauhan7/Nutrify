import React from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux'
import { togglewebcam, capture } from '../../features/Webcam/webcamSlice'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ChooseImage from './ChooseImage';
import Webcam from 'react-webcam'



function Camera({ webcam }) {
    const webcamRef = React.useRef(null);
    const dispatch = useDispatch();
    const { iswebcam, imgSrc } = useSelector(state => state.webcam);

    const box1 = <div  className='web flex justify-center  items-center border-2 max-sm:w-full sm:w-4/5 lg:w-4/6 max-lg:h-2/6 lg:h-1/2 rounded-3xl bg-gray-100'>
        <div className='flex flex-col justify-center items-center w-full'>
            <CameraAltIcon color='primary' sx={{ fontSize: "13rem" }} />
            <Button startIcon={<PhotoCamera />} className='w-1/2 mt-10'  variant="contained" onClick={() => { dispatch(togglewebcam()) }}>Take a pic</Button>


            {/* Choose image */}
            <ChooseImage/>
        </div>


    </div>

    const box2 = <Webcam
        audio={false}
        mirrored={true}
        height={620}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className='bg-gray-300 rounded-3xl' 
        width={1280}
        videoConstraints={{ width: 1280, height: 620, }}
    />
    if (iswebcam) {
        return (
            <div className='flex flex-col justify-center items-center  '>
                {box2}
                <Button variant="contained" sx={{ margin: "0 1rem", width: "100%" }} onClick={() => { dispatch(capture(webcamRef.current.getScreenshot())) }}>Capture</Button>
            </div>
        )
    }
    else if (imgSrc) {
        return (<div className='flex justify-center gap-5 items-center h-2/3 w-11/12 bg-gray-100 rounded-3xl overflow-hidden'>
            <div className='w-2/3 h-full'>
                <img src={imgSrc} alt="" className='h-full w-full object-contain  rounded-3xl  bg-black' />
            </div>
            <div className='w-1/3 h-full flex flex-col items-center justify-center gap-10 '>
                <h3 className='text-xl text-center'>Thanks for uploading your image. Please click on calorie when you are ready or take a differant pic</h3>
                <div >
                    <Button variant="contained" sx={{ margin: "0 1rem" }} onClick={() => { dispatch(togglewebcam()) }}>Take Pic</Button>
                    <Button variant="contained" sx={{ margin: "0 1rem" }}>Calorie</Button>
                </div>

                    <ChooseImage/>
            </div>
        </div>)
    }
    return box1;

}

export default Camera
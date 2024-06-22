import React from 'react'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { capture } from '../../features/Webcam/webcamSlice';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

function ChooseImage() {
    const dispatch = useDispatch();
    function handleImage(e) {
        e.preventDefault();
        const file = new FileReader();
        file.onload = () => {
            dispatch(capture(file.result));
        };
        file.readAsDataURL(e.target.files[0]);
    }
  return (
    <div className='w-1/2 min-w-64 border-2 mt-2 relative z-10'>
    <input
        accept="image/*"
        className="hidden"
        id="icon-button-file"
        type="file"
        onChange={handleImage}
    />
    <label htmlFor="icon-button-file">
        <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<PhotoCamera />}
            className="text-xl w-full"
        >
            Upload Your Image
        </Button>
    </label>
</div>
  )
}

export default ChooseImage
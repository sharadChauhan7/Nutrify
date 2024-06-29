import React from 'react'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { capture } from '../../features/Webcam/webcamSlice';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

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
    <div className=''>
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
            className="text-4xl rounded-full"
        >
        <UploadFileIcon className='text-5xl'/>
        </Button>
    </label>
</div>
  )
}

export default ChooseImage
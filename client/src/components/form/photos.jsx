import React from 'react'
import { Stack, TextField } from '@mui/material';
import property from '../../features/ListingForm/property';
import { useDispatch } from 'react-redux';
import { setPhotos } from '../../features/ListingForm/property.js';
function Photos({ property }) {
    let dispatch = useDispatch();

    function handleChange(e) {
        let newPhotos = { ...property.photos, [e.target.name]: e.target.value };
        dispatch(setPhotos(newPhotos));
    }
    // console.log(photos);
    return (
        <>
            <Stack spacing={2} direction={"column"} justifyContent={"center"} alignItems={"center"}>
                {[...Array(5)].map((num, idx) => {
                    return <TextField key={idx} name={`photo${idx + 1}`} value={property.photos[`photo${idx + 1}`]} onChange={handleChange} sx={{ width: "90%" }} label="Link" variant="standard" />
                })}
            </Stack>
        </>
    )
}

export default Photos
import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import { useDispatch } from 'react-redux';
import { setType } from '../../features/ListingForm/property.js';

function type({property}) {
    let type=["PG","Apartment","Hostel"];
    let dispatch=useDispatch();
  return (
    <>
    <Stack spacing={10} direction={"row"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
        {type.map((item,index)=>{
            let style=property.type==item?{width:{md:250},height:{md:250},border:"1px solid #2196f3"}:{width:{md:250},height:{md:250}};
            return(
                <Paper key={index} elevation={3} sx={style} onClick={()=>{dispatch(setType(item))}} >
                    <Stack spacing={5} sx={style}direction={"column"} justifyContent={"center"} alignItems={"center"}>
                        {item==="PG" && <HouseIcon sx={{fontSize:"6rem"}} />}
                        {item==="Apartment" && <ApartmentIcon sx={{fontSize:"6rem"}} />}
                        {item==="Hostel" && <NightShelterIcon sx={{fontSize:"6rem"}} />}
                        <Typography variant='h5'>{item}</Typography>
                    </Stack>
                </Paper>
            );
        })}
    </Stack>
    </>
  )
}

export default type
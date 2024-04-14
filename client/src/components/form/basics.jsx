import { Box, Stack, Typography, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux'
import React from 'react'
import { setbasicBeadrooms, setbasicBathrooms, setbasicGuests, setbasicBeds } from "../../features/ListingForm/property";

function Basics({ property }) {
    let type = ["Bedrooms",
        "Bathrooms",
        "Guests",
        "Beds",];
    let dispatch = useDispatch();

    return (
        <Box>
            {type.map((item, idx) => {
                let mutator;
                { idx === 0 && (mutator = setbasicBeadrooms) }
                { idx === 1 && (mutator = setbasicBathrooms) }
                { idx === 2 && (mutator = setbasicGuests) }
                { idx === 3 && (mutator = setbasicBeds) }
                return (
                    <Stack key={item} direction={"row"} justifyContent={"space-between"} sx={{ borderBottom: "2px solid #bdbdbd", my: "8px", py: "16px" }}>
                        <Typography color={"#757575"} variant='h6'>{item}</Typography>
                        <Box sx={{ fontSize: "1rem" }} >
                            <Fab color="primary" disabled={property.basic[item.toLowerCase()]===0} size='small' aria-label="add" onClick={() => { dispatch(mutator(property.basic[item.toLowerCase()] - 1)) }}>
                                <AddIcon />
                            </Fab>
                            <Typography variant='p' sx={{ fontSize: "1.2rem", color: "#757575", mx: "12px" }}>{property.basic[item.toLowerCase()]}</Typography>
                            <Fab color="primary" size='small' aria-label="add" onClick={() => { dispatch(mutator(property.basic[item.toLowerCase()] + 1)) }}>
                                <AddIcon />
                            </Fab>
                        </Box>
                    </Stack>
                )
            })}
        </Box>
    )
}

export default Basics
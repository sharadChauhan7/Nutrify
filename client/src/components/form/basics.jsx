import { Box, Stack, Typography, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'

function basics({ property }) {
    let type = ["Bedrooms",
        "Bathrooms",
        "Guests",
        "Beds",]
    return (
        <Box>
            {type.map((item) => (
                <Stack key={item} direction={"row"} justifyContent={"space-between"} sx={{ borderBottom: "2px solid #bdbdbd", my: "8px", py: "16px" }}>
                    <Typography color={"#757575"} variant='h6'>{item}</Typography>
                    <Box sx={{fontSize:"1rem"}} spa>
                        <Fab color="primary" size='small' aria-label="add">
                            <AddIcon />
                        </Fab>
                        <Typography variant='p' sx={{fontSize:"1.2rem", color:"#757575", mx:"12px"}}>{property.basic[item.toLowerCase()]}</Typography>
                        <Fab color="primary" size='small' aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Box>
                </Stack>
            ))}
        </Box>
    )
}

export default basics
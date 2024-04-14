import React from 'react'
import question from '../util/formdata.js'
import { useSelector, useDispatch } from 'react-redux';
import { next, prev } from '../features/ListingForm/flow.js'
import { Box, Button, Container, Stack, Typography } from '@mui/material';
const Type = React.lazy(()=>import('../components/form/type.jsx'));
const Location = React.lazy(()=>import('../components/form/location.jsx'));
const Basics = React.lazy(()=>import('../components/form/basics.jsx'));
function Propertyform() {
    let idx = useSelector((state)=>state.flow.value);
    // let idx = 2;
    let property = useSelector((state) => state.property.property);
    let dispatch = useDispatch();
    
    return (
        <>
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center",height: "90vh" }}>

                <Box>
                    <Typography align='center' margin={"40px"} variant='h4'>{question[idx]}</Typography>

                    <Box width={"100%"}>
                        {/* <Type property={property}/> */}
                        <React.Suspense fallback={<div>Loading...</div>}>
                            {idx === 0 && <Type property={property} />}
                            {idx === 1 && <Location property={property} />}
                            {idx === 2 && <Basics property={property} />}
                        </React.Suspense>
                    </Box>
                    <Stack spacing={12} sx={{my:"24px"}} direction={"row"} justifyContent={"center"}>
                        <Button size='large' variant='contained' disabled={idx === 0} onClick={() => { dispatch(prev()) }}>Prev</Button>
                        <Button size='large' variant='contained' disabled={idx === question.length - 1} onClick={() => { dispatch(next()) }}>Next</Button>
                    </Stack>
                </Box>
            </Container>
        </>
    )
}

export default Propertyform
import React from 'react'
import question from '../util/formdata.js'
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { next, prev } from '../features/User/flow.js';
import Disease from '../components/Upload/Disease.jsx';
import Picker from '../components/Upload/Picker.jsx'
import {setAge,setWeight,setHeight} from '../features/User/status.js'
import axios from 'axios';

function Propertyform() {
    let idx = useSelector((state) => state.flow.value);
    // const idx = 2;
    let { userStatus } = useSelector((state) => state.userStatus);
    let dispatch = useDispatch();

    const handleSubmit = async () => {
        console.log(userStatus);
    }
    console.log(userStatus)

    return (
        <>
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>

                <Box>
                    <Typography align='center' margin={"40px"} variant='h4'>{question[idx]}</Typography>

                    <Box className="flex justify-center items-center my-10">
                        {idx === 0 && <Disease userStatus={userStatus} />}
                        {idx === 1 && <Picker userStatus={userStatus.age} selections={{ age: Array.from({ length: 100 }, (_, i) => `${i + 1}`) }} dispatcher={setAge} />}
                        {idx === 2 && <Picker userStatus={userStatus.weight} selections={{ age: Array.from({ length: 151 }, (_, i) => `${i + 20}`) }} unit =" kg" dispatcher={setWeight} />}
                        {idx === 3 && <Picker userStatus={userStatus.height} selections={{ age: Array.from({ length: 131 }, (_, i) => `${i + 100}`) }} unit =" cm" dispatcher={setHeight} />}
                    </Box>
                    <Stack spacing={12} sx={{ my: "24px" }} direction={"row"} justifyContent={"center"}>
                        <Button size='large' variant='contained' disabled={idx === 0} onClick={() => { dispatch(prev()) }}>Prev</Button>
                        {idx != 8 ? <Button size='large' variant='contained' onClick={() => { dispatch(next()) }}>Next</Button> : <Button size='large' variant='contained' onClick={handleSubmit}>Submit</Button>}
                    </Stack>
                </Box>
            </Container>
        </>
    )
}

export default Propertyform
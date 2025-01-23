import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {medQuestions} from '../util/formdata.js'
import { next, prev } from '../features/User/flow.js';

import { Container, Box, Typography, Stack, Button } from '@mui/material';
import Text from '../components/Upload/Text.jsx'
import { setMedicineName,setMedicineType,setHealthCondition } from '../features/User/medicine.js';
import Option from '../components/Upload/Option.jsx';
import {medType} from '../util/formdata.js'

function MedicineForm() {
    let dispatch = useDispatch();
    let idx = useSelector((state) => state.flow.value);
    // let idx=1;
    let { medicine } = useSelector((state) => state.medicine);
    console.log(medicine)
    console.log(medType);
    const handleSubmit = async () => {

    }
  return (
    <>
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>

                <Box>
                    <Typography align='center' margin={"40px"} fontWeight={"700"} variant='h1'>{medQuestions[idx]}</Typography>

                    <Box className="flex justify-center items-center my-10">
                        {idx === 0 && <Text userStatus={medicine.medicineName} heading={"Medicine Name"} dispatcher={setMedicineName} />}
                        {idx === 1 && <Option userStatus={medicine} options={medType} dispatcher={setMedicineType}  />}
                        {idx === 2 && <Text userStatus={medicine.healthCondition} heading={"Health Condition"} dispatcher={setHealthCondition} />}
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

export default MedicineForm
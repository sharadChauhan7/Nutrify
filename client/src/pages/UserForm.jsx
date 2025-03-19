import React from 'react'
import question from '../util/formdata.js'
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { next, prev,setFlow } from '../features/User/flow.js';
import Disease from '../components/Upload/Disease.jsx';
import Picker from '../components/Upload/Picker.jsx'
import Target from '../components/Upload/Target.jsx'
import Text from '../components/Upload/Text.jsx'
import Gender from '../components/Upload/Gender.jsx'
import {setAge,setWeight,setTargetWeight,setHeight,setPhyActivity,setTargetSpeed,setAddress} from '../features/User/status.js'
import { login } from '../features/User/user.js';
import {daily_activity,daily_activity_discription,goal_target,goal_target_discription,common_disease} from '../util/formdata.js'
import axios from 'axios';

function Form() {
    let idx = useSelector((state) => state.flow.value);
    // const idx = 4;
    let { userStatus } = useSelector((state) => state.userStatus);
    let dispatch = useDispatch();

    const handleSubmit = async () => {
        
        try{
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}user/status`, 
               userStatus,
              { withCredentials: true } // Important for sending cookies
          );
            if(response.status===200){
                dispatch(setFlow(0));
                dispatch(login());
            }
        }
        catch(e){
            dispatch(setFlow(0));
            console.log(e);
        }
    }

    return (
        <>
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>

                <Box>
                    <Typography align='center' margin={"40px"} fontWeight={"700"} variant='h1'>{question[idx]}</Typography>

                    <Box className="flex justify-center items-center my-10">
                        {idx == 0 && <Gender userStatus={userStatus}/>}
                        {/* {idx === 1 && <Disease userStatus={userStatus} options={common_disease} dispatcher={setDisease} property={"disease"} />} */}
                        {idx === 1 && <Picker userStatus={userStatus.age} selections={{ age: Array.from({ length: 100 }, (_, i) => `${i + 1}`) }} dispatcher={setAge} />}
                        {idx == 2 && <Target userStatus={userStatus.phy_activity} heading={daily_activity} discription={daily_activity_discription} dispatcher={setPhyActivity} /> }
                        {idx === 3 && <Picker userStatus={userStatus.weight} selections={{ age: Array.from({ length: 151 }, (_, i) => `${i + 20}`) }} unit =" kg" dispatcher={setWeight} />}
                        {idx === 4 && <Picker userStatus={userStatus.weight} selections={{ age: Array.from({ length: 151 }, (_, i) => `${i + 20}`) }} unit =" kg" dispatcher={setTargetWeight} />}
                        {idx == 5 && <Target userStatus={userStatus.target_speed} heading={goal_target} discription={goal_target_discription} dispatcher={setTargetSpeed} /> }
                        {idx === 6 && <Picker userStatus={userStatus.height} selections={{ age: Array.from({ length: 131 }, (_, i) => `${i + 100}`) }} unit =" cm" dispatcher={setHeight} />}
                        {idx === 7 && <Text userStatus={userStatus.address} heading={"Address"} dispatcher={setAddress} />}   
                    </Box>
                    <Stack spacing={12} sx={{ my: "24px" }} direction={"row"} justifyContent={"center"}>
                        <Button size='large' variant='contained' disabled={idx === 0} onClick={() => { dispatch(prev()) }}>Prev</Button>
                        {idx != 7 ? <Button size='large' variant='contained' onClick={() => { dispatch(next()) }}>Next</Button> : <Button size='large' variant='contained' onClick={handleSubmit}>Submit</Button>}
                    </Stack>
                </Box>
            </Container>
        </>
    )
}

export default Form
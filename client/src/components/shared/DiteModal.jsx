import React from 'react'
import { Modal } from '@mui/material'
import { useState } from 'react'
import DiteOption from './DiteOption';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
function DiteModal({ val, close }) {
    let [flow, setFlow] = useState(0);
    let [diteInfo, setDiteInfo] = useState({
        alergies: [],
        preferences: [],
        diteType: []
    });
    let idx=0;
    function diteInfoHandler(name,value){
        console.log(name,value);
        
    }

    function handleSubmit(){
        console.log("Submitting");
    };
    return (
        <Modal
            open={val}
            onClose={() => { close(!val) }}
        >
            {/* <DiteOption/> */}
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70%',
                height:'80%',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography align='center' margin={"20px"} fontWeight={"700"} variant='h1'>What is your Preffered Mael?</Typography>
                <Box className="flex justify-center h-2/3 items-center my-5">
                <DiteOption handler={diteInfoHandler} />
                </Box>
                <Stack spacing={12} sx={{ my: "24px" }} direction={"row"} justifyContent={"center"}>
                        <Button size='large' variant='contained' disabled={flow === 0} onClick={() => { setFlow(flow+1)}}>Prev</Button>

                        {flow!= 3 ? <Button size='large' variant='contained' onClick={() => { setFlow( flow-1)}}>Next{flow}</Button> : <Button size='large' variant='contained' onClick={handleSubmit}>Submit</Button>}
                    </Stack>

            </Box>
        </Modal>
    )
}

export default DiteModal
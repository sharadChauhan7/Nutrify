import React from 'react'
import { Modal } from '@mui/material'
import { useState } from 'react'
import DiteOption from './DiteOption';
import Box from '@mui/material/Box';
function DiteModal({ val, close }) {
    let [flow, setFlow] = useState(0);
    let [diteInfo, setDiteInfo] = useState({
        alergies: [],
        preferences: [],
        diteType: []
    });

    function diteInfoHandler(name,value){
        console.log(name,value);
        
    }
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
                width: '50%',
                height:'80%',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <DiteOption handler={diteInfoHandler} />
            </Box>
        </Modal>
    )
}

export default DiteModal
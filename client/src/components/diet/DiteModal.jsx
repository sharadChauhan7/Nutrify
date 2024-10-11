import React from 'react'
import { Modal } from '@mui/material'
import { useState } from 'react'
import DiteOption from './DiteOption';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { dite_preference, alergies, diteType } from '../../util/formdata'
import axios from 'axios'
import { useSelector } from 'react-redux'
function DiteModal({ val, close }) {
    // const dispatch = useDispatch();

    const userStatus = useSelector((state) => state.userStatus);
    let [flow, setFlow] = useState(0);

    let [diteInfo, setDiteInfo] = useState({
        foodAllergies: ["None"],
        ditePreference: ["North Indian"],
        diteType: "Vegiterian"
    });
    function diteInfoHandler(name, value) {
        if (name === "diteType") {
            setDiteInfo({ ...diteInfo, [name]: value });
            return;
        }

        if (diteInfo[name].includes(value)) {
            setDiteInfo({ ...diteInfo, [name]: diteInfo[name].filter((val) => val !== value) });
        }
        else {
            setDiteInfo({ ...diteInfo, [name]: [...diteInfo[name], value] });
        }
    }

    async function handleSubmit() {
        console.log("Submitting");
        try {
            const result = await axios.post('http://localhost:3000/api/user/editStatusDite',
                diteInfo,
                { withCredentials: true }
            )
            const generateDite = await axios.get('http://localhost:3000/api/diet/generate',{ withCredentials: true });
            console.log(generateDite.data);
        }
        catch (err) {
            console.log(err);
        }
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
                height: '80%',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                {flow === 0 && <DiteOption handler={diteInfoHandler} status={diteInfo.diteType} options={diteType} />}
                {flow === 1 && <DiteOption handler={diteInfoHandler} status={diteInfo.foodAllergies} options={alergies} />}
                {flow === 2 && <DiteOption handler={diteInfoHandler} status={diteInfo.ditePreference} options={dite_preference} />}
                <Stack spacing={12} sx={{ my: "24px" }} direction={"row"} justifyContent={"center"}>
                    <Button size='large' variant='contained' disabled={flow === 0} onClick={() => { if (flow === 0) return; setFlow(flow - 1) }}>Prev</Button>
                    {flow != 2 ? <Button size='large' variant='contained' onClick={() => { setFlow(flow + 1) }}>Next</Button> : <Button size='large' variant='contained' onClick={handleSubmit}>Submit</Button>}
                </Stack>

            </Box>
        </Modal>
    )
}

export default DiteModal
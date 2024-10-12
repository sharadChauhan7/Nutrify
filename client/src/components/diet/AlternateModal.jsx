import React, { useState } from 'react';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import AlternateOption from './AlternateOption';
const AlternateModal = ({ choiceModal,fullDiet, close }) => {
    const [isloading, setIsloading] = useState(false);
    console.log(choiceModal);
    const handleClose = () => {
        close({ open: false, data: null });
    };

    const [status, setStatus] = useState("");

    const handleChange = async (meal) => {
        setStatus(meal);
    }

    const setAlternateMeal = async (newMeal) => {
        try {
            console.log(newMeal);
            newMeal._id = choiceModal.prevMeal._id;
            console.log(fullDiet);

            setIsloading(true);
            // let result = await axios.post('http://localhost:3000/api/diet/alternate',{data},{withCredentials:true});
            // console.log(result.data);
            setTimeout(() => {
                console.log(newMeal);
                setIsloading(false);
                close({ open: false, data: null, prevMeal: null });
            }, 3000);
        }
        catch(e){
            console.log(e);
            setIsloading(false);
        }
    }





    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            {isloading ? <Skeleton variant="rectangular" sx={{ bgcolor: 'grey.600', width: '576px', height: '66%', borderRadius: '25px' }} /> : (
                <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative">
                    <button
                        className="absolute text-2xl top-4 right-4 text-gray-500 hover:text-gray-700"
                        onClick={handleClose}
                    >
                        &times;
                    </button>

                    <AlternateOption status={status} handler={handleChange} options={choiceModal.data} submit={setAlternateMeal} />
                </div>
            )}
        </div>
    );
};

export default AlternateModal;

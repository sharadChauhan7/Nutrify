import {createSlice} from '@reduxjs/toolkit';

// Webcam slice
const initialState = {
    iswebcam: false,
    imgSrc: null
};

export const webcamSlice = createSlice({
    name: 'webcam',
    initialState,
    reducers: {
        togglewebcam: (state) => {
            state.iswebcam = !state.iswebcam;
        },
        capture: (state, action) => {
            state.iswebcam = false;
            state.imgSrc = action.payload;
        }
    }
});

export const { togglewebcam, capture } = webcamSlice.actions;

export default webcamSlice.reducer;

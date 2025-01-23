import { configureStore } from '@reduxjs/toolkit'
import flowreducers from '../features/User/flow'
import webcamreducers from '../features/Webcam/webcamSlice'
import userStatus from '../features/User/status'
import userInfo from '../features/User/user'
import medicine from '../features/User/medicine'

export const  store = configureStore({
    reducer: {
        userStatus:userStatus,
        userInfo:userInfo,
        webcam:webcamreducers,
        flow:flowreducers,
        medicine:medicine
    }
})
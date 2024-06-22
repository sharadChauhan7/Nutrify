import { configureStore } from '@reduxjs/toolkit'
import flowreducers from '../features/ListingForm/flow'
import propertyreducers from '../features/ListingForm/property'
import webcamreducers from '../features/Webcam/webcamSlice'
export const  store = configureStore({
    reducer: {
        flow:flowreducers,
        property:propertyreducers,
        webcam:webcamreducers
    }
})
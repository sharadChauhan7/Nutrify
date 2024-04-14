import { configureStore } from '@reduxjs/toolkit'
// import todoreducers from '../features/Todo/todoslice'
import flowreducers from '../features/ListingForm/flow'
import propertyreducers from '../features/ListingForm/property'

export const  store = configureStore({
    reducer: {
        flow:flowreducers,
        property:propertyreducers
    }
})
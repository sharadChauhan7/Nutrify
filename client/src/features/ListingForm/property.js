import { createSlice } from "@reduxjs/toolkit";

let initialState={
    property:{
        name:"",
        type:"Apartment",
        location:"",
        features:[],
        basic:{
            bedrooms:0,
            bathrooms:0,
            guests:0,
            beds:0,
        },
        photos:[],
        description:"",
        price:0,
    }
}
export const propertySlice=createSlice({
    name:"property",
    initialState,
    reducers:{
        setName:(state,action)=>{
            state.property.name=action.payload;
        },
        setType:(state,action)=>{
            state.property.type=action.payload;
        },
        setLocation:(state,action)=>{
            state.property.location=action.payload;
        },
        setFeatures:(state,action)=>{
            state.property.features=action.payload;
        },
        setbasicBeadrooms:(state,action)=>{
            state.property.basic.bedrooms=action.payload;
        },
        setbasicBathrooms:(state,action)=>{
            state.property.basic.bathrooms=action.payload;
        },
        setbasicGuests:(state,action)=>{
            state.property.basic.guests=action.payload;
        },
        setbasicBeds:(state,action)=>{
            state.property.basic.beds=action.payload;
        },
        setPhotos:(state,action)=>{
            state.property.photos=action.payload;
        },
        setDescription:(state,action)=>{
            state.property.description=action.payload;
        },
        setPrice:(state,action)=>{
            state.property.price=action.payload;
        }
    }
});

export const {setName,setType,setLocation,setFeatures,setbasicBeadrooms,setbasicBathrooms,setbasicGuests,setbasicBeds,setPhotos,setDescription,setPrice}=propertySlice.actions;
export default propertySlice.reducer;
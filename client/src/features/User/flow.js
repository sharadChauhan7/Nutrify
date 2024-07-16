import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
};

export const flowSlice= createSlice({
    name:"flow",
    initialState,
    reducers:{
        next:(state,action)=>{
            state.value++;
        },
        prev:(state,action)=>{
            state.value--;
        },
        setFlow:(state,action)=>{
            state.value=action.payload;
        }
    }
});

export const {next,prev,setFlow}=flowSlice.actions

export default flowSlice.reducer
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
        }
    }
});

export const {next,prev}=flowSlice.actions

export default flowSlice.reducer
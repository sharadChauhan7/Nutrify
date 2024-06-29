import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo:{
        name:"",
        email:"",
        password:"",
        phone:""
    }
}

const userSlice = createSlice({
    name:"userInfo",
    initialState,
    reducers:{
        setName:(state,action)=>{
            state.userInfo.name=action.payload;
        },
        setEmail:(state,action)=>{
            state.userInfo.email=action.payload;
        },
        setPassword:(state,action)=>{
            state.userInfo.password=action.payload;
        },
        setPhone:(state,action)=>{
            state.userInfo.phone=action.payload;
        }
    }})

export const {setName,setEmail,setPassword,setPhone}=userSlice.actions

export default userSlice.reducer
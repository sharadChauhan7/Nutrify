import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import axios from 'axios';

const isLogin = async ()=>{
    try{
        let res = await axios.get(import.meta.env.VITE_SERVER_URL+'auth/isLogin',{ withCredentials: true });
        if(res.status==200){
            return true;
        }
        return false;
    }
    catch(err){
        console.log(err);
        return false;
    }
}
async function initializeState() {
    const loginStatus = await isLogin();
    return {
        ...initialState,
        isLogin: loginStatus
    };
}
const initialState = {
    userInfo:{
        name:"",
        email:"",
        password:"",
        phone:""
    },
    // Check if usre is in cookies or not 
    isLogin:false
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
        },
        login:(state,action)=>{
            state.isLogin=true;
        },
        setLoginStatus: (state, action) => {
            state.isLogin = action.payload;
        },
        logout:(state,action)=>{
            Cookies.remove('authToken');
            state.isLogin=false;
        }
    }})

export const {setName,setEmail,setPassword,setPhone,login,logout,setLoginStatus}=userSlice.actions

export default userSlice.reducer;

export const initializeUserState = () => async (dispatch) => {
    const state = await initializeState();
    dispatch(setLoginStatus(state.isLogin));
};
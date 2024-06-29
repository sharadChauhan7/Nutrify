import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    userStatus:{
        address:"",
        age:"20",
        weight:"60",
        height:"162",
        target_weight:"",
        phy_activity:"",
        target_speed:"",
        target_calories:"",
        disease:['None']
    }
}

let userSlice = createSlice({
    name:"userStatus",
    initialState,
    reducers:{
        setAddress:(state,action)=>{
            state.userStatus.address=action.payload;
        },
        setAge:(state,action)=>{
            state.userStatus.age=action.payload;
        },
        setWeight:(state,action)=>{
            state.userStatus.weight=action.payload;
        },
        setHeight:(state,action)=>{
            state.userStatus.height=action.payload;
        },
        setTargetWeight:(state,action)=>{
            state.userStatus.target_weight=action.payload;
        },
        setPhyActivity:(state,action)=>{
            state.userStatus.phy_activity=action.payload;
        },
        setTargetSpeed:(state,action)=>{
            state.userStatus.target_speed=action.payload;
        },
        setTargetCalories:(state,action)=>{
            state.userStatus.target_calories=action.payload;
        },
        setDisease:(state,action)=>{
            state.userStatus.disease=action.payload;
        }
    }
})

export const {setAddress,setAge,setWeight,setHeight,setTargetWeight,setPhyActivity,setTargetSpeed,setTargetCalories,setDisease}=userSlice.actions

export default userSlice.reducer
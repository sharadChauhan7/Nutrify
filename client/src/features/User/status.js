import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    userStatus:{
        address:"",
        age:null,
        weight:null,
        height:null,
        target_weight:null,
        phy_activity:"",
        target_speed:"",
        gender:"",
        target_calories:null,
        disease:[]
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
            // Set age as number
            state.userStatus.age=parseInt(action.payload);
        },
        setWeight:(state,action)=>{
            state.userStatus.weight=parseInt(action.payload);

        },
        setHeight:(state,action)=>{
            state.userStatus.height=parseInt(action.payload);
        },
        setTargetWeight:(state,action)=>{
            state.userStatus.target_weight=parseInt(action.payload);
        },
        setPhyActivity:(state,action)=>{
            state.userStatus.phy_activity=action.payload;
        },
        setTargetSpeed:(state,action)=>{
            state.userStatus.target_speed=action.payload;
        },
        setDisease:(state,action)=>{
            state.userStatus.disease=action.payload;
        },
        setGender:(state,action)=>{
            state.userStatus.gender=action.payload;
        }
    }
})

export const {setAddress,setGender,setAge,setWeight,setHeight,setTargetWeight,setPhyActivity,setTargetSpeed,setTargetCalories,setDisease}=userSlice.actions

export default userSlice.reducer
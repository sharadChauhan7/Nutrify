import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    medicine:{
        medicineName: "",
        medicineType: "",
        healthCondition: "",
        medicineFrequency: "",
        medicineTime: "",
        startDate: "",
        medicineDuration: "",
        createdAt:"",
        updatedAt:"",
    }
}

export const medicineSlice = createSlice({
    name: "medicine",
    initialState,
    reducers: {
        setMedicineName: (state, action) => {
            state.medicine.medicineName = action.payload;
        },
        setMedicineType: (state, action) => {
            state.medicine.medicineType = action.payload;
        },
        setHealthCondition: (state, action) => {
            state.medicine.healthCondition = action.payload;
        },
        setMedicineFrequency: (state, action) => {
            state.medicine.medicineFrequency = action.payload;
        },
        setMedicineTime: (state, action) => {
            state.medicine.medicineTime = action.payload;
        },
        setStartDate: (state, action) => {
            state.medicine.startDate = action.payload;
        },
        setMedicineDuration: (state, action) => {
            state.medicine.medicineDuration = action.payload;
        },
        setCreatedAt: (state, action) => {
            state.medicine.createdAt = action.payload;
        },
        setUpdatedAt: (state, action) => {
            state.medicine.updatedAt = action.payload;
        }
    }
});

export const { setMedicineName,setHealthCondition, setMedicineType, setMedicineFrequency, setMedicineTime, setStartDate, setMedicineDuration, setCreatedAt, setUpdatedAt } = medicineSlice.actions;

export default medicineSlice.reducer;
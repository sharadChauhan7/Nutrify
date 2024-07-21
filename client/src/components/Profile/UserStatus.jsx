import React from 'react'
import {goal_target,daily_activity} from '../../util/formdata'
import axios from 'axios'
import {toast} from 'sonner'
import { validateStatus } from '../../util/validator'
function UserStatus({ userStatus ,onEditComplete}) {

    const [editData , setEditData] = React.useState(userStatus);
    const [toEdit, setToEdit] = React.useState(false);
    console.log(editData);
    function handleChange(event){
        setEditData({...editData,[event.target.name]:event.target.value});
    }
    async function editStatus(){
        console.log(editData);
        try{
            const error = validateStatus.validate(editData).error;
            if(error){
                throw new Error(error.details[0].message);
            }
            const response = await axios.post('http://localhost:3000/api/user/editstatus',editData,{withCredentials:true});
            console.log(response.data);
            setToEdit(false);
            toast.success("Status updated successfully");
            if(onEditComplete) onEditComplete();
        }
        catch(e){
            console.log(e);
            toast.error(e.message);
        }
    }
    return (
        <div className=' h-1/2 bg-white rounded-3xl py-4 shadow-xl  px-10'>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl font-semibold text-gray-700 '>Overview:</h1>
                {toEdit ? <button onClick={editStatus} className='bg-primary text-xl text-black font-semibold px-4 py-2 rounded-lg '>Submit</button> : <button onClick={() => { setToEdit(true) }} className='bg-primary text-xl text-black font-semibold px-4 py-2 rounded-lg '>Edit Status</button>}
            </div>
            {/* Make a grid to store use overview */}
            <div className='grid grid-cols-4  gap-4 mt-4 h-5/6 py-10'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-semibold text-gray-700'>Gender:</h1>
                    {toEdit ? <select name="gender" id="gender" className='text-2xl font-semibold text-gray-700 border-2 border-gray-600' onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select> : <h1 className='text-xl text-gray-700'>{userStatus && userStatus.gender}</h1>}
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-semibold text-gray-700'>Target Calories</h1>
                    <h1 className='text-xl text-gray-700'>{userStatus && userStatus.target_calories} </h1>
                    {/* {toEdit?<input type="text" className='text-gray-700 text-xl border-2 p-1 border-gray-500' name='target_calories' value={editData.target_calories} onChange={handleChange}/>:<h1 className='text-xl text-gray-700'>{userStatus && userStatus.target_calories} </h1>} */}
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-semibold text-gray-700'>Age:</h1>
                    {/* <h1 className='text-xl text-gray-700'>{userStatus && userStatus.age}</h1> */}
                    {toEdit?<input type="text" className='text-gray-700 text-xl border-2 p-1 border-gray-500' name='age' value={editData.age} onChange={handleChange}/>:<h1 className='text-xl text-gray-700'>{userStatus && userStatus.age}</h1>}
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-semibold text-gray-700'>Height</h1>
                    {/* <h1 className='text-xl text-gray-700'>{userStatus && userStatus.height} cm</h1> */}
                    {toEdit?<input type="text" className='text-gray-700 text-xl border-2 p-1 border-gray-500' name='height' value={editData.height} onChange={handleChange}/>:<h1 className='text-xl text-gray-700'>{userStatus && userStatus.height} cm</h1>}
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-semibold text-gray-700'>Weight:</h1>
                    {/* <h1 className='text-xl text-gray-700'>{userStatus && userStatus.weight} kg</h1> */}
                    {toEdit?<input type="text" className='text-gray-700 text-xl border-2 p-1 border-gray-500' name='weight' value={editData.weight} onChange={handleChange}/>:<h1 className='text-xl text-gray-700'>{userStatus && userStatus.weight} kg</h1>}
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-semibold text-gray-700'>Target Weight:</h1>
                    {/* <h1 className='text-xl text-gray-700'>{userStatus && userStatus.target_weight} kg</h1> */}
                    {toEdit?<input type="text" className='text-gray-700 text-xl border-2 p-1 border-gray-500' name='target_weight' value={editData.target_weight} onChange={handleChange}/>:<h1 className='text-xl text-gray-700'>{userStatus && userStatus.target_weight} kg</h1>}
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-semibold text-gray-700'>Activity:</h1>
                    {/* <h1 className='text-xl text-gray-700'>{userStatus && userStatus.phy_activity}</h1> */}
                    {toEdit?<select className='text-gray-700 text-xl border-2 p-1 border-gray-500' name='phy_activity' onChange={handleChange}>
                        {daily_activity.map((item,index)=><option key={index} value={item}>{item}</option>)}
                    </select>:<h1 className='text-xl text-gray-700'>{userStatus && userStatus.phy_activity}</h1>}
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-semibold text-gray-700'>Target Speed:</h1>
                    {/* <h1 className='text-xl text-gray-700'>{userStatus && userStatus.target_speed} </h1> */}
                    {toEdit?<select className='text-gray-700 text-xl border-2 p-1 border-gray-500' name='target_speed' onChange={handleChange}>
                        {goal_target.map((item,index)=><option key={index} value={item}>{item}</option>)}
                    </select>:<h1 className='text-xl text-gray-700'>{userStatus && userStatus.target_speed} </h1>}
                </div>

            </div>
        </div>
    )
}

export default UserStatus
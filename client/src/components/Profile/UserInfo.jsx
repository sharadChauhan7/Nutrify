import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import Male from '../../assets/Male.png'
import Female from '../../assets/Female.webp'
import {validateProfile} from '../../util/validator'
import axios from 'axios'
import {toast} from 'sonner'
function UserInfo({userStatus,onEditComplete}) {
    // console.log(userStatus);
    async function editProfile(){
        try{
            console.log(editData); 
            editData.phone = editData.phone.toString(); 
            const error = validateProfile.validate(editData).error;
            if(error){
                throw new Error(error.details[0].message);
            }
            console.log(editData);
            const response = await axios.post('http://localhost:3000/api/user/edit',editData,{withCredentials:true});
            console.log(response.data);
            setToEdit(!toEdit);
            toast.success("Profile updated successfully");
            if(onEditComplete) onEditComplete();
        }
        catch(e){
            toast.error(e.message);
            console.log(e);
        }
    }
    const [editData, setEditData] = React.useState({_id:userStatus.user._id,name:userStatus.user.name,phone:userStatus.user.phone,address:userStatus.address,email:userStatus.user.email});
    async function handleChange(event){
        setEditData({...editData,[event.target.name]:event.target.value});
        // console.log(editData);
    }
    const [toEdit, setToEdit] = React.useState(false);
  return (
    <div className=' h-2/6 p-6 rounded-3xl  flex items-center  bg-white shadow-xl'>
        {userStatus && <div className='w-2/3 h-full flex-col px-16  gap-2'>
          {toEdit?<input type="text" className='text-gray-700 border-2 text-2xl mb-2 w-1/2 font-semibold rounded-xl px-1 border-gray-500' onChange={handleChange} name='name' value={editData.name} />:<h1 className='text-3xl text-gray-700 mb-2 font-semibold'>{userStatus.user.name}</h1>}
          {/* Contact info heading */}
          <div className='flex  flex-col gap-2'>
            <h1 className='text-2xl text-gray-700 mb-2 font-semibold'>Contact Details:</h1>
            <div className='flex flex-col gap-3 text-xl '>
              <div className='flex gap-2 items-center'>
                <EmailIcon />
                <h1 className='text-gray-700'>{userStatus.user.email}</h1>
              </div>
              <div className='flex gap-2 items-center'>
                <LocalPhoneIcon />
                {toEdit ? <input type="text" onChange={handleChange} className='text-gray-700 border-2 w-1/2 rounded-xl px-1 border-gray-500' name="phone" value={editData.phone == null ? 'XXX XXXX': editData.phone} /> : <h1 className='text-gray-700'>{userStatus.user.phone == null ? 'XXX XXXX': userStatus.user.phone}</h1>}
              </div>
              <div className='flex gap-2 items-center'>
                <HomeIcon />
                {toEdit ? <input type="text" onChange={handleChange} className='text-gray-700 border-2 w-1/2 rounded-xl px-1 border-gray-500' name="address" value={editData.address} /> : <h1 className='text-gray-700'>{userStatus.address}</h1>}
              </div>
            </div>
          
          </div>
        </div>}
        <div className='w-1/3 h-full flex flex-col items-center justify-center'>
        {userStatus && <img src={userStatus.gender == 'Male' ? Male : Female} alt="" className='w-full h-2/3 object-contain' />}
        {/* Edit Profile Button */}
        {toEdit ? <button onClick={editProfile} className='bg-primary text-xl text-black font-semibold px-4 py-2 rounded-lg mt-4'>Submit</button> : <button onClick={()=>{setToEdit(true)}} className='bg-primary text-xl text-black font-semibold px-4 py-2 rounded-lg mt-4'>Edit Profile</button>}
        </div>
      </div>
  )
}

export default UserInfo
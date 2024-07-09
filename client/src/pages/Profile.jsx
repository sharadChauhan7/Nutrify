import React, { useEffect } from 'react'
import Male from '../assets/Male.png'
import Female from '../assets/Female.webp'
import axios from 'axios'
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import CalorieChart from '../components/Charts/CalorieChart';
import WeightChart from '../components/Charts/WeightChart';

function Profile() {
  const [userStatus, setUserStatus] = React.useState(null);

  console.log(userStatus);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/user/status',
          { withCredentials: true } // Important for sending cookies
        );
        console.log(response.data);
        setUserStatus(response.data);
      }
      catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='h-screen p-2 pt-[4.8rem] flex gap-4 bg-slate-50'>
      <div className=' flex-grow-2 w-3/12 p-2 rounded-3xl flex justify-center items-center flex-col bg-white shadow-xl'>
        {userStatus && <img src={userStatus.gender == 'Male' ? Male : Female} alt="" className='w-2/3 h-1/2 object-contain' />}
        {userStatus && <div className='w-full h-1/2 flex flex-col gap-2'>
          {/* User Info :Name, email,Address,EditProfile Button */}
          <h1 className='text-3xl text-gray-700 mb-4 font-semibold'>{userStatus.user.name}</h1>
          {/* Contact info heading */}
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl text-gray-700 mb-4 font-semibold'>Contact Details:</h1>
            <div className='flex flex-col gap-5 text-xl '>
              <div className='flex gap-2 items-center'>
                <EmailIcon />
                <h1 className='text-gray-700'>{userStatus.user.email}</h1>
              </div>
              <div className='flex gap-2 items-center'>
                <LocalPhoneIcon />
                <h1 className='text-gray-700'>{userStatus.user.phone == null ? 'XXXXXXXXXX' : userStatus.user.phone}</h1>
              </div>
              <div className='flex gap-2 items-center'>
                <HomeIcon />
                <h1 className='text-gray-700'>{userStatus.address}</h1>
              </div>
            </div>
            {/* Edit Profile Button */}
            <button className='bg-primary text-xl text-black font-semibold px-4 py-2 rounded-lg mt-4'>Edit Profile</button>
          </div>
        </div>}
      </div>
      <div className='flex flex-col h-full w-9/12 gap-4  '>
        <div className=' h-1/2 bg-white rounded-3xl py-4 shadow-xl  px-10'>
          <h1 className='text-4xl font-semibold text-gray-700'>Overview:</h1>
          {/* Make a grid to store use overview */}
          <div className='grid grid-cols-4  gap-4 mt-4 h-5/6 py-10'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl font-semibold text-gray-700'>Gender:</h1>
              <h1 className='text-xl text-gray-700'>{userStatus && userStatus.gender}</h1>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl font-semibold text-gray-700'>Target Calories</h1>
              <h1 className='text-xl text-gray-700'>{userStatus && userStatus.target_calories} </h1>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl font-semibold text-gray-700'>Age:</h1>
              <h1 className='text-xl text-gray-700'>{userStatus && userStatus.age}</h1>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl font-semibold text-gray-700'>Height</h1>
              <h1 className='text-xl text-gray-700'>{userStatus && userStatus.height} cm</h1>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl font-semibold text-gray-700'>Weight:</h1>
              <h1 className='text-xl text-gray-700'>{userStatus && userStatus.weight} kg</h1>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl font-semibold text-gray-700'>Target Weight:</h1>
              <h1 className='text-xl text-gray-700'>{userStatus && userStatus.target_weight} kg</h1>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl font-semibold text-gray-700'>Activity:</h1>
              <h1 className='text-xl text-gray-700'>{userStatus && userStatus.phy_activity}</h1>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl font-semibold text-gray-700'>Target Speed:</h1>
              <h1 className='text-xl text-gray-700'>{userStatus && userStatus.target_speed} </h1>
            </div>

          </div>
        </div>
        <div className='flex h-1/2 w-full gap-2'>
          <div className=' calorieChart h-full w-full  bg-white rounded-3xl p-2 shadow-xl'>
            <CalorieChart className="h-full w-full"/>
          </div>
          <div className=' weightChart h-full w-full bg-white rounded-3xl p-2 shadow-xl'>
            <WeightChart className="h-full w-full"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
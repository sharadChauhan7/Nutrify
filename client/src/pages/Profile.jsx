import React, { useEffect, useState } from 'react'
import Male from '../assets/Male.png'
import Female from '../assets/Female.webp'
import axios from 'axios'
import UserInfo from '../components/Profile/UserInfo'
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import CalorieChart from '../components/Charts/CalorieChart';
import WeightChart from '../components/Charts/WeightChart';
import UserStatus from '../components/Profile/UserStatus';
import {getLast7DaysMeals} from '../util/methods'
import InfoCard from '../components/Profile/InfoCard'
import { ref } from 'joi'

function Profile() {
  const [userStatus, setUserStatus] = React.useState(null);
  const [userMeals, setUserMeals] = React.useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/status`,
          { withCredentials: true } // Important for sending cookies
        );
        const mealRespons = await axios.get(`${import.meta.env.VITE_SERVER_URL}calorie/getMeals`, { withCredentials: true });
        console.log(mealRespons.data);
        // console.log(response.data);
        setUserMeals(mealRespons.data);
        setUserStatus(response.data);
      }
      catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  const refreshData = () => {
    setRefreshTrigger(!refreshTrigger); // Step 3
  };
  // Send this fn to util
  // console.log(refreshTrigger);
  return (
    <>
    <div className='h-screen w-full flex flex-col mt-10 overflow-auto gap-4 bg-slate-50 p-8'>
    <p className=' font-bold text-5xl'>Profile</p>
      {userStatus && <UserInfo userStatus={userStatus} onEditComplete={refreshData} />}
      <div className='flex flex-col h-full w-full gap-4  '>
        {userStatus && <UserStatus userStatus={userStatus} onEditComplete={refreshData} />}
        <div className='flex h-1/2 w-full gap-2'>
          <div className=' weightChart h-full w-full bg-white rounded-3xl p-2 shadow-xl'>
            {userStatus && <InfoCard data={userStatus.calorie_distribution} title='Breakdown' />}
          </div>
          <div className=' weightChart h-full w-full bg-white rounded-3xl p-2 shadow-xl'>
            {userStatus && <InfoCard data={userStatus.macros} title='Macros' />}
          </div>
        </div>
        {/* <div className='flex h-1/2  w-full gap-2'>
          <div className=' calorieChart h-full w-full  bg-white rounded-3xl p-2 shadow-xl'>
            <CalorieChart mealData={ userMeals && getLast7DaysMeals(userMeals)} userStatus={userStatus}  className="h-full w-full" />
          </div>
          <div className=' weightChart h-full w-full bg-white rounded-3xl p-2 shadow-xl'>
            <WeightChart className="h-full w-full" />
          </div>
        </div> */}
      </div>
    </div>
    </>
  )
}

export default Profile
import React from 'react'
import Camera from '../components/shared/Camera.jsx'
import WeightChart from '../components/Charts/WeightChart.jsx'
import BasicModal from '../components/shared/BasicModal.jsx'
import CalorieChart from '../components/Charts/CalorieChart.jsx'
import {getLast7DaysMeals} from '../util/methods'
import axios from 'axios'
function Home() {
  // Home page
  // Change tab title to 'Home'
  const [userStatus, setUserStatus] = React.useState(null);
  const [userMeals, setUserMeals] = React.useState(null);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/user/status',
          { withCredentials: true } // Important for sending cookies
        );
        setUserStatus(response.data);
        const mealRespons = await axios.get('http://localhost:3000/api/calorie/getMeals', { withCredentials: true });
        console.log(mealRespons.data);
        // console.log(response.data);
        setUserMeals(mealRespons.data);
      }
      catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);
  const [modalStat, setModalStat] = React.useState({
    open: false,
    title: '',
    description: ''
  });
  document.title = 'Home'
  return (
    <>
      <BasicModal modalStat={modalStat} setOpen={setModalStat} />
      <div className='h-screen w-4/5 bg-slate-50 overflow-auto '>
        <div className=' h-full grid grid-rows-2 grid-cols-2 gap-2 p-2'>
          <div className="p-2">
          <div className=' flex flex-col justify-center items-start h-full px-10 gap-5 '>
            <p className=' text-2xl rounded-xl p-2 font-semibold text-[#ffd60a] bg-gray-700'>
              Track your daily Calorie int
            </p>
            <p className='text-5xl font-semibold text-gray-700'>
              Track your Daily <span className='text-[#ffd60a]'>Calorie intake</span> with MyHealth
            </p>
          </div>
          </div>
          <div className=" flex  items-center">
          {userStatus && <Camera userStatus={userStatus} triggerModal={setModalStat} />}
          </div>
          <div className=" p-4"><CalorieChart mealData={ userMeals && getLast7DaysMeals(userMeals)} userStatus={userStatus}  className="h-full w-full" /></div>
          <div className=" p-4"><WeightChart className="h-full w-full" /></div>
        </div>
      </div>
    </>
  )
}

export default Home
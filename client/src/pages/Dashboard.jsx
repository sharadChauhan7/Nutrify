import React from 'react'
import Webcam from 'react-webcam'
import WeightChart from '../components/Charts/WeightChart'
import CalorieChart from '../components/Charts/CalorieChart'
import { getLast7DaysMeals } from '../util/methods'
import WeightCard from '../components/Charts/WeightCard'
function Dashboard() {
  const [userStatus, setUserStatus] = React.useState(null);
  const [userMeals, setUserMeals] = React.useState(null);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/status`,
          { withCredentials: true } // Important for sending cookies
        );
        setUserStatus(response.data);
        const mealRespons = await axios.get(`${import.meta.env.VITE_SERVER_URL}calorie/getMeals`, { withCredentials: true });
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
  return (
    <div className='h-screen w-4/5 flex flex-col overflow-auto gap-4 bg-slate-50 p-8'>
      <p className=' font-bold text-5xl'>Dashboard</p>
      <div className='h-screen border-2 p-4 rounded-3xl overflow-y-auto flex flex-col gap-4 bg-gray-200 w-full '>
        <WeightCard />
        <WeightCard />
        <WeightCard />
        <WeightCard />
          {/* <div className=" p-4"><CalorieChart mealData={userMeals && getLast7DaysMeals(userMeals)} userStatus={userStatus} className="h-full w-full" /></div>
          <div className=" p-4"><WeightChart className="h-full w-full" /></div> */}
      </div>
    </div>
  )
}

export default Dashboard
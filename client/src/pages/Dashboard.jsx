import React from 'react'
import Webcam from 'react-webcam'
import WeightChart from '../components/Charts/WeightChart'
import CalorieChart from '../components/Charts/CalorieChart'
import { getLast7DaysMeals } from '../util/methods'
// import WeightChart from '../components/Charts/WeightChart'
import DashboardCard from '../components/Charts/DashboardCard'
import { Difference } from '@mui/icons-material'
import axios from 'axios'
import { toast } from 'sonner'
function Dashboard() {
  const [userWeight, setUserWeight] = React.useState([]);
  const [userMeals, setUserMeals] = React.useState(null);
  const [userStatus, setUserStatus] = React.useState(null);
  const [refreshTrigger, setRefreshTrigger] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  let weightData = {
    heading:"Weight",
    unit:"Kg",
    difference:{
      add:"Gainded",
      sub:"Lost"
    },
  }
  let caloriData = {
    heading:"Calories",
    unit:"cal",
    difference:{
      add:"Over",
      sub:"Remaining"
    },
  }

  React.useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}dashboard`,
          { withCredentials: true } // Important for sending cookies
        );
        setUserWeight(response.data.weightTracker);
        const mealRespons = await axios.get(`${import.meta.env.VITE_SERVER_URL}calorie/getMeals`, { withCredentials: true });

        const userStatres = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/status`,{withCredentials:true});
        setUserStatus(userStatres.data);


        setUserMeals( getLast7DaysMeals(mealRespons.data));
        setLoading(false);
      }
      catch (e) {
        console.log(e);
      }
    };

    fetchData();
  },[refreshTrigger]);
  const refreshData = () => {
    setRefreshTrigger(!refreshTrigger); // Step 3
  };

  async function updateWeight(value){
    try{
      const newWeight = value;
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}dashboard/updateUserWeight`,{newWeight},{
        withCredentials:true
      });

      toast.success(res.data);
      refreshData();
      
    }
    catch(err){
      console.log(err);
      toast.error("Error in updation");
    }
  }
  async function updateCalorie(value){
    console.log(value);
    console.log("Value updated");
  }

  return (
    !loading && <div className='h-screen w-full flex mt-10 flex-col overflow-auto gap-4 bg-slate-50 p-8'>
      <p className=' font-bold text-5xl'>Dashboard</p>
      <div className='h-screen border-2 p-4 rounded-3xl overflow-y-auto flex flex-col gap-4 bg-gray-200 w-full '>
        <DashboardCard MyChart={WeightChart} cardData={weightData} chartData={userWeight} updateData={updateWeight} type="weight" target={userStatus.target_weight} />
        <DashboardCard MyChart={CalorieChart} cardData={caloriData} chartData={userMeals} updateData={updateCalorie} type="calories" target={userStatus.target_calories}/>
        {/* <DashboardCard MyChart={WeightChart} />
        <DashboardCard MyChart={WeightChart} />
        <DashboardCard MyChart={WeightChart} /> */}
          {/* <div className=" p-4"><CalorieChart mealData={userMeals && getLast7DaysMeals(userMeals)} userStatus={userStatus} className="h-full w-full" /></div>
          <div className=" p-4"><WeightChart className="h-full w-full" /></div> */}
      </div>
    </div>
  )
}

export default Dashboard
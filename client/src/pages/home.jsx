import React from 'react'
import Camera from '../components/shared/Camera.jsx'
import BasicModal from '../components/shared/BasicModal.jsx'
import { Link } from 'react-router-dom'
import TodaysDiet from '../components/diet/TodaysDiet.jsx'
import axios from 'axios'
import { toast } from 'sonner'
function Home() {
  // Home page
  // Change tab title to 'Home'
  const [userStatus, setUserStatus] = React.useState(null);
  const [ditePlan, setDitePlan] = React.useState(null);
  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  React.useEffect(() => {
    async function fetchData() {
      try {
        const statusRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/status`,
          { withCredentials: true } // Important for sending cookies
        );
        setUserStatus(statusRes.data);
        const diteRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}diet`,
          { withCredentials: true } // Important for sending cookies
        );

        if(diteRes.data){
          let weekday = dayNames[new Date().getDay()];
          let todayPlan = {planedDite:diteRes.data.planedDite[weekday],planedcalories:diteRes.data.planedcalories[weekday]};
          setDitePlan(todayPlan);
        }
      }
      catch (e) {
        // console.log(e);
        toast.error(e.response.data.message);
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
      <div className='h-screen w-full bg-slate-50 overflow-auto pt-10'>
        <div className=' h-full grid grid-rows-2 grid-cols-2 gap-2 p-2'>

          <div className="p-2">
            <div className=' flex flex-col justify-center items-start h-full px-10 gap-5 '>
              <p className=' text-2xl rounded-xl p-2 font-semibold text-[#ffd60a] bg-gray-700'>
                Track your daily Calorie int
              </p>
              <p className='text-5xl font-semibold text-gray-700'>
                Track your Daily <span className='text-[#ffd60a]'>Calorie intake</span> with Healthy<span className='text-[#ffd60a]'>AI</span>
              </p>
            </div>
          </div>
          <div className=" flex  items-center">
            {userStatus && <Camera userStatus={userStatus} triggerModal={setModalStat} />}
          </div>
          <div className="border-2 col-span-2 rounded-3xl bg-white shadow-2xl  p-4">
          {ditePlan ? <TodaysDiet ditePlan={ditePlan} />:        <div className=' w-full h-full flex justify-center items-center'>
          <div className='flex flex-col justify-center items-center w-2/5 gap-5'>
            <h1 className='text-3xl font-bold text-center'>Lets Create a dite plan for you</h1>
            <Link to='/diet'>
            <button className='bg-primary font-bold active:bg-yellow-500 max-w-48 shadow-2xl hover:bg-yellow-400 py-5 px-3 rounded-xl' onClick={() => { setModelOpen(!modelOpen) }}>
              Create Dite Plan
            </button>
            </Link>
          </div>
        </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
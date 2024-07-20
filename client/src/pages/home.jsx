import React from 'react'
import Camera from '../components/shared/Camera.jsx'
import Medicine from '../components/shared/Medicine.jsx'
import Doctors from '../components/shared/Doctors.jsx'
import axios from 'axios'
function Home() {
  // Home page
  // Change tab title to 'Home'
  const [userStatus, setUserStatus] = React.useState(null);
  React.useEffect(() => {
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
  document.title = 'Home'
  return (
    <>
      <div className='h-screen  '>
        <div className='flex items-center justify-center flex-wrap h-4/6 pt-20'>
          <div className='w-1/2 flex flex-col justify-center items-start px-10 gap-5  h-4/5 '>
            <p className='border-2 text-2xl rounded-xl p-2 font-semibold text-[#ffd60a] bg-gray-700'>
              Track your daily Calorie int
            </p>
            <p className='text-7xl font-semibold text-gray-700'>
              Track your Daily <span className='text-[#ffd60a]'>Calorie intake</span> with MyHealth
            </p>
          </div>
          <div className='w-1/2 h-4/5 px-4'>
           {userStatus&&<Camera userStatus={userStatus} />} 
          </div>
          <div className=' w-full border-red-500 flex justify-center gap-10'>
            <div>
              <Medicine />
            </div>
            <div>
              <Doctors />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
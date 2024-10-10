import React from 'react'
import DiteModal from '../components/diet/DiteModal'
import axios from 'axios'
function Dite() {
  let [modelOpen, setModelOpen] = React.useState(false);
  let [diet, setDiet] = React.useState(null);

  async function getDiet() {
    try {
      const response = await axios.get(`http://localhost:3000/api/diet`, {
        withCredentials: true
      });
      setDiet(response.data);
    }
    catch (e) {
      setDiet(null);
      console.log(e);
    }
  }

  React.useEffect(() => {
    getDiet();
  }, []);
  console.log(diet);
  return (
    <>
      {!diet ? (<div><div className='h-screen flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-2/5 gap-5'>
          <h1 className='text-3xl font-bold text-center'>You dont have your dite Plan press below to make one</h1>
          <button className='bg-primary font-bold active:bg-yellow-500 max-w-36 py-5 px-2 rounded-3xl' onClick={() => { setModelOpen(!modelOpen) }}>
            Create Dite Plan
          </button>
        </div>
      </div>
        <DiteModal val={modelOpen} close={setModelOpen} /></div>) : (
        <div className='h-screen  p-5 justify-center mt-16 items-center'>
          <h1 className='font-bold text-5xl py-4'>My Weekly Meal Plan</h1>
          <div className='w-full h-full justify-center grid grid-rows-1 grid-cols-7 gap-2 bg-gray-100 p-4 rounded-xl'>
            {diet && (Object.keys(diet.planedDite).map((day, index) => {

              return <div className='grid grid-rows-5 grid-cols-1 gap-2 '>
                <div className='bg-black rounded-xl flex justify-center items-center h-32 w-48'>
                  <h1 className='text-white'>Calorie Card</h1>
                </div>

                {diet.planedDite[day].map((meal, index) => {
                  // console.log(meal);
                  return card
                })}
              </div>
            }))}
          </div>
        </div>)}
    </>

  )
}


let card = <div className='bg-gray-200 rounded-xl flex justify-center items-center h-32 w-48'>
  <h1 className='text-white'>Meal Card</h1>
</div>



export default Dite
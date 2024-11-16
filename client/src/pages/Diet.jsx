import React from 'react'
import DiteModal from '../components/diet/DiteModal'
import axios from 'axios'
import RecipieModal from '../components/diet/RecipieModal';
import AlternateModal from '../components/diet/AlternateModal';
// Nanoid
import { nanoid } from '@reduxjs/toolkit';
import { prev } from '../features/User/flow';
function Diet() {
  let [modelOpen, setModelOpen] = React.useState(false);
  let [diet, setDiet] = React.useState(null);
  let [RecipieModalOpen, setRecipieModalOpen] = React.useState({ open: false, data: null});
  let [choiceModal, setChoiceModal] = React.useState({ open: false, data: null,prevMeal:null});

  async function getDiet() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}diet`, {
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
  }, [choiceModal,RecipieModalOpen]);
  return (
    <>
  {RecipieModalOpen.open && <RecipieModal data={RecipieModalOpen.data} close={setRecipieModalOpen} choiceModal={setChoiceModal} />}
  {choiceModal.open && <AlternateModal choiceModal={choiceModal} fullDiet={diet} close={setChoiceModal} />}
      {!diet ? (<div className=' w-4/5 bg-slate-50'>
        <div className='h-screen border-2 w-full flex justify-center items-center'>
          <div className='flex flex-col justify-center items-center w-2/5 gap-5'>
            <h1 className='text-3xl font-bold text-center'>Lets Create a dite plan for you</h1>
            <button className='bg-primary font-bold active:bg-yellow-500 max-w-48 shadow-2xl hover:bg-yellow-400 py-5 px-3 rounded-xl' onClick={() => { setModelOpen(!modelOpen) }}>
              Create Dite Plan
            </button>
          </div>
        </div>
        <DiteModal val={modelOpen} close={setModelOpen} /></div>) :
        (

          <div className='w-4/5 h-screen overflow-auto bg-slate-50 p-8'>
            <p className=' font-bold text-5xl pb-4'>Diet Plan</p>
            <div key={nanoid()} className=' p-3  grid grid-flow-col grid-rows-5 gap-3  bg-gray-200 overflow-auto overflow-y-scroll  rounded-xl'>
              {diet && (Object.keys(diet.planedDite).map((day, index) => {
                return <React.Fragment key={day}>

                  <Calorie key={nanoid()} data={diet.planedcalories} day={day} />
                  {diet.planedDite[day].map((meal, index) => {
                    let type = '';
                    if (index === 0) {
                      type = 'Breakfast';
                    } else if (index === 1) {
                      type = 'Lunch';
                    } else if (index === 2) {
                      type = 'Snacks';
                    } else {
                      type = 'Dinner';
                    }
                    return <MealCard key={`${day}-${index}`} data={meal} type={type} open={setRecipieModalOpen}  />
                  })}
                </React.Fragment>

              }))}
            </div>
          </div>)}
    </>

  )
}


export const Calorie = ({ data,day }) => {
  return <div>

  <div className='bg-white rounded-xl shadow-2xl flex  justify-center items-center h-10 mb-4  w-52'>
                    <h1 className='text-black font-bold'>{day.toUpperCase()}</h1>
                  </div>
  <div className='bg-white shadow-2xl rounded-xl p-2 text-center items-center h-20 w-52'>
    <h4 className='text-sm font-bold'>{data[day].calories} calories</h4>
    <div className='text-sm flex justify-evenly items-center'>
      <div className='font-bold pb-2'>
        <p className='text-lg  text-[#769D5c]'>{data[day].protein}</p>
        <p className='text-gray-400 text-sm'>Protein</p>
      </div>
      <div className='font-bold pb-2'>
        <p className='text-lg  text-[#FC9C63]'>{data[day].carbs}</p>
        <p className='text-gray-400'>Carbs</p>
      </div>
      <div className='font-bold pb-2'>
        <p className='text-lg  text-[#E96A8c]'>{data[day].fats}</p>
        <p className='text-gray-400'>Fats</p>
      </div>
    </div>
  </div>
  </div>
}

export const MealCard = ({ data,type,open }) => {

  

  const handleClick = () => {
    open({open:true,data:data});
  };

  let demoImage={
    Breakfast:'https://plus.unsplash.com/premium_photo-1673545518947-ddf3240090b1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    Lunch:'https://media.istockphoto.com/id/2099977857/photo/mughlai-chicken-tikka-biryani-rice-pulao-with-garlic-onion-and-raita-served-in-plate-isolated.webp?a=1&b=1&s=612x612&w=0&k=20&c=CX2ZMH7kAZu9vEqJENcI1qZjgZG1NJC5nOKxVQW5U2M=',
    Snacks:'https://images.unsplash.com/photo-1622155037308-2fad9f04f86d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNuYWNrc3xlbnwwfHwwfHx8MA%3D%3D',
    Dinner:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D'
  }
  return (
    <div
      className="w-52 h-36 bg-white rounded-lg shadow-md p-4 flex flex-col justify-between hover:bg-green-200 hover:border-2 border-green-300 cursor-pointer transition-colors duration-200"
      onClick={handleClick}
    >
      <div className="text-sm text-gray-400 font-semibold">{type}</div>
      <div className="text-lg font-bold">{data.name}</div>
      <div className="flex items-center justify-between">
        <img
          src={demoImage[type]}
          alt="Cereal"
          className="w-10 h-10 object-cover rounded-full"
        />
        <span className="text-sm text-gray-500">{data.nutrition.calories} cal</span>
      </div>
    </div>
  );


}




export default Diet
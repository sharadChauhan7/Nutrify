// import React from 'react'
import { useParams } from 'react-router-dom'
import React, { useEffect } from 'react';
import axios from 'axios';
import { nanoid } from '@reduxjs/toolkit';
function Meals() {
  let { id } = useParams();
  React.useEffect(() => {
    async function getMeals() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}calorie/getMeals`, {
          withCredentials: true
        });
        setMeals(response.data);
      }
      catch (e) {
        console.log(e);
      }
    }
    getMeals();
  }, [])
  const [meals, setMeals] = React.useState([]);

  async function deleteMeal(intake,meal){
    try{
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}calorie/${intake}/meals/${meal}`, {
        withCredentials: true
      });
      console.log(response.data);
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <div className='h-screen w-4/5 flex flex-col overflow-auto  bg-slate-50 p-8'>
            <p className=' font-bold text-5xl pb-4'>You'r Meals</p>
          <div className='border-2 rounded-3xl bg-gray-200 overflow-auto no-scrollbar h-full overflow-y-scroll  p-1'>
        {/* <div className=" z-10 inset-0 flex items-center justify-center"> */}
          {/* <div className="relative bg-white border-2 border-red-500 rounded-lg overflow-hidden shadow-xl max-w-screen w-full m-4 transition ease-out duration-300 transform "> */}
            {/* Modal panel */}
            {/* <div className=" max-w-screen-md p-6 " style={{ maxHeight: '70vh', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.375rem', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}> */}
              {meals?<div className='flex items-center h-full font-semibold justify-center text-5xl'>No Meals Found</div>:meals.reverse().map((meal, idx) => {
                return (
                  <div className=' border-2 m-2 rounded-3xl p-2 bg-slate-50 overflow-x-auto no-scrollbar ' key={nanoid()} >
                    <div className='text-4xl my-2 font-bold text-gray-800'>Date: {meal.date}</div>
                    <div className='flex'>
                      {meal.meals.map((food,idx)=>{
                        return (
                          <div className='flex flex-col mx-2 border-2 shadow-xl rounded-xl' key={nanoid()}>
                            {/* <h4 className='text-3xl font-bold text-gray-700'>Meal :{idx+1}</h4> */}
                            {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>{deleteMeal(meal._id,food._id)}}>Delete</button> */}
                            {food.food_items.map((item,idx)=>{
                              return (
                                <MealCard key={nanoid()} mealType={food.meal_type} image_url={food.image_url} calories={item.calories_per_serving} itemName={item.name} itemData={item} />
                              )
                            })}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        // {/* </div> */}

      // </div>
    // </div>
  )
}

const MealCard = ({ mealType,image_url, calories, itemName ,itemData }) => 
  {
  return <div className="bg-white rounded-xl shadow-lg max-w-64 min-w-64 max-h-80 min-h-80 p-5 ">

  <div className="flex flex-col gap-3">
    {/* Image Section */}
    <div className="h-1/5">
      <img
        src={image_url}
        alt="Berry Cereal"
        className="rounded-lg max-h-40 min-h-40 w-full object-cover"
      />
    </div>

    {/* Content Section */}
    <div className="h-4/5 ">
      <div className="flex justify-between gap-2 items-center   h-12">
        <h2 className="text-xl font-bold">{itemName>14?`${itemName}..`:itemName}</h2>
        <h2 className="text-xs text-white rounded-3xl bg-gray-500 py-1 px-2 font-bold">{mealType}</h2>
      </div>

      <div className="flex justify-evenly mt-4 ">
        <div className="text-center ">
          <p className="text-xl font-semibold">{itemData.calories_per_serving}</p>
          <p className="text-xs text-gray-500">CALORIES</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-green-500">{itemData.nutrients.protein}</p>
          <p className="text-xs text-gray-500">PROTEIN</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-orange-500">{itemData.nutrients.carbs}</p>
          <p className="text-xs text-gray-500">CARBS</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-pink-500">{itemData.nutrients.fats}</p>
          <p className="text-xs text-gray-500">FAT</p>
        </div>
      </div>
    </div>
  </div>
  </div>
  };



export default Meals;
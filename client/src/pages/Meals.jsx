// import React from 'react'
import { useParams } from 'react-router-dom'
import React, { useEffect } from 'react';
import axios from 'axios';
function Meals() {
  let { id } = useParams();
  console.log(id);
  React.useEffect(() => {
    async function getMeals() {
      try {
        const response = await axios.get(`http://localhost:3000/api/calorie/getMeals/${id}`, {
          withCredentials: true
        });
        console.log(response.data);
        setMeals(response.data);
      }
      catch (e) {
        console.log(e);
      }
    }
    getMeals();
  }, [])
  const [meals, setMeals] = React.useState([]);
  return (
    <div className=' h-screen w-full bg-gray-300 flex flex-col justify-center items-center'>
      <div className=" mx-auto w-1/2 py-8">
        <div className="flex justify-between mb-6">
          <div className="text-lg font-semibold">
            of 2907
          </div>
        </div>
        {/* <div className=' overflow-auto border-4 border-red-400  w-64 h-64 mt-[10%] py-10'>
          {meals.map((meal, idx) => {
          <div className='w-full'>
            <div>Date: </div>
            <MealCard mealType="Breakfast" calories="180" itemName="Item name" />
            <MealCard mealType="Lunch" calories="180" itemName="Item name" />
            <MealCard mealType="Dinner" calories="180" itemName="Item name" />
          </div>
          <div className='w-full h-full'>
            <div>Date: </div>
            <MealCard mealType="Breakfast" calories="180" itemName="Item name" />
            <MealCard mealType="Lunch" calories="180" itemName="Item name" />
            <MealCard mealType="Dinner" calories="180" itemName="Item name" />
          </div>
          <div className='w-full h-full'>
            <div>Date: </div>
            <MealCard mealType="Breakfast" calories="180" itemName="Item name" />
            <MealCard mealType="Lunch" calories="180" itemName="Item name" />
            <MealCard mealType="Dinner" calories="180" itemName="Item name" />
          </div>Name

           // })} 
        </div> */}
        <div className="fixed z-10 inset-0 flex items-center justify-center">
          <div className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-screen-md w-full m-4 transition ease-out duration-300 transform ">
            {/* Modal panel */}
            <div className="px-6 py-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">You'r Daily Meals</h3>
            </div>
            <div className="prose max-w-screen-md p-6 overflow-y-auto" style={{ maxHeight: '70vh', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.375rem', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
              {meals.map((meal, idx) => {
                console.log(meal);
                return (
                  <div className=''>
                    <div className='text-4xl font-bold text-gray-800'>Date: {meal.date}</div>
                    <div className=''>
                      {meal.meals.map((food,idx)=>{
                        return (
                          <div className='flex flex-col justify-between gap-5'>
                            <h4 className='text-3xl font-bold text-gray-700'>Meal :{idx+1}</h4>
                            {food.food_items.map((item,idx)=>{
                              return (
                                <MealCard mealType={food.meal_type} calories={item.calories_per_serving} itemName={item.name} itemData={item} />
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
        </div>

      </div>
    </div>
  )
}

const MealCard = ({ mealType, calories, itemName ,itemData }) => (
  <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl ">
    <div className="md:flex">
      <div className="md:shrink-0">
        <img className="h-48 w-full object-cover md:h-full md:w-48" src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D" alt="Modern building architecture">
        </img>
      </div>
      <div className="p-8 w-full">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Calories: {calories}</div>
        <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Meal Content : {itemName}</a>
        <div className="flex flex-wrap gap-4 my-2 text-lg justify-between  items-center   text-slate-500">
          <p>Carbs : {itemData.nutrients.carbs}</p>
          <p>Fats : {itemData.nutrients.fats}</p>
          <p>Fiber : {itemData.nutrients.fiber}</p>
          <p>Protein : {itemData.nutrients.protein}</p>
        </div>
      </div>
    </div>
  </div>
);



export default Meals;
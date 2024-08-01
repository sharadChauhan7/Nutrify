// import React from 'react'
import { useParams } from 'react-router-dom'
// function Meals() {
//     let { id } = useParams();
//     console.log(id);
//     React.useEffect(()=>{
//         async function getMeals(){
//             try{
//                 const response = await axios.get(`http://localhost:3000/api/calorie/getMeals/${id}`,{
//                     withCredentials:true
//                 });
//                 console.log(response.data);
//             }
//             catch(e){
//                 console.log(e);
//             }
//         }
//         getMeals();
//     })
//   return (
//     <div className='text-5xl h-screen flex justify-center items-center'>Meals</div>
//   )
// }
import React from 'react';

const MealCard = ({ mealType, calories, itemName }) => (
  <div className="border border-gray-300 rounded-lg p-4 mb-4">
    <h2 className="text-lg font-semibold text-gray-700">{mealType}</h2>
    <div className="flex items-center mt-2">
      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
        <span className="text-sm text-gray-500">Image</span>
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500">Calories: {calories}</p>
        <p className="text-sm text-gray-500">Name: {itemName}</p>
      </div>
    </div>
  </div>
);

const MealPlan = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    return (
    <div className=' h-screen w-full flex flex-col justify-center items-center'>
  <div className="container mx-auto w-1/2 py-8">
    <div className="flex justify-between mb-6">
      <div className="text-lg font-semibold">
        500 of 2907
      </div>
    </div>
    <div>
      <MealCard mealType="Breakfast" calories="180" itemName="Item name" />
      <MealCard mealType="Lunch" calories="180" itemName="Item name" />
      <MealCard mealType="Dinner" calories="180" itemName="Item name" />
    </div>
  </div>
   </div>
)};

// export default MealPlan;


export default MealPlan
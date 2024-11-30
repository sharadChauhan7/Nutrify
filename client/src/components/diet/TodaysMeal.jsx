import React from 'react'

function TodaysMeal({meal,type}) {
    const time = ['Breakfast', 'Lunch', 'Snacks', 'Dinner']

    const image ={
        Breakfast: 'https://plus.unsplash.com/premium_photo-1663840277579-ff6147963ce7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        Lunch: 'https://media.istockphoto.com/id/1978755098/photo/healthy-high-protein-vegan-plant-based-lunch-bowl-with-mushrooms-roasted-cauliflower.webp?a=1&b=1&s=612x612&w=0&k=20&c=l3va2maGJgWei-UrzL900fjnjTshrWOZ01qQk5-Vb9s=',
        Snacks: 'https://media.istockphoto.com/id/1722539534/photo/unhealthy-eating-concept-group-of-food-high-in-sugars-and-fat.webp?a=1&b=1&s=612x612&w=0&k=20&c=cqYL4hdy0g3EXOC0GMUv5YhEFxWpNb614lWXN6_6lTE=',
        Dinner: 'https://media.istockphoto.com/id/958003864/photo/grilled-chicken-breast-with-salad-of-chicory-tomatoes-and-lettuce-close-up-horizontal-top-view.jpg?s=612x612&w=0&k=20&c=LStzoVCR4kDmOjdOLmYTZ98No5jVjgNXxnCa248LquA='
    }
  return (
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 ">

        <div className="flex flex-col gap-6">
          {/* Image Section */}
          <div className="h-1/5">
            <img
              src={image[time[type]]}
              alt="Berry Cereal"
              className="rounded-lg h-full"
            />
          </div>

          {/* Content Section */}
          <div className="h-3/5">
            <div className="flex justify-between items-center my-4">
              <h2 className="text-xl font-bold">{meal.name.length>14?`${meal.name.slice(0,10)}..`:meal.name}</h2>
              <h2 className="text-sm text-white rounded-3xl bg-gray-500 py-1 px-2 font-bold">{time[type]}</h2>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="text-center">
                <p className="text-lg font-semibold">{meal.nutrition.calories}</p>
                <p className="text-xs text-gray-500">CALORIES</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-green-500">{meal.nutrition.protein}</p>
                <p className="text-xs text-gray-500">PROTEIN</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-orange-500">{meal.nutrition.carbs}</p>
                <p className="text-xs text-gray-500">CARBS</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-pink-500">{meal.nutrition.fats}</p>
                <p className="text-xs text-gray-500">FAT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default TodaysMeal
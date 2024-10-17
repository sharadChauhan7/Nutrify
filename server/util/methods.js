import foodItem from "../../../server/modals/foodItem";

export async function resizeImage(imgSrc, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
        // Create an Image object
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => {
            // Create a canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Calculate the new size
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            // Set canvas size to the new size
            canvas.width = width;
            canvas.height = height;

            // Draw the resized image
            ctx.drawImage(img, 0, 0, width, height);

            // Convert canvas to Blob
            canvas.toBlob(resolve, 'image/jpeg', 0.7); // Adjust quality as needed
        };
        img.onerror = reject;
    });
}

// Method to get thr mealStatus of thr user from all meals

export const getMealStatus = (todayMeals) => {
    let mealStatus = {
        carbs: 0,
        fats: 0,
        fiber: 0,
        protein: 0
    }
    if(!todayMeals){
        return mealStatus;
    }
    todayMeals.meals.map((meal) => {
        meal.food_items.map((foodItem) => {
            mealStatus.carbs += parseFloat(foodItem.nutrients.carbs) || 0;
            mealStatus.fats += parseFloat(foodItem.nutrients.fats) || 0;
            mealStatus.fiber += parseFloat(foodItem.nutrients.fiber) || 0;
            mealStatus.protein += parseFloat(foodItem.nutrients.protein) || 0;
        })
    });
    // Set all property to 2 decimal places if they are float
    for (let key in mealStatus) {
        if (mealStatus[key] % 1 !== 0) {
            mealStatus[key] = mealStatus[key].toFixed(2);
        }
    }
    return mealStatus;
}
export const getLast7DaysMeals = (data) => {
    const today = new Date();
  const last7Days = [];

  // Generate the last 7 days' dates
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    last7Days.push(date.toISOString().split('T')[0]);
  }

  // Map over the last 7 days and find corresponding data or assume 0 calories
  return last7Days.map(date => {

    const found = data.find(entry => entry.date === date);

    return found ? { date: found.date, calories: found.total_calories    } : { date, calories: 0 };

  });

  };

//   export const updateDiet = (diet,newMeal)=>{

//     let newDiet = {...diet};
//     Object.keys

//   }
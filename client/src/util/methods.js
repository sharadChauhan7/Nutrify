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
        total_calories: 0,
        carbs: 0,
        fats: 0,
        fiber: 0,
        protein: 0
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
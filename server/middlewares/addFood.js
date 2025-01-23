import FoodItem from '../modals/foodItem.js';

export async function createFoodItems(foodItemsData) {
    const foodItems = [];
    for (const item of foodItemsData) {
        const { calorie, foodName, proteins, carbs, fats, fiber } = item;

        const foodItem = new FoodItem({
            name: foodName,
            calories_per_serving: parseInt(calorie),
            nutrients: {
                protein: parseFloat(proteins),
                carbs: parseFloat(carbs),
                fats: parseFloat(fats),
                fiber: parseFloat(fiber)
            }
        });

        await foodItem.save();
        foodItems.push(foodItem);
    }
    return foodItems;
}

export function meal_Type(){
    // Get current time
    const mealTime = Date.now();

    let mealType;
        const hour = new Date(mealTime).getHours();
        if (hour < 11) {
            mealType = 'breakfast';
        } else if (hour < 16) {
            mealType = 'lunch';
        } else {
            mealType = 'dinner';
        }
        return mealType;
}
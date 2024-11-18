import mongoose from 'mongoose';
import foodItem from './foodItem.js';
const Schema = mongoose.Schema;

const MealSchema = new Schema({
    meal_type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
    calories: Number,
    food_items: [{ type: Schema.Types.ObjectId, ref: 'FoodItem' }],
    image_url: String,  // New field for storing image URL
    __v: Number
});


MealSchema.post("findOneAndDelete",async(meal)=>{
    // Write a querry to delete all the food items that present in te meal.food_items array
    let result = await foodItem.deleteMany({_id:{$in:meal.food_items}});
    console.log(result);
    console.log("Post find hook");
});

export default mongoose.model('Meal', MealSchema);

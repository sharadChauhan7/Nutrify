import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const MealSchema = new Schema({
    meal_type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
    calories: Number,
    food_items: [{ type: Schema.Types.ObjectId, ref: 'FoodItem' }],
    image_url: String,  // New field for storing image URL
    __v: Number
});

export default mongoose.model('Meal', MealSchema);

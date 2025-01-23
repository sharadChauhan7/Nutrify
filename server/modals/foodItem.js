import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const FoodItemSchema = new Schema({
    name: String,
    calories_per_serving: Number,
    nutrients: {
        protein: Number,
        carbs: Number,
        fats: Number,
        fiber: Number,
    },
    __v: Number
});

export default mongoose.model('FoodItem', FoodItemSchema);
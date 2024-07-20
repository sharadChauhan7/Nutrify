import mongoose from 'mongoose';

// Define the schema for a user meal
const userMealSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true
  },
  calorie: {
    type: String,
    required: true
  },
  proteins: {
    type: String,
    required: true
  },
  carbs: {
    type: String,
    required: true
  },
  fats: {
    type: String,
    required: true
  },
  fiber: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Create a model from the schema
const UserMeal = mongoose.model('UserMeal', userMealSchema);

export default UserMeal;


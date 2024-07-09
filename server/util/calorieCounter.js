const daily_activity = ["Little or No Activity", "Lightly Active", "Moderately Active", "Super Active"];
const daily_activity_description = [
  "Mostly sitting or lying down, with little to no exercise",
  "Light exercise or sports 1-2 days a week",
  "Moderate exercise or sports 3-5 days a week",
  "Hard exercise or sports 6-7 days a week"
];

const goal_target = ["0.25 Kg per week", "0.50 Kg per week", "0.75 Kg per week", "1.00 Kg per week"];

export default function calculateCalories(user) {
  const activityMultipliers = {
    "Little or No Activity": 1.2,
    "Lightly Active": 1.375,
    "Moderately Active": 1.55,
    "Super Active": 1.725
  };

  const goalCalories = {
    "0.25 Kg per week": 250,
    "0.50 Kg per week": 500,
    "0.75 Kg per week": 750,
    "1.00 Kg per week": 1000
  };

  const { weight, height, age, phy_activity, target_speed, gender } = user;
  
  // Calculate BMR using Mifflin-St Jeor Equation
  const BMR = gender === 'Male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  // Calculate TDEE
  const TDEE = BMR * activityMultipliers[phy_activity];

  // Calculate required calories for weight gain
  const requiredCalories = TDEE + goalCalories[target_speed];

  // Set the target_calories field
  user.target_calories = Math.round(requiredCalories);

  return user;
}

// Example user object

// Calculate and set the required calories

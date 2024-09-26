import Run from '../AI/gemini.js';
import {createFoodItems,meal_Type} from '../middlewares/addFood.js';
import Meal from '../modals/meal.js';
import DailyCalorieIntake from '../modals/dailyCalorieIntake.js';

export const getCalories = async(req,res)=>{
    try {
        if (!req.file) {
          return res.status(400).send("No file uploaded.");
        }
        const imagePath = req.file.path;
        // console.log(imagePath);
        let data = await Run(imagePath);
        const responseText = data;
       const cleanText = responseText.replace(/```json|```/g, '');
        data = JSON.parse(cleanText);
        // Setting food Items
        if(!data){
          return res.status(400).send("No image found");
        }
        const foodItems = await createFoodItems(data);
        // Calculating total calories
        const totalCalories = foodItems.reduce((sum, item) => sum + item.calories_per_serving, 0);
        // Setting meal type
        let mealType = meal_Type();
        // Setting description
        const meal = new Meal({
          image_url:imagePath,
          meal_type: mealType,
          calories: totalCalories,
          food_items: foodItems.map(item => item._id),
      });

      await meal.save();
        // Get user id from req.user
        let user = req.user;
        console.log(user);
        let date = new Date(Date.now()).toISOString().slice(0, 10);
         // Create or update DailyCalorieIntake document
         let dailyCalorieIntake = await DailyCalorieIntake.findOne({ user: user._id, date: date });
         console.log(dailyCalorieIntake);
         if (!dailyCalorieIntake) {
             dailyCalorieIntake = new DailyCalorieIntake({
                 user: user._id,
                 date: date,
                 meals: [meal._id],
                 total_calories: totalCalories
             });
         } else {
             dailyCalorieIntake.meals.push(meal._id);
             dailyCalorieIntake.total_calories += totalCalories;
         }
 
         await dailyCalorieIntake.save();
 
         res.status(201).json({
             message: 'Meal and daily calorie intake saved successfully',
             meal,
             dailyCalorieIntake
         });
      }
      catch (e) {
        console.log(e);
        res.status(400).send("Error in generating response");
      }
}

export const getuserMeals = async (req,res)=>{
  try{
      let user = req.user;
      let userMeals = await DailyCalorieIntake.find({user:user}).populate({path:'meals',populate:{path:'food_items'}});
      res.status(200).send(userMeals);
  }
  catch(e){
      res.status(400).send("Error in fetching user meals");
  }
}

// Get user meals of the current date

export const getuserMealsToday = async (req,res)=>{
  try{
      let user = req.user;
      let date = new Date(Date.now()).toISOString().slice(0, 10);
      let userMeals = await DailyCalorieIntake.find({user:user,date:date}).populate({path:'meals',populate:{path:'food_items'}});
      res.status(200).send(userMeals);
  }
  catch(e){
      res.status(400).send("Error in fetching user meals");
  }
};
// Deleate Meal from user

export const deleteMeal = async(req,res)=>{
  try{
    let user = req.user;
    let id=req.prams;
    console.log(user);
    console.log(id);
    res.status(200).send("Meal deleted successfully");
  }
  catch(e){
    res.status(400).send("Error in deleting meal");
  }
}






  
import findCalories from '../AI/gemini.js';
import {createFoodItems,meal_Type} from '../middlewares/addFood.js';
import Meal from '../modals/meal.js';
import DailyCalorieIntake from '../modals/dailyCalorieIntake.js';
import UserStatus from '../modals/userStatus.modal.js';
import { jsonrepair } from 'jsonrepair'

export const getCalories = async(req,res)=>{
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    // Preparing prompt for dite genetator
    let user = req.user;
    let date = new Date(Date.now()).toISOString().slice(0, 10);
    let userMeals = await DailyCalorieIntake.find({user:user,date:date}).populate({path:'meals',populate:{path:'food_items'}});
    let userStatus = await UserStatus.findOne({user:user});
    let cal_consumed_today=userMeals.length>0?userMeals[0].total_calories:0;
    let current_mealtime = meal_Type();
    let {calorie_distribution,age,weight,height,target_calories,disease,foodAllergies,} = userStatus;
    let prompt = process.env.CALORIE_PROMPT1+' \n '+JSON.stringify({calorie_distribution,age,weight,height,target_calories,disease,foodAllergies,current_mealtime,cal_consumed_today})+' \n '+process.env.CALORIE_PROMPT2+' \n '+process.env.CALORIE_PROMPT3;
    // console.log(prompt);

        // Finish preparing
        const imagePath = req.file.path;
        // console.log(imagePath);
        let data = await findCalories(imagePath,prompt);
        const responseText = data;
       let cleanText = responseText.replace(/```json|```/g, '');
       cleanText = jsonrepair(cleanText);
       console.log(cleanText);
       data = JSON.parse(cleanText);
       console.log(data);

        let warning = data.pop();
        // Setting food Items
        if(!data){
          return res.status(400).send("No image found");
        }
        const foodItems = await createFoodItems(data);
        console.log(foodItems);
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
      console.log(meal);
      
      await meal.save();
      // Get user id from req.user
         // Create or update DailyCalorieIntake document
         let dailyCalorieIntake = await DailyCalorieIntake.findOne({ user: user._id, date: date });
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
         console.log(dailyCalorieIntake);
         console.log(meal);
         res.status(201).json({
             message: 'Meal and daily calorie intake saved successfully',
             meal,
             dailyCalorieIntake,
              warning
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

    let {id,mealId} = req.params;
    console.log(id,mealId);
    await Meal.findByIdAndDelete(mealId);
    await DailyCalorieIntake.findByIdAndUpdate(id,{$pull:{meals:mealId}});
    await DailyCalorieIntake.findOneAndDelete({_id:id,meals:[]});

    res.status(200).send("Meal deleted successfully");
  }
  catch(e){
    console.log(e);
    res.status(400).send("Error in deleting meal");
  }
}






  
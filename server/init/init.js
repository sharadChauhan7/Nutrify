import DailyCalorieIntake from '../modals/dailyCalorieIntake.js'
import Meal from '../modals/meal.js'
import User from '../modals/user.modal.js'
import FoodItems from '../modals/foodItem.js'
import UserStatus from '../modals/userStatus.modal.js'
import mongoose from 'mongoose';



async function init(){
    // Delete all documents in the collection
    let a =await User.deleteMany({});
    let b= await Meal.deleteMany({});
    let c = await FoodItems.deleteMany({});
    let d = await DailyCalorieIntake.deleteMany({});
    let e =await UserStatus.deleteMany({});
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    console.log(e);
}
console.log("Working");

init();
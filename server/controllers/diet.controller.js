import UserStatus from '../modals/userStatus.modal.js';
import {generateData} from '../AI/gemini.js'
import DitePlan from '../modals/dietPlan.modal.js'
import dotenv from 'dotenv';
import {planDite} from '../util/ditePlanner.js'
import {setDietImages,setAlternateDietImages} from '../util/ditePlanner.js'
dotenv.config();

export const generateDiet = async (req,res)=>{
    try{
        
        let {_id} = req.user;
        const user = await UserStatus.findOne({user:_id});
        // remove weightTracker key in user
        console.log("Generating Dite");
        console.log(user);
        user.weightTracker=[];
        let prompt =user+' \n '+process.env.DITE_PROMPT;
        let ditePlan = await generateData(prompt);
        // const responseText = data;
        ditePlan = ditePlan.replace(/```json|```/g, '');
        ditePlan = JSON.parse(ditePlan);
        // Add useId
        if(ditePlan && !ditePlan.breakfast){
            if(ditePlan.dietPlan){
                ditePlan = ditePlan.dietPlan;
            }
        }
        ditePlan.user = _id;
        // let newdiet = await setDietImages(ditePlan);
        let newdiet = ditePlan;
        console.log(JSON.stringify(newdiet));
        newdiet = new DitePlan(newdiet);
        console.log(newdiet);
        await newdiet.save();
        res.status(200).json({newdiet});
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const getDiet = async (req,res)=>{
    try{
        let user = req.user;
        const ditePlan = await DitePlan.findOne({user:user._id});
        if(!ditePlan){
            return res.status(404).json({message:"Dite Plan not found"});
        }
        
        res.status(200).json(planDite(ditePlan));
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const generateAlternate = async (req,res)=>{
    try{
        let {_id} = req.user;
    const ditePlan = await UserStatus.findOne({user:_id});
    let {foodAllergies,dietPreference,dietType} = ditePlan;
    // console.log(process.env.ALTERDITE_PROMPT);
    let prompt =JSON.stringify({foodAllergies,dietPreference,dietType})+' \n '+JSON.stringify(req.body.data)+' \n '+process.env.ALTERDITE_PROMPT;
    let alternateMelas = await generateData(prompt);
    alternateMelas = alternateMelas.replace(/```json|```/g, '');
    alternateMelas = JSON.parse(alternateMelas);

    // let newMeals = await setAlternateDietImages(alternateMelas);
    let newMeals = alternateMelas;

    res.status(200).send(newMeals);
    
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const updateDiet = async (req,res)=>{
    try{
        let {_id}=req.user;
        let newMeal = req.body.newMeal;



        const updatedDietPlan1 = await DitePlan.findOneAndUpdate(
            { user: _id, "snacks._id": newMeal._id },
            { $set: { "snacks.$[elem]": newMeal } },
            { arrayFilters: [{ "elem._id": newMeal._id }], new: true }
        );
        const updatedDietPlan2 = await DitePlan.findOneAndUpdate(
            { user: _id, "lunch._id": newMeal._id },
            { $set: { "lunch.$[elem]": newMeal } },
            { arrayFilters: [{ "elem._id": newMeal._id }], new: true }
        );
        const updatedDietPlan3 = await DitePlan.findOneAndUpdate(
            { user: _id, "dinner._id": newMeal._id },
            { $set: { "dinner.$[elem]": newMeal } },
            { arrayFilters: [{ "elem._id": newMeal._id }], new: true }
        );
        const updatedDietPlan4 = await DitePlan.findOneAndUpdate(
            { user: _id, "breakfast._id": newMeal._id },
            { $set: { "breakfast.$[elem]": newMeal } },
            { arrayFilters: [{ "elem._id": newMeal._id }], new: true }
        );

        if (!updatedDietPlan1 && !updatedDietPlan2 && !updatedDietPlan3 && !updatedDietPlan4 ) {
            return res.status(404).json({ message: "Diet plan or meal not found" });
        }
        const updatedDietPlan = updatedDietPlan1 || updatedDietPlan2 || updatedDietPlan3 || updatedDietPlan4;
        res.status(200).json(updatedDietPlan);
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}
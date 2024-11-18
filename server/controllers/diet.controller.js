import UserStatus from '../modals/userStatus.modal.js';
import {generateData} from '../AI/gemini.js'
import DitePlan from '../modals/dietPlan.modal.js'
import dotenv from 'dotenv';
import {planDite} from '../util/ditePlanner.js'
import { set } from 'mongoose';
dotenv.config();

export const generateDiet = async (req,res)=>{
    try{
        
        let {_id} = JSON.parse(req.cookies.user);
        const user = await UserStatus.findOne({user:_id});
        let prompt =user+' \n '+process.env.DITE_PROMPT;
        console.log("Generating Dite");
        console.log(prompt);
        let ditePlan = await generateData(prompt);
        console.log(ditePlan);
        // const responseText = data;
        ditePlan = ditePlan.replace(/```json|```/g, '');
        ditePlan = JSON.parse(ditePlan);
        // Add useId
        console.log(ditePlan);
        ditePlan.user = _id;
        console.log(ditePlan);
        ditePlan = new DitePlan(ditePlan);
        await ditePlan.save();

        res.status(200).json({ditePlan});
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
        console.log(user);
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
        let {_id} = JSON.parse(req.cookies.user);
    const ditePlan = await UserStatus.findOne({user:_id});
    let {foodAllergies,dietPreference,dietType} = ditePlan;
    // console.log(process.env.ALTERDITE_PROMPT);
    console.log({foodAllergies,dietPreference,dietType});
    let prompt =JSON.stringify({foodAllergies,dietPreference,dietType})+' \n '+JSON.stringify(req.body.data)+' \n '+process.env.ALTERDITE_PROMPT;
    console.log(prompt);
    let alternateMelas = await generateData(prompt);
    alternateMelas = alternateMelas.replace(/```json|```/g, '');
    alternateMelas = JSON.parse(alternateMelas);
    console.log(alternateMelas);

    res.status(200).send(alternateMelas);
    
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const updateDiet = async (req,res)=>{
    try{
        let {_id} = JSON.parse(req.cookies.user);
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
        console.log(updatedDietPlan);
        res.status(200).json(updatedDietPlan);
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}
import UserStatus from '../modals/userStatus.modal.js';
import {generateData} from '../AI/gemini.js'
import DitePlan from '../modals/dietPlan.modal.js'
import dotenv from 'dotenv';
import {planDite} from '../util/ditePlanner.js'
import { set } from 'mongoose';
dotenv.config();

export const generateDite = async (req,res)=>{
    try{
        
        let {_id} = JSON.parse(req.cookies.user);
        const user = await UserStatus.findOne({user:_id});
        let prompt =user+' \n '+process.env.DITE_PROMPT;
        console.log("Generating Dite");
        console.log(prompt);
        res.send("Generating");
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
        // res.status(200).send("Dite Plan Generated");
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const getDite = async (req,res)=>{
    try{
        let {_id} = JSON.parse(req.cookies.user);
        const ditePlan = await DitePlan.findOne({user:_id});
        if(!ditePlan){
            return res.status(404).json({message:"Dite Plan not found"});
        }
        
        res.status(200).json(planDite(ditePlan));
    }
    catch(err){
        console.log(err);
    }
}

export const generateAlternate = async (req,res)=>{
    try{
        let {_id} = JSON.parse(req.cookies.user);
    const ditePlan = await UserStatus.findOne({user:_id});
    let {foodAllergies,dietPreference,dietType} = ditePlan;
    // console.log(process.env.ALTERDITE_PROMPT);
    console.log();
    let prompt =JSON.stringify({foodAllergies,dietPreference,dietType})+' \n '+JSON.stringify(req.body.data)+' \n '+process.env.ALTERDITE_PROMPT;
    console.log(prompt);
    console.log({foodAllergies,dietPreference,dietType});
    let alternateMelas = await generateData(prompt);
    alternateMelas = alternateMelas.replace(/```json|```/g, '');
    alternateMelas = JSON.parse(alternateMelas);
    console.log(alternateMelas);
    res.status(200).send("Alternate Melas");
    
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}
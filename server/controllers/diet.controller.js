import UserStatus from '../modals/userStatus.modal.js';
import {generateData} from '../AI/gemini.js'
import DitePlan from '../modals/dietPlan.modal.js'
import dotenv from 'dotenv';
dotenv.config();
export const generateDite = async (req,res)=>{
    try{
        
        let {_id} = JSON.parse(req.cookies.user);
        const user = await UserStatus.findOne({user:_id});
        let prompt =user+' \n '+process.env.DITE_PROMPT;
        console.log("Generating Dite");
        // res.send("Generating");
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
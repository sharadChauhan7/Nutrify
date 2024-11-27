import UserStatus from '../modals/userStatus.modal.js'

export const updateUserWeight = async (req,res)=>{
   try{
        let user = req.user;
        let {newWeight} = req.body;
        console.log(newWeight);

        let userStatus = await UserStatus.findOne({user:user});
        console.log(userStatus);
        userStatus.weightTracker.push({weight:newWeight,date:new Date()});
        userStatus.weight = newWeight;
        await userStatus.save();
        res.status(200).send("Weight set successfully");
   }
    catch(err){
         console.log(err);
        res.status(400).send("Error in updating weight");
    }
}

export const getUserWeight = async (req,res)=>{
    try{
        let user = req.user;
        let userStatus = await UserStatus.findOne({user:user});
        let weightTracker = userStatus.weightTracker;
        res.status(200).send({weightTracker});
    }
    catch(err){
        console.log(err);
        res.status(400).send("Error in fetching weight");
    }
}
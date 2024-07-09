import { json } from 'express';
import User from '../modals/user.modal.js';
import UserStatus from '../modals/userStatus.modal.js';
import cookieParser from 'cookie-parser';
import calculateCalories from '../util/calorieCounter.js'
export const setUserStatus = async (req, res) => {
    try {
        let  status  = req.body;
        let user = req.cookies.user;
        user = await JSON.parse(user);
        status.user = user;
        status=calculateCalories(status);
        let userStatus = new UserStatus( status );
        await userStatus.save();
        res.send("Status set");
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send("Error in saving status");
    }
}

export const getUserStatus = async (req, res) => {
    try {
        let user = req.cookies.user;
        console.log(user);
        user = await JSON.parse(user);
        console.log(user);
        if(user){
            let userStatus = await UserStatus.findOne({user:user});
            userStatus = await userStatus.populate('user');
            res.status(200).send(userStatus);
        }
        else{
            res.status(400).send("User not found");
        }
    }
    catch(err){
        console.log(err);
    }
}
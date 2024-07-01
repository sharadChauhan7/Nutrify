import { json } from 'express';
import User from '../modals/user.modal.js';
import UserStatus from '../modals/userStatus.modal.js';
import cookieParser from 'cookie-parser';

export const setUserStatus = async (req, res) => {
    try {
        let  status  = req.body;
        let user = req.cookies.user;
        user = await JSON.parse(user);
        status.user = user._id;
        let userStatus = new UserStatus( status );
        await userStatus.save();
        res.send("Status set");
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send("Error in saving status");
    }
}
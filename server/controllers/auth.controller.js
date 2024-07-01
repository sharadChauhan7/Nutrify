import User from '../modals/user.modal.js'
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { json } from 'express';

export const signup=async(req,res)=>{
    try{

        let {name,email,password}= new User(req.body);
        // Check if user already exists
        let userExists = await User.findOne({ email});
        if(userExists){
            return res.status(400).json({error:"User already exists"});
        }
        let user= new User({name,email,password});
        
        await user.save();
         jwt.sign({user}, process.env.JWT_KEY, { expiresIn:'7d' }, async function(err, token) {
            if(err){
                res.send("Error in generating token");
            }
            res.cookie('user', JSON.stringify(user), { httpOnly: true, secure: true });
            // Set the second cookie
            res.cookie('authToken', token, {
                httpOnly: false,
                secure: true,
            });
            // Now send the response once after setting both cookies
            res.send({ token: token, user: user });
          });

    }
    catch(err){
        // console.log error message
        console.log(err.message);

        res.status(400).send("Error in saving user");
    }
}

export const login=async(req,res)=>{
    try{
        let {email,password}=req.body;
        let user= await User.findOne({email:email});
        if(user){
            jwt.sign({user}, process.env.JWT_KEY, { expiresIn:'7d' }, async function(err, token) {
                if(err){
                    res.send("Error in generating token");
                }
                res.cookie('user', JSON.stringify(user), { httpOnly: true, secure: true });
                // Set the second cookie
                res.cookie('authToken', token, {
                    httpOnly: false,
                    secure: true
                });
                // Now send the response once after setting both cookies
                return res.send({ token: token, user: user });
              });
        }
        else{
            throw new Error("User not found");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).send(err.message);
    }
}

export const getUser=async(req,res)=>{

    let allUsers=await User.find();
    res.send(JSON.stringify(allUsers));
}


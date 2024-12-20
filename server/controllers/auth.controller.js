import User from '../modals/user.modal.js'
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    try {    
        let { name, email, password } = new User(req.body);
        // Check if user already exist
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        bcrypt.hash(password, 15, async function (err, hash) {
            if (err) {
                res.status(400).send("Error in hashing password");
            };

            password = hash
            
            let user = new User({ name, email, password });
            
            await user.save();

            jwt.sign({ user }, process.env.JWT_KEY, { expiresIn: '7d' }, async function (err, token) {
                if (err) {
                    res.send("Error in generating token");
                }
                res.cookie('user', JSON.stringify(user), {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    domain: 'healthyai.netlify.app' // Replace with your domain
                });
                // Set the second cookie
                res.cookie('authToken', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    domain: 'healthyai.netlify.app' // Replace with your domain
                });
                // Now send the response once after setting both cookies
                res.send({ token: token, user: user });
            });

        });
    }
    catch (err) {
        // console.log error message
        console.log(err.message);

        res.status(400).send("Error in saving user");
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if(user==null){
            throw new Error("User not found");
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (user && match) {
            console.log("match");
            jwt.sign({ user }, process.env.JWT_KEY, { expiresIn: '7d' }, async function (err, token) {
                if (err) {
                    res.send("Error in generating token");
                }
                res.cookie('user', JSON.stringify(user), {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    domain: 'healthyai.netlify.app' // Replace with your domain
                });
                res.cookie('authToken', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    domain: 'healthyai.netlify.app' // Replace with your domain
                });
                // Now send the response once after setting both cookies
                return res.send({ token: token, user: user });
            });
        }
        else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
}

export const getUser = async (req, res) => {
    let allUsers = await User.find();
    res.send(JSON.stringify(allUsers));
}

export const updateUser = async (req,res)=>{
    try{
        let user = req.body;
        let updatedUser = await User.findByIdAndUpdate(user._id,user,{new:true});
        res.status(200).send("User updated successfully");
    }
    catch(e){
        res.status(400).send("Error in updating user");
    }

}


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
        const hash = bcrypt.hash(password, 15);

        password = hash;
            
        let user = new User({ name, email, password });
            
        await user.save();

            const token = jwt.sign({ user }, process.env.JWT_KEY, { expiresIn: '7d' });
            const options = {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            }
            res.status(200)
            .cookie('authToken', token, options)
            .send({ token: token, user: user});
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
        if (!user && !match) {
            throw new Error("User not found");
        }
        console.log("match");
        const token = jwt.sign({ user }, process.env.JWT_KEY, { expiresIn: '7d' })
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }
        res
        .status(200)
        .cookie('authToken', token, options)
        .send({ token: token, user: user });
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

export const logout = async (req,res)=>{
    console.log("logout triggered");
    res.clearCookie('authToken');
    res.status(200).send("Logged out successfully");
}
export const isLogin = async (req,res)=>{
    console.log("isLogin triggered");

    try{

        console.log(JSON.stringify(req.cookies));
        const {authToken} = req.cookies;
        if(authToken){
            res.status(200).send("User is logged in");
        }
        else{
            res.status(400).send("User is not logged in");
        }
    }
    catch(e){
        res.status(400).send("User is not logged in");
    }
}


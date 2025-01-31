import UserChats from '../models/userChats.model.js';
export const addUserChats = async (req,res)=>{
    try{
        const messages = req.body;
        let user = req.user;
        let {id} = req.params;
        if(id){
            let userChat = await UserChats.findOne(id);
            userChat.messages.push(messages);
            await userChat.save();
            res.status(200).json({message:"Message added successfully"});
        }
        else{
            let userChat = new UserChats({
                partner:user,
                messages:[messages]
            });
            await userChat.save();
            res.status(200).json({message:"Message added successfully"});
        }
    }
    catch(err){
        console.log(err);
        es.send(400).json({message:"Error in saving user chats"});
    }
}

export const getUserChats = async (req,res)=>{
    try{
        const {id} = req.params;
        let userChat = await UserChats.findbyId(id);
        res.status(200).json(userChat);
    }
    catch(err){
        console.log(err);
        res.send(400).json({message:"Error in getting user chats"});
    }
}
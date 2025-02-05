import UserChats from '../modals/userChats.modal.js';
export const addUserChats = async (req,res)=>{
    try{
        const messages = req.body;
        let user = req.user;
        let {id} = req.params;
        console.log(messages);
        // console.log(user);
        console.log(id);
        if(id!='undefined'){
            let userChat = await UserChats.findById(id);
            userChat.messages.push(messages);
            await userChat.save();
            res.status(200).json({message:"Message added successfully",id:userChat._id});
        }
        else{
            let userChat = new UserChats({
                partner:user,
                messages:[messages]
            });
            await userChat.save();
            res.status(200).json({message:"Message added successfully",id:userChat._id});
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:"Error in saving user chats"});
    }
}

export const getUserChats = async (req,res)=>{
    try{
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        // Validate that the id is a valid ObjectId

        let userChat = await UserChats.findById(id);
        if (!userChat) {
            return res.status(404).json({ message: "User chat not found" });
        }

        res.status(200).json(userChat);
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:"Error in getting user chats"});
    }
}

export const getUserChatIds = async (req,res)=>{
    try{
        let user = req.user;
        let userChats = await UserChats.find({partner:user});
        let ids = userChats.map((chat)=>{ return {id:chat._id,date:chat.createdAt};});
        console.log(ids);
        res.status(200).json(ids);
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:"Error in getting user chats"});
    }
}
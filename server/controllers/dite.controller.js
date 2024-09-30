export const generateDite = async (req,res)=>{
    try{
        const {id} = req.params;
        console.log(id);
        res.status(200).json({message:"Dite Plan Generated"});
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}
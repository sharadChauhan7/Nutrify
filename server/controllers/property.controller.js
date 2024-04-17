import Property from '../modals/property.modal.js';

export const create = (req,res)=>{
    try{
        const property = new Property(req.body);
        property.save();
        res.status(201).json(property);
    }
    catch(err){
        res.status(500).json({error: err});
    }
}
export const getAll = async (req,res)=>{
    try{
        const properties = await Property.find();
        res.status(200).json(properties);
    }
    catch(err){
        res.status(500).json({error: err});
    }
}
export const getOne = async (req,res)=>{
    try{
        const property = await Property.findById(req.params.id);
        res.status(200).json(property);
    }
    catch(err){
        res.status(500).json({error: err});
    }
}
export const update = async (req,res)=>{
    try{
        const property = await Property.findByIdAndUpdate
        (req.params.id,req.body,{new:true});
        res.status(200).json(property);
    }
    catch(err){
        res.status(500).json({error: err});
    }
}
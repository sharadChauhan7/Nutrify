import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required:true
    },
    location:{
        type: String,
        required: true
    },
    basic:{
        bedrooms:{
            type: Number,
            required: true
        },
        bathrooms:{
            type: Number,
            required: true
        },
        guests:{
            type: Number,
            required: true
        },
        beds:{
            type: Number,
            required: true
        }
    },
    features:{
        type: [String],
        required: true
    },
    photos:{
        photo1:{
            type: String,
            required: true
        },
        photo2:{
            type: String,
            required: true
        },
        photo3:{
            type: String,
            required: true
        },
        photo4:{
            type: String,
            required: true
        },
        photo5:{
            type: String,
            required: true
        }
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
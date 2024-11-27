import mongoose from 'mongoose';
import User from './user.modal.js';
const Schema = mongoose.Schema;

const userStatusSchema = new Schema({
    address: {
        type: String,
        default: "",
        required: true
    },
    age: {
        type: Number,
        default: null,
        required: true
    },
    weight: {
        type: Number,
        default: null,
        required: true
    },
    weightTracker:[
        {
            weight:{
                type:Number,
                
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ], 
    height: {
        type: Number,
        default: null,
        required: true
    },
    target_weight: {
        type: Number,
        default: null,
        required: true
    },
    phy_activity: {
        type: String,
        default: "",
        required: true
    },
    target_speed: {
        type: String,
        default: null,
        required: true
    },
    target_calories: {
        type: Number,
        default: null,
    },
    gender:{
        type:String,
        default:"",
        required:true
    },
    disease: {
        type: [String],
        default: [],
        required: true
    },
    macros: {
        protein: {
            type: Number,
            default: null,
            required: true
        },
        carbs: {
            type: Number,
            default: null,
            required: true
        },
        fats: {
            type: Number,
            default: null,
            required: true
        },
        fiber: {
            type: Number,
            default: null,
            required: true
        }
    },
    calorie_distribution:{
        breakfast:{
            type: Number,
            default: null,
            required: true
        },
        lunch:{
            type: Number,
            default: null,
            required: true
        },
        snacks:{
            type: Number,
            default: null,
            required: true
        },
        dinner:{
            type: Number,
            default: null,
            required: true
        },
        
    },
    foodAllergies:{
        type: [String],
        default: [],
        // required: true
    },
    dietPreference:{
        type: [String],
        default: [],
        // required: true
    },
    dietType:{
        type: String,
        default: "",
        // required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

const UserStatus = mongoose.model('UserStatus', userStatusSchema);

export default UserStatus;
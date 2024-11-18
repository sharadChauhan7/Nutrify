import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import 'dotenv/config'


let url=process.env.MONGO_URL;

main().then((res)=>{console.log("Connection is up")}).catch(err => console.log(err));
console.log("Hello");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Health');
}


const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        min:10,
        default:null,
        unique:false
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    
});

const User = mongoose.model('User',userSchema);

export default User;

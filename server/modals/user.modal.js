import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import 'dotenv/config'


let url=process.env.MONGO_URL;

async function main() {
    await mongoose.connect(url);
}
main().then((res)=>{console.log("Connection is up")}).catch(err => console.log(err));


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

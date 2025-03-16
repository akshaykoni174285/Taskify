import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Task'
        }
    ],
    password: {
        type: String,
        required: true
    },
    tokens:[
        {
            type:String,
        }
    ]
});

const User  = mongoose.model('User',userSchema);
export default User;
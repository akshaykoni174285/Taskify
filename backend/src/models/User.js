import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectID,
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
            required:true
        }
    ]
});

const User  = mongoose.model('User',userSchema);
export default User;
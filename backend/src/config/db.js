import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config()


export default async function(){

    try {
        await mongoose.connect(process.env.MONGO_URI_DEV,{
        })
        console.log("MongoDB Connected Successfully!")
        
    } catch (error) {
        console.log("error in connecting to MongoDB:",error.message);
        process.exit(1);
    }
};

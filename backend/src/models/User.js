import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config()



const UserSchema = new mongoose.Schema({
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
        
    ]
});


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const saltrounds = parseInt(process.env.SALT) || 10; // Default to 10 if undefined
        const salt = await bcrypt.genSalt(saltrounds);
        this.password = await bcrypt.hash(this.password, saltrounds);

        next(); // ✅ Ensure next() is called
    } catch (err) {
        console.error("Password Hashing Error:", err.message);
        next(err); // Pass error to Mongoose
    }
});


UserSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign(
            { id: this._id.toString() }, 
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
        );

        this.tokens = this.tokens || []; 
        this.tokens.push(token); 
        
        if (this.tokens.length > 3) {
            this.tokens = this.tokens.slice(-3); // Keep last 3 tokens
        }// ✅ Store as string, not object

        await this.save();
        return token;
    } catch (error) {
        console.error("JWT Token Generation Error:", error.message);
        return null;
    }
};


UserSchema.statics.findByCreds = async function (email, password) {
    try {
        console.log("Searching for email:", email);
        
        const user = await this.findOne({ email });

        console.log("User found:", user); // This should NOT be null

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};


const User  = mongoose.model('User',UserSchema);
export default User;
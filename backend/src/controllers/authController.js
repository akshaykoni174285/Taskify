import User from '../models/User.js';


export const registeruser = async (req,res)=>{
    
    try{
    console.log(req.body);
    const username = req.body.username || null;
    const email = req.body.email || null;
    const password = req.body.password || null;


    if (!username || !email || !password){
        res.status(400).send({error:"not all fields passed"})

    }
    const existing = await User.findOne({email})
    if(existing){
        res.status(400).send({message:"user is already registered"})
    }
   

    const user = new User({username, email, password});

    await user.save()
    const token = await user.generateAuthToken();

    console.log(token)
    if(!token){
        return res.status(500).json({message:"Token generation failed"});
    }

    res.status(200).send({message:"User saved successfully"})
    }
    catch(err){
        console.error("Server Error:", err); // Print detailed error
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }

}

export const loginuser = async (req,res) =>{
    try {
        const email = req.body.email || null
        const password = req.body.password || null

        if(!email || !password){
            res.status(400).json({message: 'Username or Password cant be empty'})

        }

        const user = await User.findByCreds(email, password)
        console.log("User found:", user); // Debugging: Check if user exists

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = await user.generateAuthToken();

        // return res.status(200).json({message: 'Login Sucessfully',token});

        res.json({ token, userId: user._id });

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}
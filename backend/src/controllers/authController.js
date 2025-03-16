import User from '../models/User.js';


export const registeruser = async (req,res)=>{
    
    try{
    console.log(req.body);
    const username = req.body.username || null;
    const email = req.body.email || null;
    const password = req.body.password || null;


    if (!username || !email || !password){
        res.status(400).send({"error":"not all fields passed"})

    }
    const existing = await User.findOne({email})
    if(existing){
        res.status(400).send({message:"user is already registered"})
    }

    const user = new User({username, email, password});

    await user.save()


    res.status(200).send("sucess")
    }
    catch(err){
        console.error("Server Error:", err); // Print detailed error
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }

}
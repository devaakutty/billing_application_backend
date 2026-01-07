const { compare } = require("bcryptjs");
const user = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt  = require("jsonwebtoken");

//Register
exports.userRegister = async(req , res) => {
    try{
        const{ name, email, password , role } =req.body;
        //exisingUser an alart
        const existingUser =  await user.findOne({email });
        if(existingUser)
            return res.status(400).json({message:"User Already exist"});
        //hashed user password 
        const hashedPassword = bcrypt.hash(password, 10);

        const user = new user({
            name,
            email,
            password : hashedPassword,
            role : role ||"staff"
        });
        await user.save();
        res.json({message :"User Registered Successfully",user});
    }catch(err){
        res.status(500).json({error :err.message});
    }
};

//Login User Invalid 
exports.userLogin = async(req , res ) =>{
    try{
        const {email , password } = req.body;

        const user = await user.findOne({email});
        if(!user)
            return res.status(400).json({message : "Invalid credentials "});
        const isMatch = await bcrypt.compare(password ,user.password);
        if(!isMatch)
            return res.status(400).json({message : "Invalid credentials"});

        const token = jwt.sign(
            {id : user._id, name:user.name , role : user.role},
            process.env.JWT_SECRET,
            {expiresIn :"id"}
        );
        res.json({
            token,
            user:{id:user._id, name : user.name , email : user.email , role :user.role}
        });
    }catch(err){
        res.status(500).json({error : err.message})
    }
};
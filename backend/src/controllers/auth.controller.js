import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import { generateToken } from "../utils/utils.js";
import cloudinary from "../lib/cloudinary.js"

export const signup = async(req,res) =>{
const { fullName, email, password } = req.body;

try {

    if(!fullName || !email || !password){
    return res.status(400).json({message:"All Fields are required"})};

    if(password.length < 6){
        return res.status(400).json({message:"Password must be greater than 6 characters long"})
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if(user){
        return res.status(400).json({message:"User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword  = await bcrypt.hash(password,salt);

    const newUser = new User({
        fullName,
        email: normalizedEmail,
        password:hashedPassword,
    });

    if(newUser){
        generateToken(newUser._id,res);
        await newUser.save();

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic,
        })
    }

    else{
        res.status(400).json({message:"Invalid user data"});
    }


} catch (error) {
     console.log("Error in Signup Controller",error.message);
     res.status(500).json({message:"internal server error"})
}

}



export const login = async(req,res) =>{

const { email,password } = req.body;

try {
    if (!email || !password){
        return res.status(400).json({message:"All Fields are required"});
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    
    if(!user){
       return res.status(400).json({message:"invalid Credentials"})
    }

    const ispasswordCorrect = await bcrypt.compare(password,user.password);

    if(!ispasswordCorrect){
       return  res.status(400).json({message:"invalid Credentials"})
    }

    generateToken(user._id,res);

    res.status(200).json({
           _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
    })

} catch (error) {
     console.log("Error in Login Controller",error.message);
     res.status(500).json({message:"internal server error"})
}

}


export const logout = async(req,res) =>{
        try {
            res.cookie("jwt","",{
                maxAge:0,
                httpOnly:true,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                secure: process.env.NODE_ENV === "production",
            });
            res.status(200).json({message:"Logged Out successfully"});

        } catch (error) {
            console.log("Error in logout controller:",error.message)
            res.status(500).json({
                message:"Internal Server Error"
            });
        }
}


export const updateProfile = async(req,res) =>{
        try {
            const {profilePic} = req.body;

            const userId = req.user._id;

            if(!profilePic){
                return res.status(400).json({message:"Profile picture is required"})
            }

            const uploadResponse = await cloudinary.uploader.upload(profilePic);

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {profilePic:uploadResponse.secure_url},
                {new:true}
            
            )

            res.status(200).json(updatedUser);



        } catch (error) {
            console.log("Error in logout controller:",error.message)
            res.status(500).json({
                message:"Internal Server Error"
            });
        }
} 



export const checkAuth = async(req,res)=>{
    try {
        res.status(200).json(req.user);
        
    } catch (error) {
         console.log("Error in logout controller:",error.message)
            res.status(500).json({
                message:"Internal Server Error"
            });
    }
}
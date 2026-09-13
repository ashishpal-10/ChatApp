import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectroute = async(req,res,next)=>{
    try {

        const token = req.cookies.jwt;
        console.log(token);

        if (!token) {
            return res.status(400).json({message:"Unauthorized - No token Provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(402).json({message:"Unauthorized - valid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({message:"Unauthorzied -User not found"})
        }

        req.user =user;

        next();
    } catch (error) {
         console.log("Error in protect route middleware:",error.message)
            res.status(401).json({
                message:"Unauthorized - Invalid or expired token" });
    }
}
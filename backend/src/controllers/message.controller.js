import User from "../models/user.model.js"
import Message from "../models/message.model.js"

import cloudinary from "../lib/cloudinary.js"
import {io, getRecieverSocketID } from "../lib/socket.js";



export const getUsersforSidebar = async(req,res)=>{


    try {
        const LoggedInUserId = req.user._id;
        const filteredUsers = await User.find({
            _id:{$ne:LoggedInUserId}
        }).select("-password");

        console.log(filteredUsers)
        console.log(req.user)
        res.status(200).json(filteredUsers);

    } catch (error) {
         console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMessage = async(req,res)=>{
        try {
            const {id:userToChatId} = req.params ;
            const myId = req.user._id;

            const messages = await Message.find({
                $or:[
                    {senderId:myId,receiverId:userToChatId},
                    {senderId:userToChatId,receiverId:myId}
                ]
            })

            res.status(200).json(messages);
            
        } catch (error) {
             console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
        }
}

export const sendMessage = async(req,res)=>{

    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;

        const senderId =req.user._id;
        let imageurl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageurl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageurl
        })

        await newMessage.save();

        // TODO Implement Socket Io for Chating
            // here
        const recieverSocketID = getRecieverSocketID(receiverId);
        if(recieverSocketID){
            io.to(recieverSocketID).emit("newMessage",newMessage);
        }

        const senderSocketID = getRecieverSocketID(senderId);
        if(senderSocketID){
            io.to(senderSocketID).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
         console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    }


}

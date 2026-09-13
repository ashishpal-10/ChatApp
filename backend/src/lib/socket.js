import {Server} from "socket.io"
import express from "express"
import http from "http"
import dotenv from "dotenv"


const app = express();

const server = http.createServer(app);

dotenv.config();

const allowedOrigins = [
    "http://localhost:5173",
    ...(process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",").map(origin => origin.trim())
        : ["https://chatapp-xc4o.onrender.com"]),
];

const io = new Server(server,{
    cors:{
        origin:allowedOrigins,
        credentials:true,
    }
});


export function getRecieverSocketID(userId){
    return userSocketmap[userId];
}

const userSocketmap = {};


io.on("connection",(socket)=>{
    console.log("User Connected",socket.id);
    const userId = socket.handshake.query.userId;

    if(userId){
        userSocketmap[userId] = socket.id;
    }

    // io.emit() is used to send events to all the connected clients

    io.emit("getOnlineUsers",Object.keys(userSocketmap));




    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id);
        delete userSocketmap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketmap));
    })
})

export {app, server,io};
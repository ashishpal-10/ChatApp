import {Server} from "socket.io"
import express from "express"
import http from "http"


const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
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
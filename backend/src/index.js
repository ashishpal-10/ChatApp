import express from "express"
import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import cors from "cors"
import {connectDB} from "./lib/db.js"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "../src/routes/message.route.js"

import {app,io,server} from "../src/lib/socket.js"
dotenv.config()

const PORT = process.env.PORT || 5000

// const app = express()

const allowedOrigins = [
    "http://localhost:5173",
    ...(process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",").map(origin => origin.trim())
        : ["https://chatapp-xc4o.onrender.com"]),
];

app.use(cookieparser())

app.use(cors({
    origin: allowedOrigins,
    credentials:true,
}))

app.use(express.json({limit:"50mb"}));
// Routes

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)


server.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
    connectDB();
})


import express from "express"

import { protectroute } from "../middlewares/auth.middleware.js"
import { getMessage, getUsersforSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();


router.get("/users",protectroute,getUsersforSidebar);
router.get("/:id",protectroute,getMessage);


router.post("/send/:id",protectroute,sendMessage);



export default router;









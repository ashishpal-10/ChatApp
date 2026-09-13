import express from "express"
import {signup ,login,logout,updateProfile, checkAuth} from "../controllers/auth.controller.js"
import { protectroute } from "../middlewares/auth.middleware.js";

const  router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

router.put("/update-profile",protectroute,updateProfile);
router.get("/check",protectroute,checkAuth);

export default router;
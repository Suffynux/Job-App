import { Router } from "express";
import express from "express";
import { registerUser , loginUser ,logout  , resetAllPasswords , getUser } from "../Controllers/user.Controller.js";
import isAuthorized from "../Middlewares/auth.middleware.js";
const router = Router()

router.post("/register" , registerUser)
router.post("/login" , loginUser)
router.post("/resetpasswords" , isAuthorized , resetAllPasswords)
router.post("/logout", isAuthorized , logout) 
router.get("/getuser", isAuthorized , getUser) 

export default router
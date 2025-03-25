import { Router } from "express";
import express from "express";
import { getAllJobs , postJob ,getUserJobs } from "../Controllers/job.Controller.js";
import isAuthorized from "../Middlewares/auth.middleware.js";

const router = express.Router()

router.get("/getalljobs" , isAuthorized , getAllJobs)
router.post("/postjob" , isAuthorized , postJob)
router.get("/getmyjobs" , isAuthorized , getUserJobs)

export default router
import { Router } from "express";
import express from "express";
import { getAllJobs , postJob } from "../Controllers/job.Controller.js";
import isAuthorized from "../Middlewares/auth.middleware.js";

const router = express.Router()

router.get("/getalljobs" , isAuthorized , getAllJobs)
router.post("/postjob" , isAuthorized , postJob)

export default router
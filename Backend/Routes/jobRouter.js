import { Router } from "express";
import express from "express";
import { getAllJobs , postJob ,getUserJobs ,updateJob ,deleteJob ,getSingleJob} from "../Controllers/job.Controller.js";
import isAuthorized from "../Middlewares/auth.middleware.js";

const router = express.Router()

router.get("/getalljobs" , isAuthorized , getAllJobs)
router.post("/postjob" , isAuthorized , postJob)
router.get("/getmyjobs" , isAuthorized , getUserJobs)
router.patch("/update/:id" , isAuthorized , updateJob)
router.delete("/delete/:id" , isAuthorized , deleteJob)
router.get("/details/:id" , isAuthorized , getSingleJob)

export default router
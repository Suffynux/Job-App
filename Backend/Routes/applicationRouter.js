import { Router } from "express";
import {
    employerGetJobApplications,
    jobSeekerGetJobApplications,
    deleteJobApplication, // ✅ Fixed typo
} from "../Controllers/application.controller.js";
import isAuthorized from "../Middlewares/auth.middleware.js";

const router = Router(); // ✅ No need to import full 'express'

router.use(isAuthorized); // ✅ Ensures all routes require authentication

router.get("/getmyapplications", employerGetJobApplications);
router.get("/jobapplications", jobSeekerGetJobApplications);
router.delete("/delete/:id", deleteJobApplication); // ✅ Fixed typo

export default router;

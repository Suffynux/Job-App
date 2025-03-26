import ErrorHandler from "../Middlewares/error.middleware.js";
import { Application } from "../Models/application.model.js";
import { Job } from "../Models/job.model.js";
import ApiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { Application } from "../Models/application.model.js";

const employergetJobApplications = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { role } = req.user;
  if (!userId) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (!role == "Employer") {
    return next(new ErrorHandler("Job Seeker cannot view jobs", 400));
  }

  const applications = await Application.find({ "employerId.user": userId });

  if (!applications) {
    return next(new ErrorHandler("Cannot find applications", 404));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, applications, "Applications Fetched Successfully")
    );
});
const JobSeekergetJobApplications = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { role } = req.user;
  if (!userId) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (role == "Employer") {
    return next(new ErrorHandler("Employer cannot view jobs", 400));
  }

  const jobApplied = await Application.find({ "applicantId.user": userId });

  if (!jobApplied) {
    return next(new ErrorHandler("Cannot find applications", 404));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, jobApplied, "Applications Fetched Successfully")
    );
});

export {
  employergetJobApplications,
  JobSeekergetJobApplications,}

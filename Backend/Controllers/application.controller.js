import { Application } from "../Models/application.model.js";
import ApiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import ErrorHandler from "../Middlewares/error.middleware.js";
import mongoose from "mongoose";


const employerGetJobApplications = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { role } = req.user;

  if (!userId) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (role !== "Employer") {
    return next(new ErrorHandler("Job Seeker cannot view job applications", 400));
  }

  const applications = await Application.find({ 
    "employerId.user": new mongoose.Types.ObjectId(userId) 
  });

  if (!applications || applications.length === 0) {
    return next(new ErrorHandler("No applications found", 404));
  }

  return res.status(200).json(
    new ApiResponse(200, applications, "Applications fetched successfully")
  );
});

const jobSeekerGetJobApplications = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { role } = req.user;

  if (!userId) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (role === "Employer") {
    return next(new ErrorHandler("Employers cannot view job applications", 400));
  }

  const jobAppliedList = await Application.find({ 
    "applicantId.user": new mongoose.Types.ObjectId(userId) 
  });

  if (!jobAppliedList || jobAppliedList.length === 0) {
    return next(new ErrorHandler("No applications found", 404));
  }

  return res.status(200).json(
    new ApiResponse(200, jobAppliedList, "Applications fetched successfully")
  );
});

const deleteJobApplication = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Please provide job ID", 400));
  }

  const deletedJob = await Application.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });

  if (!deletedJob) {
    return next(new ErrorHandler("Error while deleting job", 404));
  }

  return res.status(200).json(new ApiResponse(200, deletedJob, "Application deleted successfully"));
});

export {
  employerGetJobApplications,
  jobSeekerGetJobApplications,
  deleteJobApplication,
};

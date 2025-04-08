import { Application } from "../Models/application.model.js";
import ApiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import ErrorHandler from "../Middlewares/error.middleware.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { uploadImage } from "../Utils/cloudinary.js";
import { Job } from "../Models/job.model.js";



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

  const deletedJob = await Application.findOneAndDelete(id);

  if (!deletedJob) {
    return next(new ErrorHandler("Error while deleting job", 404));
  }

  return res.status(200).json(new ApiResponse(200, deletedJob, "Application deleted successfully"));
});

const applyForJob = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Job Seeker") {
    return next(new ErrorHandler("Only Job Seeker can apply for job", 400));
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("No file uploaded", 400));
  }

  const { resume } = req.files;

  if (!resume) {
    return next(new ErrorHandler("Please upload resume", 400));
  }

  const allowedImageFormats = ["image/png", "image/jpg", "image/webp" , "image/jpeg"];

  if (!allowedImageFormats.includes(resume?.mimetype)) {
    return next(new ErrorHandler("Invalid file format", 400));
  }

  const cloudinaryResponse = await uploadImage(resume.tempFilePath);

  if (!cloudinaryResponse) {
    console.error(cloudinaryResponse?.error || "Error while uploading image to cloudinary");
    return next(new ErrorHandler("Error while uploading image to cloudinary", 500));  // Changed to 500 for server error
  }

  const { name, email, coverLetter, phone, address , jobId} = req.body;
  const applicantId = req.user._id;

  
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Error while getting job details", 400));
  }

  const employerDetail = {
    user: jobDetails.jobPostedBy,
    role: "Employer"
  };

  if (!name || !email || !coverLetter || !phone || !address || !jobId) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url
    },
    applicantId: {
      user: applicantId
    },
    role: "Job Seeker",
    employerId: employerDetail
  });

  res.status(200).json(new ApiResponse(200, application, "Application submitted successfully"));
});


export {
  employerGetJobApplications,
  jobSeekerGetJobApplications,
  deleteJobApplication,
  applyForJob,
};

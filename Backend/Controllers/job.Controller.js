import ErrorHandler from "../Middlewares/error.middleware.js";
import { Job } from "../Models/job.model.js";
import ApiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

//get all jobs
const getAllJobs = asyncHandler(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  if (!jobs) {
    return next(new ErrorHandler("Job not found", 404));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "Jobs Fetched Successfully"));
});

const postJob = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  console.log(role);
  
  if (role == "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job seeker cant post a job, you have to create Employer acc for this feature",
        200
      )
    );
  }

  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !country || !city || !location) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler("Please enter either salary or fixed salary", 400)
    ); 
  }

  const jobPostedBy = req.user._id;
  console.log(jobPostedBy);
  
  const job = await new Job({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    jobPostedBy
  }).save();

  return res.status(200).json(new ApiResponse(200, job, "Job Posted Successfully"));
});
export { getAllJobs, postJob };

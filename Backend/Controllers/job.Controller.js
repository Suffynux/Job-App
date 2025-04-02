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
    jobPostedBy,
  }).save();

  return res
    .status(200)
    .json(new ApiResponse(200, job, "Job Posted Successfully"));
});

const getUserJobs = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  if (!userId) {
    return next(new ErrorHandler("User not found", 404));
  }

  const userJobs = await Job.find({ jobPostedBy: userId });

  if (!userJobs) {
    return next(new ErrorHandler("Jobs not found", 404));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userJobs, "Jobs Fetched Successfully"));
});

const updateJob = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { role } = req.user;

  // Corrected role check
  if (role == "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job seeker cant post a job, you have to create Employer acc for this feature",
        200
      )
    );
  }

  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Please provide job id", 400));
  }

  const { title, description, fixedSalary } = req.body;

  // Validate input fields
  if (!title || !description || !fixedSalary) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  // Use findByIdAndUpdate for more efficient update
  const updatedJob = await Job.findByIdAndUpdate(
    id,
    {
      title,
      description,
      fixedSalary,
    },
    {
      new: true, // Return the updated document
      runValidators: true, // Run model validation
    }
  );

  if (!updatedJob) {
    return next(new ErrorHandler("Job not found", 404));
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedJob, "Job Updated Successfully"));
});

const deleteJob = asyncHandler(async(req , res , next)=>{
  const {role} = req.user;
  if (role == "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job seeker cant post a job, you have to create Employer acc for this feature",
        200
      )
    );
  }

  const {id} = req.params;
  const deletedJob = await Job.findOneAndDelete(id);

  if(!deletedJob){
    return next(new ErrorHandler("Job not found", 404));
  }

  return res.status(200).json(new ApiResponse(200, deletedJob, "Job Deleted Successfully"));
})

const getSingleJob = asyncHandler(async(req, res ,next)=>{
  const {id} = req.params;

  if(!id){
    return next(new ErrorHandler("Please provide job id", 400));
  }

  const jobDetails = await Job.findById(id);
  return res.status(200).json(new ApiResponse(200, jobDetails, "Job Fetched Successfully"));
})
export { getAllJobs, postJob, getUserJobs, updateJob , deleteJob ,getSingleJob};

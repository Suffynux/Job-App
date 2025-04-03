import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minLength: [4, "Title must be at least 4 characters long"],
    maxLength: [30, "Title must be at most 20 characters long"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide description"],
    minLength: [10, "Description must be at least 10 characters long"],
    maxLength: [200, "Description must be at most 200 characters long"],
  },
  category: {
    type: String,
    required: [true, "Please provide category"],
  },
  country: {
    type: String,
    required: [true, "Please provide country"],
  },
  city: {
    type: String,
    required: [true, "Please provide city"],
  },
  location: {
    type: String,
    required: true,
  },
  fixedSalary: {
    type: Number,
    MinLength: [3, "Salary must be at least 3 characters long"],
    MaxLength: [9, "Salary must be at most 9 characters long"],
  },
  salaryFrom: {
    type: Number,
    required: true,
    MinLength: [4, "Starting from must be at least 3 characters long"],
    MaxLength: [9, "Starting from must be at most 9 characters long"],
  },
  salaryTo: {
    type: Number,
    required: true,
    MinLength: [4, "salary to from must be at least 3 characters long"],
    MaxLength: [9, "salary to from must be at most 9 characters long"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  jobPostedBy: {
    type: mongoose.Schema.ObjectId,
    reference: "User",
    required: true,
  },
});

export const Job = new mongoose.model("Job", jobSchema);
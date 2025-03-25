import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [10, "Name must be at most 10 characters long"],
  },

  email: {
    type: String,
    required: true,
    trim: true,
    validate: [validator.isEmail, "Please Enter a valid email"],
    unique: true,
  },
  
  phone: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters long"],
    maxLength: [15, "Password must be at most 15 characters long"],
  },

  role: {
    type: String,
    required: true,
    enum: ["Job Seeker", "Employer"], // Fixed typo: "Empolyer" -> "Employer"
  },
});

// Hashing the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Comparing password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating JWT Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

export const User = mongoose.model("User", userSchema);

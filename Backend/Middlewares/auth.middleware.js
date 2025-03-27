import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utils/asyncHandler.js";
import ErrorHandler from "./error.middleware.js"; // Ensure this path is correct
import { User } from "../Models/user.model.js";

const isAuthorized = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ErrorHandler("User not authorized", 401); // Fixed: Added 'new'
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  if (!req.user) {
    throw new ErrorHandler("User not found", 404); // Fixed: Added 'new'
  }
  // console.log("verified");
  
  next();
});

export default isAuthorized;
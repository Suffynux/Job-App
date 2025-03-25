import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utils/asyncHandler.js";
import ErrorHandler from "./error.middleware.js"; // Fixed spelling
import { User } from "../Models/user.model.js";

const isAuthorized = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ErrorHandler("User not authorized", 401); // 401 is more appropriate for authentication issues
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  if (!req.user) {
    throw new ErrorHandler("User not found", 404);
  }

  next();
});

export  default  isAuthorized ;

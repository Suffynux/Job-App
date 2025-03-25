import ErrorHandler from "../Middlewares/error.middleware.js";
import ApiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { User } from "../Models/user.model.js";
import sendToken from "../Utils/jwtToken.js";
import bcrypt from "bcrypt";
const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, phone, password , role } = req.body;
  
    
    if (!name || !email || !phone || !password) {
        return next(new ErrorHandler("Please fill all the fields", 400)); // ✅ Correct way to throw error
    }

    const isEmail = await User.findOne({ $or: [{ name }, { email }] });
    if (isEmail) {
        return next(new ErrorHandler("Email or name already exists", 400));
    }

    const user = (await User.create({ name, email, phone, password ,role}));

    if (!user) {
        return next(new ErrorHandler("Error while creating user", 400));
    }


    sendToken(user , 201 , res , "User registered successfully")
});

const loginUser = asyncHandler(async(req , res , next)=>{
    // get input from the user
    // check if user exists
    // Passowrd check
    const { email , password , role} = req.body;

    if(!email || !password || !role){
        return next(new ErrorHandler("Please fill all the fields", 400)); // ✅ Correct way to throw error
    }

    const user = await User.findOne({email})
    
    if(!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    
    const isPasswordCorrect = await user.comparePassword(password);
    
    if(!isPasswordCorrect){
        return next(new ErrorHandler("Password is incorrect", 400));
    }

    if(user.role !== role){
        return next(new ErrorHandler("ghalat role", 400));
    }

    sendToken(user , 200 , res , "User logged in successfully")

})

const logout = asyncHandler(async(req, res , next) => {
    const cookiesOption = {
        httpOnly: true,
        expires: new Date(Date.now()), 
      };
    res.status(200).cookie("token" , "" , cookiesOption).json(new ApiResponse(200, "User logged out successfully"));
})

const resetAllPasswords = asyncHandler(async(req, res, next) => {
    const pass = "test@123"
    const users = await User.find()
    console.log(users);
    

    // Use Promise.all for efficient parallel processing
    await Promise.all(users.map(async (user) => {
        // Hash the password before saving
        user.password = pass;
        await user.save();
    }));

    res.status(200).json({
        message: `Passwords reset for ${users.length} users`
    });
})

export { registerUser  ,loginUser , logout , resetAllPasswords};  // Named export

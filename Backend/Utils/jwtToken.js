// sendToken.js
import { User } from "../Models/user.model.js";

const sendToken = (user, statusCode, res, message) => {
  const token = user.getJwtToken();  

  const cookiesOption = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000), 
  };

  res.status(statusCode)
     .cookie("token", token, cookiesOption)
     .json({
        user,
       success: true,
       message,
       token,
     });
};

export default sendToken;

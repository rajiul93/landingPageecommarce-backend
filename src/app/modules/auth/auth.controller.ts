import { CookieOptions, NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.loginUser(req.body);

    // cookie options
  

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully!",
      data: result.user,
    });
  }
);
const loginAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.loginAdmin(req.body);

    // cookie options
    const cookieOptions :CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // production এ secure:true
      sameSite:"none",
    };

    res.cookie("accessToken", result.token, cookieOptions);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully!",
      data: result.user,
    });
  }
);

export const authController = { loginUser , loginAdmin  };

// front end use guide :
// fetch('/api/login', {
//   method: 'POST',
//   credentials: 'include',
//   body: JSON.stringify(data),
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

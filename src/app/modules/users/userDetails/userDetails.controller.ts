import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import * as userDetailsService from "./userDetails.service";

 
// Get user details
const getUserDetails = catchAsync(async (req: Request, res: Response) => {
  console.log(req.cookies)
  const userId = req.params.userId;
  const result = await userDetailsService.getUserDetailsByUserId(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User details retrieved successfully",
    data: result,
  });
});

// Update user details
const updateUserDetails = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId; 
  const result = await userDetailsService.updateUserDetails(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User details updated successfully",
    data: result,
  });
});

export const userDetailsController = { 
  updateUserDetails,
  getUserDetails,
};

import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { userDetailsServer } from "./userDetails.service";
import AppError from "../../../error/AppError";

// user details update
const updateProfileDetails = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updateData = req.body;
  const result = await userDetailsServer.updateProfileDetails(
    userId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Success",
    data: result,
  });
});

export const userDetailsController = {
  updateProfileDetails,
};

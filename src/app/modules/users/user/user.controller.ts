import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => { 
    const result = await userService.createUser(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User created successfully!",
      data: result,
    });
  }
);

const getAllUsers =catchAsync( async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Get all user successfully!",
    data: result,
  });
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await userService.getSingleUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: user,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser
};

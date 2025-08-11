import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { categoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createCategory(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategory();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category get successfully',
    data: result,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const cId = req.params.id; 
  const result = await categoryService.deleteCategory(cId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category delete successfully',
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getAllCategory,
  deleteCategory
};

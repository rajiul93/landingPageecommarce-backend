import { Request, Response } from 'express';
import httpStatus from 'http-status';
 
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { brandService } from './brand.service';

const createBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await brandService.createBrand(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Brand created successfully',
    data: result
  });
});
const getAllBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await brandService.getAllBrand();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Get all brand successfully',
    data: result
  });
});
const deleteBrand = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await brandService.deleteBrand(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Delete brand successfully',
    data: result
  });
});

export const brandController = {
  createBrand,
  getAllBrand,
  deleteBrand
};

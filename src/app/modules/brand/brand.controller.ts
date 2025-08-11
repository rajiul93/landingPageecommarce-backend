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

export const brandController = {
  createBrand
};

// controllers/product.controller.ts
import { Request, Response } from 'express';
 
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { productService } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  // auth middleware দ্বারা সেট হওয়া user id নাও
  const userId = (req as any).user?.id || (req as any).user?._id;
  if (!userId) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authentication required'
    });
  }

  // Prevent client from setting userId in body — use authenticated user
  const payload = {
    userId,
    ...req.body
  };

  const result = await productService.createProduct(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully',
    data: result
  });
});

export const productController = {
  createProduct
};

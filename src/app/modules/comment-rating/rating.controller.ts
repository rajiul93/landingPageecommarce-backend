// controllers/rating.controller.ts
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ratingService } from './rating.service';
 

const createRating = catchAsync(async (req: Request, res: Response) => { 
  const userId = (req as any).user?.id || (req as any).user?._id;
  if (!userId) { 
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authentication required'
    });
  }

  const { productId } = req.body;

  const result = await ratingService.createRating({ 
    productRatings:[]
  });
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Rating created successfully',
    data: result
  });
});

export const ratingController = {
  createRating
};

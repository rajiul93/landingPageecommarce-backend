// controllers/rating.controller.ts
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ratingService } from './rating.service';
 

const createRating = catchAsync(async (req: Request, res: Response) => {
  // ধরে নিচ্ছি auth middleware req.user._id সেট করে
  const userId = (req as any).user?.id || (req as any).user?._id;
  if (!userId) {
    // যদি auth middleware না থাকে বা user না থাকে, তাহলে
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authentication required'
    });
  }

  const { productId, rating, comment } = req.body;

  const result = await ratingService.createRating({
    userId,
    productId,
    rating,
    comment
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

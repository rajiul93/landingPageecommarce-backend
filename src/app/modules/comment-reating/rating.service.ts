// services/rating.service.ts

import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../error/AppError';
import { ProductModel } from '../products/product.model';
import { IRating } from './rating.interface';
import { RatingModel } from './rating.model';


const createRating = async (payload: IRating) => {
  const { userId, productId, rating, comment } = payload;
 
  const product = await ProductModel.findById({_id: productId});
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const ratingDoc = await RatingModel.create({
    user: new mongoose.Types.ObjectId(userId),
    rating,
    comment
  });

 
  product.ratings.push(ratingDoc._id);
  await product.save();
 
  if (typeof product.calculateAverageRating === 'function') {
    try {
      await product.calculateAverageRating();
    } catch (err) {

      console.error('Failed to recalculate average rating:', err);
    }
  }
  return ratingDoc;
};

export const ratingService = {
  createRating
};

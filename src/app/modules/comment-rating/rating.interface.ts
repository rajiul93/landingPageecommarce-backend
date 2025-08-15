// interfaces/rating.interface.ts
import { Types } from 'mongoose';
export interface IProductRating {
  userId: Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt?: Date;
}
export interface IRating {
  productRatings : IProductRating[]
}

// interfaces/rating.interface.ts
import { Types } from 'mongoose';

export interface IRating {
  userId: Types.ObjectId;
  productId:Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt?: Date;
}

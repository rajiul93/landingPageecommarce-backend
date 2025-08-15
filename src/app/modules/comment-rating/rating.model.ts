// models/rating.model.ts
import { Schema, model } from "mongoose";
import { IRating } from "./rating.interface";

const ratingSchema = new Schema<IRating>({ 
  productRatings: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      rating: { type: Number, min: 1, max: 5, required: true },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});

export const RatingModel = model<IRating>("Rating", ratingSchema);

import { Schema, model } from "mongoose";
import { IBrand } from "./brand.interface";

const brandSchema = new Schema<IBrand>(
  {
    title: { type: String , required:true},
    value: { type: String , required:true},
  },
  { timestamps: true }
);

export const Brand = model<IBrand>("Brand", brandSchema);

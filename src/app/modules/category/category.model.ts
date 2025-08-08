import { Schema, model } from "mongoose";
import { ICategory } from "./category.interface";

const categoryItemSchema = new Schema();

const categorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);

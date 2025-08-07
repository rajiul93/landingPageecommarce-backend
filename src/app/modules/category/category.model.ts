import { Schema, model } from "mongoose";
import { ICategory } from "./category.interface";

const categoryItemSchema = new Schema(
  {
    title: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const categorySchema = new Schema<ICategory>(
  {
    categories: {
      type: [categoryItemSchema], // ✅ array of category items
      required: true,
      validate: {
        validator: function (v: any[]) {
          const titles = v.map(item => item.title);
          const values = v.map(item => item.value);
          return (
            new Set(titles).size === titles.length &&
            new Set(values).size === values.length
          );
        },
        message: 'Title and value must be unique'
      }
    }
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);

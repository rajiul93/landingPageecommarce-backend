// models/product.model.ts
import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const sizeSchema = new Schema(
  {
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true,
    },
    stock: { type: Number, default: 0 },
    quantitySold: { type: Number, default: 0 },
    sku: { type: String },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const imageSchema = new Schema(
  {
    url: { type: String },
    alt: { type: String },
  },
  { _id: false }
);

const colorSchema = new Schema(
  {
    name: { type: String, required: true },
    hexCode: { type: String },
    singleImages: { type: imageSchema, default: null },
    images: { type: [imageSchema], default: [] },
    sizes: { type: [sizeSchema], default: [] },
  },
  { _id: false }
);

const productSchema = new Schema<IProduct>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // who created
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    shortDescription: { type: String, default: "" },
    description: { type: String, required: true },
    category: { type: [String], default: [] }, // change to ObjectId[] if needed
    brand: { type: String },
    basePrice: { type: Number, required: true },
    discountPrice: { type: Number },
    currency: { type: String, default: "USD" },
    colors: { type: [colorSchema], default: [] },
    ratings: { type: Schema.Types.ObjectId, ref: "Rating" },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ProductModel = model<IProduct>("Product", productSchema);

// services/product.service.ts

import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { RatingModel } from "../comment-rating/rating.model";
import { IProduct } from "./product.interface";
import { ProductModel } from "./product.model";
export type CreateProductPayload = Pick<
  IProduct,
  | "userId"
  | "title"
  | "slug"
  | "shortDescription"
  | "description"
  | "category"
  | "brand"
  | "basePrice"
  | "discountPrice"
  | "currency"
  | "colors"
  | "isActive"
  | "isDeleted"
>;

const createProduct = async (payload: CreateProductPayload, id:string) => {
  // slug uniqueness check (Mongoose unique index also helps)
  const existing = await ProductModel.findOne({ slug: payload.slug });
  if (existing) {
    throw new AppError(httpStatus.CONFLICT, "Product slug already exists");
  }
   const {_id} = await RatingModel.create({
    productRatings:[]
  });

  const product = await ProductModel.create({
    userId: payload.userId,
    title: payload.title,
    slug: payload.slug,
    shortDescription: payload.shortDescription,
    description: payload.description,
    category: payload.category,
    brand: payload.brand,
    basePrice: payload.basePrice,
    discountPrice: payload.discountPrice,
    currency: payload.currency || "USD",
    ratings: _id,
    colors: payload.colors || [],
    isActive: payload.isActive ?? true,
    isDeleted: payload.isDeleted ?? false,
  } as IProduct);

  return product;
};

export const productService = {
  createProduct,
};

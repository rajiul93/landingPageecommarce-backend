import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IBrand } from "./brand.interface";
import { Brand } from "./brand.model";

const createBrand = async (payload: IBrand) => {
  const { title, value } = payload;

  if (title.toLowerCase() !== value.toLowerCase()) {
    throw new AppError(400, "Title and value must match");
  }
  if (/[A-Z]/.test(value)) {
    throw new AppError(400, "Value must be lowercase");
  }
  const existingCategory = await Brand.findOne({ value });
  if (existingCategory) {
    throw new AppError(httpStatus.CONFLICT, "Category value already exists");
  }

  await Brand.create(payload);
  return [];
};
const getAllBrand = async () => {
  return await Brand.find();
};
const deleteBrand = async (id:string) => {
  return await Brand.findByIdAndDelete({_id:id});
};

export const brandService = {
  createBrand,
  getAllBrand,
  deleteBrand
};

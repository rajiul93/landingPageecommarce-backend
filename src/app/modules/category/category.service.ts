import AppError from '../../error/AppError';
import { ICategory } from './category.interface';
import { Category } from './category.model';

import httpStatus from 'http-status';
import mongoose from 'mongoose';

const createCategory = async (payload: ICategory) => {
  const { title, value } = payload;

  if (title.toLowerCase() !== value.toLowerCase()) {
    throw new AppError(400, "Title and value must match");
  }
  if (/[A-Z]/.test(value)) {
    throw new AppError(400, "Value must be lowercase");
  }
 
  const existingCategory = await Category.findOne({ value });
  if (existingCategory) {
    throw new AppError(httpStatus.CONFLICT, "Category value already exists");
  }
 
  await Category.create(payload);
  return [];
};

const getAllCategory =async()=>{
const result = await Category.find()
return result;
}

const deleteCategory = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid ID format');
  }

  const result = await Category.findOneAndDelete({ _id: id });
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Category not found');
  }

  return result;
};

export const categoryService = {
  createCategory,
  getAllCategory,
  deleteCategory
};

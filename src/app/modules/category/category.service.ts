import AppError from '../../error/AppError';
import { ICategory } from './category.interface';
import { Category } from './category.model';

import httpStatus from 'http-status';

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


export const categoryService = {
  createCategory,
};

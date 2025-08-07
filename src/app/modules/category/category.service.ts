import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (payload: ICategory) => {
  const category = await Category.create(payload);
  return [];
};

export const categoryService = {
  createCategory,
};

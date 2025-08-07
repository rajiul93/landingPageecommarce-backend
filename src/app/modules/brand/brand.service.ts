import { IBrand } from './brand.interface';
import { Brand } from './brand.model';

const createBrand = async (payload: IBrand) => {
  const brand = await Brand.create(payload);
  return brand;
};

export const brandService = {
  createBrand
};

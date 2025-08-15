// interfaces/product.interface.ts
import { Types } from 'mongoose';

export type SizeType = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ISize {
  size: SizeType;
  stock?: number;
  quantitySold?: number;
  sku?: string;
  price?: number;
}

export interface IImage {
  url: string;
  alt?: string;
}

export interface IColor {
  name: string;
  hexCode?: string;
  images?: IImage[];
  sizes?: ISize[];
}

export interface IProduct {
  userId?: Types.ObjectId; 
  title: string;
  slug: string;
  shortDescription?: string;
  description: string;
  category: string[]; 
  brand?:  string;
  basePrice: number;
  discountPrice?: number;
  currency?: string;
  colors?: IColor[];
  ratings: Types.ObjectId;
  averageRating?: number;
  isActive?: boolean;
  isDeleted?: boolean;
}

export interface IAddress {
  id?: string;
  label?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  isDefault: boolean;
}

export interface IUserDetails {
  profileImage?: string;
  addresses?: IAddress[];
  wishlist?: string[]; // product IDs
  cart?: {
    productId: string;
    quantity: number;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
